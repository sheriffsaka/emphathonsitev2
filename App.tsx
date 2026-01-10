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
import { AdminLogin } from './components/admin/AdminLogin';

const App: React.FC = () => {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('empathon_admin_session');
    if (session === 'valid') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Hash-based router check
    const checkHash = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Scroll listener for "Back to Top" button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem('empathon_admin_session', 'valid');
    setIsAuthenticated(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) return null; // Or a loading spinner

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="bg-empathon-navy min-h-screen text-white font-sans selection:bg-empathon-rust selection:text-white overflow-x-hidden relative">
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

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-empathon-rust text-white rounded-full shadow-lg shadow-black/30 flex items-center justify-center border border-white/20 transition-all duration-500 transform hover:scale-110 hover:bg-empathon-rustLight ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;