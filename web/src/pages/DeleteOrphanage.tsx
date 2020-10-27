import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import deleteImg from '../images/delete-picture.svg';

import '../styles/pages/delete-page.css';
import api from '../services/api';
import { useAuth } from '../hooks/auth';

interface DeletePageParams {
  id: string;
}

interface Orphanage {
  id: number;
  name: string;
}

function DeleteOrphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>({} as Orphanage);

  const { id } = useParams<DeletePageParams>();
  const { token } = useAuth();

 const history = useHistory();

  async function handleDelete() {
    api.delete(`orphanages/${orphanage.id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert('Orfanato removido');
        history.push('/dashboard');
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    api.get(`orphanages/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => setOrphanage(response.data))
      .catch(err => console.log(err));
  }, [id, token]);

  return (
    <div id="page-delete">
      <main>
        <div className="page-delete-column">
          <button onClick={handleDelete} className="exclude-message">Excluir</button>
          <span className="page-delete-message">
            Você tem certeza que quer excluir {orphanage.name}?
          </span>
          <Link to="/dashboard" className="page-delete-back-button">Voltar para o dashboard</Link>
        </div>
        <div className="page-delete-column">
          <img src={deleteImg} alt="deletar"/>
        </div>
      </main>
    </div>
  )
}

export default DeleteOrphanage;