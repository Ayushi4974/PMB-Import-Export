"use client";

import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 text-white border-t border-zinc-900 pt-20 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
        
        {/* Column 1: Company Profile */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-9 h-9 flex items-center justify-center bg-primary rounded-full text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-white">
                PMB
              </span>
              <span className="text-[9px] tracking-[0.25em] font-semibold text-accent -mt-1">
                ENTERPRISE
              </span>
            </div>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
            PMB Enterprise is a premier global trade and logistics partner specializing in exporting fresh, high-quality agricultural products from India to major ports around the world.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm font-semibold text-zinc-400">
            <li>
              <Link href="/about-us" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">About Us</Link>
            </li>
            <li className="flex flex-col gap-2 group/prod">
              <span className="text-sm font-semibold text-zinc-300 cursor-default flex items-center gap-1 hover:text-white transition-colors">
                Products
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 group-hover/prod:rotate-180 group-hover/prod:text-white" />
              </span>
              <ul className="pl-4 flex flex-col gap-2 border-l border-zinc-800 text-sm font-medium text-zinc-400 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover/prod:max-h-48 group-hover/prod:opacity-100 group-hover/prod:mt-1">
                <li>
                  <Link href="/products/detergent" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Detergent</Link>
                </li>
                <li>
                  <Link href="/products/spices" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Spices</Link>
                </li>
                <li>
                  <Link href="/products/grocery" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Grocery</Link>
                </li>
                <li>
                  <Link href="/products/rice" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Rice</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/certificate" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Certificates</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Gallery</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Blog</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-transform duration-200 inline-block">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="lg:col-span-3">
          <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">
            Contact Details
          </h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
            <li className="flex gap-3.5 items-start">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                PMB Enterprise Chambers, Sector-11, Kalamboli, Navi Mumbai, Maharashtra, 410218, India.
              </span>
            </li>
            <li className="flex gap-3.5 items-center">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <a href="tel:+912212345678" className="hover:text-white transition-colors">+91 22 1234 5678</a>
            </li>
            <li className="flex gap-3.5 items-center">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a href="mailto:info@pmbenterprise.co.in" className="hover:text-white transition-colors">info@pmbenterprise.co.in</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="lg:col-span-3">
          <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-6">
            Newsletter
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
            Subscribe to our newsletter to receive the latest updates about international market rates and crop seasons.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email Address"
              className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl text-sm focus:outline-none focus:border-primary transition-all font-semibold"
              required
            />
            <button
              type="submit"
              className="py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/20 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
        <span>
          © {new Date().getFullYear()} PMB Enterprise. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
