
import React, { useState } from 'react';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credential check
    if (password === 'admin123') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-emphathon-navy flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emphathon-rust/10 rounded-full blur-[120px] pointer-events-none" />
       <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emphathon-navyLight/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-gradient-to-br from-emphathon-rust to-emphathon-rustLight rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-emphathon-rust/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
           </div>
           <h2 className="text-3xl font-serif text-white mb-2">Admin Portal</h2>
           <p className="text-slate-400 text-sm font-light">Enter your secure access credential.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full bg-black/20 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                error 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-emphathon-rust focus:ring-emphathon-rust/50'
              }`}
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1 animate-in slide-in-from-top-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Invalid credentials. Please try again.
              </p>
            )}
          </div>

          <Button variant={ComponentVariant.PRIMARY} className="w-full justify-center !py-3">
            Authenticate Access
          </Button>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-wider font-medium">Return to Site</a>
          </div>
        </form>
      </div>
    </div>
  );
};
