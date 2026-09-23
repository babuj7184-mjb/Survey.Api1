import { useState } from "react";
import {
  Map,
  Brain,
  CheckCircle,
  BarChart3,
  Settings,
  Upload,
  Layers,
  FileCheck,
  Menu,
  X
} from "lucide-react";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <Map size={20} />
    },
    {
      id: "processing",
      name: "AI Processing",
      icon: <Brain size={20} />
    },
    {
      id: "verification",
      name: "Verification",
      icon: <CheckCircle size={20} />
    },
    {
      id: "reports",
      name: "Reports",
      icon: <BarChart3 size={20} />
    }
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className={sidebarOpen ? "sidebar" : "sidebar collapsed"}>

        <div className="logo-section">

          <div className="logo">
            GEO
          </div>

          {sidebarOpen && (
            <div>
              <h2>VISION AI</h2>
              <p>Urban Mapping System</p>
            </div>
          )}

        </div>

        <nav>

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={
                activePage === item.id
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => setActivePage(item.id)}
            >

              {item.icon}

              {sidebarOpen && <span>{item.name}</span>}

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <button className="menu-item">
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        <header className="header">

          <button
            className="menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div>
            <h1>Urban Parcel Mapping</h1>
            <p>
              AI Based Cadastral Feature Extraction System
            </p>
          </div>

          <div className="header-right">

            <div className="status">
              <span className="status-dot"></span>
              System Online
            </div>

          </div>

        </header>


        <section className="content">

          {activePage === "dashboard" && (
            <Dashboard />
          )}

          {activePage === "processing" && (
            <Processing />
          )}

          {activePage === "verification" && (
            <Verification />
          )}

          {activePage === "reports" && (
            <Reports />
          )}

        </section>

      </main>

    </div>
  );
}


/* DASHBOARD */

function Dashboard() {

  return (

    <div>

      <div className="page-title">

        <div>
          <h2>Mapping Dashboard</h2>

          <p>
            AI + GIS Integrated Urban Mapping Solution
          </p>
        </div>

        <button className="primary-button">
          <Upload size={18} />
          Upload Imagery
        </button>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid">

        <StatCard
          title="Total Parcels"
          value="1,284"
          icon={<Layers />}
        />

        <StatCard
          title="Buildings Detected"
          value="2,416"
          icon={<Map />}
        />

        <StatCard
          title="Roads Detected"
          value="186"
          icon={<Map />}
        />

        <StatCard
          title="AI Confidence"
          value="94.7%"
          icon={<Brain />}
        />

      </div>


      {/* MAP */}

      <div className="dashboard-grid">

        <div className="map-card">

          <div className="card-header">

            <div>
              <h3>Urban Map</h3>
              <p>AI extracted cadastral features</p>
            </div>

            <button className="secondary-button">
              <Layers size={17} />
              Layers
            </button>

          </div>

          <div className="map-container">

            <div className="fake-map">

              <div className="map-grid"></div>

              <div className="parcel parcel1"></div>
              <div className="parcel parcel2"></div>
              <div className="parcel parcel3"></div>
              <div className="parcel parcel4"></div>
              <div className="parcel parcel5"></div>

              <div className="map-label">
                Drone Imagery + AI Extraction
              </div>

            </div>

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="side-panel">

          <h3>AI Analysis</h3>

          <div className="analysis-item">

            <div className="analysis-icon">
              <Brain />
            </div>

            <div>
              <strong>Buildings</strong>
              <p>2,416 detected</p>
            </div>

          </div>


          <div className="analysis-item">

            <div className="analysis-icon">
              <Layers />
            </div>

            <div>
              <strong>Parcels</strong>
              <p>1,284 extracted</p>
            </div>

          </div>


          <div className="analysis-item">

            <div className="analysis-icon">
              <CheckCircle />
            </div>

            <div>
              <strong>Topology</strong>
              <p>98.2% valid</p>
            </div>

          </div>


          <div className="confidence">

            <div className="confidence-header">
              <span>Overall Confidence</span>
              <strong>94.7%</strong>
            </div>

            <div className="progress">
              <div className="progress-value"></div>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


/* STAT CARD */

function StatCard({ title, value, icon }) {

  return (

    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

    </div>

  );

}


/* PROCESSING */

function Processing() {

  return (

    <div>

      <div className="page-title">

        <div>
          <h2>AI Processing</h2>

          <p>
            Process drone imagery and extract cadastral features
          </p>
        </div>

      </div>


      <div className="processing-grid">

        <div className="upload-card">

          <Upload size={48} />

          <h3>Upload Drone Imagery</h3>

          <p>
            Upload georeferenced imagery for AI processing.
          </p>

          <button className="primary-button">
            Choose File
          </button>

        </div>


        <div className="processing-card">

          <h3>Processing Pipeline</h3>

          <div className="pipeline">

            <div className="pipeline-step completed">
              <span>1</span>
              <div>
                <strong>Image Processing</strong>
                <p>Completed</p>
              </div>
            </div>


            <div className="pipeline-step completed">
              <span>2</span>
              <div>
                <strong>AI Feature Extraction</strong>
                <p>Completed</p>
              </div>
            </div>


            <div className="pipeline-step active-step">
              <span>3</span>
              <div>
                <strong>Parcel Generation</strong>
                <p>Processing...</p>
              </div>
            </div>


            <div className="pipeline-step">
              <span>4</span>
              <div>
                <strong>Topology Validation</strong>
                <p>Waiting</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


/* VERIFICATION */

function Verification() {

  return (

    <div>

      <div className="page-title">

        <div>
          <h2>Surveyor Verification</h2>

          <p>
            Review AI-generated cadastral results
          </p>
        </div>

      </div>


      <div className="verification-card">

        <div className="verification-map">

          <div className="fake-map">

            <div className="map-grid"></div>

            <div className="parcel parcel1"></div>
            <div className="parcel parcel2"></div>
            <div className="parcel parcel3"></div>

          </div>

        </div>


        <div className="verification-panel">

          <h3>Parcel #1024</h3>

          <div className="confidence-box">

            <span>AI Confidence</span>

            <strong>96%</strong>

          </div>

          <p>
            The system has detected a possible parcel boundary.
            Please review the AI-generated polygon.
          </p>

          <div className="verification-buttons">

            <button className="accept">
              <CheckCircle size={18} />
              Accept
            </button>

            <button className="edit">
              Edit
            </button>

            <button className="reject">
              Reject
            </button>

            <button className="field">
              Field Verify
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}


/* REPORTS */

function Reports() {

  return (

    <div>

      <div className="page-title">

        <div>

          <h2>Reports</h2>

          <p>
            Mapping and AI processing statistics
          </p>

        </div>

      </div>


      <div className="report-grid">

        <div className="report-card">

          <FileCheck size={30} />

          <h3>Validated Parcels</h3>

          <strong>1,192</strong>

          <p>
            Parcels successfully validated
          </p>

        </div>


        <div className="report-card">

          <Brain size={30} />

          <h3>AI Accuracy</h3>

          <strong>94.7%</strong>

          <p>
            Average extraction confidence
          </p>

        </div>


        <div className="report-card">

          <Map size={30} />

          <h3>Mapped Area</h3>

          <strong>12.8 km²</strong>

          <p>
            Urban area processed
          </p>

        </div>

      </div>

    </div>

  );

}


export default App;