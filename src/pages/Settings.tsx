import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../components/nav/Nav';


const PageContainer = styled.div`
  background-color: #0D1B2A; 
  color: #ffffff;
  display: flex;
  padding: 5px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const FormContainer = styled.div`
  background-color: #ebebeb; 
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  flex-direction: row;
  @media (max-width: 1280px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
  @media(max-width: 455px) {
    width: 100%;
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
  border-bottom: 2px solid black; 
  background-color: transparent; 
  color: black;
  outline: none;
  font-size: 16px;
  @media(max-width: 1024px) {
    width: 100%;
  }
  @media(max-width: 455px) {
    width: 100%;
  }
`;

const InputFieldWithButton = styled.input`
  width: 85%;
  padding: 10px;
  border-bottom: 2px solid black;
  background-color: transparent; 
  color: black;
  outline: none;
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  @media(max-width: 1024px) {
    width: 100%;
  }
  @media(max-width: 455px) {
    width: 100%;
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
  width: 85%;
  padding: 12px;
  background-color: #415A77;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #223852;
  }
  @media(max-width: 1024px) {
    width: 100%;
  }
  @media(max-width: 455px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.p`
  color: #D50000; 
  text-align: center;
  font-weight: bold;
`;

export const TwoFAContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  p {
    font-size: 14px;
    color: #333;
  }

  .qr-code-container {
    margin-top: 20px;
    text-align: center;
  }

  .qr-code-container img {
    max-width: 200px;
    margin-bottom: 20px;
  }
`;

export const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #999;
  }
`;

interface UserInfo {
  nome: string;
  email: string;
  senha: string;
  is2FAEnabled: boolean;
  backupCode: string;
}

const Settings: React.FC = () => {


  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string>(''); 
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleReload = () => {
    window.location.reload();
  }

  useEffect(() => {
    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/info`, {
                method: "GET",
                credentials: "include"
              });
            const data = await response.json();
            if(data.is2FAEnabled === true) {
              setIs2FAEnabled(true);
            }
            setUserInfo(data);
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update`, {
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

  const enable2FA = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/enable-2fa`, {
      method: 'POST',
      credentials: 'include',
      });
      const data = await response.json();
      setQrCodeDataUrl(data.qrCode);
    } catch (error) {
      console.error('Erro ao ativar o 2FA:', error);
    }
  };
  
  const verify2FA = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify-2fa`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      });
      const data = await response.json();
      if (data.message === '2FA verificado com sucesso!') {
        setIs2FAEnabled(true);
      } else {
        alert('Código inválido, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar 2FA:', error);
    }
  };


  return (
    <>
    <Nav />
    <PageContainer>
      <div className="flex flex-col w-[85%] text-left mt-16">
  <h1 className="text-3xl sm:text-5xl m-4">⚙️ Configurações</h1>
  <div className="h-[2px] bg-gray-300 w-[100%] ml-4" />
</div>
     
      <FormContainer>
        <div className='flex flex-col w-full lg:w-[50%]'>
        <div className='flex flex-row items-center'>
        <img src='https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png' style={{width: '20%', height: '20%'}}/>
        <h1 className="text-3xl sm:text-5xl m-4 text-black">🔑 Credenciais</h1>
        </div>
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
                <div className='row flex flex-row justify-center items-center'>
                <button onClick={togglePasswordVisibility} type="button" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '18px', cursor: 'pointer'}}>
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
                <InfoIcon>❓</InfoIcon>
                <Tooltip>Sua senha está criptografada por questões de segurança.</Tooltip>
                </div>
                <SubmitButton onClick={handleSubmit}>Editar</SubmitButton>
          </>
          
        ) : (
          <p>Carregando...</p>
        )}
        </div>
        <div className='flex flex-col w-full xl:w-[50%] mt-4 gap-4'>
             <h1 className="text-3xl sm:text-5xl m-4 text-black">🔒 Segurança</h1>
        
          {!is2FAEnabled ? (
              <div className="text-black" style={{ marginTop: '30px'}}>
                <div className='bg-gray-300 px-2 py-4 rounded-sm text-black text-xl'>Status 2FA: ❌Desativado</div>
                <h2>Ativar 2FA</h2>
                <p>Para aumentar a segurança da sua conta, ative a autenticação em dois fatores.</p>
                <SubmitButton onClick={enable2FA}>Ativar 2FA</SubmitButton>
                    
                {qrCodeDataUrl && (
                  <div className="flex items-center justify-center flex-col m-4">
                    <img src={qrCodeDataUrl} alt="QR Code para Google Authenticator" />
                    <p>Escaneie o QR Code com o seu aplicativo de autenticação.</p>
                    <InputField
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Digite o código"
                    />
                    <SubmitButton onClick={verify2FA}>Verificar Código</SubmitButton>
                  </div>
                )}
                   </div>
            ) : (
              <div className='flex flex-col justify-center items-center'>
              <div className='bg-gray-300 px-2 py-4 rounded-sm text-black text-xl w-full m-4'>Status 2FA: ✔️Ativo</div>
              <div className='flex flex-col sm:flex-row items-center justify-start w-full align-left'>
                <img src='https://icons.veryicon.com/png/o/miscellaneous/google_material_offical/backup-20.png' style={{ width: '50px', height: '50px' }} />
              <p className='text-xl text-black ml-2'>Código de Backup</p>
              <input type='disabled' value={userInfo?.backupCode} className='bg-gray-300 px-1 py-2 ml-3 text-black text-center'/>
              <img src='https://www.iconpacks.net/icons/2/free-refresh-icon-3104-thumb.png' style={{ width: '25px', height: '25px', margin: '5px' }} onClick={handleReload}/>
              </div>
              <div className='flex flex-row w-full items-center justify-start mt-4'>
              <img src='https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png' style={{ width: '50px', height: '50px' }} />
              <p className='text-lg text-black ml-2'>O código de backup é de uso exclusivo para caso você perca acesso ao seu aplicativo autenticador.
                Guarde-o em um lugar de fácil acesso. Uma vez utilizado, será automaticamente deletado.
              </p>
              </div>
              </div>
         
            )}
       
             </div>
            
      </FormContainer>
    </PageContainer>
    </>
  );
};

export default Settings;
