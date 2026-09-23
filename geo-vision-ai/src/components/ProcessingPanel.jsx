function ProcessingPanel() {
  const jobs = [
    { name: 'Satellite correction', sub: 'EO-118', progress: 72 },
    { name: 'Image stitching', sub: 'AO-204', progress: 48 },
    { name: 'Change detection', sub: 'AL-499', progress: 86 },
  ];

  return (
    <div className="processing-list">
      {jobs.map((job) => (
        <div key={job.name} className="process-item">
          <div className="process-meta">
            <span className="process-title">{job.name}</span>
            <span className="process-sub">{job.sub}</span>
          </div>

          <div className="progress-track" aria-label={`${job.progress}% complete`}>
            <span className="progress-bar" style={{ width: `${job.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProcessingPanel;
