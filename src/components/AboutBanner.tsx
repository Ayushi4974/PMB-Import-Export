"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function AboutBanner() {
  return (
    <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/about_banner.png"
        alt="PMB Enterprise - About Us"
        fill
        priority
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade">
          About Us
        </h1>
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm font-semibold text-white/70"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">About Us</span>
        </nav>
      </div>
    </section>
  );
}
