import React from 'react'
import { FiArrowLeft, FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';
import { useHistory, useLocation } from 'react-router-dom';

import '../styles/components/sidebar.css';
import { useAuth } from '../hooks/auth';

export default function SideBar() {
  const { goBack, push } = useHistory();
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  return(
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="dashboard-button-group">
        <button 
          type="button" 
          className={pathname === '/dashboard' ? 'current' : ''}
          onClick={() => push('/dashboard')}
        >
          <FiMapPin size={24} color={pathname === '/dashboard' ? '#15C3D6' : '#FFF'}/>
        </button>
        
        <button 
          type="button" 
          className={pathname === '/dashboard/pending' ? 'current' : ''}
          onClick={() => push('/dashboard/pending')}
        >
          <FiAlertCircle size={24} color={pathname === '/dashboard/pending' ? '#15C3D6' : '#FFF'} />
        </button>
      </div>
      
      <footer>
        {(pathname === '/dashboard' || pathname === '/dashboard/pending') && 
          (<button type="button" onClick={signOut}>
            <FiPower size={24} color="#FFF" />
          </button>) 
        }
        
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}