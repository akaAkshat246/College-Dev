import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Clock, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  Flame, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { api } from '../../services/api';

export default function LandfillBalancerView() {
  const [landfills, setLandfills] = useState([]);
  const [selectedTruckLocation, setSelectedTruckLocation] = useState('BIN_CHANDNI');
  const [truckPayloadKg, setTruckPayloadKg] = useState(4800);
  const [balancingDecision, setBalancingDecision] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLandfills = async () => {
    try {
      const data = await api.getLandfills();
      if (data && data.landfills) {
        setLandfills(data.landfills);
        setBalancingDecision(data.systemEvaluation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLandfills();
  }, []);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await api.balanceLandfill(selectedTruckLocation, truckPayloadKg);
      if (res && res.decision) {
        setBalancingDecision(res.decision);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const optimal = balancingDecision?.optimalLandfill;
  const naive = balancingDecision?.naiveNearestLandfill;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature F4 • Dynamic Landfill Load Balancer</span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            Delhi Landfill Balancing & Queue Optimization
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time multi-criteria decision engine for Ghazipur, Bhalswa, and Okhla. Evaluates weighbridge queue wait times, daily capacity, methane alerts, and travel distances to prevent municipal gridlock.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLandfills}
            className="px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-bold"
          >
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* 3 Delhi Landfills Live Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {landfills.map((lf) => {
          const isOptimal = optimal?.id === lf.id;
          const isCongested = lf.status === 'CONGESTED' || lf.status === 'NEAR_CAPACITY';

          return (
            <div
              key={lf.id}
              className={`p-5 rounded-2xl bg-dark-900 border transition-all relative overflow-hidden ${
                isOptimal ? 'border-emerald-500/50 shadow-glow-sm bg-gradient-to-b from-dark-900 to-emerald-950/20' :
                isCongested ? 'border-amber-500/30' : 'border-white/10'
              }`}
            >
              {isOptimal && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-dark-950 px-3 py-0.5 text-[10px] font-mono font-black uppercase rounded-bl-lg">
                  AI Recommended Target
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{lf.zone}</span>
                  <h3 className="text-base font-heading font-bold text-white mt-0.5">{lf.name}</h3>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 my-4 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-dark-950 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Queue Wait Time</span>
                  <span className="text-base font-bold text-amber-400">{lf.weighbridgeQueueMinutes} mins</span>
                  <span className="text-[10px] text-slate-500 block">{lf.queueTruckCount} trucks in queue</span>
                </div>

                <div className="p-2.5 rounded-xl bg-dark-950 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Daily Capacity</span>
                  <span className="text-base font-bold text-slate-200">{lf.currentLoadTons}/{lf.capacityTonsPerDay} T</span>
                  <span className="text-[10px] text-slate-500 block">{lf.utilizationPercent}% utilized</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Daily Load Progress</span>
                  <span>{lf.utilizationPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-dark-950 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      lf.utilizationPercent > 85 ? 'bg-red-500' :
                      lf.utilizationPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, lf.utilizationPercent)}%` }}
                  />
                </div>
              </div>

              {/* Methane & Advisory */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>CH₄ {lf.methanePpm} ppm</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  lf.status === 'OPTIMAL' ? 'bg-emerald-500/20 text-emerald-300' :
                  lf.status === 'CONGESTED' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {lf.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Balancing Solver Simulator */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-white/10">
        <h3 className="text-base font-heading font-bold text-white mb-4">
          Simulate Dynamic Truck Landfill Balancing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Current Truck Position</label>
            <select
              value={selectedTruckLocation}
              onChange={(e) => setSelectedTruckLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
            >
              <option value="BIN_CHANDNI">Chandni Chowk (Old Delhi)</option>
              <option value="BIN_CP">Connaught Place (Central)</option>
              <option value="BIN_KAROLBAGH">Karol Bagh (West)</option>
              <option value="BIN_LAXMINAGAR">Laxmi Nagar (East)</option>
              <option value="BIN_SAKET">Saket (South)</option>
              <option value="BIN_ROHINI">Rohini (North-West)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Waste Payload On-Board (Kg)</label>
            <input
              type="number"
              value={truckPayloadKg}
              onChange={(e) => setTruckPayloadKg(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
              step="500"
              min="1000"
              max="10000"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleEvaluate}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-bold text-xs shadow-glow-sm hover:brightness-110 disabled:opacity-50"
            >
              {loading ? 'Evaluating Model...' : 'Calculate Optimal Landfill'}
            </button>
          </div>
        </div>

        {/* Solver Decision Comparison Result */}
        {balancingDecision && optimal && naive && (
          <div className="p-4 rounded-xl bg-dark-950 border border-emerald-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-heading font-bold text-white">
                  Model Recommendation: Route to {optimal.name}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Time Saved: ~{balancingDecision.timeSavedMinutesVsNearest} minutes
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {balancingDecision.decisionExplanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20">
                <span className="text-slate-400 block text-[10px]">Naive Nearest Approach</span>
                <span className="text-red-300 font-bold block">{naive.name}</span>
                <span className="text-slate-400 text-[11px]">
                  {naive.distanceFromTruckKm} km • {naive.queueWaitMinutes} min queue • Total: {naive.totalTurnaroundMinutes} mins
                </span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-emerald-400 block text-[10px]">SwachhRoute Balanced Dispatch</span>
                <span className="text-emerald-300 font-bold block">{optimal.name}</span>
                <span className="text-slate-300 text-[11px]">
                  {optimal.distanceFromTruckKm} km • {optimal.queueWaitMinutes} min queue • Total: {optimal.totalTurnaroundMinutes} mins
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
