import React from "react";
import styled from "styled-components";


    // Container principal da seção
    const Container = styled.section`
        min-height: 80vh;
        background-color: #0D1B2A;
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        padding: 0 20px;
        @media (max-width: 1240px) {
            flex-direction: column;
        }
    `;

    const TextContainer = styled.div`
        color: white;
        max-width: 45%;
        margin-left: 100px;
        
        @media (max-width: 1335px) {
            margin-left: 5px;
        }
        @media (max-width: 1240px) {
           max-width: 90%;
           text-align: center;
           margin-top: 40px;
        }
    `;

    const Title = styled.h1`
        font-size: 36px;
        font-weight: 700;
        margin: 0;
    `;

    const CardTitle = styled.h1`
        color: #001E2B;  
        font-size: 20px;
        margin: 5px;
    `;

    const CardSubTitle = styled.p`
        font-size: 17px;
        color:#5e5e5e;
        font-weight: 60;
    `;

    const GreenTitle = styled.h1`
        color: #13FF1B;
        font-size: 36px;
        font-weight: 700;
        margin: 0;
    `;

    const Description = styled.p`
        font-size: 22px;
        font-weight: 300;
        line-height: 1.6;
        max-width: 80%;
        @media (max-width: 1240px) {
            max-width: 100%;
        }
    `;

    const CardsContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: 20px;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;

        @media (max-width: 1240px) {
            width: 90%; 
        }

        @media (max-width: 750px) {
            grid-template-columns: 1fr; 
            padding: 10px;
        }
    `;

    // Card
    const Card = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        padding: 10px;
        padding-top: 20px;
        border-radius: 30px;
        font-weight: 600;
        width: 300px;
        height: 280px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        cursor: pointer;
        
        &:hover {
            transform: scale(1.05); 
        }

        @media (max-width: 1240px) {
            width: 80%; 
            height: auto; 
        }

        @media (max-width: 750px) {
            width: 100%; 
            height: auto;
        }
    `;


function SecondSection() {

    return (
        <Container>
            <TextContainer>
                <GreenTitle>Reúna funcionalidades meteorológicas com Njord</GreenTitle>
                <Description>
                    O Njord oferece uma plataforma completa para monitoramento e análise de dados meteorológicos, essencial 
                    para a compreensão das condições climáticas em regiões críticas. A meteorologia desempenha um papel fundamental 
                    na prevenção de desastres, como naufrágios em áreas com forte presença de ventos extremos, como o Lago de Furnas. 
                    Além disso, a análise precisa do clima pode prevenir problemas relacionados ao solo, como deslizamentos, e auxiliar 
                    na gestão de recursos naturais.
                </Description>
            </TextContainer>

            <CardsContainer>
                <Card>
                    <img src="https://i.imgur.com/QbigxR6.png" style={{ width: '90px', height: '90px' }} alt=""/>
                    <CardTitle>Visualize parâmetros em gráficos</CardTitle>
                    <CardSubTitle>Explore os dados meteorológicos coletados pela estação em gráficos interativos.</CardSubTitle>
                </Card>
                <Card>
                    <img src="https://i.imgur.com/OQ6WRig.png" style={{ width: '80px', height: '80px' }} alt=""/>
                    <CardTitle>Obtenha o histórico de dados coletados</CardTitle>
                    <CardSubTitle>Acesse o histórico completo dos dados coletados por cada estação meteorológica em uma tabela organizada.</CardSubTitle>
                </Card>
                <Card>
                    <img src="https://i.imgur.com/85Lsiep.png" style={{ width: '80px', height: '80px' }} alt=""/>
                    <CardTitle>Compare valores de estações distintas</CardTitle>
                    <CardSubTitle>Compare os dados de diferentes estações meteorológicas em gráficos, visualizando o mesmo parâmetro para facilitar a 
                    análise das variações entre as estações.</CardSubTitle>
                </Card>
                <Card>
                    <img src="https://i.imgur.com/482C89z.png" style={{ width: '100px', height: '100px' }} alt=""/>
                    <CardTitle>Download de dados</CardTitle>
                    <CardSubTitle>Baixe os dados coletados pelas estações meteorológicas em formato CSV para análise offline, permitindo 
                        fácil exportação e manipulação das informações.</CardSubTitle>
                </Card>
            </CardsContainer>
        </Container>
    );
}

export default SecondSection;
