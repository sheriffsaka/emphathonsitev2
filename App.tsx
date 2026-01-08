import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CarGrid } from './components/CarGrid';
import { CorporateFleet } from './components/CorporateFleet';
import { IndividualCTA } from './components/IndividualCTA';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-emphathon-navy min-h-screen text-white font-sans selection:bg-emphathon-rust selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSlider />
        <CarGrid />
        <CorporateFleet />
        <IndividualCTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;