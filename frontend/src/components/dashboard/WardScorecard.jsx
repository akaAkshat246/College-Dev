import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Fuel, 
  Leaf, 
  AlertTriangle, 
  CheckCircle,
  Star,
  Search
} from 'lucide-react';
import { api } from '../../services/api';

export default function WardScorecard() {
  const [wards, setWards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const data = await api.getWards();
        if (data && data.wards) {
          setWards(data.wards);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchWards();
  }, []);

  const filteredWards = wards.filter(w => {
    const matchesSearch = w.wardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.wardNumber.toString().includes(searchTerm);
    const matchesZone = selectedZone === 'ALL' || w.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const zones = ['ALL', ...new Set(wards.map(w => w.zone))];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Feature F9 • Municipal Corporation of Delhi (MCD)</span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            Delhi Ward Cleanliness & Operational Scorecard
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Transparent public ranking of 12 MCD wards based on collection distance saved (km), diesel consumption reduction, CO₂ emissions averted, overflow frequency, and SLA complaint resolution.
          </p>
        </div>

        {/* Aggregated City Impact Ticker */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center font-mono">
            <span className="text-lg font-black text-emerald-400 block">18,570 L</span>
            <span className="text-[10px] text-slate-400 uppercase">Diesel Saved / Mo</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center font-mono">
            <span className="text-lg font-black text-cyan-400 block">49.8 Tons</span>
            <span className="text-[10px] text-slate-400 uppercase">CO₂ Averted / Mo</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ward name, ward number, or officer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {zones.map(z => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedZone === z ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold' : 'bg-dark-950 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Ward Leaderboard Table */}
      <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-dark-950 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3.5 px-4 text-center">Rank</th>
                <th className="py-3.5 px-4">MCD Ward & Zone</th>
                <th className="py-3.5 px-4">Superintending Officer</th>
                <th className="py-3.5 px-4 text-right">Km Saved %</th>
                <th className="py-3.5 px-4 text-right">Diesel Saved (L)</th>
                <th className="py-3.5 px-4 text-right">CO₂ Averted (T)</th>
                <th className="py-3.5 px-4 text-right">SLA Closure %</th>
                <th className="py-3.5 px-4 text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredWards.map((w) => {
                const isTop3 = w.rank <= 3;

                return (
                  <tr key={w.wardNumber} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono font-black text-xs ${
                        w.rank === 1 ? 'bg-amber-400 text-dark-950 shadow-glow-amber' :
                        w.rank === 2 ? 'bg-slate-300 text-dark-950' :
                        w.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-dark-950 text-slate-400 border border-white/10'
                      }`}>
                        {w.rank}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-heading font-bold text-white">
                        Ward {w.wardNumber} • {w.wardName}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{w.zone} • {w.smartBinsCount} Bins</span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <span>{w.officer}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      +{w.kmSavedPercent}%
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                      {w.dieselSavedLitersMonth.toLocaleString()} L
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-cyan-400 font-bold">
                      {w.co2AvertedTonsMonth} T
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        w.slaClosurePercent >= 90 ? 'bg-emerald-500/20 text-emerald-300' :
                        w.slaClosurePercent >= 80 ? 'bg-amber-500/20 text-amber-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {w.slaClosurePercent}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-dark-950 border border-white/5 font-mono text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{w.rating}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
