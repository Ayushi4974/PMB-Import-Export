"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";
import { useParams } from "next/navigation";

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

/* ─── Data ─────────────────────────────────────────────── */
const productsData: Record<string, { title: string, description: string, items: { name: string, img: string }[] }> = {
  detergent: {
    title: "Detergent",
    description: "Premium quality cleaning and washing solutions for domestic and industrial use.",
    items: [
      { name: "Washing Powder", img: "/products_real/washing_powder_v2.png" },
      { name: "Liquid Detergent", img: "/products_real/liquid_detergent_v2.png" },
      { name: "Dishwashing Liquid", img: "/products_real/dishwashing_liquid_v2.png" },
      { name: "Fabric Softener", img: "/products_real/fabric_softener.png" },
      { name: "Detergent Pods", img: "/products_real/detergent_pods.png" },
      { name: "Surface Cleaner", img: "/products_real/surface_cleaner.png" },
      { name: "Glass Cleaner", img: "/products_real/glass_cleaner_v2.png" },
      { name: "Toilet Cleaner", img: "/products_real/toilet_cleaner.png" },
      { name: "Stain Remover", img: "/products_real/stain_remover.png" },
      { name: "Bleach", img: "/products_real/bleach.png" }
    ]
  },
  spices: {
    title: "Spices",
    description: "Authentic, aromatic, and premium export-quality Indian spices.",
    items: [
      { name: "Red Chilli Powder", img: "/products_real/red_chilli_powder_v2.png" },
      { name: "Turmeric Powder", img: "/products_real/turmeric_powder.png" },
      { name: "Coriander Powder", img: "/products_real/coriander_powder_v2.png" },
      { name: "Cumin Seeds", img: "/products_real/cumin_seeds.png" },
      { name: "Black Pepper", img: "/products_real/black_pepper.png" },
      { name: "Cardamom", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/02017_0119_Kardamom%2C_Winter_in_den_Beskiden.jpg/960px-02017_0119_Kardamom%2C_Winter_in_den_Beskiden.jpg" },
      { name: "Cloves", img: "/products_real/cloves.png" },
      { name: "Cinnamon", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Cinnamomum_verum_spices.jpg/960px-Cinnamomum_verum_spices.jpg" },
      { name: "Mustard Seeds", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Mustard.png/960px-Mustard.png" },
      { name: "Garam Masala", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Garammasalaphoto.jpg/960px-Garammasalaphoto.jpg" }
    ]
  },
  grocery: {
    title: "Grocery",
    description: "Daily essential grocery products sourced and packaged to meet global standards.",
    items: [
      { name: "Premium Salt", img: "/products_real/premium_salt.png" },
      { name: "Refined Sugar", img: "/products_real/refined_sugar.png" },
      { name: "Wheat Flour", img: "/products_real/wheat_flour.png" },
      { name: "Toor Dal (Lentils)", img: "/products_real/toor_dal.png" },
      { name: "Chana Dal", img: "/products_real/chana_dal.png" },
      { name: "Sunflower Oil", img: "/products_real/sunflower_oil.png" },
      { name: "Mustard Oil", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mustard_Oil_%26_Seeds_-_Kolkata_2003-10-31_00537.JPG/960px-Mustard_Oil_%26_Seeds_-_Kolkata_2003-10-31_00537.JPG" },
      { name: "Green Tea", img: "/products_real/green_tea.jpg" },
      { name: "Coffee Beans", img: "/products_real/coffee_beans.png" },
      { name: "Jaggery", img: "/products_real/jaggery.jpg" }
    ]
  },
  rice: {
    title: "Rice",
    description: "High-grade, aromatic, and long-grain rice varieties for worldwide export.",
    items: [
      { name: "Premium Basmati Rice", img: "/products_real/premium_basmati_rice.png" },
      { name: "Sona Masoori Rice", img: "/products_real/sona_masoori_rice.png" },
      { name: "Jasmine Rice", img: "/products_real/jasmine_rice.png" },
      { name: "Brown Rice", img: "/products_real/brown_rice.png" },
      { name: "Parboiled Rice", img: "/products_real/parboiled_rice.png" },
      { name: "Sticky Rice", img: "/products_real/sticky_rice.png" },
      { name: "Sushi Rice", img: "/products_real/sushi_rice.png" },
      { name: "Black Rice", img: "/products_real/black_rice.png" },
      { name: "Broken Rice", img: "/products_real/broken_rice.png" },
      { name: "Organic Basmati", img: "/products_real/organic_basmati.png" }
    ]
  }
};

export default function ProductCategoryPage() {
  const params = useParams();
  const categorySlug = (params.category as string)?.toLowerCase();
  
  const categoryData = productsData[categorySlug] || {
    title: "Product Category",
    description: "Explore our premium range of products.",
    items: []
  };

  const { ref, visible } = useVisible();

  return (
    <>
      <Navbar />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/about_crane.png"
          alt={categoryData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 pb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 animate-slide-up-fade capitalize">
            {categoryData.title}
          </h1>
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/70">Product</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white capitalize">{categoryData.title}</span>
          </nav>
        </div>
      </section>

      {/* ── 2. Product Grid ── */}
      <section ref={ref} className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className={`text-center mb-16 reveal-on-scroll ${visible ? "active" : ""}`}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Premium Export Quality
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 capitalize">
              Our {categoryData.title} Range
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
              {categoryData.description}
            </p>
          </div>

          {categoryData.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {categoryData.items.slice(0, 5).map((item, idx) => {
                const delays = ["reveal-delay-100", "reveal-delay-200", "reveal-delay-300"];
                return (
                  <div
                    key={idx}
                    className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 reveal-scale ${delays[idx % 3]} ${visible ? "active" : ""}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      {item.img.startsWith("http") ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors transform translate-y-0 group-hover:-translate-y-1 duration-300">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-zinc-500">
              <p className="text-xl font-semibold">No products available in this category yet.</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
      <ScrollHelpers />
    </>
  );
}
