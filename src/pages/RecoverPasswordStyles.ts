import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0D1B2A;
  min-height: 100vh;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  height: 700px;
  background-color: #273D67;
  border-radius: 5px;
  padding: 40px;
`;

export const CardTitle = styled.h1`
  font-family: 'Lavishly Yours', sans-serif;
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  text-align: center;
  margin-bottom: 40px;
`;

export const InputField = styled.input`
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

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  color: #fff;
  font-size: 2.5rem;
  margin: 0;
  font-weight: 600;
`;

export const BtnRegister = styled(Button)`
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

export const Message = styled.p<{ success?: boolean }>`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
  color: ${({ success }) => (success ? 'lightgreen' : 'salmon')};
`;
