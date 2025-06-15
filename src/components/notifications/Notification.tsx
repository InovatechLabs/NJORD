import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { useLeituraStore } from '../../store/useLeituraStore';
import styled from 'styled-components';

interface NotificationProps {
  message: string;
}

const Card = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 1.5rem;
  border-radius: 1rem;
  color: white;
  width: 350px;
  height: 170px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  z-index: 9999;
  overflow-y: auto;
`;

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [show, setShow] = useState(false);
  const { dados, loading, erro, fetchLeitura } = useLeituraStore();

  useEffect(() => {
    const showAlert = Cookies.get('showAlert');
    if (showAlert === 'true') {
      setShow(true);
    }
  }, []);

  
    useEffect(() => {

    if (!dados && !loading && !erro) {
        fetchLeitura();
    }
  
      const interval = setInterval(() => {
        fetchLeitura(); 
      }, 10 * 60 * 1000); 

        return () => clearInterval(interval);
    }, [dados, loading, erro, fetchLeitura]);
  
    if (loading) return <p>Carregando...</p>;
    if (erro) return <p>Erro: {erro}</p>;
    if (!dados) return <p>Sem dados</p>;

  const handleClose = () => {
    setShow(false); 
  };

    if (!show) return null;

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

  const alert =
  dados && dados.wind_rt !== undefined
    ? getBeaufortAlert(parseFloat(dados.wind_rt))
    : null;

  const description = alert ? alertDescriptions[alert.message] : "Carregando...";

  return (
    <Card bgColor={alert!.color}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-white">Alerta de Navegação</span>
        <button onClick={handleClose} className="text-gray-500 hover:text-red-500 transition">
          <X size={18} color='#fff'/>
        </button>
      </div>
      <h2 className='text-md text-white font-bold'>{alert?.message}</h2>
      <p className="text-sm text-white">{description}</p>
    </Card>
  );
};

export default Notification;
