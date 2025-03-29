import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.25rem;
  transition: .4s;
  margin: 0;
 
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  width: 130px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <DropdownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownButton>Minha Conta</DropdownButton>
      <DropdownList isOpen={isOpen}>
        <DropdownItem>Perfil</DropdownItem>
        <DropdownItem>Configurações</DropdownItem>
        <DropdownItem onClick={ logout }>Sair</DropdownItem>
      </DropdownList>
    </DropdownContainer>
  );
};

export default DropdownMenu;
