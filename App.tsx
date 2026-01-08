
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CarGrid } from './components/CarGrid';
import { CorporateFleet } from './components/CorporateFleet';
import { IndividualCTA } from './components/IndividualCTA';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ReservationForm } from './components/ReservationForm';
import { ContactForm, AppointmentBlock } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simple hash-based router for Admin access
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    
    checkHash(); // Initial check
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="bg-emphathon-navy min-h-screen text-white font-sans selection:bg-emphathon-rust selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSlider />
        <CarGrid />
        <CorporateFleet />
        <IndividualCTA />
        <Testimonials />
        <FAQ />
        <ReservationForm />
        
        {/* Phase 7: Contact & Appointment Section */}
        <section id="contact" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
             <AppointmentBlock />
             <ContactForm />
          </div>
        </section>

      </main>

      <Footer />
      
      {/* Secret Admin Trigger for Demo */}
      <a href="#admin" className="fixed bottom-2 right-2 w-4 h-4 opacity-0 hover:opacity-100 bg-emphathon-rust rounded-full cursor-pointer z-50 transition-opacity" title="Admin Portal"></a>
    </div>
  );
};

export default App;
