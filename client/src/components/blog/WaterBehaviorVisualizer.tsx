import React, { useState, useRef, useEffect } from 'react';

const WaterBehaviorVisualizer: React.FC = () => {
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftWaterDropsRef = useRef<HTMLDivElement>(null);
  const rightWaterDropsRef = useRef<HTMLDivElement>(null);

  // Reset animation state after completion
  useEffect(() => {
    if (leftActive) {
      const timer = setTimeout(() => {
        setLeftActive(false);
      }, 3000); // 3 seconds animation duration
      return () => clearTimeout(timer);
    }
  }, [leftActive]);

  useEffect(() => {
    if (rightActive) {
      const timer = setTimeout(() => {
        setRightActive(false);
      }, 3000); // 3 seconds animation duration
      return () => clearTimeout(timer);
    }
  }, [rightActive]);

  // Generate random water drops
  const generateWaterDrops = (isCoated: boolean) => {
    const quantity = isCoated ? 10 : 15; // Fewer, more defined drops for coated surface
    const drops = [];
    
    for (let i = 0; i < quantity; i++) {
      const size = isCoated 
        ? Math.random() * 15 + 20 // Larger, more defined drops for coated
        : Math.random() * 15 + 10; // Smaller, less defined for uncoated
      
      const left = Math.random() * 80 + 10; // Position between 10% and 90%
      const top = Math.random() * 60 + 10; // Position between 10% and 70%
      
      const duration = isCoated
        ? 1.2 + Math.random() * 0.8 // Faster movement for coated
        : 2 + Math.random() * 1.5; // Slower movement for uncoated
      
      const delay = Math.random() * 0.5; // Slight random delay for natural effect
      
      drops.push(
        <div
          key={`drop-${isCoated ? 'coated' : 'uncoated'}-${i}`}
          className={`absolute rounded-full bg-sky-400/90 ${isCoated ? 'opacity-90' : 'opacity-70'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animation: `${isCoated ? 'waterDropCoated' : 'waterDropUncoated'} ${duration}s ease-in ${delay}s forwards`,
            boxShadow: `0 0 5px rgba(255, 255, 255, 0.3), 
                       inset 0 0 5px rgba(255, 255, 255, 0.3)`
          }}
        />
      );
    }
    
    return drops;
  };

  const handleLeftClick = () => {
    if (!leftActive) {
      setLeftActive(true);
      // Reset the animation by removing and re-adding the elements
      if (leftWaterDropsRef.current) {
        leftWaterDropsRef.current.innerHTML = '';
        setTimeout(() => {
          if (leftWaterDropsRef.current) {
            leftWaterDropsRef.current.append(...Array.from(document.createDocumentFragment().childNodes));
          }
        }, 10);
      }
    }
  };

  const handleRightClick = () => {
    if (!rightActive) {
      setRightActive(true);
      // Reset the animation by removing and re-adding the elements
      if (rightWaterDropsRef.current) {
        rightWaterDropsRef.current.innerHTML = '';
        setTimeout(() => {
          if (rightWaterDropsRef.current) {
            rightWaterDropsRef.current.append(...Array.from(document.createDocumentFragment().childNodes));
          }
        }, 10);
      }
    }
  };

  // CSS for animations
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Add the CSS animations
    styleEl.textContent = `
      @keyframes waterDropUncoated {
        0% {
          transform: scale(1) translateY(0);
          opacity: 0.7;
        }
        30% {
          transform: scale(1.1) translateY(10%);
          opacity: 0.8;
          border-radius: 40%;
        }
        70% {
          transform: scale(1.3, 0.8) translateY(70%);
          opacity: 0.6;
          border-radius: 30%;
        }
        100% {
          transform: scale(1.5, 0.5) translateY(200%);
          opacity: 0;
          border-radius: 20%;
        }
      }
      
      @keyframes waterDropCoated {
        0% {
          transform: scale(1) translateY(0) rotate(0);
          opacity: 0.9;
        }
        30% {
          transform: scale(1) translateY(30%) rotate(5deg);
          opacity: 0.9;
        }
        70% {
          transform: scale(0.9) translateY(100%) rotate(10deg);
          opacity: 0.8;
        }
        100% {
          transform: scale(0.8) translateY(200%) rotate(15deg);
          opacity: 0;
        }
      }
      
      @keyframes waterSheen {
        0% { opacity: 0; }
        10% { opacity: 0.3; }
        40% { opacity: 0.1; }
        100% { opacity: 0; }
      }
    `;
    
    // Append to the document head
    document.head.appendChild(styleEl);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="my-10 max-w-5xl mx-auto">
      
      <h2 className="text-2xl font-bold text-center mb-6">Experience Ceramic Coating Protection</h2>
      <p className="text-center mb-6 max-w-2xl mx-auto">
        Tap each surface to see how water behaves differently on a ceramic coated vs. uncoated vehicle.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-4 border-black rounded-lg p-2 bg-gradient-to-b from-gray-900 to-black shadow-[8px_8px_0_0_#000] neo-brutalist-card overflow-hidden">
        {/* Left Panel - Uncoated */}
        <div 
          ref={leftPanelRef}
          className={`relative h-[300px] flex flex-col overflow-hidden rounded-lg border-2 border-black cursor-pointer transition-all ${leftActive ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
          onClick={handleLeftClick}
        >
          <div className="bg-gradient-to-r from-[#EE432C] to-[#FFB375] py-2 px-4 text-white font-semibold text-center border-b-2 border-black">
            Unprotected Paint
          </div>
          
          <div className="flex flex-col items-center justify-center flex-grow">
            {!leftActive && (
              <div className="text-center p-4">
                <div className="inline-block p-3 rounded-full bg-[#FFB375]/20 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFB375]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <p className="text-white">Tap to apply water</p>
              </div>
            )}
            
            {leftActive && (
              <>
                {/* Water effect container */}
                <div ref={leftWaterDropsRef} className="absolute inset-0 overflow-hidden">
                  {generateWaterDrops(false)}
                </div>
                {/* Sheen effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-sky-400/10 to-transparent"
                  style={{
                    animation: 'waterSheen 3s ease-out'
                  }}
                />
              </>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/20 py-2 text-white text-center text-sm">
            Water spreads & clings to surface
          </div>
        </div>
        
        {/* Right Panel - Ceramic Coated */}
        <div 
          ref={rightPanelRef}
          className={`relative h-[300px] flex flex-col overflow-hidden rounded-lg border-2 border-black cursor-pointer transition-all ${rightActive ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
          onClick={handleRightClick}
        >
          <div className="bg-gradient-to-r from-[#EE432C] to-[#FFB375] py-2 px-4 text-white font-semibold text-center border-b-2 border-black">
            Ceramic Coated
          </div>
          
          <div className="flex flex-col items-center justify-center flex-grow">
            {!rightActive && (
              <div className="text-center p-4">
                <div className="inline-block p-3 rounded-full bg-[#FFB375]/20 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFB375]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <p className="text-white">Tap to apply water</p>
              </div>
            )}
            
            {rightActive && (
              <>
                {/* Water effect container */}
                <div ref={rightWaterDropsRef} className="absolute inset-0 overflow-hidden">
                  {generateWaterDrops(true)}
                </div>
                {/* Sheen effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-sky-400/10 to-transparent"
                  style={{
                    animation: 'waterSheen 3s ease-out'
                  }}
                />
              </>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/20 py-2 text-white text-center text-sm">
            Water beads and rolls off quickly
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#FFD7B5]/20 p-4 rounded-lg border-2 border-black">
        <h3 className="font-bold mb-2">Why This Matters:</h3>
        <p>
          The water beading effect isn't just visually impressive—it demonstrates how ceramic coating creates a hydrophobic barrier that actively repels water and contaminants. This means fewer water spots, easier cleaning, and superior protection against Sacramento's environmental challenges.
        </p>
      </div>
    </div>
  );
};

export default WaterBehaviorVisualizer;