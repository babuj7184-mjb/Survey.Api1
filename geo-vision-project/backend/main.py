from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from pathlib import Path
import shutil
import uuid

from services.ai_processor import process_image
from services.geojson_service import create_parcel_geojson


# ------------------------------------------------
# APPLICATION
# ------------------------------------------------

app = FastAPI(
    title="GeoVision AI API",
    description="AI Based Urban Parcel Mapping System",
    version="1.0.0"
)


# ------------------------------------------------
# CORS
# ------------------------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5176",
        "http://127.0.0.1:5176"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ------------------------------------------------
# DIRECTORIES
# ------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

UPLOAD_DIR = BASE_DIR / "uploads"

OUTPUT_DIR = BASE_DIR / "outputs"

UPLOAD_DIR.mkdir(exist_ok=True)

OUTPUT_DIR.mkdir(exist_ok=True)


# ------------------------------------------------
# STATIC FILES
# ------------------------------------------------

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)


# ------------------------------------------------
# ROOT
# ------------------------------------------------

@app.get("/")
def root():

    return {
        "message": "GeoVision AI API is running",
        "version": "1.0.0",
        "system": "Urban Parcel Mapping"
    }


# ------------------------------------------------
# HEALTH CHECK
# ------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# ------------------------------------------------
# IMAGE UPLOAD
# ------------------------------------------------

@app.post("/api/upload")
async def upload_image(
    file: UploadFile = File(...)
):

    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/tiff"
    ]

    if file.content_type not in allowed_types:

        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and TIFF images are supported."
        )


    # Generate unique filename

    file_id = str(uuid.uuid4())

    extension = Path(file.filename).suffix

    filename = f"{file_id}{extension}"

    file_path = UPLOAD_DIR / filename


    # Save file

    try:

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Unable to save image: {error}"
        )


    # AI PROCESSING

    try:

        analysis = process_image(
            str(file_path)
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"AI processing failed: {error}"
        )


    # GEOJSON

    geojson = create_parcel_geojson(
        analysis["confidence"]
    )


    return {

        "success": True,

        "file": {
            "original_name": file.filename,
            "stored_name": filename
        },

        "analysis": analysis,

        "geojson": geojson

    }


# ------------------------------------------------
# DEMO PARCEL ENDPOINT
# ------------------------------------------------

@app.get("/api/parcels")
def get_parcels():

    geojson = create_parcel_geojson(
        0.94
    )

    return geojson