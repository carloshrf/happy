import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import MapItem from '../components/MapItem';
import Loading from '../components/Loading';

import '../styles/pages/dashboard.css';
import api from '../services/api';
import { useAuth } from '../hooks/auth';
import { setLocale } from 'yup';

interface Orphanage {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  orphanages: Array<Orphanage>;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<User>({} as User);
  const { user, token } = useAuth();

  const { id } = user as User;

  useEffect(() => {
    api.get(`/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log('erro! '+ err);
      });
  
  }, [id, token]);

  return (
    <div id="dashboard-page">
      <SideBar />
      {!!userData.id ? (
        <main>
          <div className="dashboard-content">
            <div className="main-title">
              <h1 className="dashboard-title">Orfanatos Cadastrados</h1>
              <span className="orphanages-counter">{userData.orphanages.length} orfanatos</span>
            </div>
            <div className="dashboard-map-container">
              {userData.orphanages.map(({id, latitude, longitude, name}) => (
                <MapItem 
                  key={id}
                  id={id}
                  latitude={latitude}
                  longitude={longitude}
                  name={name}
                />
              ))}
            </div>
          </div>
        </main>
      ) : <Loading />}
      
    </div>
  )
}