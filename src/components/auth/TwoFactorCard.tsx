import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';


interface TwoFactorCardProps {
    onCodeChange: (code: string) => void;
    onBackupCodeChange: (backupCode: string) => void;
    onSubmit?: (code: string) => void;
    onBackupCodeSubmit?: (backupCode: string) => void;
    showSubmitButton?: boolean;
}

const TwoFactorCard: React.FC<TwoFactorCardProps> = ({
    onCodeChange,
    onSubmit,
    showSubmitButton = false,
    onBackupCodeChange,
    onBackupCodeSubmit
  }) => {
    const [code, setCode] = useState<string[]>(new Array(6).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [backupCode, setBackupCode] = useState<string>('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal((prev) => !prev);
    };
  
    const handleChange = (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;
  
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
      const fullCode = newCode.join('');
      onCodeChange(fullCode);
  
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };
  
    const handleSubmit = () => {
      const fullCode = code.join('');
      if (onSubmit) {
        onSubmit(fullCode);
      }
    };

    const handleBackupCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setBackupCode(event.target.value);
    }
  
    return (
        <div className="... box-border bg-white p-6 px-4 sm:px-8 rounded-2xl w-full max-w-md max-w-[90vw] text-center">
        <div className="flex flex-col items-center gap-2 mb-7">
          <img src="https://static.vecteezy.com/system/resources/previews/027/769/019/non_2x/2fa-icon-two-factor-verification-by-mobile-phone-vector.jpg" alt="" style={{ width: '140px', height: '140px'}}/>
          <h2 className="text-xl font-medium">Verifique sua identidade</h2>
          <p className='text-gray-500 text-base'>Insira o código de 6 dígitos de seu autenticador móvel</p>
        </div>
  
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="w-8 sm:w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
  
        {showSubmitButton && (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full"
          >
            Verificar Código
          </button>
        )}
         <p className='text-gray-800 text-lg mt-10'>Perdeu acesso ao seu autenticador? </p>
         <p className='text-blue-500 hover:text-blue-600 text-base mt-2 cursor-pointer' onClick={toggleModal}>Recupere com seu código de backup</p>
        {modal && (
          <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseModalButton onClick={toggleModal}>×</CloseModalButton>
          <div className='... box-border bg-white p-4 px-4 sm:px-4 rounded-2xl w-full max-w-md max-w-[60vw] text-center'>
           <p className="text-lg font-medium mb-4">Digite seu código de backup</p>
            <input 
            className="w-full h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type='text'
            maxLength={8}
            value={backupCode}
            onChange={(e) => {
              handleBackupCodeChange(e);
              onBackupCodeChange?.(e.target.value);
            }}
            />
              <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4 w-full"
          onClick={() => onBackupCodeSubmit?.(backupCode)}
        >
          Usar código de backup
        </button>
          </div>
          </ModalContent>
          </ModalOverlay>
        )}
      </div>
      
    );
  };

  const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: black;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1.0);
  }
`;

const ModalContent = styled.div`
  background-color: #ececec;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  color: black;
  position: relative;
  animation: ${slideIn} 0.45s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
  
  export default TwoFactorCard;