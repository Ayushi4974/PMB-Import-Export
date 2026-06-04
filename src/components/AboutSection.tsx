"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Copy */}
        <div className={`lg:col-span-6 reveal-left ${isVisible ? "active" : ""}`}>
          <span className="text-primary dark:text-accent font-bold text-sm uppercase tracking-widest block mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-8">
            At PMB Enterprise, we connect global markets through quality, reliability, and excellence.
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
            At PMB Enterprise, we specialize in providing reliable import-export and logistics solutions that help businesses trade confidently across global markets. Through our trusted network of shipping and logistics partners, we ensure smooth transportation, efficient customs clearance, and timely deliveries. Whether you are importing products or expanding your reach internationally, we make global trade simple, secure, and hassle-free.
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-accent font-bold text-lg">Direct Sourcing</span>
              <span className="text-sm text-gray-500 dark:text-zinc-500">From verified farms & growers</span>
            </div>
            <div className="w-px bg-gray-200 dark:bg-zinc-800 self-stretch"></div>
            <div className="flex flex-col">
              <span className="text-primary dark:text-accent font-bold text-lg">Global Reach</span>
              <span className="text-sm text-gray-500 dark:text-zinc-500">Delivering to 20+ countries</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image with Floating Badge */}
        <div className={`lg:col-span-6 relative flex justify-center lg:justify-end reveal-right reveal-delay-200 ${isVisible ? "active" : ""}`}>
          <div className="relative w-full max-w-lg aspect-[4/3] md:aspect-[1.2] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 dark:border-zinc-800">
            <Image
              src="/about_crane.png"
              alt="Industrial shipping port gantry crane loading cargo containers"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Excellence Badge */}
          <div className={`absolute -bottom-6 left-6 md:-left-8 bg-primary dark:bg-zinc-900 border border-primary/20 dark:border-zinc-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center w-40 md:w-44 animate-float reveal-scale reveal-delay-400 ${isVisible ? "active" : ""}`}>
            <span className="text-5xl md:text-6xl font-black text-accent drop-shadow-md">
              8
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-wide mt-2 leading-tight">
              Years of Excellence
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
