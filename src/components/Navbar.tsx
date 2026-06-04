"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Globe, FileText, Menu, X, ArrowRight } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" }
];

const productsList = [
  { name: "Detergent", href: "/products/detergent" },
  { name: "Spices", href: "/products/spices" },
  { name: "Grocery", href: "/products/grocery" },
  { name: "Rice", href: "/products/rice" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    // Add Google Translate script if it's not already added
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    // Read current language from cookie on mount
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const googtrans = getCookie("googtrans");
    if (googtrans) {
      const code = googtrans.split("/").pop(); // get 'hi' from '/en/hi'
      const foundLang = languages.find(l => l.code === code);
      if (foundLang) {
        setCurrentLang(foundLang.name);
      }
    }
  }, []);

  const handleLanguageChange = (langCode: string, langName: string) => {
    setCurrentLang(langName);
    setLangDropdownOpen(false);

    const host = window.location.hostname;
    if (langCode === "en") {
      // Clear cookies for default English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
    } else {
      const cookieValue = `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${host};`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${host};`;
    }

    // Attempt to translate without reload first, else reload to apply
    const translateCombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (translateCombo) {
      translateCombo.value = langCode;
      translateCombo.dispatchEvent(new Event("change"));
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-md py-4 border-b border-gray-100 dark:border-zinc-800"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-full text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <Globe className="w-6 h-6 animate-pulse-subtle" />
            <div className="absolute inset-0 rounded-full border border-accent/40 animate-ping opacity-30"></div>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-xl tracking-wider transition-colors duration-300 ${
              isScrolled ? "text-primary dark:text-white" : "text-white"
            }`}>
              PMB
            </span>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-accent -mt-1">
              ENTERPRISE
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/about-us"
            className={`font-semibold text-sm tracking-wide hover:text-accent transition-colors ${
              isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
            }`}
          >
            ABOUT
          </Link>
          
          {/* Products Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className={`flex items-center gap-1 font-semibold text-sm tracking-wide hover:text-accent transition-colors focus:outline-none cursor-pointer ${
                isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
              }`}
            >
              PRODUCTS <ChevronDown className="w-4 h-4" />
            </button>

            {productsDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-0 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-xl py-2 z-50 animate-fade-in"
              >
                {productsList.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/certificate"
            className={`font-semibold text-sm tracking-wide hover:text-accent transition-colors ${
              isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
            }`}
          >
            CERTIFICATE
          </Link>
          <Link
            href="/gallery"
            className={`font-semibold text-sm tracking-wide hover:text-accent transition-colors ${
              isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
            }`}
          >
            GALLERY
          </Link>
          <Link
            href="/blog"
            className={`font-semibold text-sm tracking-wide hover:text-accent transition-colors ${
              isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
            }`}
          >
            BLOG
          </Link>
          <Link
            href="/contact"
            className={`font-semibold text-sm tracking-wide hover:text-accent transition-colors ${
              isScrolled ? "text-gray-700 dark:text-zinc-300" : "text-white/90"
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Right Nav Options (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selection */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                isScrolled
                  ? "border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-gray-100"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Globe className="w-4 h-4 text-accent" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                {languages.map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLanguageChange(lang.code, lang.name)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-accent transition-colors font-medium"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brochure Button */}
          <a
            href="/pmb_brochure.pdf"
            download="PMB_Import_Export_Brochure.pdf"
            target="_blank"
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 text-sm font-semibold tracking-wide transition-all ${
              isScrolled
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white text-white hover:bg-white hover:text-primary"
            }`}
          >
            <FileText className="w-4 h-4" />
            Brochure
          </a>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Language toggle for mobile */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`p-2 rounded-lg border ${
                isScrolled
                  ? "border-gray-200 text-gray-700"
                  : "border-white/20 text-white"
              }`}
            >
              <Globe className="w-4 h-4 text-accent" />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-xl py-1 z-50">
                {languages.map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLanguageChange(lang.code, lang.name)}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary font-medium"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-950 h-full p-8 flex flex-col relative shadow-2xl animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-9 h-9 flex items-center justify-center bg-primary rounded-full text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider text-primary dark:text-white">
                  PMB
                </span>
                <span className="text-[9px] tracking-[0.25em] font-semibold text-accent -mt-1">
                  ENTERPRISE
                </span>
              </div>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col gap-6 text-lg font-medium mb-12">
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between"
              >
                ABOUT <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between w-full font-medium"
                >
                  PRODUCTS 
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                
                {mobileProductsOpen && (
                  <div className="flex flex-col pl-4 gap-4 mt-2 border-l-2 border-gray-100 dark:border-zinc-800">
                    {productsList.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className="text-base text-gray-600 dark:text-zinc-400 hover:text-primary dark:hover:text-accent flex items-center justify-between"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/certificate"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between"
              >
                CERTIFICATE <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between"
              >
                GALLERY <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between"
              >
                BLOG <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-accent flex items-center justify-between"
              >
                CONTACT <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </nav>

            {/* Mobile CTAs */}
            <div className="mt-auto flex flex-col gap-4">
              <a
                href="/pmb_brochure.pdf"
                download="PMB_Import_Export_Brochure.pdf"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-center font-semibold transition-colors shadow-lg shadow-primary/20"
              >
                <FileText className="w-5 h-5" />
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      )}
      <div id="google_translate_element" style={{ display: "none" }} />
    </header>
  );
}
