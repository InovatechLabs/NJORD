import React from 'react';
import styled, { keyframes } from 'styled-components';

const expandBar = keyframes`
  to {
    width: 100%;
  }
`;

const dropText = keyframes`
  to {
    opacity: 1;
    transform: translateY(20px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 100%;
  overflow: hidden;

  @media(max-width: 1100px) {
    width: 300px;
  }

  @media(max-width: 950px) {
    width: 90vw;
    min-height: 30vh;
    margin-top: 5%;
  }
`;

const Bar = styled.div`
  height: 8px;
  background-color: #fff;
  width: 0;
  animation: ${expandBar} 0.6s forwards;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${dropText} 0.5s forwards;
  animation-delay: 0.7s;
  font-size: 2rem;
  color: white;
  

  @media(max-width: 1100px) {
    font-size: 1.5rem;
  }
`;

type Props = {
  children: React.ReactNode;
};

const TextDrop: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Bar />
      <Text>{children}</Text>
    </Container>
  );
};

export default TextDrop;
