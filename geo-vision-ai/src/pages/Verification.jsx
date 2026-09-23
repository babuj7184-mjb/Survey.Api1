function Verification() {
  const rows = [
    { region: 'North Basin', type: 'Flood risk', confidence: '92%', status: 'Verified', tone: 'success' },
    { region: 'Coastal Edge', type: 'Urban growth', confidence: '84%', status: 'Review', tone: 'warning' },
    { region: 'Forest West', type: 'Deforestation', confidence: '67%', status: 'Flagged', tone: 'error' },
  ];

  return (
    <div className="panel">
      <div className="page-header">
        <h2>Verification queue</h2>
        <div className="page-actions">
          <button type="button" className="filter-chip">Sort by risk</button>
          <button type="button" className="primary-button">Create review</button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Detection</th>
            <th>Confidence</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.region}>
              <td>{row.region}</td>
              <td>{row.type}</td>
              <td>{row.confidence}</td>
              <td>
                <span className={`badge ${row.tone}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Verification;
