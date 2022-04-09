from pydantic import BaseModel
import requests
import json
import os
from fastapi import APIRouter
from pydantic import BaseModel



router = APIRouter()


# PINATA_API =os.environ['PINATA_API']
# PINATA_SECRET=os.environ['PINATA_SECRET']


base = "https://api.pinata.cloud/pinning/pinFileToIPFS"


class fileName(BaseModel):
    fileName:str


@router.post('/pin')
def pin(fileName:fileName):
    print(fileName.fileName)
    headers = {
        "pinata_api_key":PINATA_API,
        "pinata_secret_api_key":PINATA_SECRET}
    files = {
        'file':open(rf"./output_image/{fileName.fileName}",'rb'),
    }
    data = requests.post(
        base,
        headers = headers,
        files=files,
    )
    return data.content

