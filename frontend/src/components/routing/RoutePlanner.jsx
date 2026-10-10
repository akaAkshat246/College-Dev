import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Share2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Zap, 
  ArrowRight, 
  Flame, 
  TrendingDown, 
  Fuel, 
  Trees,
  Layers,
  Code2,
  Cpu,
  AlertTriangle,
  Building2,
  Sparkles,
  Sliders
} from 'lucide-react';
import { api } from '../../services/api';

export default function RoutePlanner({ bins = [], onRouteGenerated = () => {} }) {
  const [routePlan, setRoutePlan] = useState(null);
  const [multiFleetPlan, setMultiFleetPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('single'); // 'single', 'multi', 'dsa'
  const [selectedVehicleType, setSelectedVehicleType] = useState('HEAVY_COMPACTOR');
  const [vehicleCapacityKg, setVehicleCapacityKg] = useState(6000);
  const [trafficMultiplier, setTrafficMultiplier] = useState(1.0);
  const [festivalSurge, setFestivalSurge] = useState(1.0);

  const handleGenerateRoute = async () => {
    setLoading(true);
    try {
      const planRes = await api.optimizeRoute({
        vehicleType: selectedVehicleType,
        vehicleCapacityKg,
        trafficMultiplier,
        festivalSurge
      });

      if (planRes && planRes.route) {
        setRoutePlan(planRes.route);
        onRouteGenerated(planRes.route);
      }

      const fleetRes = await api.optimizeMultiTruck({ trafficMultiplier });
      if (fleetRes && fleetRes.fleetPlans) {
        setMultiFleetPlan(fleetRes);
      }
    } catch (err) {
      console.error('Route generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateRoute();
  }, [selectedVehicleType, vehicleCapacityKg, trafficMultiplier, festivalSurge]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                FEATURES F2 & F3 • DIJKSTRA ROUTE OPTIMIZER
              </span>
              <span className="text-xs font-mono text-slate-400">Multi-Truck Fleet & Lane-Aware Sizing</span>
            </div>
            <h1 className="text-3xl font-heading font-black text-white tracking-tight">
              SwachhRoute <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Routing & Fleet Dispatch</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Solves the municipal Vehicle Routing Problem (VRP) across 14 Delhi localities with Dijkstra shortest-path pathfinding, lane-width vehicle sizing (E-Rickshaw vs Tipper vs Compactor), and dynamic Landfill load balancing.
            </p>
          </div>

          <button
            onClick={handleGenerateRoute}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-dark-950 font-heading font-black text-xs shadow-glow-sm hover:brightness-110 disabled:opacity-50"
          >
            <Zap className="w-4 h-4 fill-dark-950" />
            <span>{loading ? 'Solving Graph...' : 'Re-Run Dijkstra Solver'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Optimization Parameters Bar */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <label className="block text-slate-400 mb-1.5 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vehicle Type (Lane-Sizing)</span>
          </label>
          <select
            value={selectedVehicleType}
            onChange={(e) => {
              setSelectedVehicleType(e.target.value);
              setVehicleCapacityKg(e.target.value === 'E_RICKSHAW' ? 1500 : e.target.value === 'LIGHT_TIPPER' ? 4000 : 6000);
            }}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:border-emerald-500"
          >
            <option value="HEAVY_COMPACTOR">Heavy Compactor (10-Ton / Broad)</option>
            <option value="LIGHT_TIPPER">Medium Tipper (4-Ton / Medium)</option>
            <option value="E_RICKSHAW">E-Rickshaw Mini-Tipper (Narrow Galli)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1.5 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Payload Capacity: <strong className="text-white">{vehicleCapacityKg} kg</strong></span>
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={vehicleCapacityKg}
            onChange={(e) => setVehicleCapacityKg(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Traffic Factor: <strong className="text-white">{trafficMultiplier}x</strong></span>
          </label>
          <select
            value={trafficMultiplier}
            onChange={(e) => setTrafficMultiplier(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:border-emerald-500"
          >
            <option value={1.0}>1.0x (Normal Smooth Flow)</option>
            <option value={1.4}>1.4x (Peak Evening Rush)</option>
            <option value={1.8}>1.8x (Heavy Delhi Gridlock)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Festival Surge: <strong className="text-white">{festivalSurge === 1.65 ? 'Diwali' : 'Normal'}</strong></span>
          </label>
          <select
            value={festivalSurge}
            onChange={(e) => setFestivalSurge(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:border-emerald-500"
          >
            <option value={1.0}>1.0x (Normal Schedule)</option>
            <option value={1.65}>1.65x (Diwali / New Year Peak)</option>
            <option value={1.45}>1.45x (Holi Festival Surge)</option>
          </select>
        </div>
      </div>

      {/* Benchmark Efficiency Comparison Cards */}
      {routePlan && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">Dijkstra Route Distance</span>
            <div className="text-3xl font-heading font-black text-emerald-400 mt-1">
              {routePlan.totalDistanceKm} <span className="text-xs text-slate-400 font-mono">km</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              vs naive static {routePlan.legacyDistanceKm} km
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">Distance Saved</span>
            <div className="text-3xl font-heading font-black text-emerald-400 mt-1">
              -{routePlan.distanceSavedKm} <span className="text-xs font-mono text-emerald-500">km ({routePlan.percentDistanceSaved}%)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Dijkstra Shortest Path Optimization</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">Diesel Saved / Round</span>
            <div className="text-3xl font-heading font-black text-amber-300 mt-1">
              {routePlan.fuelSavedLiters} <span className="text-xs text-slate-400 font-mono">L Diesel</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">₹{Math.round(routePlan.fuelSavedLiters * 92)} fuel expense averted</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">CO₂ Footprint Averted</span>
            <div className="text-3xl font-heading font-black text-cyan-400 mt-1">
              -{routePlan.co2SavedKg} <span className="text-xs text-slate-400 font-mono">kg CO₂</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">ESG Environmental Credits</div>
          </div>
        </div>
      )}

      {/* Mode Tabs: Single Truck Route vs Multi-Truck Fleet vs DSA Graph */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-6 text-xs font-heading font-bold">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'single'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Single Truck Dispatch ({routePlan?.stops?.length || 0} Stops + Landfill)
          </button>

          <button
            onClick={() => setActiveTab('multi')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'multi'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multi-Truck Fleet Planner (Feature F2)
          </button>

          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'dsa'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DSA Algorithmic Breakdown
          </button>
        </div>

        {/* Tab 1: Single Truck Stops & Landfill Insertion */}
        {activeTab === 'single' && routePlan && (
          <div className="space-y-4">
            
            {/* Origin Hub */}
            <div className="p-4 rounded-xl bg-dark-950 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                DEPOT
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Fleet Origin Hub</span>
                <h4 className="text-sm font-bold text-white">Central Municipal Depot (Rajghat / IP Estate)</h4>
                <p className="text-xs text-slate-400 font-mono">Vehicle Capacity: {vehicleCapacityKg} kg • Profile: {selectedVehicleType}</p>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">0.0 km</div>
            </div>

            {/* Stops */}
            {routePlan.stops.map((stop) => {
              const isLandfill = stop.type === 'LANDFILL_UNLOAD';

              return (
                <div
                  key={stop.stopNumber}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                    isLandfill ? 'bg-amber-950/20 border-amber-500/40 shadow-glow-amber' :
                    stop.urgencyRank === 'CRITICAL' ? 'bg-red-950/20 border-red-500/40' :
                    'bg-dark-950 border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                    isLandfill ? 'bg-amber-500/20 text-amber-300' :
                    stop.urgencyRank === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                    'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {isLandfill ? 'LF' : `#${stop.stopNumber}`}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {isLandfill ? `[LANDFILL STOP] ${stop.landfillName}` : `${stop.binCode} — ${stop.name}`}
                      </h4>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isLandfill ? 'bg-amber-500/20 text-amber-300' :
                        stop.urgencyRank === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {isLandfill ? 'TRUCK FULL • UNLOAD' : `${stop.urgencyRank} (${stop.currentFill}%)`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {isLandfill ? `Queue: ${stop.queueWaitMinutes} mins • Discharged: ${stop.dischargedWeightKg} kg` :
                      `${stop.sector} • Lane: ${stop.laneWidth} • Payload: ~${stop.collectedWeightKg} kg`}
                    </p>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs font-bold text-emerald-400 block">+{stop.distanceFromLastStopKm} km</span>
                  </div>
                </div>
              );
            })}

            {/* Return to Depot */}
            <div className="p-4 rounded-xl bg-dark-950 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                DEPOT
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Shift Completion</span>
                <h4 className="text-sm font-bold text-white">Return to Central Municipal Depot Hub</h4>
                <p className="text-xs text-slate-400 font-mono">Total shift duration: ~{routePlan.estimatedDurationMinutes} mins</p>
              </div>
              <div className="text-right font-mono text-xs text-emerald-400 font-bold">Route Completed</div>
            </div>

          </div>
        )}

        {/* Tab 2: Multi-Truck Fleet Planner (F2) */}
        {activeTab === 'multi' && multiFleetPlan && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-dark-950 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-300">
                Active Multi-Truck Fleet Dispatch: <strong>{multiFleetPlan.fleetPlans.length} Trucks</strong>
              </span>
              <span className="text-emerald-400 font-bold">
                Combined Fuel Saved: {multiFleetPlan.totalFleetFuelSavedL} L • Total Distance: {multiFleetPlan.totalFleetKm} km
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {multiFleetPlan.fleetPlans.map((plan, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-dark-950 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{plan.vehicle.type}</span>
                      <h4 className="text-sm font-bold text-white">{plan.vehicle.name} ({plan.vehicle.plate})</h4>
                      <p className="text-xs text-slate-400">Driver: {plan.vehicle.driver} • Cap: {plan.vehicle.capacityKg} kg</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-dark-900 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Assigned Stops:</span>
                      <strong>{plan.route.stops.length} stops</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Route Distance:</span>
                      <strong className="text-emerald-400">{plan.route.totalDistanceKm} km</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Fuel Saved:</span>
                      <strong className="text-amber-400">{plan.route.fuelSavedLiters} L</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: DSA Technical Breakdown */}
        {activeTab === 'dsa' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-dark-950 border border-white/10">
                <h4 className="font-bold text-emerald-400 mb-2 font-mono">1. Max-Heap Priority Formulation</h4>
                <div className="p-2.5 rounded bg-dark-900 font-mono text-slate-300 text-[11px] mb-2">
                  Score = (Fill% × 0.45) + (Velocity × 3.5) + (Odour × 0.15) + (Hours × 0.60) + LaneBonus
                </div>
                <p className="text-slate-400">Extracts highest urgency municipal nodes in O(log N) complexity.</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-white/10">
                <h4 className="font-bold text-cyan-400 mb-2 font-mono">2. Dijkstra Shortest-Path Relaxation</h4>
                <div className="p-2.5 rounded bg-dark-900 font-mono text-slate-300 text-[11px] mb-2">
                  d[v] = min(d[v], d[u] + w(u, v) / (speed / trafficMultiplier))
                </div>
                <p className="text-slate-400">Guarantees shortest feasible traversal path across Delhi road graph.</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
