"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function PromoVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <section ref={sectionRef} className="py-12 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 dark:border-zinc-800 reveal-on-scroll ${
            isVisible ? "active" : ""
          }`}
        >
          {/* Background Image with overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30 z-10"></div>
          <Image
            src="/promo_video_bg.png"
            alt="Commercial fleet shipping trucks and cargo flight logistics sunset"
            fill
            className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
          />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={() => setIsOpen(true)}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer group"
              aria-label="Play Corporate Video"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Live pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 animate-ping opacity-75"></div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-primary text-white hover:scale-105 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Frame */}
            <iframe
              src="https://www.youtube.com/embed/dfmEYpCHfCg?autoplay=1"
              title="PMB Enterprise Global Logistics & Export-Import Corporate Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
