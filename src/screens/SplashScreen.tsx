import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 3);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onDismiss}
      data-testid="loading_screen"
      className="fixed inset-0 z-50 bg-[#0066FF] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="flex flex-col items-center justify-center px-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <h1
          data-testid="loading_brand_title"
          className="text-white text-6xl md:text-7xl font-bold tracking-tight font-['Plus_Jakarta_Sans']"
        >
          Bartr
        </h1>
        <p
          data-testid="loading_tagline"
          className="text-white/95 text-lg md:text-xl font-normal mt-3 tracking-wide font-['Plus_Jakarta_Sans']"
        >
          ...Let&apos;s help you find them.
        </p>
      </div>

      {/* Loading pulse dots at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
            dots === 0 ? 'opacity-100 scale-125' : 'opacity-40'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
            dots === 1 ? 'opacity-100 scale-125' : 'opacity-40'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
            dots === 2 ? 'opacity-100 scale-125' : 'opacity-40'
          }`}
        />
      </div>
    </div>
  );
};
