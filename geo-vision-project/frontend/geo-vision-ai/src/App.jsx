import React, { useEffect, useState } from 'react';
import {
  Upload,
  Map,
  Brain,
  CheckCircle,
  BarChart3,
  Settings,
  Layers,
  Menu,
  X,
  Loader,
  FileCheck,
} from 'lucide-react';

import MapView from './components/MapView';
import './App.css';

const API_URL = 'http://127.0.0.1:8010';

function App() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [geojson, setGeojson] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadParcels();
  }, []);

  async function loadParcels() {
    try {
      const response = await fetch(`${API_URL}/api/parcels`);
      if (!response.ok) throw new Error('Unable to load parcels');
      const data = await response.json();
      setGeojson(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function uploadImage(file) {
    if (!file) return;

    setProcessing(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed');
      }

      setResult(data);
      setGeojson(data.geojson);
      setPage('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="app">
      <aside className={sidebarOpen ? 'sidebar' : 'sidebar collapsed'}>
        <div className="logo-section">
          <div className="logo">GEO</div>
          {sidebarOpen && (
            <div>
              <h2>VISION AI</h2>
              <p>Urban Mapping System</p>
            </div>
          )}
        </div>

        <nav>
          <MenuButton
            active={page === 'dashboard'}
            icon={<Map size={20} />}
            text="Dashboard"
            open={sidebarOpen}
            onClick={() => setPage('dashboard')}
          />
          <MenuButton
            active={page === 'processing'}
            icon={<Brain size={20} />}
            text="AI Processing"
            open={sidebarOpen}
            onClick={() => setPage('processing')}
          />
          <MenuButton
            active={page === 'verification'}
            icon={<CheckCircle size={20} />}
            text="Verification"
            open={sidebarOpen}
            onClick={() => setPage('verification')}
          />
          <MenuButton
            active={page === 'reports'}
            icon={<BarChart3 size={20} />}
            text="Reports"
            open={sidebarOpen}
            onClick={() => setPage('reports')}
          />
        </nav>

        <div className="sidebar-bottom">
          <MenuButton icon={<Settings size={20} />} text="Settings" open={sidebarOpen} />
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div>
            <h1>Urban Parcel Mapping</h1>
            <p>AI Based Cadastral Feature Extraction System</p>
          </div>

          <div className="header-right">
            <div className="status">
              <span className="status-dot" />
              System Online
            </div>
          </div>
        </header>

        <section className="content">
          {error && <div className="error-box">{error}</div>}

          {page === 'dashboard' && <Dashboard geojson={geojson} result={result} onUpload={uploadImage} />}
          {page === 'processing' && <Processing processing={processing} onUpload={uploadImage} result={result} />}
          {page === 'verification' && <Verification geojson={geojson} />}
          {page === 'reports' && <Reports geojson={geojson} />}
        </section>
      </main>
    </div>
  );
}

function MenuButton({ active, icon, text, open, onClick }) {
  return (
    <button className={active ? 'menu-item active' : 'menu-item'} onClick={onClick}>
      {icon}
      {open && <span>{text}</span>}
    </button>
  );
}

function Dashboard({ geojson, result, onUpload }) {
  const parcels = geojson?.features?.length || 0;

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Mapping Dashboard</h2>
          <p>AI + GIS Integrated Urban Mapping Solution</p>
        </div>

        <label className="primary-button">
          <Upload size={18} />
          Upload Drone Image
          <input
            type="file"
            accept="image/png,image/jpeg,image/tiff"
            hidden
            onChange={(event) => onUpload(event.target.files[0])}
          />
        </label>
      </div>

      <div className="stats-grid">
        <StatCard title="Detected Parcels" value={parcels} icon={<Layers size={18} />} />
        <StatCard title="Buildings" value="2,416" icon={<Map size={18} />} />
        <StatCard title="Roads" value="186" icon={<Map size={18} />} />
        <StatCard
          title="AI Confidence"
          value={result ? `${(result.analysis.confidence * 100).toFixed(1)}%` : '94.0%'}
          icon={<Brain size={18} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="map-card">
          <div className="card-header">
            <div>
              <h3>Urban Map</h3>
              <p>GeoJSON cadastral parcel extraction</p>
            </div>
            <button className="secondary-button">
              <Layers size={17} />
              Layers
            </button>
          </div>

          <div className="map-container">
            {geojson ? <MapView geojson={geojson} /> : <div className="map-loading">Loading map...</div>}
          </div>
        </div>

        <div className="side-panel">
          <h3>AI Analysis</h3>
          <AnalysisItem icon={<Brain size={18} />} title="Buildings" value="2,416 detected" />
          <AnalysisItem icon={<Layers size={18} />} title="Parcels" value={`${parcels} extracted`} />
          <AnalysisItem icon={<CheckCircle size={18} />} title="Topology" value="98.2% valid" />

          <div className="confidence">
            <div className="confidence-header">
              <span>Overall Confidence</span>
              <strong>{result ? `${(result.analysis.confidence * 100).toFixed(1)}%` : '94.0%'}</strong>
            </div>
            <div className="progress">
              <div
                className="progress-value"
                style={{ width: `${result ? result.analysis.confidence * 100 : 94}%` }}
              />
            </div>
          </div>

          {result && (
            <div className="result-box">
              <strong>Processing Complete</strong>
              <p>{result.file.original_name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

function AnalysisItem({ icon, title, value }) {
  return (
    <div className="analysis-item">
      <div className="analysis-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{value}</p>
      </div>
    </div>
  );
}

function Processing({ processing, onUpload, result }) {
  return (
    <div>
      <div className="page-title">
        <div>
          <h2>AI Processing</h2>
          <p>Upload and process georeferenced imagery</p>
        </div>
      </div>

      <div className="processing-grid">
        <div className="upload-card">
          {processing ? <Loader className="spin" size={48} /> : <Upload size={48} />}
          <h3>{processing ? 'Processing Image...' : 'Upload Drone Imagery'}</h3>
          <p>{processing ? 'AI pipeline is running.' : 'Upload JPG, PNG or TIFF imagery.'}</p>

          <label className="primary-button">
            <Upload size={18} />
            Choose Image
            <input
              type="file"
              hidden
              accept="image/png,image/jpeg,image/tiff"
              disabled={processing}
              onChange={(event) => onUpload(event.target.files[0])}
            />
          </label>

          {result && (
            <div className="result-box">
              <strong>Image Processed</strong>
              <p>Width: {result.analysis.width}px</p>
              <p>Height: {result.analysis.height}px</p>
              <p>Confidence: {(result.analysis.confidence * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>

        <div className="processing-card">
          <h3>Processing Pipeline</h3>
          <div className="pipeline">
            <PipelineStep number="1" title="Image Upload" status={processing ? 'Processing' : 'Ready'} />
            <PipelineStep number="2" title="AI Feature Extraction" status={result ? 'Completed' : 'Waiting'} />
            <PipelineStep number="3" title="Parcel Generation" status={result ? 'Completed' : 'Waiting'} />
            <PipelineStep number="4" title="Topology Validation" status={result ? 'Completed' : 'Waiting'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({ number, title, status }) {
  const completed = status === 'Completed';

  return (
    <div className={completed ? 'pipeline-step completed' : 'pipeline-step'}>
      <span>{number}</span>
      <div>
        <strong>{title}</strong>
        <p>{status}</p>
      </div>
    </div>
  );
}

function Verification({ geojson }) {
  const parcels = geojson?.features || [];

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Surveyor Verification</h2>
          <p>Review AI-generated cadastral polygons</p>
        </div>
      </div>

      <div className="verification-card">
        <div className="verification-map">
          <MapView geojson={geojson} />
        </div>

        <div className="verification-panel">
          <h3>Parcel Review</h3>

          {parcels.length > 0 ? (
            <>
              <div className="confidence-box">
                <span>Parcel</span>
                <strong>{parcels[0].properties.parcel_id}</strong>
              </div>

              <p>AI Confidence: {parcels[0].properties.confidence}%</p>
              <p>Area: {parcels[0].properties.area_sqm} m²</p>

              <div className="verification-buttons">
                <button className="accept">
                  <CheckCircle size={18} />
                  Accept
                </button>
                <button className="edit">Edit Boundary</button>
                <button className="reject">Reject</button>
                <button className="field">Field Verify</button>
              </div>
            </>
          ) : (
            <p>No parcels available. Upload imagery first.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Reports({ geojson }) {
  const count = geojson?.features?.length || 0;

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Reports</h2>
          <p>Mapping statistics</p>
        </div>
      </div>

      <div className="report-grid">
        <ReportCard icon={<FileCheck size={30} />} title="Detected Parcels" value={count} text="AI-generated parcel candidates" />
        <ReportCard icon={<Brain size={30} />} title="AI Confidence" value="94%" text="Average extraction confidence" />
        <ReportCard icon={<Map size={30} />} title="GIS Output" value="GeoJSON" text="GIS-ready spatial data" />
      </div>
    </div>
  );
}

function ReportCard({ icon, title, value, text }) {
  return (
    <div className="report-card">
      {icon}
      <h3>{title}</h3>
      <strong>{value}</strong>
      <p>{text}</p>
    </div>
  );
}

export default App;

