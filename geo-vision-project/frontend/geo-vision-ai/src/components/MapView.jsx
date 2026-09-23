import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapView({ geojson }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [80.405, 16.305],
      zoom: 14,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      addGeoJSONLayer(map.current, geojson);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded() || !geojson) return;
    updateGeoJSON(map.current, geojson);
  }, [geojson]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}

function addGeoJSONLayer(map, geojson) {
  if (!geojson) return;

  map.addSource('parcels', {
    type: 'geojson',
    data: geojson,
  });

  map.addLayer({
    id: 'parcel-fill',
    type: 'fill',
    source: 'parcels',
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'confidence'],
        80, '#ef4444',
        90, '#f59e0b',
        95, '#22c55e',
      ],
      'fill-opacity': 0.35,
    },
  });

  map.addLayer({
    id: 'parcel-outline',
    type: 'line',
    source: 'parcels',
    paint: {
      'line-color': '#1d4ed8',
      'line-width': 3,
    },
  });

  map.on('click', 'parcel-fill', (event) => {
    const properties = event.features[0].properties;

    new maplibregl.Popup()
      .setLngLat(event.lngLat)
      .setHTML(`
        <div style="min-width:180px">
          <h3>Parcel ${properties.parcel_id}</h3>
          <p><strong>Confidence:</strong> ${properties.confidence}%</p>
          <p><strong>Area:</strong> ${properties.area_sqm} m²</p>
          <p><strong>Status:</strong> ${properties.status}</p>
        </div>
      `)
      .addTo(map);
  });

  map.on('mouseenter', 'parcel-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'parcel-fill', () => {
    map.getCanvas().style.cursor = '';
  });
}

function updateGeoJSON(map, geojson) {
  const source = map.getSource('parcels');
  if (source) source.setData(geojson);
}

export default MapView;
