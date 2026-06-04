"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ZoomIn, X, Award, Shield, Globe2, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

/* ─── Types ─────────────────────────────────────────────── */
interface CertItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  year: string;
}

/* ─── Certificate Data ─────────────────────────────────── */
const certificates: CertItem[] = [
  {
    id: 1,
    title: "FSSAI License",
    subtitle: "Food Safety and Standards Authority of India",
    description:
      "Central License issued under FSS Act, 2006 for Trade/Retail/Merchant-Exporter. Authorises PMB Enterprise to operate as a licensed food business entity across India.",
    image: "/cert_fssai.png",
    badge: "Government of India",
    icon: <Shield className="w-5 h-5" />,
    color: "from-blue-600 to-blue-800",
    year: "Central License",
  },
  {
    id: 2,
    title: "US FDA Registration",
    subtitle: "U.S. Food and Drug Administration",
    description:
      "Official Certificate of Registration for food facility export to the United States market. PMB Enterprise is registered and compliant with all US food safety regulations.",
    image: "/cert_fda.png",
    badge: "USA Certified",
    icon: <Globe2 className="w-5 h-5" />,
    color: "from-indigo-600 to-indigo-800",
    year: "2024",
  },
  {
    id: 3,
    title: "IEC — Importer-Exporter Code",
    subtitle: "Ministry of Commerce & Industry, DGFT",
    description:
      "Importer-Exporter Code issued by the Directorate General of Foreign Trade, Government of India. Mandatory certification enabling PMB Enterprise to engage in international trade.",
    image: "/cert_iec.png",
    badge: "DGFT Certified",
    icon: <Award className="w-5 h-5" />,
    color: "from-primary to-blue-900",
    year: "DGFT",
  },
  {
    id: 4,
    title: "APEDA Membership",
    subtitle: "Agricultural & Processed Food Products Export Development Authority",
    description:
      "Registration-cum-Membership Certificate from APEDA, Government of India. Enables PMB Enterprise to export a wide range of agricultural and processed food products globally.",
    image: "/cert_apeda.png",
    badge: "APEDA Member",
    icon: <Leaf className="w-5 h-5" />,
    color: "from-emerald-600 to-green-800",
    year: "APEDA",
  },
];

/* ─── Visibility Hook ─────────────────────────────────── */
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Page ─────────────────────────────────────────────── */
export default function CertificatePage() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openLightbox = (img: string, title: string) => {
    setLightboxImg(img);
    setLightboxTitle(title);
  };

  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/about_crane.png"
          alt="PMB Enterprise Certificates Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade">
            Certificate
          </h1>
          <nav
            className="flex items-center gap-2 text-sm font-semibold text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Certificate</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Intro Tagline ── */}
      <IntroSection />

      {/* ── 3. Certificate Cards Grid ── */}
      <CertificatesGrid certs={certificates} onZoom={openLightbox} />

      {/* ── 4. Trust Strip ── */}
      <TrustStrip />

      {/* ── Spacer / CTA between sections ── */}
      <section className="bg-white dark:bg-zinc-950 py-14 border-t border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 dark:text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">Ready to trade globally?</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            PMB Enterprise — Your Certified Global Trade Partner
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-wide rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
      <ScrollHelpers />

      {/* ── Lightbox Modal ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
            onClick={() => setLightboxImg(null)}
            aria-label="Close certificate view"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold">
            {lightboxTitle}
          </p>
          <div
            className="relative max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-white mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImg}
              alt={lightboxTitle}
              width={900}
              height={700}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Intro Section ─────────────────────────────────────── */
function IntroSection() {
  const { ref, visible } = useVisible();
  return (
    <section ref={ref} className="py-16 md:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className={`reveal-on-scroll ${visible ? "active" : ""}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            Certified &amp; Trusted
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
            We have taken Indian government and Export board memberships and certificates.
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            PMB Enterprise holds all mandatory government certifications and international export
            compliance certificates — ensuring every shipment meets the highest regulatory standards.
          </p>
          <div className="mt-8 w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ─── Certificates Grid ─────────────────────────────────── */
function CertificatesGrid({
  certs,
  onZoom,
}: {
  certs: CertItem[];
  onZoom: (img: string, title: string) => void;
}) {
  const { ref, visible } = useVisible(0.05);
  const delays = [
    "reveal-delay-100",
    "reveal-delay-200",
    "reveal-delay-300",
    "reveal-delay-400",
  ];

  return (
    <section ref={ref} className="pb-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {certs.map((cert, idx) => (
            <div
              key={cert.id}
              className={`group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 reveal-scale ${
                delays[idx % delays.length]
              } ${visible ? "active" : ""}`}
            >
              {/* Certificate Image Panel */}
              <div className="relative aspect-[4/3] bg-gray-50 dark:bg-zinc-800 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Zoom Overlay */}
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center cursor-zoom-in"
                  onClick={() => onZoom(cert.image, cert.title)}
                  role="button"
                  aria-label={`View ${cert.title} fullscreen`}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
                    <ZoomIn className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Authority Badge */}
                <div
                  className={`absolute top-4 left-4 bg-gradient-to-r ${cert.color} text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
                >
                  {cert.icon}
                  {cert.badge}
                </div>

                {/* Year/Type Tag */}
                <div className="absolute top-4 right-4 bg-white dark:bg-zinc-950 text-primary dark:text-accent text-[11px] font-black px-3 py-1.5 rounded-full shadow border border-gray-100 dark:border-zinc-800">
                  {cert.year}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
                  {cert.title}
                </h3>
                <p className="text-primary dark:text-accent text-[11px] font-bold uppercase tracking-widest mb-3">
                  {cert.subtitle}
                </p>
                <div className="w-10 h-0.5 bg-accent mb-4" />
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  {cert.description}
                </p>
                <button
                  id={`cert-view-btn-${cert.id}`}
                  onClick={() => onZoom(cert.image, cert.title)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-accent hover:underline underline-offset-4 transition-all cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Strip ───────────────────────────────────────── */
function TrustStrip() {
  const { ref, visible } = useVisible();
  const items = [
    { label: "FSSAI Licensed", icon: "🛡️" },
    { label: "US FDA Registered", icon: "🇺🇸" },
    { label: "IEC Certified", icon: "🌐" },
    { label: "APEDA Member", icon: "🌿" },
  ];

  return (
    <section ref={ref} className="py-16 pb-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`text-center mb-10 reveal-on-scroll ${visible ? "active" : ""}`}>
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">
            PMB Enterprise — Fully Compliant
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            All Certifications In One Place
          </h3>
        </div>
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll reveal-delay-200 ${
            visible ? "active" : ""
          }`}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-3 p-7 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-primary/40 hover:bg-zinc-800/80 transition-all duration-300 group text-center"
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
