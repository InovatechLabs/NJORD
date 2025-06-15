import React from 'react';
import { motion } from 'framer-motion';

const Comparison: React.FC = () => {
  return (
    <>
      <div className="min-h-[70vh] w-full bg-white relative flex flex-col xl:flex-row items-center justify-around px-12 py-8 gap-8">

        <motion.div
          className="max-w-3xl bg-transparent p-8 rounded-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 text-[#00405c] font-serif"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Comparação de dados precisa
          </motion.h1>

          <motion.p
            className="text-gray-500 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            Nossa plataforma permite confrontar, lado a lado, as medições obtidas por diferentes estações, destacando variações em parâmetros como temperatura, umidade, vento, pressão e radiação solar.
            Através de cartões informativos e leitura otimizada, você acompanha as diferenças entre locais monitorados de forma clara e confiável.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-lg sm:max-w-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src="https://cdn-icons-gif.flaticon.com/17513/17513900.gif"
            style={{ width: '90%', height: '90%' }}
          />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-[100px]"
            preserveAspectRatio="none"
          >
            <path fill="#0D1B2A" fill-opacity="1" d="M0,288L80,256C160,224,320,160,480,160C640,160,800,224,960,224C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Comparison;