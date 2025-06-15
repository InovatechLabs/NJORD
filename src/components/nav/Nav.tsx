import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "../dropdown/DropdownMenu";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../notifications/Notification";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import { Bell } from 'lucide-react';

const NavContainer = styled.nav`
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 25px;
  margin: 0;

  @media (max-width: 1200px) {
    justify-content: end;
  }
`;

const MenuButton = styled.button`
  font-size: 30px;
  color: black;
  cursor: pointer;
  display: none;
  background-color: transparent;
  border: none;
  outline: none;

  @media (max-width: 1100px) {
    display: block;
    order: 1;
    z-index: 999;
  }
`;

const NavList = styled.ul<{ open: boolean }>`
  display: flex;
  list-style: none;
  margin: 0 auto;
  gap: 20px;
  z-index: 100;
  flex-grow: 1;
  justify-content: end;
  
  @media (max-width: 1100px) {
    position: fixed;
    top: 0;
    right: ${({ open }) => (open ? "0" : "-100%")};
    background-color: rgba(255, 255, 255);
    width: 70%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 15px;
  cursor: pointer;
  font-size: 1.3rem;
  gap: 3px;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    height: 3px;
    width: 0;
    background: black;
    position: absolute;
    left: 0;
    bottom: -3px;
    transition: 0.45s;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 1060px) {
    font-size: 1.2rem;
  }

  @media (max-width: 1100px) {
    margin: 40px 0;
    color: black;
  }
`;


type NavProps = {
  onAboutClick?: () => void;
};

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationDropdownContainer = styled.div`
   display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
`

const Logo = styled.img`
  width: 180px;
  height: 170px;
  position: absolute;
  left: 0;
  margin-left: 30px;
  cursor: pointer;
`;

function NavBar({ onAboutClick }: NavProps) {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  }
  const handleDashboardClick = () => {
    navigate('/dashboard');
  }
  const handleLoginClick = () => {
    navigate('/auth');
  }

  const handleCsvClick = () => {
    navigate('/comparison');
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotification = () => {
    setShowNotification(prev => !prev);
  }


  return (
    <NavContainer>
      <MenuButton onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </MenuButton>
      <Logo src="https://i.imgur.com/wpTjqAa.png" alt="logo"  onClick={handleHomeClick}/>
      <NavList open={isSidebarOpen}>
        <NavItem onClick={handleDashboardClick}>
          <img src="https://i.imgur.com/JQsOttz.png" width="30" height="30" alt="Dashboard" />
          Dashboard
        </NavItem>
        <NavItem onClick={handleCsvClick} >
          <img src="https://static.thenounproject.com/png/141961-200.png" width="20" height="20" alt="Comparação"/>
          Comparação de dados
        </NavItem>
        {isAuthenticated ? (
          <DropdownContainer>
            <img src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png" width="30" height="30" alt="Perfil" />
            <DropdownMenu />
          </DropdownContainer>
        ) : (
          <NavItem onClick={handleLoginClick}>
            <img src="https://www.svgrepo.com/show/311063/person.svg" width="20" height="20" alt="Login" />
            Login
          </NavItem>
        )}
        <NotificationDropdownContainer>

          <Bell size={24} />
          <NotificationDropdown />

        </NotificationDropdownContainer>

        <NavItem onClick={onAboutClick}>
          <img src="https://i.imgur.com/vQGgpwj.png" width="20" height="20" alt="Sobre" />
          Sobre
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default NavBar;
