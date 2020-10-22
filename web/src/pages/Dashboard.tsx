import React from 'react';
import SideBar from '../components/SideBar';

import '../styles/pages/dashboard.css';

export default function Dashboard() {
  return (
    <div id="dashboard-page">
      <SideBar />
      <main>
        <div className="main-title">
          <h1>Orfanatos Cadastrados</h1>
          <span>2 orfanatos</span>
        </div>
      </main>
    </div>
  )
}