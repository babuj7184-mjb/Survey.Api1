const navItems = [
  { label: 'Dashboard', count: '24', active: true },
  { label: 'Processing', count: '8' },
  { label: 'Verification', count: '12' },
  { label: 'Alerts', count: '3' },
  { label: 'Reports', count: '5' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">G</div>
        <span>GeoVision</span>
      </div>

      <nav className="nav" aria-label="Sidebar nav">
        {navItems.map(({ label, count, active }) => (
          <button key={label} className={`nav-item ${active ? 'active' : ''}`} type="button">
            <span>{label}</span>
            <small>{count}</small>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <h4>Coverage</h4>
        <strong>86.4%</strong>
        <div className="stat-foot">
          <span>Updated</span>
          <span className="trend-up">+4.2%</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
