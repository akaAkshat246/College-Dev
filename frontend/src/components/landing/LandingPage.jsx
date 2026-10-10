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
  Scale, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Fuel,
  Trees,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Compass,
  FileText,
  ChevronDown,
  ChevronUp,
  Cpu,
  Radio,
  Sliders,
  LogIn
} from 'lucide-react';

export default function LandingPage({ onLoginClick = () => {}, onLaunchDemo = () => {} }) {
  const [activeQA, setActiveQA] = useState(null);
  const [activeTab, setActiveTab] = useState('smart-collection');

  const judgeQuestions = [
    {
      q: "Is Dijkstra algorithm new for waste management?",
      a: "No. Dijkstra is the established mathematical shortest-path core. The novelty is wrapping it with predictive fill forecasting, multi-truck capacity limits, narrow lane-width vehicle sizing, dynamic landfill queue load balancing, and AI photo-verified proof."
    },
    {
      q: "Why not use Google Maps routing API?",
      a: "Google Maps routes single point-to-point journeys. We solve a combinatorial Multi-Vehicle Routing Problem with dynamic bin priority queues, truck weight capacities, narrow Old Delhi street restrictions, and landfill weighbridge queue balancing."
    },
    {
      q: "What if IoT sensors fail or get stolen?",
      a: "The system automatically falls back to historical time-series regression models and flags missing telemetry streams for field inspection. The pilot begins with tamper-resistant ultrasonic pods."
    },
    {
      q: "How will sanitation workers use it in practice?",
      a: "We developed a simplified bilingual Hindi/English PWA with offline caching, turn-by-turn navigation, and automated WhatsApp alert broadcasts & IVR voice calls for workers without complex smartphone apps."
    },
    {
      q: "What about citizen privacy with grievance photos?",
      a: "Faces and vehicle license plates are automatically blurred before storage. Data retention is strictly bounded and aggregated in compliance with Indian DPDP Act regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-dark-950">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-dark-950/90 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer">
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

          {/* Desktop Anchor Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#problem" className="hover:text-emerald-400 transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-emerald-400 transition-colors">Solution</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">9 Features</a>
            <a href="#pipeline" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#benchmark" className="hover:text-emerald-400 transition-colors">Benchmark</a>
            <a href="#roi" className="hover:text-emerald-400 transition-colors">Impact & ROI</a>
            <a href="#team" className="hover:text-emerald-400 transition-colors">Team</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Q&A</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchDemo}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Demo</span>
            </button>

            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm hover:brightness-110 transition-all transform hover:scale-[1.02]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Launch Platform / Login</span>
            </button>
          </div>

        </div>
      </header>

      {/* 1. HERO SECTION (Slide 1) */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Assisted Waste Collection Platform for Delhi, Built on Dijkstra Routing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight max-w-5xl mx-auto leading-none">
            Collect when needed. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Route smart. Prove it's clean.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            An end-to-end municipal operating system combining real-time IoT smart bin telematics, time-series festival overflow forecasting, Dijkstra shortest-path fleet routing, dynamic landfill load balancing, and AI photo-verified proof of cleanliness.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-dark-950 font-heading font-black text-sm shadow-glow-sm hover:brightness-110 transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Access Municipal Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchDemo}
              className="px-8 py-4 rounded-2xl bg-dark-900 border border-white/15 text-slate-200 hover:text-white hover:border-emerald-500/40 text-sm font-mono font-bold transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Explore Interactive Prototype</span>
            </button>
          </div>

          {/* Key Metrics Ticker */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Delhi Grid Coverage</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">14 Localities</div>
              <span className="text-xs text-emerald-400 font-mono mt-0.5 block">100% Georeferenced</span>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Dijkstra Route Distance</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-400 mt-1">-29.6% Saved</div>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">vs legacy static route</span>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Diesel Fuel Saved</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-amber-300 mt-1">-35.0% Fuel</div>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">4.8 L diesel / round</span>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Disposal Balancing</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-cyan-400 mt-1">3 Landfills</div>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">Ghazipur, Bhalswa, Okhla</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE PROBLEM (Slide 2) */}
      <section id="problem" className="py-24 bg-dark-900/50 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
              Municipal Bottlenecks
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Delhi's Garbage Chain Breaks at Five Points
            </h2>
            <p className="text-sm text-slate-400">
              Over 11,000 tonnes of solid waste are generated daily across the capital. Traditional municipal logistics fail across five core operational junctures:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "01",
                title: "Fixed-Schedule Pickups",
                desc: "Trucks run on blind daily timetables. Market bins overflow into the street while other vehicles return half-empty.",
                tag: "Inefficient Dispatch"
              },
              {
                id: "02",
                title: "Overloaded Landfills",
                desc: "Ghazipur, Bhalswa, and Okhla suffer from massive weighbridge queues (up to 50 mins wait) and unsegregated mixed loads.",
                tag: "Landfill Gridlock"
              },
              {
                id: "03",
                title: "Chronic Illegal Dumping",
                desc: "Open dumping spots return repeatedly across Delhi with zero structured data on footfall patterns or root causes.",
                tag: "Zero Recurrence Data"
              },
              {
                id: "04",
                title: "Unverified Grievances",
                desc: "Citizen complaints get closed manually by staff on paper without any verifiable photographic proof of actual cleanup.",
                tag: "Accountability Gap"
              },
              {
                id: "05",
                title: "Low Field Worker Enablement",
                desc: "Drivers lack digital turn-by-turn navigation, lane width alerts for narrow Old Delhi gallis, and offline mobile support.",
                tag: "Field Disconnection"
              },
              {
                id: "06",
                title: "Rising Municipal Costs",
                desc: "Wasted diesel mileage and delayed turnaround times cost the municipal corporation tens of crores annually in avoidable expenditure.",
                tag: "High Diesel Burn"
              }
            ].map((prob) => (
              <div key={prob.id} className="p-6 rounded-2xl bg-dark-950 border border-red-500/20 hover:border-red-500/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/30">
                    Point {prob.id}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{prob.tag}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-white">{prob.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY NOW? (Slide 3) */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Technological Inflection
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              The Tools to Fix This Are Finally Cheap and Open
            </h2>
            <p className="text-sm text-slate-400">
              A few years ago, city-wide IoT telemetry and real-time computer vision were cost-prohibitive. Today, modern open infrastructure makes this production-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Radio,
                title: "Low-Power Sensors",
                desc: "Ultrasonic LoRaWAN telemetry pods are affordable ($12-$18/unit) with 2+ years of battery life and solar harvesting.",
                stat: "$15 / unit"
              },
              {
                icon: Compass,
                title: "Open Road Graph Data",
                desc: "OpenStreetMap and Dijkstra graph algorithms provide instant lane-aware matrix computations per vehicle type.",
                stat: "OSM Adjacency"
              },
              {
                icon: Camera,
                title: "Mobile Vision AI",
                desc: "Lightweight computer vision checks image quality, segments 9 material taxonomies, and verifies clean sites in <300ms.",
                stat: "<300ms Inference"
              },
              {
                icon: Users,
                title: "WhatsApp & IVR Voice",
                desc: "Reach field sanitation workers directly in Hindi without forcing them to navigate complex English smartphone apps.",
                stat: "100% Reach"
              }
            ].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-heading font-bold text-white">{tech.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 text-xs font-mono font-bold text-emerald-400">
                    {tech.stat}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. THE SOLUTION (Slide 4) */}
      <section id="solution" className="py-24 bg-dark-900/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Core Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Decide When to Collect, Route Smart, and Prove It's Clean
            </h2>
            <p className="text-sm text-slate-400">
              SwachhRoute replaces blind schedules with dynamic, predictive intelligence and cryptographic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-dark-950 border border-emerald-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 block">01. DYNAMIC DISPATCH</span>
              <h3 className="text-base font-heading font-bold text-white">Collect When Needed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Collect only bins that are full (≥75%) or predicted to overflow within 4 hours, eliminating empty truck runs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 block">02. DIJKSTRA PATHFINDING</span>
              <h3 className="text-base font-heading font-bold text-white">Route Smart</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build shortest multi-stop routes using Dijkstra algorithm on the Delhi road graph, respecting capacity and shift limits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-amber-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 block">03. LANDFILL BALANCING</span>
              <h3 className="text-base font-heading font-bold text-white">Balance Landfills</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Route full trucks to disposal sites (Ghazipur, Bhalswa, Okhla) based on weighbridge queue wait times and spare capacity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-purple-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-purple-400 block">04. AI PHOTO CERTIFICATES</span>
              <h3 className="text-base font-heading font-bold text-white">Prove It's Clean</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify Before/After cleanup photos using neural segmentation and issue tamper-evident SHA-256 resolution certificates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. NINE FEATURES, ONE PLATFORM (Slide 5) */}
      <section id="features" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Full Platform Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Nine Features, One Unified Municipal Platform
            </h2>
            <p className="text-sm text-slate-400">
              Organized into three distinct operational pillars: Smart Collection, Trust & Proof, and People & Accountability.
            </p>
          </div>

          {/* Group 1: Smart Collection */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                  GROUP 1
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">Smart Collection</h3>
                  <p className="text-xs text-slate-400">Predictive dispatch, multi-truck pathfinding, lane sizing, and disposal balancing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">F1 • Fill Prediction</span>
                  <h4 className="text-sm font-bold text-white">Festival & Weather Forecaster</h4>
                  <p className="text-xs text-slate-400">Forecasts fill levels ahead of time using history, Diwali/Holi surge multipliers, and weather.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">F2 • Multi-Truck Routing</span>
                  <h4 className="text-sm font-bold text-white">Dijkstra Multi-Vehicle VRP</h4>
                  <p className="text-xs text-slate-400">Assigns candidate bins to multi-truck fleets under vehicle capacity and shift time windows.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">F3 • Lane-Aware Sizing</span>
                  <h4 className="text-sm font-bold text-white">Delhi Street Width Constraints</h4>
                  <p className="text-xs text-slate-400">Dispatches E-Rickshaws to narrow Old Delhi gallis (&lt;3m) and Heavy Compactors to broad avenues.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">F4 • Landfill Balancing</span>
                  <h4 className="text-sm font-bold text-white">Queue & Capacity Balancer</h4>
                  <p className="text-xs text-slate-400">Evaluates weighbridge queues and spare capacity at Ghazipur, Bhalswa, and Okhla.</p>
                </div>
              </div>
            </div>

            {/* Group 2: Trust and Proof */}
            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs">
                  GROUP 2
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">Trust and Proof</h3>
                  <p className="text-xs text-slate-400">Vision verification, hotspot recurrence mapping, and waste segregation intelligence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">F5 • Photo-Verified Complaints</span>
                  <h4 className="text-sm font-bold text-white">AI Proof & SHA-256 Certificate</h4>
                  <p className="text-xs text-slate-400">Citizen photo in, cleaned-spot photo out. AI checks both and issues verifiable digital certificates.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">F6 • Dumping Heatmap</span>
                  <h4 className="text-sm font-bold text-white">Hotspot Recurrence Analytics</h4>
                  <p className="text-xs text-slate-400">Pinpoints repeat illegal dumping hotspots across MCD zones and recommends smart bin or CCTV placement.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">F7 • Segregation Intelligence</span>
                  <h4 className="text-sm font-bold text-white">9-Class Material & Scrap ₹ Index</h4>
                  <p className="text-xs text-slate-400">Classifies wet, dry, and hazardous waste with real-time scrap market valuations in ₹ (INR).</p>
                </div>
              </div>
            </div>

            {/* Group 3: People and Accountability */}
            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                  GROUP 3
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">People and Accountability</h3>
                  <p className="text-xs text-slate-400">Field worker PWA, WhatsApp/IVR voice dispatch, and public MCD ward rankings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400">F8 • Worker Layer</span>
                  <h4 className="text-sm font-bold text-white">Hindi PWA & WhatsApp Simulator</h4>
                  <p className="text-xs text-slate-400">Bilingual Hindi/English mobile interface, turn navigation, offline queue caching, and automated WhatsApp alert dispatch.</p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400">F9 • Ward Dashboard</span>
                  <h4 className="text-sm font-bold text-white">MCD Public Cleanliness Scorecard</h4>
                  <p className="text-xs text-slate-400">Ranks 12 MCD wards on distance saved %, diesel saved (litres), CO₂ averted (tonnes), and SLA grievance closure rate.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS (Slide 6) */}
      <section id="pipeline" className="py-24 bg-dark-900/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Autonomous Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              How SwachhRoute Works in 6 Stages
            </h2>
            <p className="text-sm text-slate-400">
              From IoT ultrasonic sensor readings and citizen photos to optimized multi-truck dispatch and verified clean certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-mono">
            {[
              {
                step: "01",
                title: "Unified Ingestion API",
                desc: "Smart bin ultrasonic sensors and citizen photo reports stream continuous telematics to a single high-performance REST API layer."
              },
              {
                step: "02",
                title: "Time-Series Fill Forecasting",
                desc: "Polynomial regression predicts which bins will cross the 75% threshold at pickup time, incorporating festival and weather surges."
              },
              {
                step: "03",
                title: "Dijkstra Travel-Time Matrix",
                desc: "Dijkstra builds a travel-time matrix on the Delhi road graph per vehicle type, factoring in narrow gallis and traffic congestion."
              },
              {
                step: "04",
                title: "Multi-Truck VRP Planner",
                desc: "Priority max-heap assigns candidate bins across vehicle fleets under strict payload weight limits and shift time constraints."
              },
              {
                step: "05",
                title: "Dynamic Landfill Balancing",
                desc: "When a collection truck nears full capacity, the balancer selects the optimal landfill (Ghazipur, Bhalswa, Okhla) and inserts an unload stop."
              },
              {
                step: "06",
                title: "Worker Dispatch & Verification",
                desc: "Drivers receive routes via Hindi PWA or WhatsApp; clean-site photos are verified with SHA-256 certificates; officers monitor ward scorecards."
              }
            ].map((st) => (
              <div key={st.step} className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
                <span className="text-base font-bold text-emerald-400 block font-heading">
                  Stage {st.step}
                </span>
                <h4 className="text-sm font-bold text-white font-sans">{st.title}</h4>
                <p className="text-slate-400 leading-relaxed font-sans">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. LIVE PROTOTYPE BENCHMARK (Slide 7 & 8) */}
      <section id="benchmark" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Proven Simulation Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              What Makes SwachhRoute Different
            </h2>
            <p className="text-sm text-slate-400">
              Most smart-bin projects stop at "bin is full, send a truck". SwachhRoute delivers measurable route and environmental improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Comparison Table (7 cols) */}
            <div className="lg:col-span-7 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-3 px-4">Operational Dimension</th>
                    <th className="py-3 px-4 text-slate-400">Legacy / Others</th>
                    <th className="py-3 px-4 text-emerald-400 font-bold">SwachhRoute Delhi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Collection Trigger</td>
                    <td className="py-3 px-4 text-slate-400">React to current sensor reading</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Predict fill levels ahead of time (Festivals & Weather)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Routing Engine</td>
                    <td className="py-3 px-4 text-slate-400">Fixed static loops / Plain shortest path</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Dijkstra matrix + Multi-Truck planner + Lane sizing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Disposal Location</td>
                    <td className="py-3 px-4 text-slate-400">Nearest landfill blindly</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Landfill chosen by queue wait times & capacity</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Grievance Closure</td>
                    <td className="py-3 px-4 text-slate-400">Manual staff sign-off</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Closed only with AI photo proof & SHA-256 certificate</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Dumping Intelligence</td>
                    <td className="py-3 px-4 text-slate-400">No recurrence data</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Hotspot heatmap with automated municipal actions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Worker Usability</td>
                    <td className="py-3 px-4 text-slate-400">English smartphone apps</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Hindi PWA, WhatsApp alerts & IVR voice notes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right: Measured Benchmark Card (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-dark-900 border border-emerald-500/30 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">14 Localities Test Benchmark</span>
                <h3 className="text-xl font-heading font-black text-white mt-1">Dijkstra vs Naive Static Route</h3>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Distance Traveled:</span>
                  <div className="text-right">
                    <span className="text-red-400 line-through mr-2">38.5 km</span>
                    <span className="text-emerald-400 font-bold text-sm">27.1 km (-29.6%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Diesel Consumption:</span>
                  <div className="text-right">
                    <span className="text-red-400 line-through mr-2">13.5 L</span>
                    <span className="text-amber-300 font-bold text-sm">8.7 L (-35.0%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Turnaround Delay:</span>
                  <div className="text-right">
                    <span className="text-red-400 mr-2">50m at Okhla</span>
                    <span className="text-cyan-400 font-bold text-sm">18m at Bhalswa</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onLaunchDemo}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-dark-950" />
                <span>Simulate Route on Live Delhi Map</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. IMPACT & ROI TARGETS (Slide 13) */}
      <section id="roi" className="py-24 bg-dark-900/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Measurable 90-Day ROI
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Proven Value in One Pilot Ward Within 90 Days
            </h2>
            <p className="text-sm text-slate-400">
              Clear, quantifiable targets to be validated against baseline municipal telemetry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
              <span className="text-3xl font-heading font-black text-emerald-400 font-mono">20–30%</span>
              <span className="text-xs text-slate-300 block font-bold">Lower Distance</span>
              <span className="text-[10px] text-slate-500 font-mono block">Per tonne collected</span>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
              <span className="text-3xl font-heading font-black text-cyan-400 font-mono">50%</span>
              <span className="text-xs text-slate-300 block font-bold">Fewer Overflows</span>
              <span className="text-[10px] text-slate-500 font-mono block">Weekly incidents cut</span>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
              <span className="text-3xl font-heading font-black text-amber-300 font-mono">&lt;10%</span>
              <span className="text-xs text-slate-300 block font-bold">Forecast Error</span>
              <span className="text-[10px] text-slate-500 font-mono block">Mean Absolute Error (MAE)</span>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
              <span className="text-3xl font-heading font-black text-purple-400 font-mono">80%</span>
              <span className="text-xs text-slate-300 block font-bold">Photo-Proof Closure</span>
              <span className="text-[10px] text-slate-500 font-mono block">Within 48 hours SLA</span>
            </div>

            <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-2 col-span-2 md:col-span-1">
              <span className="text-3xl font-heading font-black text-emerald-300 font-mono">70%+</span>
              <span className="text-xs text-slate-300 block font-bold">Worker Adoption</span>
              <span className="text-[10px] text-slate-500 font-mono block">Among pilot crews</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. TEAM CODEGOBLINS (Slide 15) */}
      <section id="team" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Engineering Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Team CodeGoblins
            </h2>
            <p className="text-sm text-slate-400">
              Multi-disciplinary engineering team covering backend routing, machine learning, and municipal mobile workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 font-heading font-black text-xl mx-auto flex items-center justify-center border border-emerald-500/40">
                AK
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Akshat Kumar</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold block mt-0.5">Backend & Routing Lead</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Dijkstra graph pathfinding, Multi-Truck VRP solver, Landfill queue load balancing, and Express REST microservices.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 font-heading font-black text-xl mx-auto flex items-center justify-center border border-cyan-500/40">
                AV
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Akshat Vats</h3>
                <span className="text-xs font-mono text-cyan-400 font-bold block mt-0.5">ML & Vision Engineer</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Time-series overflow regression, MobileNet 9-class waste classification, and Before/After photo proof verification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 font-heading font-black text-xl mx-auto flex items-center justify-center border border-amber-500/40">
                AY
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Akshay Yadav</h3>
                <span className="text-xs font-mono text-amber-400 font-bold block mt-0.5">Frontend & Mobile Lead</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Georeferenced Leaflet GIS map, bilingual Hindi/English PWA worker portal, and WhatsApp/IVR notification simulator.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. JUDGE Q&A / FAQ SECTION */}
      <section id="faq" className="py-24 bg-dark-900/50 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Evaluation & Defense
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Key Evaluation Questions & Answers
            </h2>
            <p className="text-sm text-slate-400">
              Technical answers to common questions regarding algorithms, scalability, and field execution.
            </p>
          </div>

          <div className="space-y-4">
            {judgeQuestions.map((qa, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-dark-950 border border-white/10 text-xs">
                <button
                  onClick={() => setActiveQA(activeQA === idx ? null : idx)}
                  className="w-full text-left font-bold text-slate-200 hover:text-emerald-400 flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-heading">{qa.q}</span>
                  {activeQA === idx ? <ChevronUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>
                {activeQA === idx && (
                  <p className="text-slate-400 font-sans text-xs leading-relaxed mt-3 pt-3 border-t border-white/5">
                    {qa.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. CLOSING VISION & CTA (Slide 16 & 17) */}
      <section className="py-24 border-t border-white/10 text-center relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Delhi doesn't need more trucks. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              It needs smarter trips and proof that the work is done.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-mono">
            Smarter routes. Cleaner streets. A healthier Delhi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-dark-950 font-heading font-black text-sm shadow-glow-sm hover:brightness-110 transition-all transform hover:scale-[1.02]"
            >
              Launch Platform Demo
            </button>
          </div>

          <div className="pt-8 text-xs font-mono text-slate-500">
            Contact: Team CodeGoblins • akshat@swachhroute.delhi.gov.in • +91 98112 34567
          </div>

        </div>
      </section>

    </div>
  );
}
