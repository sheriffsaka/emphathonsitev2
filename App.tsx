import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';

const App: React.FC = () => {
  return (
    <div className="bg-emphathon-navy min-h-screen text-white font-sans selection:bg-emphathon-rust selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSlider />
        
        {/* Placeholder for Bento Grid Section Hierarchy */}
        {/* This illustrates the layout spacing rules for the next phase */}
        <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-24">
           <div className="border border-dashed border-white/10 rounded-3xl h-[600px] flex items-center justify-center bg-white/[0.02]">
              <div className="text-center space-y-4">
                 <h2 className="font-serif text-3xl text-slate-500">Inventory Bento Grid</h2>
                 <p className="text-slate-600 font-mono text-sm">Waiting for Phase 3 Module...</p>
                 <div className="grid grid-cols-3 gap-4 w-64 mx-auto opacity-30 mt-8">
                    <div className="h-16 bg-white/10 rounded-lg col-span-2"></div>
                    <div className="h-16 bg-white/10 rounded-lg col-span-1"></div>
                    <div className="h-16 bg-white/10 rounded-lg col-span-1"></div>
                    <div className="h-16 bg-white/10 rounded-lg col-span-2"></div>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};

export default App;