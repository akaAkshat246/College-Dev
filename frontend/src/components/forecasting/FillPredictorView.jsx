import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Sun, 
  CloudRain, 
  Flame, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

export default function FillPredictorView({ bins = [] }) {
  const [selectedFestival, setSelectedFestival] = useState('DIWALI');
  const [selectedWeather, setSelectedWeather] = useState('CLEAR');
  const [dayOfWeek, setDayOfWeek] = useState('SATURDAY');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const data = await api.getForecasting({
        festival: selectedFestival,
        weather: selectedWeather,
        dayOfWeek
      });
      if (data) {
        setForecastData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [selectedFestival, selectedWeather, dayOfWeek]);

  const predictions = forecastData?.predictions || [];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature F1 • Time-Series Fill Prediction</span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            Smart Bin Overflow Forecasting Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Forecasts fill levels across Delhi before bins overflow. Models historical footfall velocity, cultural festival surges (Diwali, Holi, Durga Puja, Eid), weekend market rushes, and ambient weather.
          </p>
        </div>

        {/* Forecast KPI summary */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center font-mono">
            <span className="text-lg font-black text-red-400 block">{forecastData?.criticalIn4HoursCount || 0}</span>
            <span className="text-[10px] text-slate-400 uppercase">Critical in &lt;4 Hrs</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center font-mono">
            <span className="text-lg font-black text-amber-400 block">{forecastData?.criticalIn8HoursCount || 0}</span>
            <span className="text-[10px] text-slate-400 uppercase">Surge in &lt;8 Hrs</span>
          </div>
        </div>
      </div>

      {/* Simulation Factor Controls */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Festival Surge Factor</span>
          </label>
          <select
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
          >
            <option value="NONE">Normal Working Day (1.0x)</option>
            <option value="DIWALI">Diwali & New Year (+65% surge)</option>
            <option value="HOLI">Holi Festival (+45% surge)</option>
            <option value="DURGA_PUJA">Durga Puja / Dussehra (+50% surge)</option>
            <option value="EID">Eid-ul-Fitr / Eid-ul-Adha (+40% surge)</option>
            <option value="INDEPENDENCE_DAY">Independence Day (+30% surge)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Weather Condition</span>
          </label>
          <select
            value={selectedWeather}
            onChange={(e) => setSelectedWeather(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
          >
            <option value="CLEAR">Clear & Moderate (24°C)</option>
            <option value="HEATWAVE">Summer Heatwave 42°C (+15% fill, +120% odour)</option>
            <option value="MONSOON">Heavy Monsoon Rain (+25% volume)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Day of Week (Footfall)</span>
          </label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:border-emerald-500"
          >
            <option value="SATURDAY">Saturday (Weekend Market Peak +28%)</option>
            <option value="SUNDAY">Sunday (High Tourist / Food Surge)</option>
            <option value="MONDAY">Monday (Weekly Stock Clearance)</option>
            <option value="WEDNESDAY">Wednesday (Mid-Week Baseline)</option>
          </select>
        </div>
      </div>

      {/* Forecast Projections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((p) => {
          const isCritical = p.hoursToOverflow <= 2.0 || p.currentFill >= 85;
          const isHigh = p.hoursToOverflow <= 6.0;

          return (
            <div
              key={p.binId}
              className={`p-4 rounded-xl bg-dark-900 border transition-all ${
                isCritical ? 'border-red-500/50 bg-red-950/10' :
                isHigh ? 'border-amber-500/30' : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{p.binCode}</span>
                  <h4 className="text-xs font-heading font-bold text-white mt-0.5">{p.name}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isCritical ? 'bg-red-500/20 text-red-300' :
                  isHigh ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {p.overflowRiskRating}
                </span>
              </div>

              {/* Progress & Fill Velocity */}
              <div className="my-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Current Fill: <strong className="text-white">{p.currentFill}%</strong></span>
                  <span className="text-amber-400 font-bold">Overflow in ~{p.hoursToOverflow} hrs</span>
                </div>

                <div className="w-full h-2 rounded-full bg-dark-950 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      p.currentFill >= 85 ? 'bg-red-500' : p.currentFill >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${p.currentFill}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Base Rate: {p.baseFillRate}%/hr</span>
                  <span className="text-emerald-400 font-bold">Surge Rate: {p.effectiveFillRate}%/hr</span>
                </div>
              </div>

              {/* Horizon Projection Strip */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block mb-1.5">Projected Fill Horizon:</span>
                <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                  {p.projectionCurve.slice(0, 4).map((curve, idx) => (
                    <div key={idx} className="p-1 rounded bg-dark-950 border border-white/5">
                      <span className="text-slate-500 block">+{curve.hoursAhead}h</span>
                      <span className={`font-bold ${
                        curve.projectedFill >= 90 ? 'text-red-400' :
                        curve.projectedFill >= 75 ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {curve.projectedFill}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
