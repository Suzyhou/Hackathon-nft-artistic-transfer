from pydantic import BaseModel
import requests
import json
import os
from fastapi import APIRouter
from pydantic import BaseModel



router = APIRouter()


PINATA_API ='92a768caf691039c66ba'
PINATA_SECRET='36d15015c35ac810ba37b2ab25f60b677643549a9e3a03122a31f3fe7e5ef564'
JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NzJkYmFlMS0xNmZjLTRiOGQtYjY1Ny1lYTFjMDY4NzcyMTUiLCJlbWFpbCI6ImNoaWFuZ2tsODFAc2NpLWluZmVyZW5jZS5jb21wYW55IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkyYTc2OGNhZjY5MTAzOWM2NmJhIiwic2NvcGVkS2V5U2VjcmV0IjoiMzZkMTUwMTVjMzVhYzgxMGJhMzdiMmFiMjVmNjBiNjc3NjQzNTQ5YTllM2EwMzEyMmEzMWYzZmU3ZTVlZjU2NCIsImlhdCI6MTY0OTQ0MTMwNH0.VAexhATc5aQe5p6df6JINvZgLAXSo2c7s5N2Jaogl5c"
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

