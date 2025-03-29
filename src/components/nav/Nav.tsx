import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './styles/Nav.css';
import { useAuth } from '../../contexts/AuthContext';
import DropdownMenu  from '../dropdown/DropdownMenu';

const Li = styled.li`
    margin-right: 70px;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
    position: relative; 
`;

function Nav() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className='nav'>
            <button onClick={toggleSidebar} className="checkbtn">
          <FontAwesomeIcon icon={faBars} className="fas fa-bars" />
        </button>
                <img src='https://i.imgur.com/wpTjqAa.png' style={{ width: '180px', height: '170px', position: 'absolute', left: '0', marginLeft: '30px' }} alt='logo'/>

                <ul className={isSidebarOpen ? 'open' : ''}>
                    <Li>
                        <img 
                            src='https://i.imgur.com/JQsOttz.png' 
                            style={{ width: '30px', height: '30px', marginRight: '5px', verticalAlign: 'middle' }} 
                            alt='logo'
                        />
                        Dashboard
                    </Li>
                    <Li>
                        <img 
                            src='https://static.thenounproject.com/png/141961-200.png' 
                            style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} 
                            alt='logo'
                        />
                        Comparação de dados
                    </Li>
                    <Li>
                        <img 
                            src='https://i.imgur.com/vQGgpwj.png' 
                            style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} 
                            alt='logo'
                        />
                        Sobre
                    </Li>  
                    {isAuthenticated ? (
                        <div className="dropdown-container">
                            <img src='https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png' style={{ width: '30px', height: '30px', margin: '0'}} alt=''/>
                        <DropdownMenu />
                    </div>
                    ): 
                    ( <Li  onClick={handleLoginClick}>
                        <img 
                            src='https://www.svgrepo.com/show/311063/person.svg' 
                            style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} 
                            alt='logo'
                        />
                        Login
                    </Li>     
                )}                
                </ul>
            </nav>
        </>
    );
}

export default Nav;
