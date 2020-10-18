import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../images/vertical-logo.svg';

import '../styles/pages/login.css';
import { useHistory } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');

  const history = useHistory();
  
  function handleGoBack() {
    history.goBack();
  }

  return (
    <div className="login-page">
      <div className="side-logo">
        <div className="side-logo-content">
          <img src={logoImg} alt="logo" />

          <div className="location-login">
            <p>Fortaleza</p>
            <span>Ceará</span>
          </div>
          
        </div>
      </div>
      
      <div className="side-form">
        <button className="landing-back-button" onClick={handleGoBack}><FiArrowLeft size={24} color={'#15C3D6'} /></button>
        
        <div className="side-form-content">
          <h1>Fazer login</h1>
          <div className="login-form-container">
            <p>E-mail</p>
            <input type="text" name="email" onChange={event => setEmail(event.target.value)}/>
            
            <p>Senha</p>
            <input type="password" name="password" onChange={event => setPassowrd(event.target.value)}/>
          </div>
          <div className="login-operators">
            <label>
              Lembrar-me
              <input id="remember-password-checkbox" type="checkbox" />
              <span></span>
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>
          <button disabled={email && password ? false : true}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;