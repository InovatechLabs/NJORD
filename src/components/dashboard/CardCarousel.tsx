import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaterFillCard } from "./WaterFill"; // ajuste o caminho conforme a sua estrutura

const cards = [
  { id: 1, title: "Visão Tabular", content: "Ideal para quem precisa examinar informações específicas com precisão, permitindo uma navegação fácil entre linhas e colunas." },
  { id: 2, title: "Card 2", content: "Conteúdo do card 2" },
  { id: 3, title: "Card 3", content: "Conteúdo do card 3" },
  { id: 4, title: "Card 4", content: "Conteúdo do card 4" },
];

const CARD_SPACING = 280; // distância entre os cards (px)

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
      {/* Neblina esquerda */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-100 to-transparent z-20" />

      {/* Neblina direita */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-100 to-transparent z-20" />

      {/* Botão Esquerdo */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-50 p-2 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carrossel */}
      <div className="relative w-[800px] h-[550px] overflow-hidden flex items-center justify-center align-center">
        {/* Cards */}
        <div className="relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center overflow-visible">
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
                  content={card.content}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Botão Direito */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-50 p-2 bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
