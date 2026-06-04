"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Send,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

/* ─── Testimonials ──────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "PMB Enterprise has been our trusted supplier for premium Indian spices. Their quality, aroma, and consistency help us meet global standards every time.",
    name: "Rahul Deshpande",
    role: "Spice Importer – UAE",
  },
  {
    quote:
      "We've been sourcing red onions from PMB for over 3 years. Their packaging, FSSAI certification, and timely delivery make them the most reliable exporter we work with.",
    name: "Ahmed Al-Farsi",
    role: "Wholesale Buyer – Oman",
  },
  {
    quote:
      "The Alphonso mangoes we received were top-grade with excellent shelf life. PMB's cold chain management is commendable. Highly recommended for fruit importers.",
    name: "Lin Wei",
    role: "Fruit Importer – Malaysia",
  },
  {
    quote:
      "PMB Enterprise makes the entire procurement process seamless. From inquiry to delivery, every step is professional and transparent. A truly world-class exporter.",
    name: "Sophie Martin",
    role: "Supply Chain Manager – France",
  },
  {
    quote:
      "The garlic and potato batches from PMB have never disappointed. Consistent sizing, clean packaging, and always delivered on time. Our go-to Indian export partner.",
    name: "Carlos Rivera",
    role: "Produce Buyer – Mexico",
  },
];

/* ─── Visibility Hook ─────────────────────────────────── */
function useVisible(threshold = 0.08) {
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

/* ─── Page ─────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/about_crane.png"
          alt="PMB Enterprise Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade">
            Contact Us
          </h1>
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Contact Info + Form ── */}
      <ContactSection />

      {/* ── 3. Testimonial Slider ── */}
      <TestimonialSection />

      <Footer />
      <ScrollHelpers />
    </>
  );
}

/* ─── Contact Info + Form ───────────────────────────────── */
function ContactSection() {
  const { ref, visible } = useVisible();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactItems = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Office Location",
      value: "Dev Prime, 814, Corporate Rd, opposite Palladium Building, Makarba, Ahmedabad, Gujarat 380051",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Mail Us at",
      value: "pmbimportexport2018@gmail.com",
      href: "mailto:pmbimportexport2018@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Us Directly",
      value: "+91 98987 89831",
      href: "tel:+919898789831",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — Info */}
        <div className={`reveal-left ${visible ? "active" : ""}`}>
          <span className="text-primary dark:text-accent font-bold text-sm tracking-wide block mb-4">
            Contact Us Now
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
            We&apos;re here to answer your questions.
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-base font-medium leading-relaxed mb-10">
            Have a question, suggestion, or just want to say hi?<br />
            We&apos;re here and <span className="text-primary dark:text-accent font-semibold">happy to hear from you!</span>
          </p>

          {/* Contact Items */}
          <div className="flex flex-col gap-6">
            {contactItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-500 dark:text-zinc-400 text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors leading-relaxed"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Google Map embed placeholder */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-lg h-52">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.186!2d72.5313!3d23.0098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA1JzM1LjMiTiA3MsKwMzEnNTIuNyJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PMB Enterprise Location"
            />
          </div>
        </div>

        {/* Right — Form */}
        <div className={`reveal-right reveal-delay-200 ${visible ? "active" : ""}`}>
          <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
              Get In Touch
            </h3>
            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-8">
              If you have any questions about the services we provide simply use the form below. We try and respond to all queries and comments within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Message Sent!</p>
                <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-gray-800 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-gray-800 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-gray-800 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <textarea
                  id="contact-message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-gray-800 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide rounded-xl shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonial Slider ────────────────────────────────── */
function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const { ref, visible } = useVisible();

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  });

  return (
    <section ref={ref} className="overflow-hidden">
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[420px] reveal-on-scroll ${visible ? "active" : ""}`}>

        {/* Left — Image */}
        <div className="relative min-h-[300px] lg:min-h-0">
          <Image
            src="/gal_port.png"
            alt="PMB Enterprise global shipping operations"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40 lg:to-transparent" />
        </div>

        {/* Right — Testimonial */}
        <div className="bg-zinc-950 text-white flex flex-col justify-center px-10 md:px-16 py-16 relative">
          {/* Quote icon */}
          <Quote className="w-10 h-10 text-primary mb-6 fill-primary/20" />

          {/* Quote text */}
          <blockquote className="text-xl md:text-2xl font-bold leading-relaxed text-white mb-8 min-h-[120px]">
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="mb-8">
            <p className="font-extrabold text-base text-white">{testimonials[current].name}</p>
            <p className="text-primary text-sm font-semibold">{testimonials[current].role}</p>
          </div>

          {/* Dots + Arrows */}
          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === current
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="ml-auto flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-primary border border-zinc-700 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-primary border border-zinc-700 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
