"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProductItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageFirst: boolean;
}

const products: ProductItem[] = [
  {
    id: "fruits",
    category: "Fruits",
    title: "Farm-fresh Indian Fruits",
    description: "Sourcing and exporting high-purity, naturally ripened tropical fruits like Alphonso mangoes, grapes, and pomegranates to international markets.",
    image: "/prod_mango.png",
    imageFirst: true
  },
  {
    id: "vegetables",
    category: "Vegetables",
    title: "Premium Indian Vegetables",
    description: "Freshly harvested, sorted, and packed under strict hygiene conditions. We supply high-quality potatoes, garlic, ginger, and green vegetables.",
    image: "/prod_tomato.png",
    imageFirst: true
  },
  {
    id: "confectionery",
    category: "Confectionery",
    title: "Premium Confectionery",
    description: "Delivering the taste of India to the world with premium quality chocolate, candies, traditional sweets, and artisanal baking ingredients.",
    image: "/prod_chocolate.png",
    imageFirst: false
  },
  {
    id: "onions",
    category: "Onions",
    title: "Fresh Red Onions",
    description: "As India's top onion exporter, we provide premium grade red onions in various sizes, optimized for global transit and long shelf life.",
    image: "/prod_onion.png",
    imageFirst: false
  }
];

export default function ProductGrid() {
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
    <section id="products" ref={sectionRef} className="py-24 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 reveal-on-scroll ${isVisible ? "active" : ""}`}>
          <div className="max-w-2xl">
            <span className="text-primary dark:text-accent font-bold text-sm uppercase tracking-widest block mb-4">
              Export Categories
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              Our Products
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-lg">
              At PMB Enterprise, we specialize in providing reliable import-export and logistics solutions that help businesses trade confidently across global markets. Through our trusted network of shipping and logistics partners, we ensure smooth transportation, efficient customs clearance, and timely deliveries. Whether you are importing products or expanding your reach internationally, we make global trade simple, secure, and hassle-free.
            </p>
          </div>
          <button className="self-start md:self-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white text-base font-semibold tracking-wide rounded-full shadow-lg hover:shadow-primary/30 transition-all cursor-pointer">
            View All Products
          </button>
        </div>
      </div>

      {/* Seamless Grid Container */}
      <div className={`max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 reveal-on-scroll reveal-delay-200 ${isVisible ? "active" : ""}`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="checker-card flex flex-col sm:grid sm:grid-cols-2 overflow-hidden rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 group"
          >
            {/* Image Block */}
            <div className={`checker-image-container relative aspect-square sm:aspect-auto w-full h-full min-h-[220px] ${
              product.imageFirst ? "order-1" : "order-1 sm:order-2"
            }`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Block */}
            <div className={`flex flex-col justify-center p-8 bg-primary dark:bg-zinc-900 text-white transition-colors duration-300 ${
              product.imageFirst ? "order-2" : "order-2 sm:order-1"
            }`}>
              <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">
                {product.category}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold mb-4 flex items-center gap-1">
                {product.title}
              </h3>
              <p className="text-white/80 dark:text-zinc-300 text-sm leading-relaxed mb-6 font-medium">
                {product.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors group/link mt-auto self-start"
              >
                Learn More 
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
