import React from 'react';
import centerImage from './Components/Essantials/Images/Alpha.png';

const Preloader = () => {
  return (
    <div className="relative flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black z-50 overflow-hidden">
      <div className="relative flex justify-center items-center w-20 h-20 z-10">
        <img src={centerImage} alt="Loading" className="w-full h-full rounded-full" />
      </div>
      <div className="absolute flex justify-center items-center">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-${20 + i * 4} h-${20 + i * 4} border-4 border-blue-500 rounded-full animate-ping`}
            style={{
              animationDuration: `${1 + i * 0.5}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
