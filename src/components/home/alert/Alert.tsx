import axios from 'axios';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tempSvg from '../../../images/Layer_1.png';
import umiditySvg from '../../../images/image 14.png';
import uvSvg from '../../../images/image 15.png';
import windSvg from '../../../images/image 16.png';
import wind_dir from '../../../images/wind_dir.png';
import { useNavigate } from 'react-router-dom';
import { useLeituraStore } from '../../../store/useLeituraStore';
import { useAuth } from '../../../contexts/AuthContext';

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  background-color: #eeeeee; /* Fundo azul base */
  overflow: hidden;
  padding: 20px;
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const Card = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  max-width: 700px;
  margin-bottom: 70px;
`;

const Icon = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
  

`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
    font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  @media (max-width: 595px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  @media (max-width: 595px) {
    font-size: 1rem;
  }
`;

const AlertImage = styled.img`
  max-width: 200px;
  height: auto;
  margin-left: 1rem;
  @media (max-width: 655px) {
    max-width: 140px;
  }
`;

const BlueBackground: React.FC = () => {

    const { dados, loading, erro, fetchLeitura } = useLeituraStore();
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const handleAuthClick = () => {

      if(!isAuthenticated) {
        navigate('/auth');
      }  else {
        navigate('/dashboard');
      }   
    };

  useEffect(() => {
    fetchLeitura(); 

    const interval = setInterval(() => {
      fetchLeitura(); // Requisição a cada 10 min
    }, 10 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [fetchLeitura]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!dados) return <p>Sem dados</p>;

  const transformVelocity = (n: string) => {
    let transform = parseFloat(n);
    let count = transform * 3.6;
    return count.toFixed(2);
  }

  
const alertDescriptions: { [key: string]: string } = {
    "Calmo": `Não há movimento perceptível do ar. A superfície da água permanece lisa como um espelho. Ideal para todas as atividades náuticas. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Brisa muito leve": `Pequenas ondulações podem surgir, mas não afetam a estabilidade das embarcações. Ambiente seguro para navegação tranquila. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Brisa leve": `O vento começa a ser sentido no rosto e levemente sobre a água. Condições totalmente seguras para navegação. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Brisa moderada": `Ondas leves podem se formar. Pequenas embarcações devem manter atenção redobrada. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Brisa forte": `A navegação pode se tornar instável. Exige atenção ao leme em embarcações leves. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Vento agitado": `Controle da embarcação pode ser difícil. Evite navegar com caiaques ou barcos pequenos. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Vento forte": `Rajadas e ondas agressivas representam perigo. Reavalie a saída para o lago. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Ventania moderada": `Navegação altamente arriscada. Só em casos de emergência com embarcações preparadas. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Ventania forte": `Ventos intensos e ondas grandes. Navegação não é recomendada. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
    "Tempestade": `Situação crítica. Risco extremo à integridade da embarcação. Procure abrigo imediatamente. A velocidade do vento está em ${dados ? transformVelocity(dados.wind_rt) + " km/h": ""}`,
  };

  const alertImages: { [key: string]: string } = {
  "Calmo": "https://icons.veryicon.com/png/o/weather/green-icon/sun-rain-3.png",
  "Brisa muito leve": "https://icons.veryicon.com/png/o/weather/green-icon/sun-rain-3.png",
  "Brisa leve": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fuu_wind.svg/481px-Fuu_wind.svg.png",
  "Brisa moderada": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/2048px-OOjs_UI_icon_alert-yellow.svg.png",
  "Brisa forte": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White_alert_icon.svg/1280px-White_alert_icon.svg.png",
  "Vento agitado": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White_alert_icon.svg/1280px-White_alert_icon.svg.png",
  "Vento forte": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White_alert_icon.svg/1280px-White_alert_icon.svg.png", 
  "Ventania moderada": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White_alert_icon.svg/1280px-White_alert_icon.svg.png",
  "Ventania forte": "https://www.svgrepo.com/show/407452/skull-and-crossbones.svg",
  "Tempestade": "https://www.svgrepo.com/show/407452/skull-and-crossbones.svg",
};


  const getBeaufortAlert = (wind: number) => {
    const windKmH = wind * 3.6;

    if (windKmH < 1) return { message: "Calmo", color: "#22c55e", icon: "🟢" };
    if (windKmH < 6) return { message: "Brisa muito leve", color: "#22c55e", icon: "🌿" };
    if (windKmH < 12) return { message: "Brisa leve", color: "#4ade80", icon: "🍃" };
    if (windKmH < 20) return { message: "Brisa moderada", color: "#facc15", icon: "⚠️" };
    if (windKmH < 29) return { message: "Brisa forte", color: "#f59e0b", icon: "🌬️" };
    if (windKmH < 39) return { message: "Vento agitado", color: "#f97316", icon: "🌪️" };
    if (windKmH < 50) return { message: "Vento forte", color: "#ea580c", icon: "🚨" };
    if (windKmH < 61) return { message: "Ventania moderada", color: "#f15e5e", icon: "🟥" };
    if (windKmH < 74) return { message: "Ventania forte", color: "#dc2626", icon: "🛑" };
    return { message: "Tempestade", color: "#b91c1c", icon: "⛔" };
  };

  const alert =
  dados && dados.wind_rt !== undefined
    ? getBeaufortAlert(parseFloat(dados.wind_rt))
    : null;

const description = alert ? alertDescriptions[alert.message] : "Carregando...";
const cardImg = alert ? alertImages[alert.message] : "";

const getValor = (campo: string, sufixo: string = '') =>
dados && dados[campo] !== undefined ? `${dados[campo]}${sufixo}` : '-';

const horarioOriginal = dados.reading_time.replace("Z", "");
const data = new Date(horarioOriginal);
  
  return (
    <>
    <Section>
      {alert ? (
        <>
   <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="w-full h-[100px]"
      preserveAspectRatio="none"
    >
      <path
        fill="#0D1B2A"
        fillOpacity="1"
        d="M0,288L60,261.3C120,235,240,181,360,144C480,107,600,85,720,112C840,139,960,213,1080,202.7C1200,192,1320,96,1380,48L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>
        <div className='flex flex-col w-full lg:w-1/2 mb-2'>
          <div className='w-full lg:w-full'>
          <h1 className='text-4xl text-[#00405c]'>Alerta para Navegantes</h1>
          <p className='text-xl text-black mt-4'>A segurança na navegação depende de informações confiáveis. 
          Por isso, apresentamos aqui um alerta baseado nos dados mais recentes sobre vento e clima na região. 
          Verifique os detalhes e evite navegar em condições adversas.</p>
          </div>
          <div className='flex flex-col mt-4 w-full lg:w-full justify-center items-center lg:items-start '>
            <h1 className='text-xl text-black'>Deseja acessar estes dados de forma mais completa, incluindo a comparação de dados entre estações? </h1>
            <div className='flex gap-2 '>
              <button className='bg-[#415A77] py-4 px-6 text-white text-xl cursor-pointer hover:bg-[#5277a1] transition-all duration-500 mt-5' onClick={handleAuthClick}>
              {isAuthenticated ? (
                <>
                  Dashboard
                </>
              ) : (
                <>
                  Cadastre-se!
                </>
              )}
              </button>
            </div>
          </div>
        </div>
        <div className='max-w-[100%] lg:max-w-[50%]'>
        <Card bgColor={alert.color}>
          <div className='flex flex-col items-center sx:flex-row'>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start'}}>
            <Icon>{alert.icon}</Icon>
            <Title>{alert.message}</Title>
            </div>
             <Description>{description}</Description>
             </div>
            <AlertImage src={cardImg} alt='alerta' />
          </div>
           <div className="w-full bg-[transparent]  py-2 mt-4 flex justify-start">

        <div className="flex flex-row flex-wrap justify-center gap-8 bg-[#ebebeb3e] px-8 py-4 rounded-lg">
        
         {/* Temperatura */}
         <div className="flex items-center gap-2 text-white">
           <img src={tempSvg} alt="Temperatura" className="w-6 h-6" />
           <div className="flex flex-col">
             <span className="text-sm text-gray-300">Temperatura</span>
             <span className="font-semibold">{getValor("temp")}°C</span>
           </div>
         </div>
 
         {/* Vento */}
         <div className="flex items-center gap-2 text-white">
           <img src={windSvg} alt="Vento" className="w-6 h-6" />
           <div className="flex flex-col">
             <span className="text-sm text-gray-300">Vento</span>
             <span className="font-semibold">{getValor("wind_rt")} m/s</span>
           </div>
         </div    >
 
         {/* Direção do vento */}
         <div className="flex items-center gap-2 text-white">
           <img src={wind_dir} alt="Direção" className="w-6 h-6" />
           <div className="flex flex-col">
             <span className="text-sm text-gray-300">Direção do vento</span>
             <span className="font-semibold">{getValor("wind_dir_rt")}°</span>
           </div>
         </div    >
 
         {/* Pico de intensidade */}
         <div className="flex items-center gap-2 text-white">
           <img src={wind_dir} alt="Pico" className="w-6 h-6" />
           <div className="flex flex-col">
             <span className="text-sm text-gray-300">Pico de intensidade</span>
             <span className="font-semibold">{getValor("wind_peak")} m/s</span>
           </div>
         </div>
       </div>
       
     </div>
             <div className="text-white text-xl mt-4">
                  {dados?.reading_time && (
  <span>
    Última leitura:{" "}
    {/* Data */}
    {new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(data)}{" "}
    às{" "}
    {/* Hora */}
    {new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(data)}
  </span>
)}
          </div>
        </Card>
        </div>
        </>
      ) : (
        <p>Carregando alerta de navegação...</p>
      )}
  
    </Section>
    </>
  );
};

export default BlueBackground;
