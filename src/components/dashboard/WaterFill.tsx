import React from "react";

interface WaterFillCardProps {
  title: string;
  content: string | any;
  isActive: boolean;
}

export const WaterFillCard: React.FC<WaterFillCardProps> = ({
  title,
  content,
  isActive,
}) => {
  const bgHeight = isActive ? "100%" : "0";

  return (
    <div
      className={`relative w-72 h-[400px] rounded-2xl border border-blue-600 overflow-hidden
        ${isActive ? "text-white" : "text-gray-900"}`}
    >
      {/* Nível da água */}
      <div
        className="absolute bottom-0 left-0 w-full bg-blue-600 z-0 transition-all duration-200 ease-in-out"
        style={{
          height: bgHeight,
        }}
      >
      </div>

      {/* Ondas animadas no fundo para cards não ativos */}
      {!isActive && (
        <div
          className="absolute bottom-0 left-0 w-full h-20 overflow-hidden z-10"
          style={{ pointerEvents: "none" }}
        >
          <div className="relative h-full whitespace-nowrap">
            <div className="inline-block w-[200%] h-full animate-wave-base">
              <svg
                className="w-1/2 h-full inline-block -mr-[1px]"
                viewBox="0 0 1440 60"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  fill="#2563EB"
                  fillOpacity="1"
                  d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z"
                />
              </svg>
              <svg
                className="w-1/2 h-full inline-block"
                viewBox="0 0 1440 60"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  fill="#2563EB"
                  fillOpacity="1"
                  d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="relative z-20 p-6 flex flex-col h-full justify-center items-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-center">{content}</div>
      </div>

      {/* Estilos da animação */}
      <style>{`
        .animate-wave-base {
          animation: waveScroll .8s linear infinite;
        }

        @keyframes waveScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};