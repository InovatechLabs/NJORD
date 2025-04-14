import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import NavBar from "../../nav/Nav";

export default function FirstSection() {
    const ImageContainer = styled.div`
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        
    `;

    // Estilização do container que ficará sobre a imagem
    const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 80%;      
    padding: 10px;
    color: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 100px;
    transform: translateY(-60%);
    font-weight: 100;
    gap: 10px;
    @media (max-width: 600px) {
        margin-left: 10px;
    }
`;

    const ButtonsDiv = styled.div`
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        margin-bottom: 40px;
        margin-left: 110px;
        gap: 50px;
        @media (max-width: 480px) {
        gap: 25px;
    }
    @media (max-width: 600px) {
        margin-left: 20px;
    }

    `;

    const Button = styled.button`
        padding: 15px 40px;
        background-color: #415A77;
        color: #fff;
        border: none;
        outline: none;
        font-size: 20px;
        cursor: pointer;
        transition: .3s;
        &:hover {
            background-color: #4e739c;
            transform: scale(1.04);      
        }
        @media (max-width: 630px) {
        padding: 5px 20px;
    }
    `;

    const Button2 = styled.button`
padding: 15px 40px;
background-color: #fff;
color: black;
border: none;
outline: none;
font-size: 20px;
cursor: pointer;
transition: .3s;
&:hover {
    background-color: black;
    color: #fff;
    transform: scale(1.04);      
}

@media (max-width: 630px) {
        padding: 10px 20px;
    }
`;

    const TextWrapper = styled.div`
        display: flex;
        align-items: center;
        border-left: 8px solid #415A77; 
        padding-left: 10px;          
        height: 25px;           
    `;

    const Paragraph = styled.p`
        font-family: 'Inter', sans-serif;
        font-weight: 100;
        letter-spacing: 8px;
        text-transform: uppercase;
       
    `;

    const Title = styled.h1`
    font-weight: 100;
    width: 70%;
    white-space: normal; 
    overflow-wrap: break-word;
    word-wrap: break-word; 
    @media (max-width: 1450px) {
        width: 100%;
        font-size: 24px;
    }
    @media (max-width: 480px) {
        width: 100%;
        font-size: 20px;
    }
`;

    const SubTitle = styled.h1`
    font-weight: 100;
    font-size: 20px;
    width: 70%; 
    white-space: normal; 
    overflow-wrap: break-word; 
    word-wrap: break-word; 
    @media (max-width: 955px) {
        width: 100%;
        font-size: 18px;
    }
    @media (max-width: 480px) {
        width: 100%;
        font-size: 16px;
    }
    
`;

    const GlobalFont = createGlobalStyle`
        @import url('https://fonts.googleapis.com/css2?family=Glegoo:wght@400;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
    `;

    return (
        <>
            <GlobalFont />
            <ImageContainer>
                <img
                    src="https://i.imgur.com/z5ECya2.png"
                    alt="Imagem de fundo"
                    style={{ width: "100%", height: "515px" }}
                />
                <Container>
                    <TextWrapper>
                        <Paragraph>Njord</Paragraph>
                    </TextWrapper>
                    <Title>Obtenha dados meteorológicos, acompanhe as tendências, receba alertas e navegue com segurança</Title>

                    <SubTitle>Acompanhe em tempo real as condições meteorológicas do Lago de Furnas com gráficos interativos, análise
                        precisa e alertas inteligentes para garantir a segurança dos navegantes.</SubTitle>
                </Container>
                <ButtonsDiv>
                    <Button>Comece já</Button>
                    <Button2 >Saiba mais</Button2>
                </ButtonsDiv>
            </ImageContainer>
        </>
    );
}
