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
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('empathon_admin_session', 'valid');
    setIsAuthenticated(true);
  };

  if (isLoading) return null; // Or a loading spinner

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="bg-empathon-navy min-h-screen text-white font-sans selection:bg-empathon-rust selection:text-white overflow-x-hidden">
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
    </div>
  );
};

export default App;