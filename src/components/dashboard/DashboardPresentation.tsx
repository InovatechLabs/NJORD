import React from "react";
import styled from "styled-components";
import chart from '../../images/chartgif.gif';

const GreenTitle = styled.h1`
color: #13FF1B;
font-size: 36px;
font-weight: 700;
margin: 0;

@media (max-width: 768px) {
    font-size: 28px;
}
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
`
const DivSld = styled.div`
width: 100%;
max-height: 70vh;
background: #1c142f;
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: row;
padding: 2rem;

@media (max-width: 768px) {
   flex-direction: column;
   justify-content: center;
   text-align: center;
   padding: 1rem;
}
`;
const PSld = styled.p`
font-size: 22px;
font-weight: 300;
line-height: 1.6;
max-width: 90%;
margin-top: 1rem;

@media (max-width: 768px) {
    font-size: 18px;
    max-width: 100%;
}
`;
const ImageContainer = styled.div`
width: 100%;
max-width: 1000px;
display: flex;
justify-content: center;
align-items: center;

img {
    width: 100%;
    height: auto;
    max-width: 500px;

    @media (max-width: 768px) {
        max-width: 300px;
    }
}
`;


export default function DashBoardPresentation() {
   
    return (
        <>
        <DivSld>
            <TextContainer>
            <GreenTitle>Visualização Meteorológica Inteligente:</GreenTitle>
            <PSld>
            Nossa solução oferece uma visualização eficiente e interativa 
            dos dados meteorológicos por meio de gráficos dinâmicos e de alta qualidade.
            </PSld>
            </TextContainer>
        <ImageContainer>
        <img src={chart} alt="graph"/>
        </ImageContainer>
        </DivSld>
        </>
    )
}