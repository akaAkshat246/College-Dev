import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthScreen from './components/auth/AuthScreen';
import LandingPage from './components/landing/LandingPage';
import Navbar from './components/layout/Navbar';
import DemoControlBar from './components/simulator/DemoControlBar';
import OverviewView from './components/dashboard/OverviewView';
import WardScorecard from './components/dashboard/WardScorecard';
import WorkerPortal from './components/worker/WorkerPortal';
import CitizenApp from './components/citizen/CitizenApp';
import WasteScanner from './components/scanner/WasteScanner';
import SmartBinFleet from './components/bins/SmartBinFleet';
import RoutePlanner from './components/routing/RoutePlanner';
import LandfillBalancerView from './components/landfills/LandfillBalancerView';
import FillPredictorView from './components/forecasting/FillPredictorView';
import HotspotPredictor from './components/hotspots/HotspotPredictor';
import AnalyticsView from './components/analytics/AnalyticsView';
import PitchDeckViewer from './components/demo/PitchDeckViewer';
import KillerDemoModal from './components/demo/KillerDemoModal';
import { api } from './services/api';

function MainApp() {
  const { user, token, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bins, setBins] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastActionMessage, setLastActionMessage] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);

  // Set default tab when role changes
  useEffect(() => {
    if (user?.role === 'WORKER') {
      setActiveTab('worker-home');
    } else if (user?.role === 'CITIZEN') {
      setActiveTab('citizen-home');
    } else {
      setActiveTab('dashboard');
    }
  }, [user?.role]);

  // Load bins telemetry
  const refreshData = async () => {
    try {
      const data = await api.getBins();
      if (data && data.bins) {
        setBins(data.bins);
      }
    } catch (err) {
      console.warn('Backend sync warning:', err);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerSurge = async (binId = 'BIN-CC-102', targetFill = 94) => {
    setIsLoading(true);
    try {
      const res = await api.simulateBinSurge(binId, targetFill);
      if (res && res.bin) {
        setBins(prev => prev.map(b => b.id === binId ? res.bin : b));
        setLastActionMessage(`Delhi Sensor Grid Surge: ${res.bin.bin_code} (${res.bin.name}) escalated to ${res.bin.currentFill}% (CRITICAL)`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollectBin = async (binId) => {
    setIsLoading(true);
    try {
      const res = await api.collectBin(binId);
      if (res && res.bin) {
        setBins(prev => prev.map(b => b.id === binId ? res.bin : b));
        setLastActionMessage(`Emptied and Cleared ${res.bin.bin_code}. Reset to ${res.bin.currentFill}%`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvanceTime = async (hours = 2) => {
    setIsLoading(true);
    try {
      await api.advanceTime(hours);
      await refreshData();
      setLastActionMessage(`Telemetry fast-forwarded by +${hours} hours.`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await api.resetSimulator();
      await refreshData();
      setLastActionMessage('Delhi sensor grid reset to baseline initial seed state.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-emerald-400 font-mono text-xs">
        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping mr-3"></span>
        <span>Initializing SwachhRoute Delhi Municipal OS...</span>
      </div>
    );
  }

  // Public Landing Page and Auth Flow
  if (!token || !user) {
    if (showAuthScreen) {
      return <AuthScreen onBackToLanding={() => setShowAuthScreen(false)} />;
    }

    return (
      <>
        <LandingPage 
          onLoginClick={() => setShowAuthScreen(true)} 
          onLaunchDemo={() => setIsDemoModalOpen(true)} 
        />

        {/* Guided Interactive Demo Walkthrough Modal */}
        <KillerDemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onNavigateTab={() => setShowAuthScreen(true)}
          onTriggerSurge={handleTriggerSurge}
        />
      </>
    );
  }

  const criticalCount = bins.filter(b => b.status === 'CRITICAL' || b.currentFill >= 90).length;

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-dark-950">
      
      <div>
        {/* 1. Header with Hamburger Menu and Active View Indicator */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onStartKillerDemo={() => setIsDemoModalOpen(true)}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          criticalCount={criticalCount}
        />

        {/* 2. Interactive Telemetry Simulator HUD Strip */}
        <DemoControlBar
          onTriggerSurge={handleTriggerSurge}
          onAdvanceTime={handleAdvanceTime}
          onReset={handleReset}
          isLoading={isLoading}
          lastActionMessage={lastActionMessage}
        />

        {/* 3. Role-Based Views Router */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* ADMIN VIEWS */}
          {user.role === 'ADMIN' && (
            <>
              {activeTab === 'dashboard' && (
                <OverviewView
                  bins={bins}
                  activeRoute={activeRoute}
                  onSelectBin={(bin) => console.log('Selected:', bin)}
                  onTriggerSurge={handleTriggerSurge}
                  onCollectBin={handleCollectBin}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'bins' && (
                <SmartBinFleet
                  bins={bins}
                  onTriggerSurge={handleTriggerSurge}
                  onCollectBin={handleCollectBin}
                />
              )}

              {activeTab === 'forecasting' && (
                <FillPredictorView bins={bins} />
              )}

              {activeTab === 'routing' && (
                <RoutePlanner
                  bins={bins}
                  onRouteGenerated={(route) => setActiveRoute(route)}
                />
              )}

              {activeTab === 'landfills' && (
                <LandfillBalancerView />
              )}

              {activeTab === 'scanner' && (
                <WasteScanner />
              )}

              {activeTab === 'hotspots' && (
                <HotspotPredictor />
              )}

              {activeTab === 'scorecard' && (
                <WardScorecard />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView />
              )}
            </>
          )}

          {/* WORKER VIEWS */}
          {user.role === 'WORKER' && (
            <>
              {activeTab === 'worker-home' && (
                <WorkerPortal />
              )}

              {activeTab === 'bins' && (
                <SmartBinFleet
                  bins={bins}
                  onTriggerSurge={handleTriggerSurge}
                  onCollectBin={handleCollectBin}
                />
              )}

              {activeTab === 'routing' && (
                <RoutePlanner
                  bins={bins}
                  onRouteGenerated={(route) => setActiveRoute(route)}
                />
              )}

              {activeTab === 'scanner' && (
                <WasteScanner />
              )}
            </>
          )}

          {/* CITIZEN VIEWS */}
          {user.role === 'CITIZEN' && (
            <>
              {activeTab === 'citizen-home' && (
                <CitizenApp />
              )}

              {activeTab === 'scanner' && (
                <WasteScanner />
              )}
            </>
          )}

        </main>
      </div>

      {/* 4. Municipal Footer */}
      <footer className="border-t border-white/10 bg-dark-900/80 backdrop-blur-xl py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-olive-400 animate-pulse"></span>
            <span className="font-heading font-bold text-cream text-sm">SwachhRoute Delhi</span>
            <span className="text-cream/80">• Municipal Corporation of Delhi • Automated Operations Core</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-ochre-400/80">
            <span>FastAPI: 8000</span>
            <span>•</span>
            <span>Express: 5000</span>
            <span>•</span>
            <span>Vite: 5173</span>
          </div>
        </div>
      </footer>

      {/* 5. Complete 17-Module System Architecture & Executive Briefing */}
      <PitchDeckViewer
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        onLaunchDemo={() => {
          setIsPitchDeckOpen(false);
          setActiveTab('dashboard');
        }}
      />

      {/* 6. Guided Interactive Demo Walkthrough Modal */}
      <KillerDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onTriggerSurge={handleTriggerSurge}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
