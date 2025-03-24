"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const InfoCarousel = ({ slides = [], interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length, interval]);

  const handleTouchStart = (e) => {
    setIsAutoPlaying(false);
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    setIsAutoPlaying(false);
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const dragThreshold = containerWidth / 4;

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        setCurrentIndex((current) => (current + 1) % slides.length);
      } else {
        setCurrentIndex(
          (current) => (current - 1 + slides.length) % slides.length
        );
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => (current - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const getTransform = () => {
    const baseTransform = -(currentIndex * 100);
    if (!isDragging) return `translateX(${baseTransform}%)`;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const dragPercentage = (dragOffset / containerWidth) * 100;
    return `translateX(${baseTransform - dragPercentage}%)`;
  };

  return (
    <div className="relative w-full overflow-hidden border-b-[1px] border-border-default">
      <div className="hidden md:block">
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full transition-colors bg-brand-white p-5 border-4 border-white group hover:bg-brand"
        >
          <svg
            className="text-brand transition-colors group-hover:text-brand-white"
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4L6 8L10 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full transition-colors bg-brand-white p-5 border-4 border-white group hover:bg-brand"
        >
          <svg
            className="text-brand transition-colors group-hover:text-brand-white"
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        ref={containerRef}
        className={`flex touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } transition-transform duration-500 ease-out`}
        style={{
          transform: getTransform(),
          transition: isDragging ? "none" : "transform 500ms ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full select-none">
            {/* Slide Content */}
            <div className="relative h-full w-full">
              <div className="mx-auto">
                <div className="flex flex-col">
                  <div className="md:px-8">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={1700}
                      height={450}
                      quality={100}
                      className="w-full object-contain"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full border-brand border-2 ${
              index === currentIndex ? "bg-brand" : "bg-brand-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCarousel;
