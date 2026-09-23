function StatCard({ label, value, delta, tone = 'up' }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span>vs last week</span>
        <span className={tone === 'down' ? 'trend-down' : 'trend-up'}>{delta}</span>
      </div>
    </div>
  );
}

export default StatCard;
