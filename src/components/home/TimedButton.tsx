import React, { useState, useEffect } from 'react';

interface TimedButtonProps {
  onClick?: () => void; 
}

const TimedButton: React.FC<TimedButtonProps> = ({ onClick }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (secondsLeft === 0) {
      setEnabled(true);
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <button 
      onClick={() => {
        if (enabled && onClick) {
          onClick(); 
        }
      }}
      disabled={!enabled}
      style={{
        backgroundColor: !enabled ? 'gray' : 'red',
        cursor: !enabled ? 'not-allowed' : 'pointer',
      }}
      className='text-white font-medium py-4 px-6 m-4'
    >
      {enabled ? 'Fechar' : `${secondsLeft} Fechar`}
    </button>
  );
};

export default TimedButton;
