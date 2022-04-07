from fastapi import FastAPI,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
import cloudinary
import cloudinary.uploader
from typing import Optional

from fastapi.encoders import jsonable_encoder
import os
from . import neural_transfer

app = FastAPI()
app.include_router(neural_transfer.router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post('/upload')
async def upload_client_image(file: Optional[UploadFile] = File(...)):
    print(file.file)
    try:
        os.mkdir("images")
        print(os.getcwd())
    except Exception as e:
        print(e) 
    file_name = os.getcwd()+"/images/"+file.filename.replace(" ", "-")
    with open(file_name,'wb+') as f:
        f.write(file.file.read())
        f.close()
    return {"filename": file.filename}