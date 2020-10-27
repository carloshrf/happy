import React, { useState } from 'react';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';

import logoImg from '../images/vertical-logo.svg';

import '../styles/pages/login.css';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import api from '../services/api';
import Loading from '../components/Loading';

function LogIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  
  async function handleSubmit() {
    setLoading(true);

    try {
      const response = await api.post('sessions', {email, password});
      
      if(!response.data.user) {
        throw new Error('Credenciais incorretas');
      }
      
      await signIn({
        email,
        password
      });

      alert('Logou com sucesso!');
      
      setLoading(false);

      history.push('/dashboard');

    } catch(err) {
      alert('Erro ao autenticar - ' + err.message);
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      { loading && <Loading />}
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
        <button className="landing-back-button" onClick={() => history.goBack()}><FiArrowLeft size={24} color={'#15C3D6'} /></button>
        
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
            <a href="_blank">Esqueci minha senha</a>
          </div>
          <button disabled={email && password ? false : true} onClick={handleSubmit}>Entrar</button>
          <Link className="create-account-link" to="create-account">
            <FiUserPlus size={20} color="#0089A5" />
            <span>Não possui conta? Crie agora!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;