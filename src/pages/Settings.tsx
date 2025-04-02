import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../components/nav/Nav';
import { useAuth } from '../contexts/AuthContext';


const PageContainer = styled.div`
  background-color: #0D1B2A; 
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const FormContainer = styled.div`
  background-color: #1B263B; 
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media(max-width: 455px) {
    width: 70%;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #415A77;
`;

const InputField = styled.input`
  width: 85%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #415A77; 
  background-color: #2C3E50; 
  color: white;
  font-size: 16px;
  @media(max-width: 455px) {
    width: 65%;
  }
`;

const InputFieldWithButton = styled.input`
  width: 85%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #415A77;
  background-color: #2C3E50; 
  color: white;
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  @media(max-width: 455px) {
    width: 65%;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  display: none;
  opacity: 0;
  transition: opacity 0.3s;
  @media(max-width: 420px) {
    white-space: normal;
    top: 50%;
    left: 40%;
  }
`;

const InfoIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  position: relative;
  margin: 10px;
  &:hover + ${Tooltip} {
    display: flex;
    opacity: 1;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #00E676;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #00B35B;
  }
  @media(max-width: 455px) {
    width: 65%;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FF9100; 
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E67A00; 
  }
  @media(max-width: 455px) {
    width: 65%;
  }
`;

const ErrorMessage = styled.p`
  color: #D50000; 
  text-align: center;
  font-weight: bold;
`;

interface UserInfo {
  nome: string;
  email: string;
  senha: string;
}

const Settings: React.FC = () => {

  const { isAuthenticated } = useAuth();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  useEffect(() => {
    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/info", {
                method: "GET",
                credentials: "include"
              });
            const data = await response.json();
            setUserInfo(data);
            console.log(data);
        } catch (error) {
            console.error('Não foi possivel resgatar dados do usuario:', error);
        }
    } 
    getUserData();
  }, []);

  const handleSubmit = async () => {
    try {
        if(!userInfo?.email || !userInfo?.nome || !userInfo?.senha) {
            setError("Por favor, não deixe os campos vazios")
            return;
        } else {
            setError(null)
        }
        const response = await fetch('http://localhost:3000/api/user/update', {
            method: 'PUT', 
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome: userInfo.nome,
              email: userInfo.email,
              senha: userInfo.senha,
            }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Erro ao atualizar informações do usuário");
          } else {
            setError(null);
            alert("Informações atualizadas com sucesso!");
          }
        } catch (error) {
          console.error("Erro ao atualizar informações do usuário:", error);
          setError("Erro inesperado ao tentar atualizar as informações");
        }
      };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserInfo) => {
    setUserInfo({
      ...userInfo!,
      [field]: e.target.value,
    });
  };

  return (
    <>
    <Nav />
    <PageContainer>
      <FormContainer>
        <FormTitle>Alterar Informações</FormTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {userInfo ? (
          <>
          <InputField
              type="nome"
              value={userInfo.nome}
              onChange={(e) => handleInputChange(e, 'nome')}
              placeholder="Nome"
            />
            <InputField
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange(e, 'email')}
              placeholder="E-mail"
            />
            
             <InputFieldWithButton
                  type={passwordVisible ? "text" : "password"}
                  value={userInfo.senha}
                  onChange={(e) => handleInputChange(e, "senha")}
                  placeholder="Senha"
                />
                <div className='row' style={{ display: 'flex', flexDirection: 'row'}}>
                <button onClick={togglePasswordVisibility} type="button" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '18px', cursor: 'pointer'}}>
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
                <InfoIcon>❓</InfoIcon>
                <Tooltip>Sua senha está criptografada por questões de segurança.</Tooltip>
                </div>
            <SubmitButton onClick={handleSubmit}>Salvar</SubmitButton>
            <CancelButton onClick={() => console.log('Cancelando alterações')}>Cancelar</CancelButton>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </FormContainer>
    </PageContainer>
    </>
  );
};

export default Settings;
