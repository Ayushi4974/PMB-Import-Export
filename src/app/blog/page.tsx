"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

/* ─── Types ─────────────────────────────────────────────── */
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  day: string;
  month: string;
  year: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

/* ─── Blog Data ─────────────────────────────────────────── */
const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "india-onion-export-guide-2025",
    title: "India's Onion Export Industry: Complete Guide for 2025",
    excerpt:
      "India is one of the world's largest onion exporters. In this guide, we cover export trends, quality standards, key markets, and how PMB Enterprise ensures top-grade onions reach global buyers.",
    image: "/blog_onion.png",
    category: "Vegetables",
    day: "15",
    month: "May",
    year: "2025",
    date: "15 May 2025",
    readTime: "6 min read",
    author: "PMB Export Team",
    featured: true,
  },
  {
    id: 2,
    slug: "alphonso-mango-export-season",
    title: "Alphonso Mango Export Season: What Importers Need to Know",
    excerpt:
      "The Alphonso mango season in India runs from March to June. Discover how to source premium Alphonso mangoes, packaging standards, cold chain logistics, and how PMB Enterprise ensures every shipment is perfectly ripe.",
    image: "/gal_mango.png",
    category: "Fruits",
    day: "02",
    month: "Jan",
    year: "2025",
    date: "02 Jan 2025",
    readTime: "5 min read",
    author: "PMB Export Team",
    featured: true,
  },
  {
    id: 3,
    slug: "indian-spices-global-demand",
    title: "Rising Global Demand for Indian Spices: Opportunities for Exporters",
    excerpt:
      "Indian spices like chilli, turmeric, cumin, and coriander are experiencing record global demand. Learn about the export landscape, quality certifications, and how PMB Enterprise is catering to worldwide spice buyers.",
    image: "/gal_spices.png",
    category: "Spices",
    day: "20",
    month: "Oct",
    year: "2025",
    date: "20 Oct 2025",
    readTime: "7 min read",
    author: "PMB Export Team",
    featured: true,
  },
  {
    id: 4,
    slug: "fssai-apeda-export-compliance",
    title: "FSSAI & APEDA Compliance: Why Certifications Matter in Food Export",
    excerpt:
      "Exporting food products from India requires strict compliance with FSSAI, APEDA, and international food safety standards. This blog explains why PMB Enterprise holds all necessary certifications and what it means for buyers.",
    image: "/cert_fssai.png",
    category: "Compliance",
    day: "08",
    month: "Mar",
    year: "2025",
    date: "08 Mar 2025",
    readTime: "4 min read",
    author: "PMB Export Team",
  },
  {
    id: 5,
    slug: "global-shipping-logistics-agri-export",
    title: "How PMB Enterprise Ensures Timely Global Shipping",
    excerpt:
      "From Gujarat to 20+ countries worldwide — discover our end-to-end logistics process including cold chain management, freight forwarding, customs clearance, and real-time shipment tracking for agricultural commodities.",
    image: "/gal_port.png",
    category: "Logistics",
    day: "12",
    month: "Apr",
    year: "2025",
    date: "12 Apr 2025",
    readTime: "5 min read",
    author: "PMB Export Team",
  },
  {
    id: 6,
    slug: "premium-chocolates-confectionery-export",
    title: "Indian Confectionery Going Global: The Story Behind the Sweet Export",
    excerpt:
      "India's confectionery and chocolate industry is booming. From premium chocolate assortments to traditional Indian sweets, PMB Enterprise is helping Indian confectionery brands reach international shelves.",
    image: "/gal_chocolate.png",
    category: "Confectionery",
    day: "25",
    month: "Feb",
    year: "2025",
    date: "25 Feb 2025",
    readTime: "4 min read",
    author: "PMB Export Team",
  },
];

const categories = ["All", "Vegetables", "Fruits", "Spices", "Compliance", "Logistics", "Confectionery"];

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
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogs.filter((b) => b.featured);

  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/about_crane.png"
          alt="PMB Enterprise Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade">
            Blog
          </h1>
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Featured Posts Row (Reference-style date badge cards) ── */}
      <FeaturedSection posts={featured} />

      {/* ── 3. All Posts Grid with Filter + Search ── */}
      <AllPostsSection
        posts={filtered}
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      <Footer />
      <ScrollHelpers />
    </>
  );
}

/* ─── Featured Section (matches reference design) ────────── */
function FeaturedSection({ posts }: { posts: BlogPost[] }) {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Label */}
        <div className={`text-center mb-12 reveal-on-scroll ${visible ? "active" : ""}`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Latest Articles
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Insights from PMB Enterprise
          </h2>
        </div>

        {/* 3-Column Reference-style Cards with Date Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            const delays = ["reveal-delay-100", "reveal-delay-200", "reveal-delay-300"];
            return (
              <article
                key={post.id}
                className={`group reveal-scale ${delays[idx % delays.length]} ${visible ? "active" : ""}`}
              >
                {/* Image Container with Date Badge (reference style) */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-0 shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Date Badge — reference style top-right */}
                  <div className="absolute top-4 right-4 bg-primary text-white text-center px-4 py-3 rounded-xl shadow-lg min-w-[72px]">
                    <span className="block text-2xl font-black leading-none">{post.day}</span>
                    <span className="block text-[11px] font-bold tracking-wide mt-0.5">
                      {post.month} {post.year}
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-accent text-black text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-b-2xl -mt-2 px-6 pt-6 pb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-3 leading-snug tracking-tight group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-zinc-500 font-semibold">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-primary dark:text-accent text-xs font-black hover:underline underline-offset-4 transition-all"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── All Posts Section ─────────────────────────────────── */
function AllPostsSection({
  posts,
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: {
  posts: BlogPost[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (c: string) => void;
  onSearchChange: (q: string) => void;
}) {
  const { ref, visible } = useVisible();

  return (
    <section ref={ref} className="py-16 pb-24 bg-gray-50 dark:bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Bar: Search + Filters */}
        <div className={`flex flex-col md:flex-row gap-4 mb-10 reveal-on-scroll ${visible ? "active" : ""}`}>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full text-sm font-medium text-gray-700 dark:text-zinc-200 placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-accent transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`blog-filter-${cat.toLowerCase()}`}
                onClick={() => onCategoryChange(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
              >
                <Tag className="w-3 h-3" />
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-zinc-500">
            <p className="text-xl font-semibold">No blogs found.</p>
            <p className="text-sm mt-2">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => {
              const delays = ["reveal-delay-100","reveal-delay-200","reveal-delay-300"];
              return (
                <article
                  key={post.id}
                  className={`group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col reveal-scale ${
                    delays[idx % delays.length]
                  } ${visible ? "active" : ""}`}
                >
                  {/* Thumbnail with Date Badge */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-primary text-white text-center px-4 py-3 rounded-xl shadow-lg min-w-[72px]">
                      <span className="block text-2xl font-black leading-none">{post.day}</span>
                      <span className="block text-[11px] font-bold tracking-wide mt-0.5">
                        {post.month} {post.year}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-accent text-black text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2 leading-snug tracking-tight group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-accent mb-3" />
                    <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-zinc-500 font-semibold">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-primary dark:text-accent hover:underline underline-offset-4 transition-all"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
