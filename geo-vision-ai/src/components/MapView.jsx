function MapView() {
  return (
    <div className="map-box" aria-label="Map view">
      <div className="map-grid" />
      <div className="route-line" />
      <div className="route-marker marker-a" />
      <div className="route-marker marker-b" />
      <div className="route-marker marker-c" />
    </div>
  );
}

export default MapView;
