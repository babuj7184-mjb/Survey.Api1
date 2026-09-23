function Header() {
  return (
    <header className="topbar">
      <div>
        <h1>Operations Overview</h1>
      </div>

      <div className="topbar-actions">
        <input className="search-box" placeholder="Search assets, regions..." aria-label="Search" />
        <button type="button" className="filter-chip">Filter</button>
        <button type="button" className="primary-button">New Scan</button>
      </div>
    </header>
  );
}

export default Header;
