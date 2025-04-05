import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RecoverPassword = () => {
  const { token } = useParams(); // pegando o token da URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/recover/reset', {
        token,
        newPassword
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao redefinir a senha.');
    }
  };

  if (!token) {
    return <p>Token de recuperação inválido ou ausente.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Redefinir senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Digite a nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RecoverPassword;