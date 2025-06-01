import React, { useRef, useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FirstSection from '../components/home/firstSection/FirstSection';
import SecondSection from '../components/home/secondSection/SecondSection';
import ThirdSection from "../components/home/thirdSection/ThirdSection";
import Footer from "../components/home/footer/Footer";
import { ModalOverlay } from "./Auth";
import { ModalContent } from "./Auth";
import { CloseModalButton } from "./Auth";
import { useLocation, useNavigate } from "react-router-dom";
import TimedButton from '../components/home/TimedButton';

export default function Home() {

    const [modal, setModal] = useState(false);
    const location = useLocation();

    const toggleModal = () => {
      setModal((prev) => !prev);
    };
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/settings');
    }

    const thirdSectionRef = useRef<HTMLDivElement>(null);

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
                <div className='... box-border bg-white p-4 px-4 sm:px-4 rounded-2xl w-full max-w-md max-w-[60vw] text-center'>
           <p className="text-lg font-medium mb-4">Você usou um código de backup. Vá para as configurações e altere sua senha imediatamente para não perder o acesso à sua conta.</p>    
           <button className="bg-[#415A77] hover:bg-[#5a799c] text-white font-medium py-4 px-6 rounded-sm mt-4" onClick={handleSettingsClick}>
            Ir para configurações
            </button>     
              <TimedButton onClick={toggleModal}/>        
          </div>
                </ModalContent>
            </ModalOverlay>
        )}
        <Nav onAboutClick={scrollToThirdSection}/>
        <FirstSection />
        <SecondSection />
        <ThirdSection ref={thirdSectionRef}/>
        <Footer />
        </>
    )
    
}