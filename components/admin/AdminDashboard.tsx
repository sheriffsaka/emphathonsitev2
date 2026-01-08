
import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { CarManager } from './CarManager';
import { CRMManager } from './CRMManager';
import { ContentManager } from './ContentManager';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Simple Stats for Overview */}
             <div className="bg-gradient-to-br from-emphathon-navy to-emphathon-navy/50 p-6 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Total Inventory</p>
                <h3 className="text-3xl font-serif text-white">24</h3>
                <span className="text-green-500 text-xs mt-2 block">↑ 2 New this week</span>
             </div>
             <div className="bg-gradient-to-br from-emphathon-navy to-emphathon-navy/50 p-6 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Active Pre-Orders</p>
                <h3 className="text-3xl font-serif text-white">8</h3>
                <span className="text-emphathon-rust text-xs mt-2 block">Requires Attention</span>
             </div>
             <div className="bg-gradient-to-br from-emphathon-navy to-emphathon-navy/50 p-6 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Pending Appointments</p>
                <h3 className="text-3xl font-serif text-white">12</h3>
                <span className="text-slate-500 text-xs mt-2 block">Next: Today 2:00 PM</span>
             </div>
             <div className="bg-gradient-to-br from-emphathon-navy to-emphathon-navy/50 p-6 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Corporate Inquiries</p>
                <h3 className="text-3xl font-serif text-white">5</h3>
                <span className="text-green-500 text-xs mt-2 block">New Request</span>
             </div>
          </div>
        );
      case 'cars':
        return <CarManager />;
      case 'crm':
        return <CRMManager />;
      case 'content':
        return <ContentManager />;
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#050912] text-white font-sans flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8 h-screen overflow-hidden flex flex-col">
         {/* Top Header */}
         <header className="mb-8 flex justify-between items-center shrink-0">
            <div>
               <h2 className="text-2xl font-bold text-white tracking-wide capitalize">{activeTab}</h2>
               <p className="text-slate-400 text-sm">Manage your platform resources</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-slate-300">
                  System Status: <span className="text-green-500 font-bold">Online</span>
               </div>
               <div className="w-10 h-10 rounded-full bg-emphathon-rust flex items-center justify-center text-white font-bold border-2 border-[#050912] shadow-lg">
                  A
               </div>
            </div>
         </header>

         {/* Module Content */}
         <div className="flex-1 overflow-hidden relative">
            {renderContent()}
         </div>
      </main>
    </div>
  );
};
