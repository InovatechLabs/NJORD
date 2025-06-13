import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav/Nav";
import FirstSection from '../components/home/firstSection/FirstSection';
import SecondSection from '../components/home/secondSection/SecondSection';
import ThirdSection from "../components/home/thirdSection/ThirdSection";
import Footer from "../components/home/footer/Footer";
import { ModalOverlay, ModalContent, CloseModalButton } from "./Auth";
import { useLocation, useNavigate } from "react-router-dom";
import TimedButton from '../components/home/TimedButton';
import Alert from '../components/home/alert/Alert';

// Imagens
import tempSvg from '../images/Layer_1.png';
import umiditySvg from '../images/image 14.png';
import uvSvg from '../images/image 15.png';
import windSvg from '../images/image 16.png';
import wind_dir from '../images/wind_dir.png';

export default function Home() {
  const [modal, setModal] = useState(false);
  const [ultimoDado, setUltimoDado] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const scrollToThirdSection = () => {
    thirdSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (sessionStorage.getItem('fromBackupCode') === 'true') {
      setModal(true);
      sessionStorage.removeItem('fromBackupCode');
    }
  }, [location]);

  // Busca o último dado da API
  useEffect(() => {
    const fetchUltimoDado = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/csv/last`);
        setUltimoDado(res.data);
      } catch (err) {
        console.error("Erro ao buscar último dado:", err);
      }
    };

    fetchUltimoDado();
    const interval = setInterval(fetchUltimoDado, 600000); // atualiza a cada 10 min
    return () => clearInterval(interval);
  }, []);

  // Função para pegar o valor de um campo
  const getValor = (campo: string, sufixo: string = '') =>
    ultimoDado && ultimoDado[campo] !== undefined ? `${ultimoDado[campo]}${sufixo}` : '-';

  // Escala de Beaufort
  const getBeaufortAlert = (wind: number) => {
    const windKmH = wind * 3.6;
    
    if (windKmH < 1) {
      return { message: "Calmo - Água como espelho. Sem riscos.", color: "bg-green-500", icon: "🟢" };
    }
    if (windKmH < 6) {
      return { message: "Brisa muito leve (1 a 5 km/h) - Navegação segura.", color: "bg-green-500", icon: "🌿" };
    }
    if (windKmH < 12) {
      return { message: "Brisa leve (6 a 11 km/h) - Sem riscos.", color: "bg-green-400", icon: "🍃" };
    }
    if (windKmH < 20) {
      return { message: "Brisa moderada (12 a 19 km/h) - Atenção a pequenas embarcações.", color: "bg-yellow-400", icon: "⚠️" };
    }
    if (windKmH < 29) {
      return { message: "Brisa forte (20 a 28 km/h) - Possíveis dificuldades de controle.", color: "bg-yellow-500", icon: "🌬️" };
    }
    if (windKmH < 39) {
      return { message: "Vento fresco (29 a 38 km/h) - Evite navegar com barcos leves.", color: "bg-orange-500", icon: "🌪️" };
    }
    if (windKmH < 50) {
      return { message: "Vento forte (39 a 49 km/h) - Risco à navegação.", color: "bg-orange-600", icon: "🚨" };
    }
    if (windKmH < 61) {
      return { message: "Ventania moderada (50 a 61 km/h) - Perigo significativo.", color: "bg-red-300", icon: "🟥" };
    }
    if (windKmH < 74) {
      return { message: "Ventania forte (62 a 74 km/h) - Navegação não recomendada.", color: "bg-red-600", icon: "🛑" };
    }
  
    return { message: "Tempestade (> 75 km/h) - Risco extremo à navegação.", color: "bg-red-700", icon: "⛔" };
  };


  return (
    <>
      {modal && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div className='box-border bg-white p-4 px-4 sm:px-4 rounded-2xl w-full max-w-md max-w-[60vw] text-center'>
              <p className="text-lg font-medium mb-4">
                Você usou um código de backup. Vá para as configurações e altere sua senha imediatamente para não perder o acesso à sua conta.
              </p>
              <button
                className="bg-[#415A77] hover:bg-[#5a799c] text-white font-medium py-4 px-6 rounded-sm mt-4"
                onClick={handleSettingsClick}
              >
                Ir para configurações
              </button>
              <TimedButton onClick={toggleModal} />
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <Nav onAboutClick={scrollToThirdSection} />
      <FirstSection />
      <Alert />

      <SecondSection />
      <ThirdSection ref={thirdSectionRef} />
      <Footer />
    </>
  );
}
