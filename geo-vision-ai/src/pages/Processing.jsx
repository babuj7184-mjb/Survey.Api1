function Processing() {
  return (
    <div className="panel">
      <div className="page-header">
        <h2>Processing pipeline</h2>
        <div className="page-actions">
          <button type="button" className="filter-chip">Export</button>
          <button type="button" className="primary-button">Run model</button>
        </div>
      </div>

      <div className="pipeline-card">
        <div className="pipeline-step">
          <div className="step-marker">1</div>
          <div className="step-meta">
            <div className="step-label">Ingest imagery</div>
            <div className="step-desc">3 new datasets queued from northern corridor.</div>
          </div>
          <span className="badge success">Ready</span>
        </div>

        <div className="pipeline-step">
          <div className="step-marker">2</div>
          <div className="step-meta">
            <div className="step-label">Preprocess</div>
            <div className="step-desc">Atmospheric correction and cropping to AOI.</div>
          </div>
          <span className="badge warning">Running</span>
        </div>

        <div className="pipeline-step">
          <div className="step-marker">3</div>
          <div className="step-meta">
            <div className="step-label">Inference</div>
            <div className="step-desc">Density map generated from multispectral inputs.</div>
          </div>
          <span className="badge success">Complete</span>
        </div>
      </div>
    </div>
  );
}

export default Processing;
