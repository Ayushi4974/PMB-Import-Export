import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PromoVideo from "@/components/PromoVideo";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

export const metadata: Metadata = {
  title: "PMB Enterprise | India's Top Onion Exporter & Global Trade Solutions",
  description:
    "PMB Enterprise is a leading B2B agricultural exporter from India. Sourcing premium red onions, fresh fruits, vegetables, and quality confectionery for international markets.",
  keywords: [
    "Onion Exporter",
    "India Onion Export",
    "Agri-commodities",
    "PMB Enterprise",
    "Global Trade",
    "Fruits Export",
    "Vegetable Export",
    "Confectionery Export"
  ],
  authors: [{ name: "PMB Enterprise" }],
  openGraph: {
    title: "PMB Enterprise | India's Top Onion Exporter & Global Trade Solutions",
    description:
      "Sourcing premium red onions, fresh fruits, vegetables, and quality confectionery directly from certified Indian farms to global ports.",
    url: "https://pmbenterprise.co.in",
    siteName: "PMB Enterprise",
    locale: "en_US",
    type: "website"
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 overflow-x-hidden font-sans">
      {/* Sticky header bar */}
      <Navbar />

      <main className="flex-grow">
        {/* Main interactive sliding hero section */}
        <HeroSlider />

        {/* Story, values and floating stats badge section */}
        <AboutSection />

        {/* Category products checkerboard list */}
        <ProductGrid />

        {/* Split brand feature block & statistics counter */}
        <FeaturesSection />

        {/* Grid-based checkmark value propositions */}
        <WhyChooseUs />

        {/* Corporate promo video modal section */}
        <PromoVideo />

        {/* Client B2B testimonials slider */}
        <TestimonialSlider />

        {/* Informative accordion FAQs section */}
        <FAQSection />
      </main>

      {/* Corporate footer links & sub-forms */}
      <Footer />

      {/* Floating social & window helper widgets */}
      <ScrollHelpers />
    </div>
  );
}
