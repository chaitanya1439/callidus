import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';



const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/img1.jpeg",
    "/img8.jpeg",
    "/img6.jpeg",
    "/img7.jpeg",
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); 
    return () => clearInterval(slideInterval); 
  }, [nextSlide]);

  return (
    <div className="max-w-screen-2xl pt-48 mx-auto relative overflow-hidden">
      <div className="flex transition-transform ease-out duration-1000" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-96 relative">
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
               fetchPriority="high"
            />
          </div>
        ))}
      </div>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button onClick={prevSlide} className="btn btn-circle">❮</button>
        <button onClick={nextSlide} className="btn btn-circle">❯</button>
      </div>
    </div>
  );
};

export default Banner;
