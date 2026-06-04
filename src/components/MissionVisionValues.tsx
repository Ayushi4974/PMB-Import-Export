"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CardItem {
  title: string;
  description: string;
  image: string;
}

const philosophyCards: CardItem[] = [
  {
    title: "Our Mission",
    description: "To bridge global markets with high-quality products and efficient export services, ensuring reliability, value, and customer satisfaction at every step.",
    image: "/mission_bg.png"
  },
  {
    title: "Our Vision",
    description: "To be a preferred international trade partner, recognized for excellence, innovation, and a commitment to sustainable business growth.",
    image: "/vision_bg.png"
  },
  {
    title: "Our Core Values",
    description: "We believe in trust, professionalism, collaboration, and continuous improvement, enabling us to deliver outstanding products and services to customers worldwide.",
    image: "/values_bg.png"
  }
];

export default function MissionVisionValues() {
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
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {philosophyCards.map((card, idx) => {
            const delayClasses = ["reveal-delay-100", "reveal-delay-200", "reveal-delay-300"];
            
            return (
              <div
                key={idx}
                className={`relative aspect-[3/4] md:aspect-[0.9] lg:aspect-[0.8] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 bg-black flex flex-col justify-end p-8 md:p-10 group reveal-scale ${
                  delayClasses[idx % delayClasses.length]
                } ${isVisible ? "active" : ""}`}
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-[3000ms] group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>
                
                {/* Text Content */}
                <div className="relative z-20">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-semibold">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
