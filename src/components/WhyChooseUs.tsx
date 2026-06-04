"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: "Integrity & Transparency",
    description:
      "We conduct business with honesty, fairness, and transparency, fostering trust with customers and partners worldwide."
  },
  {
    title: "Innovation & Progress",
    description:
      "We embrace modern technologies and evolving market trends to continuously improve our services and operations."
  },
  {
    title: "Collaboration",
    description:
      "We believe strong teamwork and mutual respect are essential to achieving shared goals and long-term success."
  },
  {
    title: "Customer Satisfaction",
    description:
      "Our commitment is to provide exceptional service, responsive support, and a seamless customer experience."
  },
  {
    title: "Diverse Product Portfolio",
    description:
      "We offer a wide range of carefully sourced products to meet the needs of global markets and industries."
  },
  {
    title: "Excellence in Service",
    description:
      "From sourcing to delivery, we are dedicated to providing professional, reliable, and efficient solutions."
  }
];

export default function WhyChooseUs() {
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
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-zinc-950 text-white relative overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Title */}
        <div className={`text-center max-w-4xl mx-auto mb-20 reveal-on-scroll ${isVisible ? "active" : ""}`}>
          <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-5">
            Why PMB Enterprise?
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            At PMB Enterprise, we connect global markets through quality, reliability, and excellence.
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {benefits.map((benefit, idx) => {
            const delayClasses = [
              "reveal-delay-100",
              "reveal-delay-200",
              "reveal-delay-300",
              "reveal-delay-400",
              "reveal-delay-500",
              "reveal-delay-100"
            ];

            return (
              <div
                key={idx}
                className={`flex gap-5 items-start p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 hover:border-primary/30 transition-all hover:bg-zinc-900/80 group reveal-on-scroll ${
                  delayClasses[idx % delayClasses.length]
                } ${isVisible ? "active" : ""}`}
              >
                {/* Check Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <Check className="w-5 h-5" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {benefit.description}
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
