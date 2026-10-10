import React from 'react';
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
  RefreshCw,
  ShieldCheck,
  UserCheck,
  FileText,
  Scale,
  Award,
  TrendingUp
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
  const role = user?.role || 'ADMIN';

  // Navigation Items per Role
  const adminNavItems = [
    { id: 'dashboard', label: 'Command Center', icon: Building2 },
    { id: 'bins', label: '14 Smart Bins', icon: Trash2 },
    { id: 'forecasting', label: 'F1: Forecasting', icon: TrendingUp },
    { id: 'routing', label: 'F2 & F3: Route Optimizer', icon: Truck },
    { id: 'landfills', label: 'F4: Landfill Balancer', icon: Scale },
    { id: 'scanner', label: 'F7: AI Scanner', icon: Camera },
    { id: 'hotspots', label: 'F6: Dumping Heatmap', icon: Flame },
    { id: 'scorecard', label: 'F9: Ward Scorecard', icon: Award }
  ];

  const workerNavItems = [
    { id: 'worker-home', label: 'F8: Field Tasks', icon: Truck },
    { id: 'bins', label: 'Delhi Bins Grid', icon: Trash2 },
    { id: 'routing', label: 'Assigned Route', icon: MapPin },
    { id: 'scanner', label: 'AI Waste Scanner', icon: Camera }
  ];

  const citizenNavItems = [
    { id: 'citizen-home', label: 'F5: Citizen Portal', icon: Users },
    { id: 'scanner', label: 'F7: Scrap Valuator', icon: Camera }
  ];

  const navItems = role === 'ADMIN' ? adminNavItems :
                   role === 'WORKER' ? workerNavItems :
                   citizenNavItems;

  return (
    <header className="sticky top-0 z-40 bg-dark-950/90 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3.5 flex-shrink-0 cursor-pointer" 
            onClick={() => setActiveTab(role === 'ADMIN' ? 'dashboard' : role === 'WORKER' ? 'worker-home' : 'citizen-home')}
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
                <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                  role === 'ADMIN' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-sm' :
                  role === 'WORKER' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                  'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
                by CodeGoblins • MCD Municipal OS
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 p-1.5 rounded-2xl bg-dark-900 border border-white/10 text-xs font-heading font-bold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-black shadow-glow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile, Pitch Deck Button & Fast Switcher */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            
            {/* Pitch Deck Button (17 Slides) */}
            <button
              onClick={onOpenPitchDeck}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-heading font-bold text-xs shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Pitch Deck (17 Slides)</span>
            </button>

            {/* Interactive Demo Button */}
            <button
              onClick={onStartKillerDemo}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm transition-all hover:brightness-110"
            >
              <Play className="w-3.5 h-3.5 fill-dark-950" />
              <span>Interactive Demo</span>
            </button>

            {/* Role Quick Switcher */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-dark-900 border border-white/10 text-[11px] font-mono">
              <span className="text-slate-500 px-1">Role:</span>
              <button 
                onClick={() => { switchRole('ADMIN'); setActiveTab('dashboard'); }}
                className={`px-2 py-1 rounded-lg ${role === 'ADMIN' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Admin
              </button>
              <button 
                onClick={() => { switchRole('WORKER'); setActiveTab('worker-home'); }}
                className={`px-2 py-1 rounded-lg ${role === 'WORKER' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Worker
              </button>
              <button 
                onClick={() => { switchRole('CITIZEN'); setActiveTab('citizen-home'); }}
                className={`px-2 py-1 rounded-lg ${role === 'CITIZEN' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Citizen
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Logout Session"
              className="w-9 h-9 rounded-xl bg-dark-900 border border-white/10 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
