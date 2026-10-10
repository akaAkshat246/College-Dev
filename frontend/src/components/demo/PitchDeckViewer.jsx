import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Truck, 
  Sparkles, 
  Layers, 
  Users, 
  TrendingUp, 
  HelpCircle,
  BarChart,
  FileText,
  Volume2
} from 'lucide-react';

export default function PitchDeckViewer({ isOpen, onClose, onLaunchDemo = () => {} }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [activeQAIndex, setActiveQAIndex] = useState(null);

  if (!isOpen) return null;

  const slides = [
    {
      number: 1,
      title: "SwachhRoute Delhi",
      tagline: "Collect when needed. Route smart. Prove it's clean.",
      category: "Title Slide",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Municipal Waste Operating System</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            SwachhRoute <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Delhi</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl">
            Collect when needed. Route smart. Prove it's clean.
          </p>

          <p className="text-sm text-slate-400 max-w-xl">
            An AI-assisted waste collection platform for the National Capital Territory of Delhi, built on Dijkstra graph routing, multi-truck planning, landfill balancing, and photo-verified clean proof.
          </p>

          <div className="pt-4 border-t border-cream/15 w-full max-w-lg flex items-center justify-around text-xs font-mono text-cream/70">
            <div>
              <span className="text-ochre-400/80 block text-[10px] uppercase">Authority</span>
              <span className="text-cream font-bold">MCD Operations Core</span>
            </div>
            <div>
              <span className="text-ochre-400/80 block text-[10px] uppercase">Jurisdiction</span>
              <span className="text-cream">NCT of Delhi (12 Zones)</span>
            </div>
            <div>
              <span className="text-ochre-400/80 block text-[10px] uppercase">Specification</span>
              <span className="text-cream">v2.4 Production</span>
            </div>
          </div>
        </div>
      ),
      speakerNote: "Open with one sentence: 'Delhi's trucks drive fixed routes while bins overflow elsewhere. We fix that.'"
    },
    {
      number: 2,
      title: "The Problem",
      tagline: "Delhi's garbage chain breaks at five critical points.",
      category: "Problem",
      content: (
        <div className="space-y-4 py-2">
          <p className="text-slate-300 text-sm">
            Over 11,000 tonnes of solid waste are generated daily across Delhi. Today's operations suffer from five systemic failures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Fixed-Schedule Pickups", desc: "Bins overflow in busy markets while empty trucks drive past empty bins.", icon: Truck },
              { title: "Overloaded Landfills", desc: "Ghazipur, Bhalswa & Okhla face massive queue delays and mixed unsegregated waste.", icon: Scale },
              { title: "Chronic Illegal Dumping", desc: "Hotspots return repeatedly with zero data on why or when dumping happens.", icon: AlertTriangle },
              { title: "Unverified Grievances", desc: "Citizen complaints get closed on paper with no verifiable photo proof.", icon: ShieldCheck },
              { title: "Low Worker Tracking", desc: "Field trucks and crews lack digital turn navigation and accountability.", icon: Radio }
            ].map((prob, idx) => {
              const ProbIcon = prob.icon;
              return (
                <div key={idx} className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-400">
                    <ProbIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-200">{prob.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{prob.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
      speakerNote: "Pick one story the judges will recognise, such as an overflowing bin near a market, and tell it in two sentences."
    },
    {
      number: 3,
      title: "Why Now?",
      tagline: "The tools to fix this are finally cheap, open, and production-ready.",
      category: "Timing & Tech",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
          {[
            { title: "Low-Power Bin Sensors", desc: "Ultrasonic LoRaWAN sensors are now affordable ($12-$18/unit) with 2-year battery life.", stat: "$15/unit" },
            { title: "Open Road & Graph Data", desc: "OpenStreetMap + fast graph pathfinding (Dijkstra, OR-Tools) enable lane-aware city routing.", stat: "OSM Network" },
            { title: "Mobile Vision AI", desc: "Lightweight computer vision classifies waste and verifies clean sites in milliseconds.", stat: "<300ms Inference" },
            { title: "WhatsApp & IVR Voice", desc: "Reach sanitation drivers directly in Hindi without forcing complex English apps.", stat: "100% Reach" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{item.stat}</span>
                <h4 className="text-sm font-bold text-white mt-1">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
      speakerNote: "The point is that this was not practical a few years ago, and now a small team can build it."
    },
    {
      number: 4,
      title: "The Solution",
      tagline: "Decide when to collect, route smart, balance landfills, and prove it's clean.",
      category: "Solution",
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-emerald-300 uppercase font-mono">1. Dynamic Dispatch</h4>
              <p className="text-xs text-slate-300 mt-1">Collect only bins that are full or about to overflow.</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center mb-2">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase font-mono">2. Dijkstra + Landfill</h4>
              <p className="text-xs text-slate-300 mt-1">Shortest route with dynamic weighbridge queue balancing.</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-amber-300 uppercase font-mono">3. Verifiable Proof</h4>
              <p className="text-xs text-slate-300 mt-1">AI verified Before/After photos with SHA-256 certificate.</p>
            </div>
          </div>
        </div>
      ),
      speakerNote: "Show the interactive prototype here if time allows."
    },
    {
      number: 5,
      title: "Nine Features, One Platform",
      tagline: "End-to-End municipal waste intelligence architecture.",
      category: "Product Features",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <span className="font-mono font-bold text-emerald-400 block text-[11px] uppercase">Smart Collection</span>
            <div className="space-y-1.5">
              <p className="text-white"><strong className="text-emerald-300">F1: Fill Prediction:</strong> History, festival surges, weather.</p>
              <p className="text-white"><strong className="text-emerald-300">F2: Multi-Truck Routing:</strong> Dijkstra + time windows.</p>
              <p className="text-white"><strong className="text-emerald-300">F3: Lane-Aware Routing:</strong> E-rickshaw vs compactor for narrow gallis.</p>
              <p className="text-white"><strong className="text-emerald-300">F4: Landfill Balancing:</strong> Ghazipur vs Bhalswa vs Okhla queues.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <span className="font-mono font-bold text-cyan-400 block text-[11px] uppercase">Trust & Proof</span>
            <div className="space-y-1.5">
              <p className="text-white"><strong className="text-cyan-300">F5: Photo-Verified Complaints:</strong> AI verified before/after proof.</p>
              <p className="text-white"><strong className="text-cyan-300">F6: Dumping Heatmap:</strong> Hotspots to place bins, CCTV, patrols.</p>
              <p className="text-white"><strong className="text-cyan-300">F7: Segregation AI:</strong> Wet, dry, hazardous and scrap ₹ value.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <span className="font-mono font-bold text-amber-400 block text-[11px] uppercase">People & Accountability</span>
            <div className="space-y-1.5">
              <p className="text-white"><strong className="text-amber-300">F8: Worker Layer:</strong> Hindi PWA, WhatsApp alerts & IVR voice.</p>
              <p className="text-white"><strong className="text-amber-300">F9: Ward Dashboard:</strong> Ranks 12 MCD wards on km, fuel & SLA.</p>
            </div>
          </div>
        </div>
      ),
      speakerNote: "Do not read the table. Name the three groups and give one example from each."
    },
    {
      number: 6,
      title: "How It Works",
      tagline: "Autonomous 6-step closed-loop data pipeline.",
      category: "Workflow",
      content: (
        <div className="space-y-2 text-xs text-slate-300">
          {[
            "1. Bin ultrasonic sensors & citizen photos stream telemetry to central REST API.",
            "2. Polynomial time-series forecasting identifies bins nearing 90% overflow threshold.",
            "3. Dijkstra builds single-source & all-pairs travel time matrix on Delhi road graph.",
            "4. Multi-truck planner assigns candidate bins under vehicle weight & shift limits.",
            "5. Dynamic Landfill Balancer evaluates queues at Ghazipur, Bhalswa, Okhla and routes full trucks.",
            "6. Workers receive route via Hindi PWA/WhatsApp; officers monitor Ward Scorecard in real-time."
          ].map((step, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-dark-900 border border-white/5 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      ),
      speakerNote: "Emphasise that Dijkstra is the core, and the other layers make it practical for a real city."
    },
    {
      number: 7,
      title: "Product Demo & Technology",
      tagline: "Interactive Delhi map with 14 locality bins, central depot, and 3 landfills.",
      category: "Live Prototype",
      content: (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-emerald-400 font-mono text-xs font-bold">LIVE PROTOTYPE METRICS</span>
              <h4 className="text-base font-bold text-white mt-0.5">Dijkstra vs Naive Static Route</h4>
              <p className="text-xs text-slate-400">14 Delhi Localities • 3 Landfills • Central Depot (Rajghat)</p>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-lg font-black text-emerald-400 font-mono">29.6%</span>
                <span className="text-[10px] text-slate-400 block">Km Saved</span>
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-lg font-black text-cyan-400 font-mono">35%</span>
                <span className="text-[10px] text-slate-400 block">Fuel Saved</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => { onClose(); onLaunchDemo(); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-bold text-xs flex items-center gap-2 shadow-glow-sm"
            >
              <Play className="w-4 h-4 fill-dark-950" />
              <span>Launch Live Interactive Prototype Demo</span>
            </button>
          </div>
        </div>
      ),
      speakerNote: "Tell judges the prototype uses simulated fill levels and approximate distances, and that the real version uses OpenStreetMap road data and sensor feeds."
    },
    {
      number: 8,
      title: "What Makes It Different",
      tagline: "Most smart-bin projects stop at 'bin is full, send a truck'. We go further.",
      category: "Differentiation",
      content: (
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-2">Dimension</th>
                <th className="py-2 text-slate-400">Legacy / Others</th>
                <th className="py-2 text-emerald-400 font-bold">SwachhRoute Delhi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2 font-bold text-white">Trigger</td>
                <td className="py-2 text-slate-400">React to current fill</td>
                <td className="py-2 text-emerald-300">Predict fill levels ahead of time (Festivals/Weather)</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-white">Routing</td>
                <td className="py-2 text-slate-400">Fixed static loops</td>
                <td className="py-2 text-emerald-300">Dijkstra matrix + Multi-Truck + Lane-Width sizing</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-white">Landfill</td>
                <td className="py-2 text-slate-400">Nearest site blindly</td>
                <td className="py-2 text-emerald-300">Dynamic queue balancing (Ghazipur/Bhalswa/Okhla)</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-white">Verification</td>
                <td className="py-2 text-slate-400">Manual paper signoff</td>
                <td className="py-2 text-emerald-300">AI before/after photo proof + SHA-256 certificate</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-white">Worker UX</td>
                <td className="py-2 text-slate-400">English smartphone apps</td>
                <td className="py-2 text-emerald-300">Hindi PWA, WhatsApp alerts & IVR voice notes</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      speakerNote: "Be candid that Dijkstra alone is not new. The novelty is combining prediction, planning, landfill balancing and verified proof in one Delhi-specific system."
    },
    {
      number: 9,
      title: "Market & Customers",
      tagline: "Primary customer: Municipal Corporation of Delhi (MCD), starting with one pilot ward.",
      category: "Market Size",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs py-2">
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 1 (Pilot)</span>
            <h4 className="text-sm font-bold text-white mt-1">1 MCD Pilot Ward</h4>
            <p className="text-slate-400 mt-1">Ward 112 (Connaught Place) ~24 smart bins, 6 collection vehicles.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Phase 2 (Zonal)</span>
            <h4 className="text-sm font-bold text-white mt-1">NCT of Delhi (12 Zones)</h4>
            <p className="text-slate-400 mt-1">250 wards, 3,200 fleet vehicles, 18,000 community bins.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Phase 3 (Expansion)</span>
            <h4 className="text-sm font-bold text-white mt-1">Smart Cities & RWAs</h4>
            <p className="text-slate-400 mt-1">Private gated townships, university campuses, and 100 Indian Smart Cities.</p>
          </div>
        </div>
      ),
      speakerNote: "Avoid quoting large market numbers you cannot source. A clear, bottom-up logic is more credible than a big figure."
    },
    {
      number: 10,
      title: "Business Model",
      tagline: "Software-as-a-Service (SaaS) anchored on verified fuel cost savings.",
      category: "Business Model",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs py-2">
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <h4 className="text-sm font-bold text-emerald-300">Platform Subscription</h4>
            <p className="text-slate-400 mt-1">Annual municipal license fee per smart bin and per tracked vehicle.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <h4 className="text-sm font-bold text-cyan-300">Hardware Integration</h4>
            <p className="text-slate-400 mt-1">One-time setup fee + LoRaWAN ultrasonic sensor pods provided at cost.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <h4 className="text-sm font-bold text-amber-300">Premium Analytics API</h4>
            <p className="text-slate-400 mt-1">Urban planning data streams and carbon offset audit certificates for MCD.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10">
            <h4 className="text-sm font-bold text-purple-300">CSR & EPR Programs</h4>
            <p className="text-slate-400 mt-1">Corporate sponsorship for community segregation drives and recycling linkages.</p>
          </div>
        </div>
      ),
      speakerNote: "State that pricing will be set from pilot cost savings, since savings per truck is the real value anchor."
    },
    {
      number: 11,
      title: "Competition & Positioning",
      tagline: "High intelligence and verified visual proof quadrant.",
      category: "Positioning",
      content: (
        <div className="space-y-3 py-2 text-xs">
          <div className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300 font-bold">Swachhata Citizen Apps:</span>
            <span className="text-slate-400">Complaint tracking only; no route optimization or telematics.</span>
          </div>
          <div className="p-3 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between">
            <span className="text-slate-300 font-bold">GPS Fleet Trackers:</span>
            <span className="text-slate-400">Tracks vehicle dots; no fill forecasting or landfill balancing.</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <span className="text-emerald-300 font-bold">SwachhRoute Delhi:</span>
            <span className="text-emerald-400 font-medium">Predictive Routing + Landfill Balancing + AI Photo Proof.</span>
          </div>
        </div>
      ),
      speakerNote: "Name real competitors you have researched when you present, and say specifically what they do not cover."
    },
    {
      number: 12,
      title: "Go-To-Market Strategy",
      tagline: "5-step deployment from single-ward proof of concept to city-wide scale.",
      category: "GTM",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs py-2">
          {[
            { step: "1. Pilot Ward", desc: "90-day pilot with Ward 112 (CP) team." },
            { step: "2. Campuses", desc: "Deploy in IIT Delhi & DU campuses." },
            { step: "3. MCD MoU", desc: "Formal integration via Smart City challenge." },
            { step: "4. Field Groups", desc: "Train waste-picker unions & drivers." },
            { step: "5. Scorecard", desc: "Public ward transparency drives demand." }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-white/10 flex flex-col justify-between">
              <span className="text-emerald-400 font-mono font-bold text-[11px]">{item.step}</span>
              <p className="text-slate-400 text-[11px] mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      ),
      speakerNote: "Be clear that government sales are slow, which is why private campuses and societies are the early revenue path."
    },
    {
      number: 13,
      title: "Impact & Success Metrics",
      tagline: "Proving measurable value within 90 days in the pilot ward.",
      category: "Impact",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center py-2">
          {[
            { metric: "20–30% Lower", label: "Collection Km / Tonne" },
            { metric: "50% Lower", label: "Bin Overflow Incidents" },
            { metric: "<10% MAE", label: "Fill Forecast Error" },
            { metric: "80% in 48h", label: "Photo-Verified SLA Closure" },
            { metric: "70%+", label: "Worker PWA Adoption" },
            { metric: "18.6 Tons", label: "CO₂ Averted / Month" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-white/10">
              <span className="text-lg font-black text-emerald-400 font-mono">{item.metric}</span>
              <span className="text-xs text-slate-300 block mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      ),
      speakerNote: "Say clearly that these are goals to be measured, not results already achieved."
    },
    {
      number: 14,
      title: "Roadmap",
      tagline: "4 clear engineering phases with gate validation.",
      category: "Roadmap",
      content: (
        <div className="space-y-2 text-xs py-2">
          {[
            { phase: "Phase 1: Prototype (Weeks 1-6)", gate: "Beats naive route by >20% in simulation.", status: "COMPLETED [VALIDATED]" },
            { phase: "Phase 2: Pilot Core (Weeks 7-16)", gate: "Sensors in pilot ward, multi-truck planner, worker app.", status: "IN PROGRESS" },
            { phase: "Phase 3: Trust Layer (Weeks 17-26)", gate: "80% complaints closed with AI photo proof.", status: "PLANNED" },
            { phase: "Phase 4: City Scale (Weeks 27-40)", gate: "Handover to MCD across all 12 zones.", status: "PLANNED" }
          ].map((r, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">{r.phase}</span>
                <span className="text-slate-400 text-[11px]">Gate: {r.gate}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      ),
      speakerNote: "Stress that each phase starts only after its gate is met."
    },
    {
      number: 15,
      title: "Municipal Operations & Governance Architecture",
      tagline: "Tri-pillar operational structure coordinating central optimization and zonal execution.",
      category: "Governance",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center py-2 text-xs">
          <div className="p-4 rounded-xl clay-card border border-cream/15">
            <div className="w-12 h-12 rounded-full bg-olive-600/30 text-ochre-400 font-bold mx-auto flex items-center justify-center text-sm font-heading mb-2 border border-olive-500/40">
              CC
            </div>
            <h4 className="text-sm font-bold text-cream">Central Command & Dispatch</h4>
            <span className="text-ochre-400 font-mono text-[11px] block mt-0.5">Fleet Routing Core</span>
            <p className="text-cream/70 text-[11px] mt-1.5">Dijkstra graph optimization, multi-truck VRP solver, dynamic landfill weighbridge queue balancer.</p>
          </div>

          <div className="p-4 rounded-xl clay-card border border-cream/15">
            <div className="w-12 h-12 rounded-full bg-terracotta-500/20 text-terracotta-400 font-bold mx-auto flex items-center justify-center text-sm font-heading mb-2 border border-terracotta-500/40">
              ML
            </div>
            <h4 className="text-sm font-bold text-cream">Computer Vision & Telemetry</h4>
            <span className="text-terracotta-400 font-mono text-[11px] block mt-0.5">Automated Intelligence</span>
            <p className="text-cream/70 text-[11px] mt-1.5">Time-series fill rate regression, edge MobileNet material triage, automated cleanliness verification.</p>
          </div>

          <div className="p-4 rounded-xl clay-card border border-cream/15">
            <div className="w-12 h-12 rounded-full bg-ochre-400/20 text-cream font-bold mx-auto flex items-center justify-center text-sm font-heading mb-2 border border-ochre-400/40">
              ZD
            </div>
            <h4 className="text-sm font-bold text-cream">Zonal Field & Citizen Gateway</h4>
            <span className="text-ochre-300 font-mono text-[11px] block mt-0.5">Ground Telemetry</span>
            <p className="text-cream/70 text-[11px] mt-1.5">Georeferenced field tablets, turn navigation, bilingual voice/SMS dispatch, offline sync.</p>
          </div>
        </div>
      ),
      speakerNote: "Stress the division of institutional responsibilities: algorithmic route computation, automated AI verification, and field crew telemetry."
    },
    {
      number: 16,
      title: "The Ask",
      tagline: "We are asking for a single pilot ward, not a city-wide contract.",
      category: "The Ask",
      content: (
        <div className="space-y-3 py-2 text-xs">
          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white">1 Pilot Ward & Sanitation Crew</h4>
              <p className="text-slate-400 mt-0.5">90-day trial in Ward 112 (Connaught Place) or Ward 82 (Karol Bagh).</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white">Access to Baseline Route & Grievance Logs</h4>
              <p className="text-slate-400 mt-0.5">To benchmark verified fuel and SLA improvements rigorously.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white">Designated MCD Sanitation Contact</h4>
              <p className="text-slate-400 mt-0.5">Weekly 15-minute review with Zonal Sanitation Officer.</p>
            </div>
          </div>
        </div>
      ),
      speakerNote: "Make the ask specific and small enough that saying yes is easy."
    },
    {
      number: 17,
      title: "Closing",
      tagline: "Delhi doesn't need more trucks. It needs smarter trips and proof that the work is done.",
      category: "Conclusion",
      content: (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-olive-600/30 text-cream mx-auto flex items-center justify-center border border-olive-500/40 shadow-md">
            <Trees className="w-7 h-7 text-ochre-400" />
          </div>
          <h2 className="text-2xl font-heading font-black text-cream">
            Smarter Routes. Cleaner Streets. A Healthier Delhi.
          </h2>
          <p className="text-xs text-cream/70 font-mono">
            Municipal Corporation of Delhi • contact@swachhroute.delhi.gov.in • Toll-Free: 1800-11-0062
          </p>
          <div className="pt-4">
            <button
              onClick={() => { onClose(); onLaunchDemo(); }}
              className="px-6 py-3 clay-btn-primary text-cream font-heading font-black text-sm cursor-pointer"
            >
              Open Live System Prototype
            </button>
          </div>
        </div>
      ),
      speakerNote: "End on the one-line vision, then stop and take questions."
    }
  ];

  const judgeQuestions = [
    {
      q: "Is Dijkstra new?",
      a: "No. Dijkstra is the proven core routing algorithm. The novelty lies in wrapping it with predictive fill forecasting, multi-truck capacity limits, lane-width vehicle sizing, dynamic landfill queue balancing, and AI photo-verified proof."
    },
    {
      q: "Why not use Google Maps routing?",
      a: "Google Maps routes single point-to-point journeys. We solve a combinatorial Multi-Vehicle Routing Problem with dynamic bin priorities, truck weight capacities, and landfill weighbridge queue load balancing."
    },
    {
      q: "What if sensors fail or are stolen?",
      a: "The system automatically falls back to time-series historical polynomial regression and flags the missing sensor for immediate inspection."
    },
    {
      q: "How will sanitation workers use it?",
      a: "We built a Hindi-first PWA with offline caching, turn-by-turn navigation, and automated WhatsApp alert dispatch & IVR voice calls for workers without smartphone apps."
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-forest-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-4xl clay-card overflow-hidden flex flex-col max-h-[92vh] border border-cream/15">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-forest-900 border-b border-cream/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-ochre-400 animate-pulse"></span>
            <span className="text-sm font-heading font-black text-cream">
              SwachhRoute Delhi • System Architecture & Executive Briefing
            </span>
            <span className="text-xs font-mono text-cream/60">
              Module {slide.number} of {slides.length} • {slide.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                showSpeakerNotes ? 'bg-olive-600/30 text-cream border-olive-500/40' : 'bg-forest-800 text-cream/70 border-cream/10'
              }`}
            >
              Notes {showSpeakerNotes ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-forest-800 border border-cream/15 text-cream/80 hover:text-cream flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="mb-4">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
              Slide {slide.number} • {slide.title}
            </span>
            <h3 className="text-lg md:text-xl font-heading font-bold text-white mt-1">
              {slide.tagline}
            </h3>
          </div>

          {slide.content}

          {/* Speaker Notes Drawer */}
          {showSpeakerNotes && slide.speakerNote && (
            <div className="mt-6 p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 flex items-start gap-2.5 text-xs text-slate-300">
              <Volume2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 font-mono block text-[10px] uppercase">Speaker Note:</strong>
                <p className="mt-0.5 text-slate-300">{slide.speakerNote}</p>
              </div>
            </div>
          )}

          {/* Judge Q&A Reference Accordion on Final Slides */}
          {slide.number >= 15 && (
            <div className="mt-6 p-4 rounded-xl bg-dark-950 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2 font-heading">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Likely Judge Questions & Prepared Answers</span>
              </div>
              <div className="space-y-2">
                {judgeQuestions.map((qa, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-dark-900 border border-white/5 text-xs">
                    <button
                      onClick={() => setActiveQAIndex(activeQAIndex === i ? null : i)}
                      className="w-full text-left font-bold text-slate-300 hover:text-emerald-300 flex items-center justify-between"
                    >
                      <span>Q: {qa.q}</span>
                      <span className="text-slate-500">{activeQAIndex === i ? '▲' : '▼'}</span>
                    </button>
                    {activeQAIndex === i && (
                      <p className="text-slate-400 text-[11px] mt-1.5 pl-2 border-l-2 border-emerald-500">
                        {qa.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls Footer */}
        <div className="px-6 py-4 bg-forest-900 border-t border-cream/10 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-forest-800 border border-cream/15 text-xs font-bold text-cream hover:bg-forest-750 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-ochre-400" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-ochre-400 shadow-sm' : 'w-2.5 bg-forest-700 hover:bg-forest-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 clay-btn-primary text-cream text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next Module</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
