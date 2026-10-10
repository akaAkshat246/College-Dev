import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Users, 
  Trash2, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthScreen({ onBackToLanding = () => {} }) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('admin@swachhroute.delhi.gov.in');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Role Configurations
  const roles = [
    {
      id: 'ADMIN',
      title: 'MUNICIPAL ADMIN',
      subtitle: 'City Command HQ',
      icon: Building2,
      desc: 'City-wide monitoring, telematics, predictive hotspots, worker dispatch, and ESG ledger.',
      demoEmail: 'admin@swachhroute.delhi.gov.in',
      demoPass: 'admin123',
      color: 'emerald',
      badge: 'GOVERNMENT / MCD'
    },
    {
      id: 'WORKER',
      title: 'FIELD WORKER',
      subtitle: 'Collection Fleet Operations',
      icon: Truck,
      desc: 'Assigned collection tasks, turn-by-turn routing, nearby critical bins, and live task completion.',
      demoEmail: 'worker@swachhroute.delhi.gov.in',
      demoPass: 'worker123',
      color: 'cyan',
      badge: 'FLEET CREW'
    },
    {
      id: 'CITIZEN',
      title: 'DELHI CITIZEN',
      subtitle: 'Public Grievance Portal',
      icon: Users,
      desc: 'Report roadside garbage with camera + GPS, track grievance status, and circular scrap valuation in INR.',
      demoEmail: 'citizen@delhi.in',
      demoPass: 'citizen123',
      color: 'amber',
      badge: 'COMMUNITY'
    }
  ];

  const handleRoleSelect = (roleObj) => {
    setSelectedRole(roleObj.id);
    setEmail(roleObj.demoEmail);
    setPassword(roleObj.demoPass);
    setError('');
  };

  const handleFastDemoLogin = (roleId) => {
    const target = roles.find(r => r.id === roleId);
    if (target) {
      setSelectedRole(target.id);
      setEmail(target.demoEmail);
      setPassword(target.demoPass);
      executeLogin(target.demoEmail, target.demoPass);
    }
  };

  const executeLogin = async (loginEmail, loginPass) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role: selectedRole, phone })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        login(data.user, data.token);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      executeLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glow Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Return to Landing Page */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10 mb-4">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800/80 border border-cream/15 hover:border-ochre-400/40 text-cream/90 hover:text-cream text-xs font-mono transition-all shadow-sm"
        >
          <span>← Return to Public Overview</span>
        </button>

        <span className="text-xs font-mono text-ochre-400/70">MCD Auth Gateway v2.4</span>
      </div>

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-olive-900/60 border border-olive-500/40 text-cream text-xs font-mono font-bold uppercase tracking-widest shadow-sm mb-4">
          <Trash2 className="w-4 h-4 text-ochre-400" />
          <span>Government of NCT Delhi • Municipal OS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-heading font-black text-cream tracking-tight">
          SwachhRoute <span className="bg-gradient-to-r from-ochre-400 via-cream to-terracotta-400 bg-clip-text text-transparent">Delhi</span>
        </h1>
        <p className="text-base sm:text-lg text-cream/80 mt-2 font-medium max-w-xl mx-auto">
          AI-Powered Municipal Waste Intelligence & Smart Fleet Operations Platform
        </p>
      </div>

      {/* Main 3 Role Selection Cards */}
      <div className="max-w-5xl mx-auto w-full my-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;

            return (
              <div
                key={r.id}
                onClick={() => handleRoleSelect(r)}
                className={`rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? r.id === 'ADMIN' ? 'clay-card-ochre ring-2 ring-ochre-400/70 scale-[1.02]' :
                      r.id === 'WORKER' ? 'clay-card-terracotta ring-2 ring-terracotta-400/70 scale-[1.02]' :
                      'clay-card ring-2 ring-olive-400/70 scale-[1.02]'
                    : 'clay-card-interactive opacity-90 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md ${
                      r.id === 'ADMIN' ? 'bg-ochre-400/20 border-ochre-400/40 text-ochre-400' :
                      r.id === 'WORKER' ? 'bg-terracotta-500/20 border-terracotta-500/40 text-terracotta-400' :
                      'bg-olive-600/30 border-olive-500/40 text-cream'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-forest-900 border border-cream/15 text-cream/80">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-black text-cream">{r.title}</h3>
                  <p className="text-xs font-mono text-ochre-300/80 mt-0.5">{r.subtitle}</p>
                  <p className="text-xs text-cream/75 mt-3 leading-relaxed">{r.desc}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-cream/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFastDemoLogin(r.id);
                    }}
                    className={`text-xs font-heading font-bold flex items-center gap-1.5 hover:underline ${
                      r.id === 'ADMIN' ? 'text-ochre-400' :
                      r.id === 'WORKER' ? 'text-terracotta-400' :
                      'text-olive-300'
                    }`}
                  >
                    <span>Fast 1-Click Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className={`w-3 h-3 rounded-full ${isSelected ? 'bg-ochre-400 shadow-glow-sm' : 'bg-forest-900 border border-cream/20'}`}></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credentials Form Box */}
        <div className="clay-card rounded-3xl p-6 sm:p-8 max-w-md mx-auto mt-8 border border-cream/15">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-cream/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-ochre-400/80 tracking-wider">Authentication Portal</span>
              <h4 className="text-lg font-heading font-bold text-cream">
                {isRegister ? 'Create Resident Account' : `Login as ${selectedRole}`}
              </h4>
            </div>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-ochre-400 hover:text-ochre-300 font-mono underline"
            >
              {isRegister ? 'Already have account?' : 'Register new'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <div>
                <label className="text-cream/80 block mb-1 font-mono">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 neomorph-recessed rounded-xl text-cream focus:outline-none focus:border-olive-500 font-mono"
                  placeholder="e.g. Ramesh Chandra"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-cream/80 block mb-1 font-mono">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ochre-400/60 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 neomorph-recessed rounded-xl text-cream focus:outline-none focus:border-olive-500 font-mono"
                  placeholder="name@swachhroute.delhi.gov.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-cream/80 block mb-1 font-mono">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ochre-400/60 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 neomorph-recessed rounded-xl text-cream focus:outline-none focus:border-olive-500 font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-terracotta-500/20 border border-terracotta-500/40 text-cream text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-terracotta-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 clay-btn-primary text-xs font-heading font-black flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>{isRegister ? 'Register Account' : `Enter as ${selectedRole}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-[11px] font-mono text-cream/60 relative z-10">
        SwachhRoute Delhi • Municipal Corporation of Delhi • NCT of Delhi Municipal OS • Secure JWT Session
      </div>

    </div>
  );
}
