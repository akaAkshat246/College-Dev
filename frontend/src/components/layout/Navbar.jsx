import React, { useState } from 'react';
import { 
  Building2, 
  Trash2, 
  MapPin, 
  Truck, 
  Flame, 
  BarChart3, 
  Camera, 
  Users, 
  Play, 
  LogOut, 
  Radio, 
  Sparkles,
  ShieldCheck,
  FileText,
  Scale,
  Award,
  TrendingUp,
  Menu,
  X,
  Layers,
  ChevronRight,
  User,
  Activity,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onStartKillerDemo = () => {}, 
  onOpenPitchDeck = () => {},
  criticalCount = 0 
}) {
  const { user, logout, switchRole } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const role = user?.role || 'ADMIN';

  // Navigation Items per Operational Category (Zero Emojis, Pure SVG Icons)
  const coreOperations = [
    { id: 'dashboard', label: 'Command Center', desc: 'Real-time GIS overview & telemetry', icon: Building2 },
    { id: 'bins', label: '14 Smart Bins Fleet', desc: 'Ultrasonic sensor grid & battery', icon: Trash2 },
    { id: 'forecasting', label: 'F1: Fill Forecasting', desc: 'Time-series festival overflow models', icon: TrendingUp },
    { id: 'routing', label: 'F2 & F3: Route Optimizer', desc: 'Dijkstra shortest path & multi-truck', icon: Truck },
    { id: 'landfills', label: 'F4: Landfill Balancer', desc: 'Ghazipur, Bhalswa, Okhla queues', icon: Scale }
  ];

  const citizenAndField = [
    { id: 'citizen-home', label: 'F5: Citizen Portal', desc: 'WhatsApp chatbot & grievance logging', icon: Users },
    { id: 'hotspots', label: 'F6: Dumping Heatmap', desc: 'Chronic illegal dump prediction', icon: Flame },
    { id: 'scanner', label: 'F7: AI Waste Scanner', desc: 'MobileNet segregation & scrap price', icon: Camera },
    { id: 'worker-home', label: 'F8: Field Worker Tasks', desc: 'Bilingual turn navigation & IVR', icon: Radio },
    { id: 'scorecard', label: 'F9: Ward Scorecard', desc: 'MCD Swachh Survekshan rankings', icon: Award },
    { id: 'analytics', label: 'GIS & Telemetry Analytics', desc: 'Fleet fuel, CO2 & landfill logs', icon: BarChart3 }
  ];

  // Helper to get active label
  const allNavItems = [...coreOperations, ...citizenAndField];
  const currentItem = allNavItems.find(i => i.id === activeTab) || coreOperations[0];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-950/90 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Brand Identity & Active View Indicator */}
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center gap-3.5 cursor-pointer" 
                onClick={() => handleSelectTab(role === 'ADMIN' ? 'dashboard' : role === 'WORKER' ? 'worker-home' : 'citizen-home')}
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-0.5 shadow-glow-sm flex items-center justify-center">
                  <div className="w-full h-full bg-dark-950 rounded-[14px] flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-heading font-black tracking-tight text-white">
                      SwachhRoute <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Delhi</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      MCD OS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
                    by CodeGoblins • NCT of Delhi
                  </span>
                </div>
              </div>

              {/* Active View Badge (Replaces cluttered top row) */}
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-500">Active View:</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-dark-900 border border-white/10 text-xs font-mono text-emerald-300 font-bold shadow-inner">
                  <currentItem.icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentItem.label}</span>
                </div>
              </div>
            </div>

            {/* Right: Quick CTA & Hamburger Menu Trigger */}
            <div className="flex items-center gap-3 flex-shrink-0">
              
              {/* Critical Bins Pill */}
              {criticalCount > 0 && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  <span>{criticalCount} Critical Bins</span>
                </div>
              )}

              {/* Pitch Deck / Landing Page Button */}
              <button
                onClick={onOpenPitchDeck}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-heading font-bold text-xs shadow-sm transition-all"
                title="View 17-Slide Pitch Deck"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Pitch Deck (17 Slides)</span>
              </button>

              {/* Guided Interactive Demo Button */}
              <button
                onClick={onStartKillerDemo}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm transition-all hover:brightness-110"
              >
                <Play className="w-3.5 h-3.5 fill-dark-950" />
                <span>Interactive Demo</span>
              </button>

              {/* Current Role Badge */}
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                role === 'ADMIN' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                role === 'WORKER' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}>
                <User className="w-3.5 h-3.5" />
                <span>{role}</span>
              </div>

              {/* HAMBURGER MENU BUTTON */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/15 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all shadow-sm group"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono font-bold">Menu</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* SLIDE-OVER HAMBURGER DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-dark-950 border-l border-white/10 shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-white">
                      {user?.name || 'Municipal Officer'}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span>{user?.email || 'officer@mcd.delhi.gov.in'}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{role}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Fast Role Switcher */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Switch Active Persona
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => { switchRole('ADMIN'); handleSelectTab('dashboard'); }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                        role === 'ADMIN'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-sm'
                          : 'bg-dark-900 text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => { switchRole('WORKER'); handleSelectTab('worker-home'); }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                        role === 'WORKER'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-glow-sm'
                          : 'bg-dark-900 text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      Worker
                    </button>
                    <button
                      onClick={() => { switchRole('CITIZEN'); handleSelectTab('citizen-home'); }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                        role === 'CITIZEN'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-glow-sm'
                          : 'bg-dark-900 text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      Citizen
                    </button>
                  </div>
                </div>

                {/* 2. Operations & Intelligence Links */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Municipal Operations & Algorithms
                  </span>
                  <div className="space-y-1">
                    {coreOperations.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 text-white shadow-glow-sm'
                              : 'bg-dark-900/50 hover:bg-dark-900 border border-white/5 hover:border-white/10 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500 text-dark-950 font-bold' : 'bg-dark-950 text-slate-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-heading font-bold text-white block">{item.label}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{item.desc}</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Citizen, Field & Proof Links */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Citizen, Field & Verification
                  </span>
                  <div className="space-y-1">
                    {citizenAndField.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 text-white shadow-glow-sm'
                              : 'bg-dark-900/50 hover:bg-dark-900 border border-white/5 hover:border-white/10 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500 text-dark-950 font-bold' : 'bg-dark-950 text-slate-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-heading font-bold text-white block">{item.label}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{item.desc}</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Quick Actions */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => { setIsDrawerOpen(false); onStartKillerDemo(); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm hover:brightness-110 transition-all"
                  >
                    <Play className="w-4 h-4 fill-dark-950" />
                    <span>Run Interactive Scenario Demo</span>
                  </button>

                  <button
                    onClick={() => { setIsDrawerOpen(false); onOpenPitchDeck(); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-purple-500/30 text-purple-300 font-heading font-bold text-xs transition-all"
                  >
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>View 17-Slide Pitch Deck</span>
                  </button>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/10 bg-dark-900/40 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-500">
                  <span>SwachhRoute v2.4</span>
                  <span className="block">MCD NCT Delhi</span>
                </div>

                <button
                  onClick={() => { setIsDrawerOpen(false); logout(); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout Session</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
