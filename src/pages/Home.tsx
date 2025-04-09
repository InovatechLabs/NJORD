import React, { useRef } from "react";
import Nav from "../components/nav/Nav";
import FirstSection from '../components/home/firstSection/FirstSection';
import SecondSection from '../components/home/secondSection/SecondSection';
import ThirdSection from "../components/home/thirdSection/ThirdSection";
import Footer from "../components/home/footer/Footer";

export default function Home() {

    const thirdSectionRef = useRef<HTMLDivElement>(null);

    const scrollToThirdSection = () => {
        thirdSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
        <Nav onAboutClick={scrollToThirdSection}/>
        <FirstSection />
        <SecondSection />
        <ThirdSection ref={thirdSectionRef}/>
        <Footer />
        </>
    )
    
}