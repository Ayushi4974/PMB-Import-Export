"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "PMB Enterprise consistently delivers high-quality products with professionalism and reliability. Their attention to detail and commitment to excellence make them a valuable business partner.",
    author: "James Anderson",
    role: "Procurement Manager – United Kingdom"
  },
  {
    quote: "Working with PMB Enterprise has been a smooth experience. Their efficient logistics support and timely deliveries help us maintain a dependable supply chain.",
    author: "Sarah Mitchell",
    role: "International Trade Consultant – Australia"
  },
  {
    quote: "The quality standards maintained by PMB Enterprise are outstanding. Their transparent communication and customer-focused approach make international trade hassle-free.",
    author: "David Rodriguez",
    role: "Global Sourcing Specialist – Spain"
  }
];

export default function TestimonialSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const changeSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    changeSlide(current === testimonials.length - 1 ? 0 : current + 1);
  }, [current, changeSlide]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`relative grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-900 bg-zinc-950 reveal-on-scroll ${
            isVisible ? "active" : ""
          }`}
        >
          {/* Left Column: Container Yard Sunset Image */}
          <div className="relative lg:col-span-6 min-h-[300px] lg:min-h-[500px]">
            <Image
              src="/testimonial_bg.png"
              alt="Global shipping containers stacked in terminal yard at sunset"
              fill
              className="object-cover"
            />
            {/* Soft gradient overlay to blend into the diagonal separator */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10 pointer-events-none"></div>
          </div>

          {/* Right Column: Solid Dark Review Panel with Slanted Diagonal Edge */}
          <div className="relative lg:col-span-6 bg-zinc-950 dark:bg-black p-8 md:p-16 flex flex-col justify-center min-h-[400px]">
            
            {/* Custom SVG Quote Mark Icon */}
            <svg
              className="w-16 h-16 text-primary dark:text-accent opacity-20 fill-current mb-6 flex-shrink-0 animate-pulse-subtle"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.995 3.397-4.995 6.848h5v9h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.917-5 3.41-5 6.845h5v9h-10z" />
            </svg>

            {/* Testimonial Copy (Animated on Switch) */}
            <div className="flex-grow flex flex-col justify-center">
              <p
                className={`text-xl md:text-2xl text-gray-100 font-medium leading-relaxed mb-8 transition-all duration-500 transform ${
                  isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                "{testimonials[current].quote}"
              </p>
              
              <div
                className={`flex flex-col transition-all duration-500 delay-75 transform ${
                  isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                }`}
              >
                <span className="font-extrabold text-white text-base tracking-wide">
                  {testimonials[current].author}
                </span>
                <span className="text-sm text-accent font-semibold tracking-wider mt-1">
                  {testimonials[current].role}
                </span>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2.5 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === current ? "w-8 bg-primary dark:bg-accent" : "w-2.5 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
