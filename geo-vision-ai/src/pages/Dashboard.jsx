import StatCard from '../components/StatCard';
import MapView from '../components/MapView';
import ProcessingPanel from '../components/ProcessingPanel';

function Dashboard() {
  return (
    <>
      <section className="dashboard-grid">
        <StatCard label="Total assets" value="24.8K" delta="+12.4%" />
        <StatCard label="Analysed" value="18.6K" delta="+8.1%" />
        <StatCard label="Alerts" value="1,204" delta="-3.2%" tone="down" />
        <StatCard label="Success rate" value="96.8%" delta="+2.3%" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Coverage map</h3>
            <button type="button" className="filter-chip">Live</button>
          </div>
          <MapView />
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Processing queue</h3>
            <button type="button" className="filter-chip">Today</button>
          </div>
          <ProcessingPanel />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
