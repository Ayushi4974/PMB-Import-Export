"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    image: "/hero_onion.png",
    title: "INDIA'S TOP ONION EXPORTER",
    subtitle: "Premium Quality Red Onions Sourced Directly From Certified Indian Farms.",
    ctaText: "Read More",
    ctaLink: "#about"
  },
  {
    image: "/prod_mango.png",
    title: "WORLD-CLASS AGRI-COMMODITIES",
    subtitle: "From Farm-Fresh Fruits to Premium Grains, Spices, and Agricultural Produce.",
    ctaText: "Explore Products",
    ctaLink: "#products"
  },
  {
    image: "/about_crane.png",
    title: "TRUSTED EXPORT & LOGISTICS",
    subtitle: "Seamless Global Shipping, Timely Customs Clearance, and End-to-End Supply Chain Solutions.",
    ctaText: "Why PMB Enterprise",
    ctaLink: "#why-us"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            priority={index === 0}
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
          />
          
          {/* Slide Text Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 mt-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight select-none mb-6 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 select-none mb-10 leading-relaxed font-medium drop-shadow">
                {slide.subtitle}
              </p>
              
              <a
                href={slide.ctaLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white text-base font-semibold tracking-wide rounded-full shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 text-white rounded-full bg-black/20 hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-md cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 text-white rounded-full bg-black/20 hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-md cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating || idx === current) return;
              setIsAnimating(true);
              setCurrent(idx);
              setTimeout(() => setIsAnimating(false), 800);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-8 bg-accent" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
