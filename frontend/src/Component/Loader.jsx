import React from 'react';
import voiceGif from '../assets/Voice3.gif';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center 
      bg-black
      space-y-4 sm:space-y-6 md:space-y-8 
      px-4 sm:px-6 md:px-8 
      overflow-hidden">
      <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] max-w-xl">
        <img 
          src={voiceGif} 
          alt="Loading..." 
          className="w-full h-auto object-contain 
            transform transition-all duration-300 
            hover:scale-105"
        />
      </div>
      
      {/* Loading Text with Animated Gradient */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold 
          bg-gradient-to-r from-white via-neutral-300 to-white 
          bg-clip-text text-transparent 
          animate-text-shimmer font-orbitron">
          Loading Awesomeness...
        </h2>
        
        {/* Subtle Loading Dots */}
        <div className="flex justify-center space-x-2 mt-2 sm:mt-3 md:mt-4">
          {[1, 2, 3].map((dot) => (
            <span 
              key={dot} 
              className="h-2 w-2 sm:h-3 sm:w-3 bg-white/50 rounded-full 
                animate-bounce"
              style={{
                animationDelay: `${dot * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;