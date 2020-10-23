import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import MapItem from '../components/MapItem';

import '../styles/pages/dashboard.css';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function Dashboard() {
  const [userData, setUserData] = useState();

  const { user } = useAuth();

  useEffect(() => {
    // api.get('/users', {
    //   headers: {
    //     authorization: `Bearer `
    //   }
    // })
  }, []);

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