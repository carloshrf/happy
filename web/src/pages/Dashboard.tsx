import React from 'react';
import SideBar from '../components/SideBar';
import MapItem from '../components/MapItem';

import '../styles/pages/dashboard.css';

export default function Dashboard() {
  return (
    <div id="dashboard-page">
      <SideBar />
      <main>
        <div className="dashboard-content">
          <div className="main-title">
            <h1 className="dashboard-title">Orfanatos Cadastrados</h1>
            <span className="orphanages-counter">2 orfanatos</span>
          </div>
          <div className="dashboard-map-container">
            <MapItem />
            <MapItem />
            <MapItem />
          </div>
        </div>
      </main>
    </div>
  )
}