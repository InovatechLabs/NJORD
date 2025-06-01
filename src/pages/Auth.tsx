import React, { FC, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, RecoverPassword } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import TextDrop from "../components/auth/TextDrop";
import Footer from '../components/home/footer/Footer';
import TwoFactorCard from "../components/auth/TwoFactorCard";

interface FormValues {
  email: string;
  senha: string;
}

interface RegisterValues {
  nome: string;
  email: string;
  senha: string;
}

interface RecoverValue {
  email: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  padding: 20px;
  background: linear-gradient(to right, black 20%, transparent 70%), url(https://www.citigroup.com/rcs/v1/siteIds/citigpa/asset/645dfa9c6fb7271e5e03d3b7.jpg);
  min-height: 100vh;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  @media(max-width: 950px) {
    flex-direction: column;
  }

`;

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  min-height: 700px;
  background-color: #fff;
  border-radius: 5px;
  padding: 40px;
  padding-top: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.7s ease-out;
`;

const CardTitle = styled.h1`
  font-family: 'Segoe UI', sans-serif;
  font-size: 2.1rem;
  font-weight: 700;
  color: #111;
  text-align: center;
`;

const InputField = styled(Field)`
  width: 100%;
  height: 50px;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 2px solid #000;
  box-sizing: border-box;
  font-size: 1.8rem;
  margin-top: 10px;
  text-align: start;
  padding: 10px;
  font-family: 'Segoe UI', sans-serif;
  color: #000;
  position: relative;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    font-size: 18px;
    color: #999;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  color: #111;
  font-size: 1.3rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const BtnRegister = styled(Button)`
  width: 100%;
  background-color: #111;
  height: 60px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const FloatingError = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1.2rem;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  &::after {
    content: "";
    display: block;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    animation: shrink 4s linear forwards;
    border-radius: 0 0 8px 8px;
  }

  img {
    width: 50px;
    height: 50px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: 2px solid #111;
  border-radius: 12px;
  color: #111;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px;
  align-self: center;

  &:hover {
    background-color: #111;
    color: #fff;
  }
`;

const FloatingSuccess = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #05aa57;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1.2rem;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::after {
    content: "";
    display: block;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    animation: shrink 4s linear forwards;
    border-radius: 0 0 8px 8px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ModalContent = styled.div`
  background-color: #273D67;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  color: #000;
  position: relative;
  animation: ${slideIn} 0.45s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: -10px;
  right: 5px;
  background-color: transparent;
  color: #000;
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
`;

const BtnSend = styled.button`
  background-color: green;
  padding: 10px 15px;
  height: 50px;
  width: 70%;
  color: #fff;
  margin-top: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const PasswordContainer = styled.div`
  background: white;
  width: 100%;
  height: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const PasswordBar = styled.div`
  background: #535bf2;
  width: 100px;
  height: 100%;
  border-radius: 10px;
`;

const Auth: FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthenticated } = useAuth();
  const [isLogin, setisLogin] = useState(true);
  const [modal, setModal] = useState(false);
  const [tempToken, setTempToken] = useState<string>('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [token2FA, setToken2FA] = useState<string | null>(null);
  const [backupCode, setBackupCode] = useState<string | null>(null);

  const handleRegisterClick = () => {
    setisLogin(false);
  };

  const handleLoginClick = () => {
    setisLogin(true);
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  }

  // Schemas de validações do input do usuário

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Por favor, insira seu e-mail"),
    senha: Yup.string().required("Por favor, insira sua senha"),
  });

  const RegisterValidationSchema = Yup.object().shape({
    nome: Yup.string().required("Por favor, insira seu nome"),
    email: Yup.string().required("Por favor, insira seu e-mail"),
    senha: Yup.string().required("Por favor, insira sua senha"),
  });

  // A funçao handleSubmit envia os dados de login para o backend

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const submit = await loginUser(values); // Função para enviar os dados de login
      console.log(submit.message);
      setSuccess(submit.message);
      
        if (submit.requires2FA && submit.tempToken) {
          setTempToken(submit.tempToken);
          setRequires2FA(true);
          return;
        } else if (submit.message === 'Login bem-sucedido') {
          setAuthenticated(true);
          navigate('/home');
        } else if (submit.message === 'Código 2FA inválido.') {
          setErrorMessage('Código 2FA inválido.')
        } else {
          setErrorMessage("E-mail ou senha incorretos. Tente novamente.")
        }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setErrorMessage(''); 
      }, 4000);
      setTimeout(() => {
        setSuccess(''); 
      }, 4000);
    }
}

  useEffect(() => {
    if (tempToken) {
      console.log("Temp Token atualizado:", tempToken);
    }
  }, [tempToken]);

  // A funçao handleRegisterSubmit é para enviar os dados de cadastro

  const handleRegisterSubmit = async (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    try {
      const submit = await registerUser(values);
      console.log(submit.message);
      setSuccess(submit.message);
      if (submit.message === 'Usuário criado com sucesso') {
        setisLogin(true);
      }
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      setErrorMessage("E-mail já cadastrado.")
    } finally {
      setSubmitting(false);
    } setTimeout(() => {
      setErrorMessage("");
    }, 4000);
   
  };

  const handleRecoverEmail = async (
    values: RecoverValue,
    { setSubmitting }: FormikHelpers<RecoverValue>
  ) => {
    try {
      const submit = await RecoverPassword(values);
      console.log(submit.message);
      setSuccess(submit.message);
    } catch (error) {
      console.error('Erro ao enviar e-mail para recuperaão:', error);
    } finally {
      setSubmitting(false);
    } setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

      const handleBackupCodeSubmit = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify-backup-code`, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            backupCode: backupCode,
          })
          });
          const result = await response.json();
          if(result.message === 'Login bem-sucedido') {
          setAuthenticated(true);
          sessionStorage.setItem('fromBackupCode', 'true')
          navigate('/home');
          } else {
            setErrorMessage('Código backup inválido.')
          }
        } catch (error) {
          console.error("Erro ao enviar token para backend:", error)
        } setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      }

  const handleVerify2FACode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/verify-login-code`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tempToken: tempToken,
          token2FA: token2FA
        })
      });
      const result = await response.json()
      if(result.message === 'Login bem-sucedido') {
        setAuthenticated(true);
        navigate('/home');
      } else {
        setErrorMessage('Código 2FA inválido');
      }
    } catch (error) {
      console.error("Erro ao enviar token para backend:", error)
    } setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  }

  const passwordStrength = (senha: string) => {
    
    let value: number = 0;
    let color: string = '';
    let label: string = '';
    let passwordLengthMatch: boolean = false;

    let upperCaseRegex = /[A-Z]/.test(senha);
    let numberRegex = /[0-9]/.test(senha);
    let lowerCaseRegex = /[a-z]/.test(senha);
    let specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (upperCaseRegex) value += 20;
    if (lowerCaseRegex) value += 20;
    if (numberRegex) value += 20;
    if (specialCharacterRegex) value += 20;
    if (senha.length >= 8) value += 20;

    if(senha.length >= 8) {
      passwordLengthMatch = true;
    }

    switch(value) {
      case 20:
        color = 'red';
        label = '🔴Muito fraca';
        break;
      case 40:
        color = 'orange';
        label = '🟠Fraca';
        break;
      case 60: 
        color = 'yellow';
        label = '🟡Média';
        break;
      case 80:
        color = 'yellowgreen';
        label = '🟢Boa';
        break;
      case 100:
        color = 'green';
        label = '🟢Excelente';
        break;
      default:
        color = 'gray';
        label = 'Muito fraca'
      break;
    }

    return { value, color, label, passwordLengthMatch };

  }

  const buttonText = isLogin ? "Entrar" : "Cadastrar";

  // Formik configurado para tratar login e cadastro dinamicamente
  return (   
    <>
    <Container>
      <Card>
      {requires2FA && (
      <div>
        <TwoFactorCard onCodeChange={setToken2FA} 
        onBackupCodeChange={setBackupCode}
        onBackupCodeSubmit={handleBackupCodeSubmit}
        onSubmit={handleVerify2FACode}
        showSubmitButton
        />
      </div>
    )}
         {!requires2FA && (
            <>
        {errorMessage && <FloatingError><img src="https://www.balipost.com/wp-content/uploads/2017/04/close-icon-white.png" alt=""/>{errorMessage}</FloatingError>}
        {success && <FloatingSuccess><img src="https://img.icons8.com/m_outlined/512/FFFFFF/checked.png" style={{ width: '40px', height: '40px', color: 'white', marginLeft: '0' }} alt="success"/>{success}</FloatingSuccess>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"
            style={{ width: '80px', height: '80px' }}
            alt=""
          />
          {isLogin ? <CardTitle>Login</CardTitle> : <CardTitle>Cadastro</CardTitle>}
        </div>

        <HomeButton onClick={() => navigate('/')}>
        Página Inicial
       </HomeButton>

        <Formik
          initialValues={isLogin ? { email: "", senha: "" } : { nome: "", email: "", senha: "" }} // Adiciona nome se for cadastro
          validationSchema={isLogin ? validationSchema : RegisterValidationSchema} // Validação diferente para login e cadastro
          // @ts-ignore
          onSubmit={isLogin ? handleSubmit : handleRegisterSubmit
          }
        >
          {({ handleSubmit, values }: FormikProps<FormValues | RegisterValues>) => (
            <StyledForm onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="nome">
                  <Label htmlFor="nome">Nome</Label>
                  <InputField type="text" name="nome" placeholder="Preencha seu nome completo" />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="email">
                <Label htmlFor="email">E-mail</Label>
                <InputField type="email" name="email" placeholder="Preencha seu e-mail" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="senha">
                <Label htmlFor="senha">Senha</Label>
                <InputField type="password" name="senha" placeholder="Preencha sua senha" />
              </Form.Group>
              
              {!isLogin && values.senha && (
  <PasswordContainer>
    <PasswordBar
      style={{
        width: `${passwordStrength(values.senha).value}%`,
        backgroundColor: `${passwordStrength(values.senha).color}`
      }}
    />
    <div style={{ color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      Força da senha:
      <p style={{ marginLeft: '5px' }}>{passwordStrength(values.senha).label}</p>
    </div>
  </PasswordContainer>
)}

              {isLogin ? (
                <p
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    margin: '0',
                    fontSize: '1.4rem',
                    fontWeight: '200',
                    cursor: 'pointer',
                  }}
                  onClick={toggleModal}
                >
                  Esqueci minha senha
                </p>
              ) : (
                <p
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    margin: '10px',
                    fontSize: '1.4rem',
                    fontWeight: '200',
                    cursor: 'pointer',
                  }}
                  onClick={handleLoginClick}
                >
                  Já possui uma conta? Faça login!
                </p>
              )}
              <BtnRegister variant="primary" type="submit"  disabled={
    !values.senha || passwordStrength(values.senha).value < 60 || !passwordStrength(values.senha).passwordLengthMatch
  }>{buttonText}</BtnRegister>
              {isLogin && (
                 <p style={{ textAlign: 'center', alignSelf: 'center', alignItems: 'center', color: '#000', margin: '0', fontSize: '1.4rem', fontWeight: '600' }}>Ainda não possui uma conta? <br /><span style={{ color: '#3bb1ff', cursor: 'pointer' }} onClick={handleRegisterClick}>Cadastre-se!</span></p>
              )}
            </StyledForm>
          )}
        </Formik>

        {/* Modal para a funcionalidade de recuperar senha, abre um menu para o usuario inserir seu e-mail e prosseguir com a recuperação */}
        {modal && (
          <ModalOverlay onClick={toggleModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseModalButton onClick={toggleModal}>×</CloseModalButton>
              <h1>Por favor, insira o e-mail da sua conta:</h1>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={handleRecoverEmail}
              >
                {({ handleSubmit }: FormikProps<RecoverValue>) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <InputField name="email" type="email" placeholder="Digite seu e-mail" />
                      <BtnSend type="submit">
                        Enviar
                      </BtnSend>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </ModalContent>
          </ModalOverlay>
        )}
      </>
    )}
      </Card>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TextDrop>Uma iniciativa com impacto tecnológico, social e ambiental.<br /><br />
      Desenvolvida para ampliar a segurança da navegação e facilitar o acesso a dados meteorológicos, nossa ferramenta permite acompanhar em tempo real os registros de vento extremo em três estações da região.</TextDrop>
      </div>
    </Container>
    <Footer />
    </>
  );
};

export default Auth;
