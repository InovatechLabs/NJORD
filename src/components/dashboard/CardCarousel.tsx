import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaterFillCard } from "./WaterFill";
import tablegif from '../../images/table.gif';
import chartgif from '../../images/chart.gif';
import umidity from '../../images/image 14.png';
import temp from '../../images/Layer_1.png';
import uv from '../../images/image 15.png';
import analysis from '../../images/analysis.gif';

const cards = [
  {
    id: 1,
    title: "Visão Tabular",
    content: (
      <div className="flex items-center justify-center flex-col">
        Ideal para quem precisa examinar informações específicas com precisão,
        permitindo uma navegação fácil entre linhas e colunas.
        <br />
        <img
          src={tablegif}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "70%" }}
        />
      </div>
    ),
  },
   {
    id: 2,
    title: "Visão Gráfica",
    content: (
      <div className="flex items-center justify-center flex-col">
        Torna a interpretação das informações mais rápida e intuitiva, ajudando na tomada de decisões baseada em insights visuais claros.
        <br />
        <img
          src={chartgif}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "50%" }}
        />
      </div>
    ),
  },
   {
    id: 3,
    title: "Dados Meteorológicos Integrados",
    content: (
      <div className="flex items-center justify-center flex-col">
        A diversidade de dados apresentada permite monitorar com precisão as condições climáticas, 
        facilitando a análise de padrões e a tomada de decisões informadas para navegação.
        <br />
        <div className="flex flex-row justify-center items-center">
         <img
          src={temp}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "20%" }}
        />
        <img
          src={uv}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "20%" }}
        />
        <img
          src={umidity}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "20%" }}
        />
        </div>
       
      </div>
    ),
  },
  {
    id: 4,
    title: "Manipulação Eficiente",
    content: (
      <div className="flex items-center justify-center flex-col">
        Obtenha uma vasta gama de funções de manipulação de dados para trabalhar e visualizar da melhor forma
        dados meteorológicos
        <br />
        <img
          src={analysis}
          alt="Exemplo de imagem"
          style={{ marginTop: "10px", maxWidth: "70%" }}
        />
      </div>
    ),
  },
];

const CARD_SPACING = 270; // distância entre os cards (px)

export const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = cards.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  // Calcula índice relativo circular
  const getRelativeIndex = (index: number) => {
    const raw = index - activeIndex;
    if (raw > totalCards / 2) return raw - totalCards;
    if (raw < -totalCards / 2) return raw + totalCards;
    return raw;
  };

  return (
    <div className="relative w-full flex items-center justify-center py-12">
      {/* Carrossel */}
      <div className="relative w-[800px] h-[550px] overflow-hidden flex items-center justify-center align-center">
         {/* Neblina esquerda */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-100 to-transparent z-20" />

      {/* Neblina direita */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-100 to-transparent z-20" />

        {/* Cards */}
        <div className="relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center overflow-visible text-center">
          {cards.map((card, index) => {
            const relativeIndex = getRelativeIndex(index);
            const isActive = relativeIndex === 0;

            return (
              <div
                key={card.id}
                className={`absolute top-0 left-1/2 transition-all duration-500 ease-in-out 
                  ${isActive ? "z-30" : "z-10"} `}
                style={{
                  transform: `translateX(${relativeIndex * CARD_SPACING}px) translateX(-50%) scale(${
                    isActive ? 1.25 : 0.95
                  })`,
                }}
              >
                <WaterFillCard
                  title={card.title}
                  content=<div>{card.content}</div>
                  isActive={isActive}
                />
              </div>
            );
          })}
            <button
        onClick={handlePrev}
        className="absolute left-4 z-50 p-2 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <ChevronLeft size={24} />
      </button>
        <button
        onClick={handleNext}
        className="absolute right-4 z-50 p-2 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <ChevronRight size={24} />
      </button>
        </div>
      </div>
    </div>
  );
};
