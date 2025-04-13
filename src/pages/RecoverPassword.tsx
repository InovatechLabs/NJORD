import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Button } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0D1B2A;
  min-height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  height: 700px;
  background-color: #273D67;
  border-radius: 5px;
  padding: 40px;
`;

const CardTitle = styled.h1`
  font-family: 'Lavishly Yours', sans-serif;
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  text-align: center;
  margin-bottom: 40px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  background-color: #fff;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 2rem;
  margin-top: 10px;
  text-align: start;
  padding: 10px;
  font-family: sans-serif;

  &::placeholder {
    font-size: 22px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;
`;

const BtnRegister = styled(Button)`
  width: 100%;
  background-color: #0D1B2A;
  height: 70px;
  border: none;
  outline: none;
  border-radius: 20px;
  color: #fff;
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-top: 50px;
  cursor: pointer;
  transition: .3s;
  &:hover {
    background-color: #07111b;
  }
`;

const Message = styled.p<{ success?: boolean }>`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
  color: ${({ success }) => (success ? 'lightgreen' : 'salmon')};
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 12px;
  color: #fff;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  align-self: center;

  &:hover {
    background-color: #fff;
    color: #0D1B2A;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const RecoverPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/recover/reset', {
        token,
        newPassword
      });

      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao redefinir a senha.');
      setSuccess('');
    }
  };

  if (!token) {
    return <p>Token de recuperação inválido ou ausente.</p>;
  }

  return (
    <Container>
      <Card>
        <CardTitle>Redefinir Senha</CardTitle>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <Label>Nova senha</Label>
            <StyledInput
              type="password"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Confirmar senha</Label>
            <StyledInput
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <BtnRegister type="submit">Redefinir</BtnRegister>
        </StyledForm>

        {success && <Message success>{success}</Message>}
        {error && <Message>{error}</Message>}

        <HomeButton onClick={() => navigate('/')}>
          Página Inicial
        </HomeButton>
      </Card>
    </Container>
  );
};

export default RecoverPassword;
