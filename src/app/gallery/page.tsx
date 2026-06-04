"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ZoomIn, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

/* ─── Types ─────────────────────────────────────────────── */
interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  tag: string;
}

/* ─── Gallery Data ──────────────────────────────────────── */
const galleryItems: GalleryItem[] = [
  { id: 1,  src: "/gal_onion.png",      title: "Premium Red Onions",       category: "Vegetables", tag: "Vegetables" },
  { id: 2,  src: "/gal_chilli.png",     title: "Chilli Flakes",            category: "Spices",     tag: "Spices" },
  { id: 3,  src: "/gal_oregano.png",    title: "Premium Oregano",          category: "Spices",     tag: "Spices" },
  { id: 4,  src: "/gal_mango.png",      title: "Alphonso Mangoes",         category: "Fruits",     tag: "Fruits" },
  { id: 5,  src: "/gal_tomato.png",     title: "Fresh Tomatoes",           category: "Vegetables", tag: "Vegetables" },
  { id: 6,  src: "/gal_potato.png",     title: "Export Potatoes",          category: "Vegetables", tag: "Vegetables" },
  { id: 7,  src: "/gal_chocolate.png",  title: "Premium Chocolates",       category: "Confectionery", tag: "Confectionery" },
  { id: 8,  src: "/gal_garlic.png",     title: "White Garlic",             category: "Vegetables", tag: "Vegetables" },
  { id: 9,  src: "/gal_banana.png",     title: "Fresh Bananas",            category: "Fruits",     tag: "Fruits" },
  { id: 10, src: "/gal_grapes.png",     title: "Green Grapes",             category: "Fruits",     tag: "Fruits" },
  { id: 11, src: "/gal_spices.png",     title: "Mixed Indian Spices",      category: "Spices",     tag: "Spices" },
  { id: 12, src: "/gal_port.png",       title: "Global Shipping Operations", category: "Operations", tag: "Operations" },
  { id: 13, src: "/prod_onion.png",     title: "Onion Export Batch",       category: "Vegetables", tag: "Vegetables" },
  { id: 14, src: "/prod_mango.png",     title: "Mango Export Pack",        category: "Fruits",     tag: "Fruits" },
  { id: 15, src: "/prod_tomato.png",    title: "Tomato Grade A",           category: "Vegetables", tag: "Vegetables" },
  { id: 16, src: "/prod_chocolate.png", title: "Chocolate Collection",     category: "Confectionery", tag: "Confectionery" },
];

const categories = ["All", "Vegetables", "Fruits", "Spices", "Confectionery", "Operations"];

/* ─── Visibility Hook ─────────────────────────────────── */
function useVisible(threshold = 0.05) {
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
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextItem = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/about_crane.png"
          alt="PMB Enterprise Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade">
            Gallery
          </h1>
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Gallery</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Intro ── */}
      <IntroSection />

      {/* ── 3. Filter + Grid ── */}
      <GalleryGrid
        items={filtered}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onImageClick={openLightbox}
      />

      <Footer />
      <ScrollHelpers />

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm tracking-wide z-10">
            {filtered[lightboxIndex]?.title}
          </p>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); prevItem(); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] px-20 md:px-24 mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-zinc-900">
              <Image
                src={filtered[lightboxIndex]?.src ?? ""}
                alt={filtered[lightboxIndex]?.title ?? ""}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); nextItem(); }}
            aria-label="Next"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-semibold tracking-widest z-10">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}

/* ─── Intro ─────────────────────────────────────────────── */
function IntroSection() {
  const { ref, visible } = useVisible();
  return (
    <section ref={ref} className="py-14 md:py-18 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className={`reveal-on-scroll ${visible ? "active" : ""}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Our Products &amp; Operations
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            A Glimpse of PMB Enterprise Quality
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-base font-medium leading-relaxed">
            From farm-fresh produce to global shipping operations — explore our wide range of export-quality products that reach 20+ countries worldwide.
          </p>
          <div className="mt-6 w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Grid ──────────────────────────────────────── */
function GalleryGrid({
  items,
  categories,
  activeCategory,
  onCategoryChange,
  onImageClick,
}: {
  items: GalleryItem[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onImageClick: (idx: number) => void;
}) {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="pb-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 reveal-on-scroll ${visible ? "active" : ""}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${activeCategory}`}
              className={`break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-zoom-in reveal-scale reveal-delay-${
                ((idx % 4) + 1) * 100
              } ${visible ? "active" : ""}`}
              onClick={() => onImageClick(idx)}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-end p-5">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-white font-bold text-sm text-center leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-accent bg-black/40 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Item count */}
        <p className="text-center text-gray-400 dark:text-zinc-600 text-sm font-semibold mt-10">
          Showing {items.length} item{items.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </p>
      </div>
    </section>
  );
}
