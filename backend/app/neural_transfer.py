import os
import PIL.Image
import numpy as np
import tensorflow as tf
import matplotlib as mpl
import tensorflow_hub as hub
from fastapi import APIRouter
from pydantic import BaseModel
import matplotlib.pyplot as plt
import io
from starlette.responses import StreamingResponse
from fastapi.responses import FileResponse,Response
from io import BytesIO


router = APIRouter()

os.environ['TFHUB_MODEL_LOAD_FORMAT'] = 'COMPRESSED'
mpl.rcParams['figure.figsize'] = (12, 12)
mpl.rcParams['axes.grid'] = False
hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

def tensor_to_image(tensor):
    tensor = tensor*255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
    tensor = tensor[0]
    return PIL.Image.fromarray(tensor)

def load_img(path_to_img):
    max_dim = 512
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim
    new_shape = tf.cast(shape * scale, tf.int32)
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def imshow(image, title=None):
    if len(image.shape) > 3:
        image = tf.squeeze(image, axis=0)
        plt.imshow(image)
    if title:
        plt.title(title)



class transferObject(BaseModel):
    content_path: str
    style_path: str
    save_path: str



@router.post("/neural-transfer")
def neural_transfer(
    transferObject:transferObject
    ):
    print(transferObject)
    content_image = load_img(f"./images/{transferObject.content_path}".replace(" ", "-"))
    style_image = load_img(f"./images/{transferObject.style_path}".replace(" ", "-"))
    stylized_image = hub_model(tf.constant(content_image), tf.constant(style_image))[0]
    img = tensor_to_image(stylized_image)
    img.save(f"./output_image/{transferObject.save_path}")
    return FileResponse(rf"./output_image/{transferObject.save_path}",media_type='image/jpg')