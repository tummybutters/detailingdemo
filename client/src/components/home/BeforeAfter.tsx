import { useState, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt, label }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    if (percentage >= 0 && percentage <= 100) {
      setSliderPosition(percentage);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    if (percentage >= 0 && percentage <= 100) {
      setSliderPosition(percentage);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-72 rounded-lg overflow-hidden shadow-lg"
    >
      {/* Before Image */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* After Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Slider */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute w-8 h-8 rounded-full bg-white -ml-4 top-1/2 -translate-y-1/2 shadow-md flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary"></div>
        </div>
      </div>
      
      {/* Label */}
      <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
        {label}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Before & After</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the PremiumShine difference with these real transformations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1589641206215-d7656f2405b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
            afterImage="https://images.unsplash.com/photo-1607857531051-327bed7af541?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
            beforeAlt="Before: Dirty car exterior"
            afterAlt="After: Clean car exterior"
            label="Exterior Detail"
          />
          
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1632028927580-cf17a7a07403?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
            afterImage="https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
            beforeAlt="Before: Stained interior"
            afterAlt="After: Clean interior"
            label="Interior Detail"
          />
        </div>
      </div>
    </div>
  );
}
