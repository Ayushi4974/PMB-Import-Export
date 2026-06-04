"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Award, Truck, ShieldCheck, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Data ─────────────────────────────────────────────────── */

const benefits = [
  {
    title: "Integrity & Transparency",
    description:
      "We conduct business with honesty, fairness, and transparency, fostering trust with customers and partners worldwide.",
  },
  {
    title: "Innovation & Progress",
    description:
      "We embrace modern technologies and evolving market trends to continuously improve our services and operations.",
  },
  {
    title: "Collaboration",
    description:
      "We believe strong teamwork and mutual respect are essential to achieving shared goals and long-term success.",
  },
  {
    title: "Customer Satisfaction",
    description:
      "Our commitment is to provide exceptional service, responsive support, and a seamless customer experience.",
  },
  {
    title: "Diverse Product Portfolio",
    description:
      "We offer a wide range of carefully sourced products to meet the needs of global markets and industries.",
  },
  {
    title: "Excellence in Service",
    description:
      "From sourcing to delivery, we are dedicated to providing professional, reliable, and efficient solutions.",
  },
];

const stats = [
  { value: 8,    suffix: "+",  label: "Years of Experience",           icon: <Award      className="w-5 h-5" /> },
  { value: 2000, suffix: "+",  label: "Tons Export Annually Across the world", icon: <Truck      className="w-5 h-5" /> },
  { value: 20,   suffix: "+",  label: "Countries Exported",             icon: <ShieldCheck className="w-5 h-5" /> },
  { value: 1000, suffix: "+",  label: "Customer Satisfaction",          icon: <Star       className="w-5 h-5" /> },
];

const features = [
  {
    title: "Direct Procurement",
    description:
      "We source products directly from reputable growers, manufacturers, and certified suppliers to maintain superior quality.",
    bgClass: "bg-zinc-900 border-zinc-800",
    icon: <Award className="w-8 h-8 text-accent mb-4" />,
  },
  {
    title: "Seamless Global Distribution",
    description:
      "With strong shipping and freight partnerships, we ensure safe and timely deliveries worldwide.",
    bgClass: "bg-zinc-950 border-zinc-900",
    icon: <Truck className="w-8 h-8 text-accent mb-4" />,
  },
  {
    title: "Excellence in Quality Control",
    description:
      "Our strict inspection processes guarantee products that meet the highest industry and export standards.",
    bgClass: "bg-zinc-800 border-zinc-700",
    icon: <ShieldCheck className="w-8 h-8 text-accent mb-4" />,
  },
];

const philosophyCards = [
  {
    title: "Our Mission",
    description:
      "To bridge global markets with high-quality products and efficient export services, ensuring reliability, value, and customer satisfaction at every step.",
    image: "/mission_bg.png",
  },
  {
    title: "Our Vision",
    description:
      "To be a preferred international trade partner, recognized for excellence, innovation, and a commitment to sustainable business growth.",
    image: "/vision_bg.png",
  },
  {
    title: "Our Core Values",
    description:
      "We believe in trust, professionalism, collaboration, and continuous improvement, enabling us to deliver outstanding products and services to customers worldwide.",
    image: "/values_bg.png",
  },
];

/* ─── CountUp helper ────────────────────────────────────────── */
function CountUpNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ─── Section hook ──────────────────────────────────────────── */
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <Image
          src="/about_banner.png"
          alt="About Us banner"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 animate-slide-up-fade">
            About Us
          </h1>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Who We Are ── */}
      <WhoWeAreSection />

      {/* ── 3. Why PMB Enterprise — dark block ── */}
      <WhySection />

      {/* ── 4. Stats ── */}
      <StatsSection />

      {/* ── 5. Our Features ── */}
      <FeaturesSection />

      {/* ── 6. Mission / Vision / Values ── */}
      <MissionSection />

      <Footer />
    </>
  );
}

/* ─── Who We Are ────────────────────────────────────────────── */
function WhoWeAreSection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left – portrait with experience badge */}
        <div className={`lg:col-span-5 relative flex justify-center lg:justify-start reveal-left ${visible ? "active" : ""}`}>
          <div className="relative w-full max-w-[400px]">
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 group">
              <Image
                src="/founder_sagar.png"
                alt="Founder at international exhibition"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Experience badge — bottom-right overlap */}
            <div className="absolute bottom-8 right-0 translate-x-4 bg-primary text-white rounded-2xl px-6 py-5 shadow-2xl text-center min-w-[110px]">
              <span className="block text-5xl font-black leading-none">8</span>
              <span className="block text-xs font-bold tracking-widest uppercase mt-1 text-white/80">
                Years of<br />Experience
              </span>
            </div>
          </div>
        </div>

        {/* Right – bio copy */}
        <div className={`lg:col-span-7 reveal-right reveal-delay-200 ${visible ? "active" : ""}`}>
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

/* ─── Why PMB Enterprise (dark) ───────────────────────────────── */
function WhySection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className={`text-center max-w-4xl mx-auto mb-20 reveal-on-scroll ${visible ? "active" : ""}`}>
          <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-5">
            Why PMB Enterprise?
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            At PMB Enterprise, we connect global markets through quality, reliability, and excellence.
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {benefits.map((b, idx) => {
            const delays = [
              "reveal-delay-100","reveal-delay-200","reveal-delay-300",
              "reveal-delay-400","reveal-delay-500","reveal-delay-100",
            ];
            return (
              <div
                key={idx}
                className={`flex gap-5 items-start p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 hover:border-primary/30 transition-all hover:bg-zinc-900/80 group reveal-on-scroll ${delays[idx % delays.length]} ${visible ? "active" : ""}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">{b.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─────────────────────────────────────────────────── */
function StatsSection() {
  const { ref, visible } = useVisible(0.05);

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 reveal-on-scroll ${visible ? "active" : ""}`}>
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-zinc-900 text-primary dark:text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                {s.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight flex items-baseline">
                <CountUpNumber target={s.value} />
                <span className="text-accent ml-0.5">{s.suffix}</span>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-500 dark:text-zinc-400 mt-3 max-w-[165px] leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Our Features block ────────────────────────────────────── */
function FeaturesSection() {
  const { ref, visible } = useVisible(0.05);

  return (
    <section ref={ref} className="py-8 pb-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`reveal-on-scroll reveal-delay-200 ${visible ? "active" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-900">
            {/* Label block */}
            <div className="bg-primary text-white p-12 md:p-16 flex flex-col justify-center">
              <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">
                Why Choose Us
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Our Features
              </h3>
              <div className="w-12 h-1.5 bg-accent mt-6" />
            </div>

            {features.map((f, idx) => (
              <div
                key={idx}
                className={`text-white p-12 md:p-16 flex flex-col justify-center ${f.bgClass} hover:opacity-95 transition-opacity duration-300`}
              >
                {f.icon}
                <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mission / Vision / Core Values ───────────────────────── */
function MissionSection() {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {philosophyCards.map((card, idx) => {
            const delays = ["reveal-delay-100","reveal-delay-200","reveal-delay-300"];
            return (
              <div
                key={idx}
                className={`relative aspect-[3/4] md:aspect-[0.9] lg:aspect-[0.8] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 bg-black flex flex-col justify-end p-8 md:p-10 group reveal-scale ${delays[idx % delays.length]} ${visible ? "active" : ""}`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-[3000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
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
