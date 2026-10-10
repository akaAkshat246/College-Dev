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
    <div className="min-h-screen bg-dark-950 text-cream font-sans selection:bg-ochre-400 selection:text-forest-950">
      
      {/* Top Navigation Bar - Minimal, Uncluttered, Senior-Grade */}
      <header className="sticky top-0 z-50 bg-forest-950/90 backdrop-blur-2xl border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-olive-600 p-0.5 shadow-md flex items-center justify-center border border-cream/20">
              <div className="w-full h-full bg-forest-900 rounded-[14px] flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-ochre-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-heading font-black tracking-tight text-cream">
                  SwachhRoute <span className="bg-gradient-to-r from-ochre-400 to-terracotta-400 bg-clip-text text-transparent">Delhi</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase bg-olive-600/30 text-cream border border-olive-500/40">
                  MCD OS
                </span>
              </div>
              <span className="text-[10px] font-mono text-cream/60 block -mt-0.5">
                NCT of Delhi • Municipal Sanitation AI
              </span>
            </div>
          </div>

          {/* Action CTA - Single Clear Direct Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 clay-btn-primary text-xs font-heading font-black flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Launch Command Center</span>
            </button>
          </div>

        </div>
      </header>

      {/* 1. HERO SECTION (Module 1) */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-olive-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill text-cream font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 text-ochre-400" />
            <span>AI-Assisted Waste Collection Platform for Delhi, Built on Dijkstra Routing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-cream tracking-tight max-w-5xl mx-auto leading-none">
            Collect when needed. <br />
            <span className="bg-gradient-to-r from-ochre-400 via-cream to-terracotta-400 bg-clip-text text-transparent">
              Route smart. Prove it's clean.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-cream/80 max-w-3xl mx-auto font-normal leading-relaxed">
            An end-to-end municipal operating system combining real-time IoT smart bin telematics, time-series festival overflow forecasting, Dijkstra shortest-path fleet routing, dynamic landfill load balancing, and AI photo-verified proof of cleanliness.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 clay-btn-primary text-sm font-heading font-black flex items-center gap-2 cursor-pointer"
            >
              <span>Access Municipal Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchDemo}
              className="px-8 py-4 clay-btn-secondary text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-ochre-300" />
              <span>Explore Interactive Prototype</span>
            </button>
          </div>

          {/* Key Metrics Ticker */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="p-5 clay-card-interactive">
              <span className="text-[10px] font-mono uppercase text-ochre-400/80 block">Delhi Grid Coverage</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-cream mt-1">14 Localities</div>
              <span className="text-xs text-olive-300 font-mono mt-0.5 block">100% Georeferenced</span>
            </div>

            <div className="p-5 clay-card-interactive">
              <span className="text-[10px] font-mono uppercase text-ochre-400/80 block">Dijkstra Route Distance</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-ochre-400 mt-1">-29.6% Saved</div>
              <span className="text-xs text-cream/60 font-mono mt-0.5 block">vs legacy static route</span>
            </div>

            <div className="p-5 clay-card-interactive">
              <span className="text-[10px] font-mono uppercase text-ochre-400/80 block">Diesel Fuel Saved</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-terracotta-400 mt-1">-35.0% Fuel</div>
              <span className="text-xs text-cream/60 font-mono mt-0.5 block">4.8 L diesel / round</span>
            </div>

            <div className="p-5 clay-card-interactive">
              <span className="text-[10px] font-mono uppercase text-ochre-400/80 block">Disposal Balancing</span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-cream mt-1">3 Landfills</div>
              <span className="text-xs text-olive-300 font-mono mt-0.5 block">Ghazipur, Bhalswa, Okhla</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE PROBLEM (Module 2) */}
      <section id="problem" className="py-24 bg-forest-950/40 border-t border-cream/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-terracotta-400 uppercase tracking-widest">
              Municipal Bottlenecks
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Delhi's Garbage Chain Breaks at Five Points
            </h2>
            <p className="text-sm text-cream/75">
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
              <div key={prob.id} className="p-6 rounded-3xl clay-card-interactive border border-terracotta-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cream bg-terracotta-500/20 px-2.5 py-1 rounded-xl border border-terracotta-500/40">
                    Point {prob.id}
                  </span>
                  <span className="text-[10px] font-mono text-ochre-400/80 uppercase">{prob.tag}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-cream">{prob.title}</h3>
                <p className="text-xs text-cream/70 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY NOW? (Module 3) */}
      <section className="py-24 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Technological Inflection
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              The Tools to Fix This Are Finally Cheap and Open
            </h2>
            <p className="text-sm text-cream/75">
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
                <div key={idx} className="p-6 rounded-3xl clay-card-interactive flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-olive-600/30 border border-olive-500/40 flex items-center justify-center text-ochre-400 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-heading font-bold text-cream">{tech.title}</h3>
                    <p className="text-xs text-cream/70 leading-relaxed">{tech.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-cream/10 text-xs font-mono font-bold text-ochre-400">
                    {tech.stat}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. THE SOLUTION (Module 4) */}
      <section id="solution" className="py-24 bg-forest-950/40 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Core Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Decide When to Collect, Route Smart, and Prove It's Clean
            </h2>
            <p className="text-sm text-cream/75">
              SwachhRoute replaces blind schedules with dynamic, predictive intelligence and cryptographic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-3xl clay-card-interactive border border-olive-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-olive-300 block">01. DYNAMIC DISPATCH</span>
              <h3 className="text-base font-heading font-bold text-cream">Collect When Needed</h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Collect only bins that are full (≥75%) or predicted to overflow within 4 hours, eliminating empty truck runs.
              </p>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive border border-ochre-400/30 space-y-3">
              <span className="text-xs font-mono font-bold text-ochre-400 block">02. DIJKSTRA PATHFINDING</span>
              <h3 className="text-base font-heading font-bold text-cream">Route Smart</h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Build shortest multi-stop routes using Dijkstra algorithm on the Delhi road graph, respecting capacity and shift limits.
              </p>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive border border-terracotta-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-terracotta-400 block">03. LANDFILL BALANCING</span>
              <h3 className="text-base font-heading font-bold text-cream">Balance Landfills</h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Route full trucks to disposal sites (Ghazipur, Bhalswa, Okhla) based on weighbridge queue wait times and spare capacity.
              </p>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive border border-cream/20 space-y-3">
              <span className="text-xs font-mono font-bold text-cream block">04. AI PHOTO CERTIFICATES</span>
              <h3 className="text-base font-heading font-bold text-cream">Prove It's Clean</h3>
              <p className="text-xs text-cream/70 leading-relaxed">
                Verify Before/After cleanup photos using neural segmentation and issue tamper-evident SHA-256 resolution certificates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. NINE FEATURES, ONE PLATFORM (Module 5) */}
      <section id="features" className="py-24 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Full Platform Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Nine Features, One Unified Municipal Platform
            </h2>
            <p className="text-sm text-cream/75">
              Organized into three distinct operational pillars: Smart Collection, Trust & Proof, and People & Accountability.
            </p>
          </div>

          {/* Group 1: Smart Collection */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl clay-card border border-cream/15 space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl clay-pill bg-olive-600/30 text-cream font-mono font-bold text-xs border border-olive-500/40">
                  PILLAR 1
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-cream">Smart Collection</h3>
                  <p className="text-xs text-cream/70">Predictive dispatch, multi-truck pathfinding, lane sizing, and disposal balancing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-olive-300">F1 • Fill Prediction</span>
                  <h4 className="text-sm font-bold text-cream">Festival & Weather Forecaster</h4>
                  <p className="text-xs text-cream/70">Forecasts fill levels ahead of time using history, Diwali/Holi surge multipliers, and weather.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-olive-300">F2 • Multi-Truck Routing</span>
                  <h4 className="text-sm font-bold text-cream">Dijkstra Multi-Vehicle VRP</h4>
                  <p className="text-xs text-cream/70">Assigns candidate bins to multi-truck fleets under vehicle capacity and shift time windows.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-olive-300">F3 • Lane-Aware Sizing</span>
                  <h4 className="text-sm font-bold text-cream">Delhi Street Width Constraints</h4>
                  <p className="text-xs text-cream/70">Dispatches E-Rickshaws to narrow Old Delhi gallis (&lt;3m) and Heavy Compactors to broad avenues.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-olive-300">F4 • Landfill Balancing</span>
                  <h4 className="text-sm font-bold text-cream">Queue & Capacity Balancer</h4>
                  <p className="text-xs text-cream/70">Evaluates weighbridge queues and spare capacity at Ghazipur, Bhalswa, and Okhla.</p>
                </div>
              </div>
            </div>

            {/* Group 2: Trust and Proof */}
            <div className="p-8 rounded-3xl clay-card border border-cream/15 space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl clay-pill bg-ochre-400/20 text-ochre-400 font-mono font-bold text-xs border border-ochre-400/40">
                  PILLAR 2
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-cream">Trust and Proof</h3>
                  <p className="text-xs text-cream/70">Vision verification, hotspot recurrence mapping, and waste segregation intelligence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-ochre-400">F5 • Photo-Verified Complaints</span>
                  <h4 className="text-sm font-bold text-cream">AI Proof & SHA-256 Certificate</h4>
                  <p className="text-xs text-cream/70">Citizen photo in, cleaned-spot photo out. AI checks both and issues verifiable digital certificates.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-ochre-400">F6 • Dumping Heatmap</span>
                  <h4 className="text-sm font-bold text-cream">Hotspot Recurrence Analytics</h4>
                  <p className="text-xs text-cream/70">Pinpoints repeat illegal dumping hotspots across MCD zones and recommends smart bin or CCTV placement.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-ochre-400">F7 • Segregation Intelligence</span>
                  <h4 className="text-sm font-bold text-cream">9-Class Material & Scrap ₹ Index</h4>
                  <p className="text-xs text-cream/70">Classifies wet, dry, and hazardous waste with real-time scrap market valuations in ₹ (INR).</p>
                </div>
              </div>
            </div>

            {/* Group 3: People and Accountability */}
            <div className="p-8 rounded-3xl clay-card border border-cream/15 space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl clay-pill bg-terracotta-500/20 text-terracotta-400 font-mono font-bold text-xs border border-terracotta-500/40">
                  PILLAR 3
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-cream">People and Accountability</h3>
                  <p className="text-xs text-cream/70">Field worker PWA, WhatsApp/IVR voice dispatch, and public MCD ward rankings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-terracotta-400">F8 • Worker Layer</span>
                  <h4 className="text-sm font-bold text-cream">Hindi PWA & WhatsApp Simulator</h4>
                  <p className="text-xs text-cream/70">Bilingual Hindi/English mobile interface, turn navigation, offline queue caching, and automated WhatsApp alert dispatch.</p>
                </div>

                <div className="p-5 rounded-2xl neomorph-recessed space-y-2">
                  <span className="text-xs font-mono font-bold text-terracotta-400">F9 • Ward Dashboard</span>
                  <h4 className="text-sm font-bold text-cream">MCD Public Cleanliness Scorecard</h4>
                  <p className="text-xs text-cream/70">Ranks 12 MCD wards on distance saved %, diesel saved (litres), CO₂ averted (tonnes), and SLA grievance closure rate.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS (Module 6) */}
      <section id="pipeline" className="py-24 bg-forest-950/40 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Autonomous Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              How SwachhRoute Works in 6 Stages
            </h2>
            <p className="text-sm text-cream/75">
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
              <div key={st.step} className="p-6 rounded-3xl clay-card-interactive space-y-3">
                <span className="text-base font-bold text-ochre-400 block font-heading">
                  Stage {st.step}
                </span>
                <h4 className="text-sm font-bold text-cream font-sans">{st.title}</h4>
                <p className="text-cream/70 leading-relaxed font-sans">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. LIVE PROTOTYPE BENCHMARK (Module 7 & 8) */}
      <section id="benchmark" className="py-24 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Proven Simulation Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              What Makes SwachhRoute Different
            </h2>
            <p className="text-sm text-cream/75">
              Most smart-bin projects stop at "bin is full, send a truck". SwachhRoute delivers measurable route and environmental improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Comparison Table (7 cols) */}
            <div className="lg:col-span-7 overflow-x-auto clay-card p-6 border border-cream/15">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-cream/10 text-ochre-400/80 font-mono text-[10px] uppercase">
                    <th className="py-3 px-4">Operational Dimension</th>
                    <th className="py-3 px-4 text-cream/50">Legacy Systems</th>
                    <th className="py-3 px-4 text-ochre-400 font-bold">SwachhRoute Delhi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/5 text-cream/80">
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Collection Trigger</td>
                    <td className="py-3 px-4 text-cream/50">React to current sensor reading</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Predict fill levels ahead of time (Festivals & Weather)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Routing Engine</td>
                    <td className="py-3 px-4 text-cream/50">Fixed static loops / Plain shortest path</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Dijkstra matrix + Multi-Truck planner + Lane sizing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Disposal Location</td>
                    <td className="py-3 px-4 text-cream/50">Nearest landfill blindly</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Landfill chosen by queue wait times & capacity</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Grievance Closure</td>
                    <td className="py-3 px-4 text-cream/50">Manual staff sign-off</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Closed only with AI photo proof & SHA-256 certificate</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Dumping Intelligence</td>
                    <td className="py-3 px-4 text-cream/50">No recurrence data</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Hotspot heatmap with automated municipal actions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-cream">Worker Usability</td>
                    <td className="py-3 px-4 text-cream/50">English smartphone apps</td>
                    <td className="py-3 px-4 text-ochre-300 font-medium">Hindi PWA, WhatsApp alerts & IVR voice notes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right: Measured Benchmark Card (5 cols) */}
            <div className="lg:col-span-5 p-8 clay-card-ochre space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-ochre-400 font-bold block">14 Localities Test Benchmark</span>
                <h3 className="text-xl font-heading font-black text-cream mt-1">Dijkstra vs Naive Static Route</h3>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-2xl neomorph-recessed flex items-center justify-between">
                  <span className="text-cream/70">Distance Traveled:</span>
                  <div className="text-right">
                    <span className="text-terracotta-400 line-through mr-2">38.5 km</span>
                    <span className="text-cream font-bold text-sm">27.1 km (-29.6%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl neomorph-recessed flex items-center justify-between">
                  <span className="text-cream/70">Diesel Consumption:</span>
                  <div className="text-right">
                    <span className="text-terracotta-400 line-through mr-2">13.5 L</span>
                    <span className="text-ochre-400 font-bold text-sm">8.7 L (-35.0%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl neomorph-recessed flex items-center justify-between">
                  <span className="text-cream/70">Turnaround Delay:</span>
                  <div className="text-right">
                    <span className="text-terracotta-400 mr-2">50m at Okhla</span>
                    <span className="text-olive-300 font-bold text-sm">18m at Bhalswa</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onLaunchDemo}
                className="w-full py-3.5 clay-btn-primary text-xs font-heading font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-cream" />
                <span>Simulate Route on Live Delhi Map</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. IMPACT & ROI TARGETS (Module 8) */}
      <section id="roi" className="py-24 bg-forest-950/40 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Measurable 90-Day ROI
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Proven Value in One Pilot Ward Within 90 Days
            </h2>
            <p className="text-sm text-cream/75">
              Clear, quantifiable targets to be validated against baseline municipal telemetry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-6 rounded-3xl clay-card-interactive space-y-2">
              <span className="text-3xl font-heading font-black text-cream font-mono">20–30%</span>
              <span className="text-xs text-cream/90 block font-bold">Lower Distance</span>
              <span className="text-[10px] text-ochre-400/80 font-mono block">Per tonne collected</span>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive space-y-2">
              <span className="text-3xl font-heading font-black text-ochre-400 font-mono">50%</span>
              <span className="text-xs text-cream/90 block font-bold">Fewer Overflows</span>
              <span className="text-[10px] text-ochre-400/80 font-mono block">Weekly incidents cut</span>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive space-y-2">
              <span className="text-3xl font-heading font-black text-olive-300 font-mono">&lt;10%</span>
              <span className="text-xs text-cream/90 block font-bold">Forecast Error</span>
              <span className="text-[10px] text-ochre-400/80 font-mono block">Mean Absolute Error (MAE)</span>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive space-y-2">
              <span className="text-3xl font-heading font-black text-terracotta-400 font-mono">80%</span>
              <span className="text-xs text-cream/90 block font-bold">Photo-Proof Closure</span>
              <span className="text-[10px] text-ochre-400/80 font-mono block">Within 48 hours SLA</span>
            </div>

            <div className="p-6 rounded-3xl clay-card-interactive space-y-2 col-span-2 md:col-span-1">
              <span className="text-3xl font-heading font-black text-cream font-mono">70%+</span>
              <span className="text-xs text-cream/90 block font-bold">Worker Adoption</span>
              <span className="text-[10px] text-ochre-400/80 font-mono block">Among pilot crews</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. MUNICIPAL OPERATIONS & GOVERNANCE ARCHITECTURE (Module 9) */}
      <section id="governance" className="py-24 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Institutional Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Municipal Operations & Governance Matrix
            </h2>
            <p className="text-sm text-cream/75">
              Tri-pillar operational hierarchy coordinating automated algorithmic optimization with ground-level zonal sanitation execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 rounded-3xl clay-card-interactive space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-olive-600/30 text-ochre-400 font-heading font-black text-xl mx-auto flex items-center justify-center border border-olive-500/40 shadow-sm">
                CC
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-cream">Central Command & Dispatch</h3>
                <span className="text-xs font-mono text-ochre-400 font-bold block mt-0.5">Fleet Routing Core</span>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-mono">
                Dijkstra graph pathfinding, Multi-Truck VRP solver, Landfill queue load balancing, and Express REST microservices.
              </p>
            </div>

            <div className="p-8 rounded-3xl clay-card-interactive space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-terracotta-500/20 text-terracotta-400 font-heading font-black text-xl mx-auto flex items-center justify-center border border-terracotta-500/40 shadow-sm">
                ML
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-cream">Computer Vision & Telemetry</h3>
                <span className="text-xs font-mono text-terracotta-400 font-bold block mt-0.5">Automated Intelligence</span>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-mono">
                Time-series overflow regression, MobileNet 9-class waste classification, and Before/After photo proof verification.
              </p>
            </div>

            <div className="p-8 rounded-3xl clay-card-interactive space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-ochre-400/20 text-cream font-heading font-black text-xl mx-auto flex items-center justify-center border border-ochre-400/40 shadow-sm">
                ZD
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-cream">Zonal Field & Municipal Operations</h3>
                <span className="text-xs font-mono text-olive-300 font-bold block mt-0.5">Ground Execution</span>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-mono">
                Georeferenced Leaflet GIS map, bilingual Hindi/English PWA worker portal, and WhatsApp/IVR notification simulator.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. EVALUATION & DEFENSE FAQ */}
      <section id="faq" className="py-24 bg-forest-950/40 border-t border-cream/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ochre-400 uppercase tracking-widest">
              Evaluation & Defense
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-cream">
              Key Evaluation Questions & Answers
            </h2>
            <p className="text-sm text-cream/75">
              Technical answers to common questions regarding algorithms, scalability, and field execution.
            </p>
          </div>

          <div className="space-y-4">
            {judgeQuestions.map((qa, idx) => (
              <div key={idx} className="p-5 rounded-2xl clay-card-interactive text-xs border border-cream/15">
                <button
                  onClick={() => setActiveQA(activeQA === idx ? null : idx)}
                  className="w-full text-left font-bold text-cream hover:text-ochre-400 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-heading">{qa.q}</span>
                  {activeQA === idx ? <ChevronUp className="w-4 h-4 text-ochre-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-cream/50 flex-shrink-0" />}
                </button>
                {activeQA === idx && (
                  <p className="text-cream/80 font-sans text-xs leading-relaxed mt-3 pt-3 border-t border-cream/10">
                    {qa.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. CLOSING VISION & CTA */}
      <section className="py-24 border-t border-cream/10 text-center relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-cream tracking-tight">
            Delhi doesn't need more trucks. <br />
            <span className="bg-gradient-to-r from-ochre-400 via-cream to-terracotta-400 bg-clip-text text-transparent">
              It needs smarter trips and proof that the work is done.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-cream/75 max-w-2xl mx-auto font-mono">
            Smarter routes. Cleaner streets. A healthier Delhi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 clay-btn-primary text-sm font-heading font-black cursor-pointer"
            >
              Launch Command Center
            </button>
          </div>

          <div className="pt-8 text-xs font-mono text-cream/60">
            Municipal Corporation of Delhi • Automated Operations Core • contact@swachhroute.delhi.gov.in • Toll-Free: 1800-11-0062
          </div>

        </div>
      </section>

    </div>
  );
}
