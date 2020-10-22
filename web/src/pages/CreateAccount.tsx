import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../images/vertical-logo.svg';

import { useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/pages/create-account.css';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');

  const history = useHistory();
  
  function handleGoBack() {
    history.goBack();
  }

  function handleSubmit() {
    api.post('users', {name, email, password})
      .then(response => {
        if (response.data.id) {
          alert(`Seja bem vindo, ${name}! Agora você já pode acessar nossa plataforma e fazer a diferença identificando novas casas de acolhimento!`);
          history.push('/login');
        }
      })
      .catch(err => alert('Erro ao criar conta: ' + err)
    );
  }

  return (
    <div className="register-page">
      <div className="side-logo">
        <div className="side-logo-content">
          <img src={logoImg} alt="logo" />

          <div className="location-register">
            <p>Fortaleza</p>
            <span>Ceará</span>
          </div>
          
        </div>
      </div>
      
      <div className="side-form">
        <button className="landing-back-button" onClick={handleGoBack}><FiArrowLeft size={24} color={'#15C3D6'} /></button>
        
        <div className="side-form-content">
          <h1>Crie sua conta</h1>
          <div className="register-form-container">
            <p>Nome</p>
            <input type="text" name="name" onChange={event => setName(event.target.value)}/>

            <p>E-mail</p>
            <input type="text" name="email" onChange={event => setEmail(event.target.value)}/>
            
            <p>Senha</p>
            <input type="password" name="password" onChange={event => setPassowrd(event.target.value)}/>
          </div>
          <button disabled={email && password ? false : true} onClick={handleSubmit}>Criar</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;