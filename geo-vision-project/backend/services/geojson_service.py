def create_parcel_geojson(confidence: float):
    """
    Creates prototype parcel polygons.

    Coordinates are demo coordinates around
    the selected map area.

    In the production system these coordinates
    would come from georeferenced drone imagery
    and the AI/GIS processing pipeline.
    """

    parcels = [
        {
            "id": "P001",
            "confidence": confidence,
            "status": "pending",
            "area": 1250
        },
        {
            "id": "P002",
            "confidence": confidence - 0.02,
            "status": "pending",
            "area": 980
        },
        {
            "id": "P003",
            "confidence": confidence - 0.04,
            "status": "pending",
            "area": 1420
        },
        {
            "id": "P004",
            "confidence": confidence - 0.01,
            "status": "pending",
            "area": 1100
        }
    ]

    features = []

    coordinates = [
        [
            [80.4000, 16.3000],
            [80.4050, 16.3000],
            [80.4050, 16.3050],
            [80.4000, 16.3050],
            [80.4000, 16.3000]
        ],
        [
            [80.4050, 16.3000],
            [80.4100, 16.3000],
            [80.4100, 16.3050],
            [80.4050, 16.3050],
            [80.4050, 16.3000]
        ],
        [
            [80.4000, 16.3050],
            [80.4050, 16.3050],
            [80.4050, 16.3100],
            [80.4000, 16.3100],
            [80.4000, 16.3050]
        ],
        [
            [80.4050, 16.3050],
            [80.4100, 16.3050],
            [80.4100, 16.3100],
            [80.4050, 16.3100],
            [80.4050, 16.3050]
        ]
    ]

    for index, parcel in enumerate(parcels):

        feature = {
            "type": "Feature",

            "id": parcel["id"],

            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    coordinates[index]
                ]
            },

            "properties": {
                "parcel_id": parcel["id"],
                "confidence": round(parcel["confidence"] * 100, 2),
                "area_sqm": parcel["area"],
                "status": parcel["status"]
            }
        }

        features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features
    }