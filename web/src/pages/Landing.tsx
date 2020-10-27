import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';
import { useAuth } from '../hooks/auth';


function Landing() {
  const { user } = useAuth();

  return(
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
        
        <div className="location">
          <strong>Fortaleza</strong>
          <span>Ceará</span>
        </div>

        { !user 
          ? <Link to="/login" className="landing-login-button">
              Acesso restrito
            </Link>
          : <Link to="/dashboard" className="landing-dashboard-button">
              Dashboard
            </Link>
        }

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  )
}

export default Landing;