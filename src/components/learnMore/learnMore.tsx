import React from 'react';
import styled from 'styled-components';
import {
  IconBrandReact, IconCode, IconBrandGithub, IconDatabase, IconServer,
  IconDeviceLaptop, IconTool, IconBrandFigma, IconBrandBootstrap,
  IconBrandNodejs, IconBrandJavascript, IconBrandCss3, IconWorld, IconListDetails,
  IconSettings,
  IconUser,
  IconTargetArrow,
  IconCloudBolt
} from '@tabler/icons-react';

const Container = styled.div`
  padding: 4rem 2rem;
  width: 100%;
  margin: 0 auto;
  color: #e0f7ff;
  background: linear-gradient(to bottom, #0a0f1c, #1b2735);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #00c2ff;
  justify-content: center;

`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;


const Subtitle = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #a0bfcf;
`;

const Section = styled.section`
  background-color: #1e2a38;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 194, 255, 0.2);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #d0e7f0;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
`;

const TechItem = styled.li`
  background-color: #00c2ff22;
  color: #00c2ff;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
`;

const AuthorList = styled.ul`
  padding-left: 1.25rem;
`;

const AuthorItem = styled.li`
  color: #cfeaff;
  margin-bottom: 0.5rem;
`;

interface Tech {
  icon: React.ElementType;
  name: string;
}

const technologies: Tech[] = [
  { icon: IconBrandReact, name: "React" },
  { icon: IconCode, name: "TypeScript" },
  { icon: IconTool, name: "Styled-Components" },
  { icon: IconDeviceLaptop, name: "Axios" },
  { icon: IconDatabase, name: "MongoDB" },
  { icon: IconServer, name: "Express" },
  { icon: IconDatabase, name: "MySQL" },
  { icon: IconWorld, name: "Trello" },
  { icon: IconBrandFigma, name: "Figma" },
  { icon: IconBrandBootstrap, name: "Bootstrap" },
  { icon: IconBrandNodejs, name: "Node.js" },
  { icon: IconBrandJavascript, name: "JavaScript" },
  { icon: IconBrandCss3, name: "CSS3" },
  { icon: IconBrandGithub, name: "GitHub" },
];

const SaibaMais: React.FC = () => {
  return (
    <Container>
      <Title>
        <TitleWrapper>
          Tudo sobre Njord
          <IconCloudBolt size={48} />
        </TitleWrapper>
      </Title>

      <Subtitle>
        Descrições, tecnologias, integrantes e o propósito do projeto.
      </Subtitle>

      <Section>
        <SectionTitle> <IconListDetails size={24} />
          Descrição do Projeto</SectionTitle>
        <Text>
          Njord é uma plataforma moderna de monitoramento climático desenvolvida para oferecer informações precisas e acessíveis sobre as condições meteorológicas da região. Com foco na segurança dos navegantes e na confiabilidade dos dados, a aplicação une tecnologia e usabilidade para facilitar a tomada de decisões em tempo real.
        </Text>
      </Section>

      <Section>
        <SectionTitle><IconSettings size={24} />
          Tecnologias Utilizadas</SectionTitle>
        <TechList>
          {technologies.map(({ icon: IconComponent, name }, i) => (
            <TechItem key={i}>
              <IconComponent size={20} style={{ marginRight: '0.5rem' }} />
              {name}
            </TechItem>
          ))}
        </TechList>
      </Section>

      <Section>
        <SectionTitle><IconUser size={24} />
          Autores</SectionTitle>
        <AuthorList>
          <AuthorItem>Paulo Bueno — Scrum Master</AuthorItem>
          <AuthorItem>Pedro Oliveira — Product Owner</AuthorItem>
          <AuthorItem>Gabriel Juliani — Dev Team Leader</AuthorItem>
          <AuthorItem>Bruno Alves — Dev Team</AuthorItem>
          <AuthorItem>Marcos Paulo — Dev Team</AuthorItem>
          <AuthorItem>Nicolas Henrique — Dev Team</AuthorItem>
        </AuthorList>
      </Section>

      <Section>
        <SectionTitle><IconTargetArrow size={24} />
          Propósito do Projeto</SectionTitle>
        <Text>
O projeto Njord foi desenvolvido como parte de uma atividade prática da FATEC, utilizando a metodologia de ABP. Seu principal objetivo é proporcionar uma experiência educacional completa, unindo teoria e prática no desenvolvimento de uma plataforma moderna e funcional para monitoramento de dados meteorológicos. Embora tenha fins acadêmicos, o projeto simula uma aplicação real voltada para usuários que necessitam de informações confiáveis sobre o clima.
        </Text>
      </Section>
    </Container>
  );
};

export default SaibaMais;
