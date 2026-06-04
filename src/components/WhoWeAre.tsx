"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left Column: Founder Portrait with Experience Badge */}
        <div className={`lg:col-span-5 relative flex justify-center lg:justify-start reveal-left ${isVisible ? "active" : ""}`}>
          <div className="relative w-full max-w-[400px]">
            {/* Main Portrait */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 group">
              <Image
                src="/founder_sagar.png"
                alt="PMB Enterprise founder at international trade exhibition"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Years of Experience Badge — bottom-right overlap */}
            <div className="absolute bottom-8 right-0 translate-x-4 bg-primary text-white rounded-2xl px-6 py-5 shadow-2xl text-center min-w-[110px]">
              <span className="block text-5xl font-black leading-none">8</span>
              <span className="block text-xs font-bold tracking-widest uppercase mt-1 text-white/80">
                Years of<br />Experience
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Copy */}
        <div className={`lg:col-span-7 reveal-right reveal-delay-200 ${isVisible ? "active" : ""}`}>
          <span className="text-primary dark:text-accent font-bold text-sm uppercase tracking-widest block mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-8">
            At PMB Enterprise, we connect global markets through quality, reliability, and excellence.
          </h2>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-wide rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all mb-10 cursor-pointer"
          >
            Contact Us
          </Link>

          <div className="w-full h-px bg-gray-100 dark:bg-zinc-800 mb-8" />

          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-6 font-medium">
            At PMB Enterprise, we are committed to connecting global markets with premium-quality products sourced from trusted producers across India. Since 2018, we have been delivering reliable export solutions backed by quality assurance, efficient logistics, and exceptional customer service.
          </p>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
            Driven by excellence and guided by integrity, we have built lasting relationships with clients across multiple international markets. Our dedication to consistency, transparency, and customer success has established PMB Enterprise as a trusted partner in global trade.
          </p>
        </div>

      </div>
    </section>
  );
}
