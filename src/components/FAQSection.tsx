"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What products does PMB Enterprise export?",
    answer: "We specialize in high-quality agricultural exports. Our primary products include fresh red onions, tropical fruits (such as mangoes, grapes, and pomegranates), fresh organic vegetables, premium spices, and a diverse range of confectionery exports."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We support standard international B2B trade payment instruments. The most common methods are Irrevocable Letter of Credit (L/C) at sight and Telegraphic Transfer (T/T). Detailed payment milestones are agreed upon during contract finalization."
  },
  {
    question: "How is product quality ensured before export?",
    answer: "Quality is our top priority. We operate directly at the farm level to supervise growth and harvesting. All export consignments undergo strict sorting, grading, and testing. Additionally, we provide third-party quality certifications (such as SGS inspections) as per client requirements."
  },
  {
    question: "Do you handle customs clearance and documentation?",
    answer: "Yes, we handle the complete export documentation and customs clearance at the loading ports in India. This includes preparing the Bill of Lading, Certificate of Origin, Phytosanitary Certificates, commercial invoices, and packing lists to ensure seamless transit."
  },
  {
    question: "What countries do you export to?",
    answer: "We have an extensive global supply network. Our core markets include the Middle East (UAE, Qatar, Saudi Arabia, Kuwait), Europe (Germany, UK, Netherlands), Southeast Asia (Malaysia, Singapore), and parts of North America."
  },
  {
    question: "What is the typical delivery timeline?",
    answer: "Transit times vary based on the shipping method and destination port. Ocean shipments to the Gulf region typically take 5-9 days, while shipments to Europe range between 20-30 days. Air consignments are generally delivered within 3-5 business days."
  },
  {
    question: "Can I request custom packaging or private labelling?",
    answer: "Absolutely. We offer tailored packaging solutions (including mesh bags, jute bags, wooden crates, or corrugated boxes) in various weight specifications (5kg to 50kg). We also offer private labelling with your company's branding and design requirements."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-24 md:py-32 bg-gray-50 dark:bg-zinc-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Heading */}
        <div className={`lg:col-span-5 reveal-on-scroll ${isVisible ? "active" : ""}`}>
          <span className="text-primary dark:text-accent font-bold text-sm uppercase tracking-widest block mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
            Everything You Should Know About PMB Enterprise Exports
          </h2>
          <div className="w-12 h-1.5 bg-primary dark:bg-accent mt-6"></div>
        </div>

        {/* Right Column: Accordion */}
        <div className={`lg:col-span-7 flex flex-col gap-4 reveal-on-scroll reveal-delay-200 ${isVisible ? "active" : ""}`}>
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            
            return (
              <div
                key={idx}
                className="border-b border-gray-200 dark:border-zinc-800 pb-4 transition-all duration-300"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-base md:text-lg text-gray-800 dark:text-zinc-100 hover:text-primary dark:hover:text-accent transition-colors focus:outline-none cursor-pointer group"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 dark:text-zinc-500 transition-transform duration-300 group-hover:text-primary ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsing Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium pb-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
