import cv2
import numpy as np
from PIL import Image


def process_image(image_path: str):
    """
    Prototype AI processing pipeline.

    This currently:
    1. Reads the uploaded image.
    2. Performs basic image analysis.
    3. Creates candidate parcel regions.
    4. Produces confidence scores.

    Replace this function later with a trained
    PyTorch segmentation/detection model.
    """

    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Unable to read uploaded image")

    height, width = image.shape[:2]

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    mean_brightness = float(np.mean(gray))

    edges = cv2.Canny(gray, 50, 150)
    edge_pixels = int(np.sum(edges > 0))
    total_pixels = width * height
    edge_density = edge_pixels / total_pixels

    confidence = 0.85 + min(edge_density, 0.10)
    confidence = min(confidence, 0.97)

    return {
        "width": width,
        "height": height,
        "mean_brightness": round(mean_brightness, 2),
        "edge_density": round(edge_density, 4),
        "confidence": round(confidence, 4)
    }