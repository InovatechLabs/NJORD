import React, { FC, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, RecoverPassword } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import styled, { keyframes } from "styled-components";

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
`;

const InputField = styled(Field)`
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

const BtnRegister = styled(Button)<{ children?: React.ReactNode }>`
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

const P = styled.p`
  color: #fff;
  font-weight: 600;
  cursor: pointer;
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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  color: white;
  position: relative;
  animation: ${slideIn} 0.45s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
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



const Auth: FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthenticated } = useAuth();
  const [isLogin, setisLogin] = useState(true);
  const [modal, setModal] = useState(false);

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
      if (submit.message === 'Login bem-sucedido') {
        if (submit.token) {
          setAuthenticated(true); 
          navigate('/home'); 
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);    
  };

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

  const buttonText = isLogin ? "Entrar" : "Cadastrar";

  // Formik configurado para tratar login e cadastro dinamicamente
  return (
    <Container>
<Card>
  {errorMessage && <FloatingError>{errorMessage}</FloatingError>}
  {success && <FloatingSuccess><img src="https://img.icons8.com/m_outlined/512/FFFFFF/checked.png" style={{ width: '40px', height: '40px', color: 'white', marginLeft: '0'}}/>{success}</FloatingSuccess>}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img
      src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"
      style={{ width: '100px', height: '100px' }}
      alt=""
    />
    {isLogin ? <CardTitle>Login</CardTitle> : <CardTitle>Cadastro</CardTitle>}
  </div>

        <Formik
          initialValues={isLogin ? { email: "", senha: "" } : { nome: "", email: "", senha: "" }} // Adiciona nome se for cadastro
          validationSchema={isLogin ? validationSchema : RegisterValidationSchema} // Validação diferente para login e cadastro
          // @ts-ignore
          onSubmit={isLogin ? handleSubmit : handleRegisterSubmit
          }
        >
          {({ handleSubmit }: FormikProps<FormValues | RegisterValues>) => (
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
              
              {isLogin ? (
                <p
                  style={{
                    textAlign: 'center',
                    color: '#fff',
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
                    color: '#fff',
                    margin: '0',
                    fontSize: '1.4rem',
                    fontWeight: '200',
                    cursor: 'pointer',
                  }}
                  onClick={handleLoginClick}
                >
                  Já possui uma conta? Faça login!
                </p>
              )}
              
              <BtnRegister variant="primary" type="submit">
                {buttonText}
              </BtnRegister>

            
                 {!isLogin ? (
              <p></p>
              ) : (
                <p style={{ textAlign: 'center', alignSelf: 'center', alignItems: 'center', color: '#fff', margin: '0', fontSize: '1.4rem', fontWeight: '600'}}>Ainda não possui uma conta? <P onClick={handleRegisterClick}>Cadastre-se!</P></p>
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

      </Card>
    </Container>
  );
};

export default Auth;
