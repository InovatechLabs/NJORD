import React, { forwardRef } from "react";
import styled from "styled-components";
import image from '../../../images/path.png';
import svg from '../../../images/image 12.png';
import svg2 from '../../../images/image 13.png';
import umiditySvg from '../../../images/image 14.png';
import uvSvg from '../../../images/image 15.png';
import windSvg from '../../../images/image 16.png';
import tempSvg from '../../../images/Layer_1.png';
import { motion } from 'framer-motion';

 const Container = styled.section`
        min-height: 70vh;
        position: relative;
        background-color: #415A77;
        display: flex; 
        align-items: center; 
        justify-content: center;
        padding: 0 20px;     
        @media (max-width: 1000px) {
            flex-direction: column;
            min-height: 110vh;
            justify-content: end;  
        }
        @media (max-width: 560px) {
            flex-direction: column;
            min-height: 95vh;
            justify-content: end;  
        }
        @media (max-height: 850px) {
            min-height: 100vh; 
        }
        @media (min-height: 1080px) {
            min-height: 70vh; 
        }
`;

const Image = styled.img`
   position: absolute;
    width: 100%; 
    height: auto;
    z-index: 1; 
`;

const SvgSection = styled.div`
    width: 45%;
    justify-content: center;
    display: flex;
    align-items: center;
    @media(max-width: 1000px) {
        width: 100%;
        justify-content: center;
        position: absolute;
        top: 23%;
        transform: translateY(-23%);
    }
    @media(max-width: 375px) {
        top: 20%;
        transform: translateY(-20%);
    }
    
`;

const TextSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 60%;
    text-align: center;
    @media(max-width: 1000px) {
        width: 100%;
    }
`

const TextTitle = styled.h1`
    color: #fff;
    font-size: 34px;
    font-weight: 600;
    margin: 5px;
    @media(max-width: 560px) {
        font-size: 26px;
    }
`

const TextDescription = styled.p`
    color: #fff;
    font-size: 22px;
    font-weight: 300;
    font-family: 'Segoe UI';
    margin: 5px;
    max-width: 80%;
    @media(max-width: 560px) {
        font-size: 20px;
        max-width: 90%;
    }
    @media(max-width: 380px) {
        font-size: 18px;
        max-width: 100%;
    }
`

const MeasuresDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* 2 colunas */
  grid-gap: 25px;  /* Espaçamento entre os itens */
  width: 100%;  /* Ocupa toda a largura disponível */
  max-width: 700px;  /* Limita o tamanho máximo */
  margin: 50px;  /* Centraliza a grid */
  @media(max-width: 1000px) {
    max-width: 90%;
  }
  @media(max-width: 560px) {
    max-width: 100%;
    grid-gap: 10px;
  }
  @media(max-width: 380px) {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;  
`;

const Icon = styled.img`
  width: 100px;  /* Tamanho do ícone */
  height: 100px;  /* Tamanho do ícone */
  @media(max-width: 560px) {
    width: 70px;
    height: 70px;
  }
`;

const Text = styled.p`
  font-size: 1.4rem; 
  margin: 0; 
  color: #fff;
  font-weight: 600;
  @media(max-width: 450px) {
    font-size: 1rem;
  }
  
`;

const Planeta = styled.img`
  width: 380px;
  height: 380px;
  position: absolute;
  z-index: 1;
  @media(max-width: 555px) {
    width: 270px;
    height: 270px;
  }
`;

const Telescopio = styled(motion.img)`
  width: 100px;
  height: 100px;
  position: absolute;
  @media(max-width: 1500px) {
    display: none;
  }
`;

const OrbitContainer = styled(motion.div)`
  position: absolute;
  width: 390px;  
  height: 635px;
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  @media(max-width: 1500px) {
    display: none;
  }
`;


const ThirdSection = forwardRef<HTMLDivElement>((props, ref) => {
    return (
      <div ref={ref}>
            <Image src={image} alt="Onda decorativa" />
            <Container>
            <SvgSection>

            <Planeta src={svg} alt="Planeta Terra" />
            <OrbitContainer
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>

        <Telescopio src={svg2} alt="Telescópio" />
      </OrbitContainer>
                </SvgSection>
                <TextSection>
                    <TextTitle>+ de 4.300 medições realizadas</TextTitle>
                    <TextDescription>Utilizando nosso produto, você terá acesso a uma ampla gama de dados 
                    e informações valiosas sobre o clima, com precisão e atualizações constantes. Alguns tipos de dados incluem:</TextDescription>

                    <MeasuresDiv>   
      <Item>
        <Icon src={tempSvg} alt="Temperatura" />
        <Text>Temperatura</Text>
      </Item>
      <Item>
        <Icon src={uvSvg} alt="UV" />
        <Text>Radiação Solar</Text>
      </Item>
      <Item>
        <Icon src={umiditySvg} alt="Umidade" />
        <Text>Umidade</Text>
      </Item>   
      <Item>
        <Icon src={windSvg} alt="Vento" />
        <Text>Velocidade média do vento</Text>
      </Item>
    </MeasuresDiv>
                </TextSection>
    
            </Container>

        </div>
    )
});

export default ThirdSection;