import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from constants import image_coordinates, feature_set

app = FastAPI(
    title="Odin backend",
    description="Get location details and sar images",
    version="1.0"
)
app.mount("/images", StaticFiles(directory="images"), name="static")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.get("/sar-images")
async def sar_images() -> dict:
    """
    Get name and location of the sar images
    """
    files = os.listdir('images')
    filename = ''
    if len(files) > 0:
        # get the latest
        filename = files[-1]
    return {
        "name": filename,
        "coordinates": image_coordinates
    }

@app.get("/object-location")
async def object_location() -> dict:
    """
    Get features of the objects like ship/lighthouse
    """
    return feature_set
