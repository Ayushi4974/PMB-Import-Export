"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Award, Star, Truck } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  bgClass: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Direct Procurement",
    description:
      "We source products directly from reputable growers, manufacturers, and certified suppliers to maintain superior quality.",
    bgClass: "bg-zinc-900 border-zinc-800",
    icon: <Award className="w-8 h-8 text-accent mb-4" />
  },
  {
    title: "Seamless Global Distribution",
    description:
      "With strong shipping and freight partnerships, we ensure safe and timely deliveries worldwide.",
    bgClass: "bg-zinc-950 border-zinc-900",
    icon: <Truck className="w-8 h-8 text-accent mb-4" />
  },
  {
    title: "Excellence in Quality Control",
    description:
      "Our strict inspection processes guarantee products that meet the highest industry and export standards.",
    bgClass: "bg-zinc-800 border-zinc-700",
    icon: <ShieldCheck className="w-8 h-8 text-accent mb-4" />
  }
];

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: 8, suffix: "+", label: "Years of Experience", icon: <Award className="w-5 h-5" /> },
  { value: 2000, suffix: "+", label: "Tons Export Annually Across the world", icon: <Truck className="w-5 h-5" /> },
  { value: 20, suffix: "+", label: "Countries Exported", icon: <ShieldCheck className="w-5 h-5" /> },
  { value: 1000, suffix: "+", label: "Customer Satisfaction", icon: <Star className="w-5 h-5" /> }
];

function CountUpNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export default function StatsFeaturesVertical() {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top: Animated Stats Counter Row */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 reveal-on-scroll ${isVisible ? "active" : ""}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-zinc-900 text-primary dark:text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight flex items-baseline">
                <CountUpNumber target={stat.value} />
                <span className="text-accent ml-0.5">{stat.suffix}</span>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-500 dark:text-zinc-400 mt-3 max-w-[165px] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom: 4-Panel Features Block */}
        <div className={`reveal-on-scroll reveal-delay-200 ${isVisible ? "active" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-900">

            {/* Label Block */}
            <div className="bg-primary text-white p-12 md:p-16 flex flex-col justify-center">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">
                Why Choose Us
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Our Features
              </h3>
              <div className="w-12 h-1.5 bg-accent mt-6" />
            </div>

            {/* Feature Cards */}
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`text-white p-12 md:p-16 flex flex-col justify-center ${feature.bgClass} hover:opacity-95 transition-opacity duration-300`}
              >
                {feature.icon}
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
