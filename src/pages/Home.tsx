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


  return (
    <>
      {modal && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div className='box-border bg-white p-4 px-4 sm:px-4 rounded-2xl w-full max-w-md max-w-[60vw] text-center'>
              <p className="text-lg font-medium mb-4">
                Você usou um código de backup. Sua configuração de verificação dois fatores foi desativada e seu código de backup deletado. Assim que possível, restaure seu aplicativo 
                autenticador para não perder o acesso à sua conta.
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
