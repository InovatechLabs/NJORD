import React, { useState, useRef } from 'react';


interface TwoFactorCardProps {
    onCodeChange: (code: string) => void;
    onSubmit?: (code: string) => void;
    showSubmitButton?: boolean;
}

const TwoFactorCard: React.FC<TwoFactorCardProps> = ({
    onCodeChange,
    onSubmit,
    showSubmitButton = false,
  }) => {
    const [code, setCode] = useState<string[]>(new Array(6).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  
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
  
    return (
        <div className="... box-border bg-white p-8 px-4 sm:px-8 rounded-2xl w-full max-w-md max-w-[90vw] text-center">
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
      </div>
    );
  };
  
  export default TwoFactorCard;