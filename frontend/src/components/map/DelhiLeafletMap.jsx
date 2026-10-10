import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Compass, 
  MapPin, 
  Trash2, 
  Truck, 
  AlertTriangle, 
  Crosshair, 
  Battery, 
  Sun, 
  Wind, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Building2,
  Layers,
  Sparkles,
  Route
} from 'lucide-react';

// Custom Marker Creators
const createBinIcon = (status, fillPercent, laneWidth) => {
  const color = status === 'CRITICAL' || fillPercent >= 90 ? '#ef4444' :
                status === 'HIGH' ? '#f97316' :
                status === 'MODERATE' ? '#f59e0b' : '#10b981';

  return L.divIcon({
    className: 'custom-leaflet-bin-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: #060a12;
        border: 2px solid ${color};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: ${color};
        font-family: monospace;
        font-weight: 800;
        font-size: 10px;
        box-shadow: 0 0 12px ${color}60, 0 4px 8px rgba(0,0,0,0.6);
        cursor: pointer;
        position: relative;
      ">
        <span>${fillPercent}%</span>
        ${status === 'CRITICAL' ? '<span style="position:absolute;top:-3px;right:-3px;width:8px;height:8px;border-radius:50%;background:#ef4444;animation:ping 1.2s cubic-bezier(0,0,0.2,1) infinite;"></span>' : ''}
        ${laneWidth === 'NARROW' ? '<span style="position:absolute;bottom:-3px;right:-3px;font-size:8px;background:#f59e0b;color:#000;border-radius:3px;padding:0 2px;font-weight:900;">GALI</span>' : ''}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

const createLandfillIcon = (name, status) => {
  const isCongested = status === 'CONGESTED' || status === 'NEAR_CAPACITY';
  const color = isCongested ? '#f59e0b' : '#10b981';

  return L.divIcon({
    className: 'custom-leaflet-landfill-marker',
    html: `
      <div style="
        width: 44px;
        height: 44px;
        background: #0b0f17;
        border: 2px solid ${color};
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 9px;
        box-shadow: 0 0 16px ${color}80;
        cursor: pointer;
      ">
        <span style="font-size: 14px;">⛰️</span>
        <span style="color:${color};font-family:monospace;font-size:8px;">${name.split(' ')[0]}</span>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

const createDepotIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-depot-marker',
    html: `
      <div style="
        width: 42px;
        height: 42px;
        background: #0b0f17;
        border: 2.5px solid #38bdf8;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(56,189,248,0.7);
        cursor: pointer;
      ">
        <span style="font-size: 16px;">🏢</span>
        <span style="color:#38bdf8;font-family:monospace;font-size:8px;font-weight:bold;">DEPOT</span>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });
};

const createTruckIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-truck-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: #022c22;
        border: 2.5px solid #10b981;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(16,185,129,0.8);
        cursor: pointer;
      ">
        <span style="font-size: 18px;">🚛</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

export default function DelhiLeafletMap({ 
  bins = [], 
  activeRoute = null,
  onSelectBin = () => {},
  onTriggerSurge = () => {},
  onCollectBin = () => {}
}) {
  const [selectedBin, setSelectedBin] = useState(bins[0] || null);
  const [showNaiveRoute, setShowNaiveRoute] = useState(false);
  const [showLaneOverlay, setShowLaneOverlay] = useState(true);
  const [mapCenter, setMapCenter] = useState([28.6304, 77.2475]); // Central Delhi (Rajghat Depot)

  useEffect(() => {
    if (bins.length > 0 && !selectedBin) {
      setSelectedBin(bins[0]);
    }
  }, [bins]);

  // Central Depot
  const depotCoords = [28.6304, 77.2475];

  // 3 Landfills
  const landfills = [
    { id: 'LF_GHAZIPUR', name: 'Ghazipur Landfill', coords: [28.6258, 77.3297], status: 'CONGESTED', queue: '35 min' },
    { id: 'LF_BHALSWA', name: 'Bhalswa Landfill', coords: [28.7455, 77.1610], status: 'OPTIMAL', queue: '18 min' },
    { id: 'LF_OKHLA', name: 'Okhla Landfill', coords: [28.5284, 77.2798], status: 'NEAR_CAPACITY', queue: '50 min' }
  ];

  // Dijkstra AI-Optimized Route Polyline Points
  const dijkstraRoutePoints = [];
  if (activeRoute && activeRoute.stops && activeRoute.stops.length > 0) {
    dijkstraRoutePoints.push(depotCoords);
    activeRoute.stops.forEach(stop => {
      if (stop.type === 'LANDFILL_UNLOAD') {
        const lf = landfills.find(l => l.id === stop.landfillId);
        if (lf) dijkstraRoutePoints.push(lf.coords);
      } else {
        const b = bins.find(item => item.id === stop.binId || item.nodeId === stop.nodeId);
        if (b) dijkstraRoutePoints.push([b.latitude, b.longitude]);
      }
    });
    dijkstraRoutePoints.push(depotCoords);
  } else {
    // Default optimized route connecting urgent bins
    const urgentBins = bins.filter(b => b.status === 'CRITICAL' || b.status === 'HIGH').slice(0, 5);
    if (urgentBins.length > 0) {
      dijkstraRoutePoints.push(depotCoords);
      urgentBins.forEach(b => dijkstraRoutePoints.push([b.latitude, b.longitude]));
      dijkstraRoutePoints.push(landfills[1].coords); // Bhalswa optimal stop
      dijkstraRoutePoints.push(depotCoords);
    }
  }

  // Naive Fixed Schedule Route (Longer, visits all bins sequentially)
  const naiveRoutePoints = [
    depotCoords,
    [28.6315, 77.2167], // CP
    [28.6483, 77.1895], // Karol Bagh
    [28.6292, 77.0784], // Janakpuri
    [28.5823, 77.0597], // Dwarka
    [28.5401, 77.1542], // Vasant Kunj
    [28.5494, 77.2001], // Hauz Khas
    [28.5283, 77.2193], // Saket
    [28.5700, 77.2400], // Lajpat Nagar
    [28.6080, 77.2950], // Mayur Vihar
    [28.6310, 77.2770], // Laxmi Nagar
    [28.6738, 77.2910], // Shahdara
    [28.6506, 77.2303], // Chandni Chowk
    [28.6989, 77.1517], // Pitampura
    [28.7159, 77.1287], // Rohini
    landfills[2].coords, // Okhla (Long queue)
    depotCoords
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Leaflet Interactive GIS Map (8 cols) */}
      <div className="lg:col-span-8 p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl flex flex-col justify-between relative">
        
        {/* Map Header & Route Mode Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-heading font-black text-white">
                SwachhRoute Delhi GIS Grid
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">14 Localities • Central Depot • Ghazipur, Bhalswa & Okhla Landfills</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Toggle Naive vs Dijkstra Route */}
            <button
              onClick={() => setShowNaiveRoute(!showNaiveRoute)}
              className={`px-3 py-1.5 rounded-xl border transition-colors ${
                showNaiveRoute ? 'bg-red-500/20 text-red-300 border-red-500/40 font-bold' : 'bg-dark-950 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {showNaiveRoute ? 'Hide Naive Route' : 'Compare Naive Route (38.5 km)'}
            </button>

            {/* Recenter Button */}
            <button
              onClick={() => setMapCenter([28.6304, 77.2475])}
              className="p-1.5 rounded-xl bg-dark-950 border border-white/10 text-slate-300 hover:text-white"
              title="Recenter Map"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 z-0">
          <MapContainer
            center={mapCenter}
            zoom={11}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%', backgroundColor: '#060a12' }}
          >
            <ChangeMapView coords={mapCenter} />

            {/* Dark Theme Carto Vector Map Layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Central Depot Marker */}
            <Marker position={depotCoords} icon={createDepotIcon()}>
              <Popup>
                <div className="p-1 text-xs">
                  <strong className="block text-cyan-400 font-heading">Central Municipal Depot Hub</strong>
                  <p>IP Estate / Rajghat Garage • Fleet Base</p>
                </div>
              </Popup>
            </Marker>

            {/* 3 Delhi Landfills */}
            {landfills.map((lf) => (
              <Marker key={lf.id} position={lf.coords} icon={createLandfillIcon(lf.name, lf.status)}>
                <Popup>
                  <div className="p-1 text-xs">
                    <strong className="block font-heading">{lf.name}</strong>
                    <span className="text-amber-400 font-mono">Queue: {lf.queue}</span>
                    <span className="block text-slate-500">Status: {lf.status}</span>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* 14 Smart Locality Bins */}
            {bins.map((bin) => (
              <Marker
                key={bin.id}
                position={[bin.latitude, bin.longitude]}
                icon={createBinIcon(bin.status, bin.currentFill, bin.laneWidth)}
                eventHandlers={{
                  click: () => {
                    setSelectedBin(bin);
                    onSelectBin(bin);
                  }
                }}
              >
                <Popup>
                  <div className="p-1.5 text-xs text-slate-900">
                    <strong className="block font-heading">{bin.bin_code} — {bin.name}</strong>
                    <span className="text-slate-600 block">{bin.sector} ({bin.locality})</span>
                    <div className="mt-1 flex justify-between font-mono font-bold text-emerald-600">
                      <span>Fill: {bin.currentFill}%</span>
                      <span>ETA: ~{bin.overflowEtaHours}h</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Live Collection Truck Marker */}
            <Marker position={[28.6506, 77.2303]} icon={createTruckIcon()}>
              <Popup>
                <div className="p-1 text-xs">
                  <strong>MCD Fleet Truck 1 (DL-01-EA-4092)</strong>
                  <p>Driver: Sunil Kumar • Status: EN_ROUTE</p>
                </div>
              </Popup>
            </Marker>

            {/* Dijkstra AI-Optimized Polyline (Emerald Green) */}
            {dijkstraRoutePoints.length > 1 && (
              <Polyline
                positions={dijkstraRoutePoints}
                color="#10b981"
                weight={4.5}
                opacity={0.9}
              />
            )}

            {/* Naive Fixed-Schedule Route Polyline (Red Dashed) */}
            {showNaiveRoute && (
              <Polyline
                positions={naiveRoutePoints}
                color="#ef4444"
                weight={3}
                opacity={0.6}
                dashArray="6, 8"
              />
            )}
          </MapContainer>
        </div>

        {/* Route Stats Legend Strip */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-3 h-1 bg-emerald-400 rounded"></span>
              <span>Dijkstra AI Route: ~27.1 km (29.6% saved)</span>
            </span>

            {showNaiveRoute && (
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-1 bg-red-400 rounded"></span>
                <span>Naive Static Route: ~38.5 km</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>⛰️ 3 Landfills</span>
            <span>•</span>
            <span>🏢 Depot Hub</span>
            <span>•</span>
            <span>14 Smart Bins</span>
          </div>
        </div>

      </div>

      {/* 2. Selected Smart Bin Telematics Inspector (4 cols) */}
      <div className="lg:col-span-4 p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl flex flex-col justify-between">
        {selectedBin ? (
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{selectedBin.ward || 'MCD Ward'}</span>
                <h3 className="text-xl font-heading font-black text-white mt-0.5">{selectedBin.bin_code}</h3>
                <p className="text-xs text-slate-200 font-medium">{selectedBin.name}</p>
                <span className="text-[11px] text-slate-400 font-mono">{selectedBin.sector}, {selectedBin.locality}</span>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase border ${
                selectedBin.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-glow-red animate-pulse' :
                selectedBin.status === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                selectedBin.status === 'MODERATE' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {selectedBin.status}
              </span>
            </div>

            {/* Ultrasonic Fill Meter */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Live Fill Level</span>
                <span className="text-2xl font-heading font-black text-white">{selectedBin.currentFill}%</span>
              </div>

              <div className="w-full h-2.5 bg-dark-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    selectedBin.currentFill >= 90 ? 'bg-red-500' :
                    selectedBin.currentFill >= 75 ? 'bg-orange-500' :
                    selectedBin.currentFill >= 50 ? 'bg-amber-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${selectedBin.currentFill}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span>Lane: <strong className="text-white">{selectedBin.laneWidth || 'BROAD'}</strong></span>
                <span>Cap: {selectedBin.capacityLiters} L</span>
                <span>Velocity: {selectedBin.fillRatePerHour}%/h</span>
              </div>
            </div>

            {/* Overflow ETA */}
            <div className={`p-3.5 rounded-xl border ${
              selectedBin.status === 'CRITICAL' ? 'bg-red-950/30 border-red-500/40 text-red-200' :
              selectedBin.status === 'HIGH' ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' :
              'bg-dark-950 border-white/5 text-slate-300'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-heading font-bold uppercase text-slate-300">
                  Time-to-Overflow Forecast
                </span>
              </div>
              <p className="text-sm font-semibold">
                Estimated Overflow: <span className="font-mono text-emerald-400 font-bold">~{selectedBin.overflowEtaHours} hours</span>
              </p>
            </div>

            {/* Telemetry Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-dark-950 border border-white/5 flex items-center gap-2">
                <Battery className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Battery</span>
                  <span className="text-white font-bold">{selectedBin.batteryPercent}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-dark-950 border border-white/5 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-500 block">Solar</span>
                  <span className="text-emerald-400 font-bold">{selectedBin.solarActive ? 'ACTIVE' : 'BATTERY'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Surge & Collect Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onTriggerSurge(selectedBin.id, 94)}
                className="flex-1 py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span>Simulate Surge</span>
              </button>

              <button
                onClick={() => onCollectBin(selectedBin.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Empty Bin</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs">Click any marker on the map to inspect telematics.</p>
          </div>
        )}
      </div>

    </div>
  );
}
