import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Do I need an appointment to visit the showroom?",
    answer: "While we welcome walk-in guests to our gallery, we highly recommend scheduling a private appointment for a dedicated consultation, especially if you wish to discuss specific fleet requirements or test drive a limited-allocation vehicle."
  },
  {
    question: "How does the pre-order process work?",
    answer: "Pre-ordering secures your allocation for incoming inventory before it hits the general market. A fully refundable deposit is required to hold the vehicle. Once the vehicle arrives at our port facility, you will be invited for final inspection and delivery."
  },
  {
    question: "What is the timeline for delivery?",
    answer: "Vehicles currently in stock can be delivered within 2-4 business days, depending on financing and registration requirements. Custom factory orders or international imports typically range from 3 to 6 months depending on the manufacturer's production schedule."
  },
  {
    question: "Does Empathon offer corporate bulk pricing?",
    answer: "Yes. We offer tiered pricing structures for corporate fleet acquisitions of 3 or more vehicles. This includes priority maintenance scheduling and a dedicated account manager."
  },
  {
    question: "What is your vehicle inspection policy?",
    answer: "Every vehicle undergoes a rigorous 150-point mechanical and cosmetic inspection by certified master technicians. We provide a comprehensive condition report and history verification for every unit sold."
  },
  {
    question: "Do you handle international shipping/export?",
    answer: "Empathon Global Services specializes in cross-border logistics. We can manage the export, customs clearance, and secure transport of your vehicle to your secondary residence or corporate headquarters abroad."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept secure wire transfers, certified bank drafts, and cryptocurrency (USDC/BTC) via our regulated payment partners. Financing and leasing options are also available for qualified buyers."
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black/20" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 font-light">
            Common inquiries regarding acquisition, logistics, and ownership.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className={`border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'bg-white/5 border-empathon-rust/30' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleIndex(index)}
              >
                <span className={`text-base md:text-lg font-medium transition-colors ${
                  activeIndex === index ? 'text-white' : 'text-slate-300'
                }`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activeIndex === index 
                    ? 'border-empathon-rust bg-empathon-rust text-white rotate-180' 
                    : 'border-slate-600 text-slate-400'
                }`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-slate-400 text-sm md:text-base leading-relaxed font-light border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};