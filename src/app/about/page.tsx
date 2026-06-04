import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutBanner from "@/components/AboutBanner";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsFeaturesVertical from "@/components/StatsFeaturesVertical";
import MissionVisionValues from "@/components/MissionVisionValues";
import Footer from "@/components/Footer";
import ScrollHelpers from "@/components/ScrollHelpers";

export const metadata: Metadata = {
  title: "About Us | PMB Enterprise - Trusted Global Trade Partner",
  description:
    "Learn about PMB Enterprise's story, mission, vision, and what makes us a trusted agricultural export company connecting Indian farmers to global markets.",
  keywords: [
    "About PMB Enterprise",
    "PMB Exim",
    "Agricultural Exporter India",
    "Export Import Company",
    "Global Trade Partner",
    "Indian Agri Export"
  ]
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 overflow-x-hidden font-sans">
      {/* Sticky header bar */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Banner with breadcrumb */}
        <AboutBanner />

        {/* 2. Who We Are — founder portrait + bio copy */}
        <WhoWeAre />

        {/* 3. Why PMB — dark themed value propositions grid */}
        <WhyChooseUs />

        {/* 4. Stats counter + Our Features 4-panel block */}
        <StatsFeaturesVertical />

        {/* 5. Mission / Vision / Core Values image cards */}
        <MissionVisionValues />
      </main>

      {/* Corporate footer links & contact form */}
      <Footer />

      {/* Floating WhatsApp chat & scroll-to-top */}
      <ScrollHelpers />
    </div>
  );
}
