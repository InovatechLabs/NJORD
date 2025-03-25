import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    color: black;
    font-size: 24px;
    text-decoration: none;
    align-items: center;
    justify-content: center;
`;

const Ul = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Li = styled.li`
    margin-right: 70px;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;  /* Alinha verticalmente o texto e a imagem */
`;

function Nav() {
    return (
        <>
            <NavBar>
                <img src='https://i.imgur.com/wpTjqAa.png' style={{ width: '180px', height: '170px', position: 'absolute', left: '0', marginLeft: '30px' }} alt='logo'/>
              
                <Ul>
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
                            src='https://i.imgur.com/vQGgpwj.png' 
                            style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} 
                            alt='logo'
                        />
                        Sobre
                    </Li>
                </Ul>
            </NavBar>
        </>
    );
}

export default Nav;
