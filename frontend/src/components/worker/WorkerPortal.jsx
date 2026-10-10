import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Navigation, 
  Clock, 
  Battery, 
  Sparkles, 
  Check, 
  ChevronRight, 
  User, 
  Radio, 
  Flame,
  Award,
  History,
  ShieldCheck,
  MessageSquare,
  Volume2,
  Wifi,
  WifiOff,
  Languages
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

export default function WorkerPortal() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [fillAfter, setFillAfter] = useState(8);
  const [workerNotes, setWorkerNotes] = useState('');
  const [completing, setCompleting] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'whatsapp', 'history'
  const [lang, setLang] = useState('HI'); // 'EN' or 'HI'
  const [whatsAppModalData, setWhatsAppModalData] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const t = {
    EN: {
      role: 'FIELD OPERATIONS CREW',
      onDuty: 'ON DUTY',
      pendingTitle: 'Pending Stops',
      completedTitle: 'Emptied Today',
      tabTasks: 'Assigned Stops',
      tabWhatsApp: 'WhatsApp & IVR Dispatch',
      tabHistory: 'Collection Ledger',
      startRoute: 'Start Navigation',
      logCollection: 'Log Collection',
      fillBefore: 'FILL BEFORE COLLECTION:',
      fillAfter: 'RECORD FILL POST-CLEANING (%)',
      notes: 'Field Verification Notes',
      submit: 'Submit & Clear Bin ✓',
      simulatedWa: 'Simulate WhatsApp Dispatch',
      offlineSync: 'Offline Storage Synced'
    },
    HI: {
      role: 'सड़क सफाई एवं वाहन संचालक दल',
      onDuty: 'ड्यूटी पर सक्रिय',
      pendingTitle: 'लंबित कार्य',
      completedTitle: 'आज खाली किए गए',
      tabTasks: 'आवंटित कचरा डिब्बे',
      tabWhatsApp: 'व्हाट्सएप व वॉयस अलर्ट',
      tabHistory: 'संग्रहण इतिहास',
      startRoute: 'रास्ता शुरू करें',
      logCollection: 'सफाई दर्ज करें',
      fillBefore: 'संग्रहण से पहले भरा हुआ स्तर:',
      fillAfter: 'सफाई के बाद का स्तर दर्ज करें (%)',
      notes: 'सफाई निरीक्षक टिप्पणी',
      submit: 'कचरा खाली करें और सत्यापित करें ✓',
      simulatedWa: 'व्हाट्सएप संदेश भेजें',
      offlineSync: 'ऑफलाइन डेटा सुरक्षित'
    }
  }[lang];

  const loadTasks = async () => {
    try {
      const data = await api.getTasks();
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Error fetching worker tasks:', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleStartTask = async (task) => {
    try {
      const res = await api.updateTaskStatus(task.id, { status: 'IN_PROGRESS' });
      if (res) {
        setActionSuccess(`Task #${task.id} started. Navigating to ${task.sector}.`);
        loadTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteTask = async (e) => {
    e.preventDefault();
    if (!activeTask) return;

    setCompleting(true);
    try {
      const res = await api.updateTaskStatus(activeTask.id, {
        status: 'COMPLETED',
        fillAfter: Number(fillAfter),
        notes: workerNotes || 'Cleaned and disinfected by field operator Sunil Kumar.'
      });

      if (res) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        setActionSuccess(`✅ Task #${activeTask.id} completed! Bin emptied to ${fillAfter}%.`);
        setActiveTask(null);
        setWorkerNotes('');
        loadTasks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  const handleTriggerWhatsAppAlert = async (task) => {
    try {
      const res = await api.sendWorkerWhatsAppAlert(task.id, user?.id);
      if (res && res.alertPayload) {
        setWhatsAppModalData(res.alertPayload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED');
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* 1. Worker Profile & Bilingual Switcher Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 p-1 flex-shrink-0 shadow-glow-cyan">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"}
                alt="Worker"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {t.role}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{t.onDuty}</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
                {user?.name || 'Sunil Kumar (सुनील कुमार)'}
              </h1>
              <p className="text-xs text-slate-300 font-mono">
                Vehicle: <strong className="text-cyan-300">DL-01-EA-4092 (Compactor 10-Ton)</strong> • Central & Old Delhi Zone
              </p>
            </div>
          </div>

          {/* Language Toggle & Offline Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-950 border border-white/10 font-mono text-xs">
              <button
                onClick={() => setLang('HI')}
                className={`px-3 py-1.5 rounded-lg ${lang === 'HI' ? 'bg-emerald-500 text-dark-950 font-black' : 'text-slate-400'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-3 py-1.5 rounded-lg ${lang === 'EN' ? 'bg-emerald-500 text-dark-950 font-black' : 'text-slate-400'}`}
              >
                English
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-dark-900 border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">{t.pendingTitle}</span>
              <span className="text-2xl font-heading font-black text-amber-400">{pendingTasks.length}</span>
            </div>

            <div className="p-3 rounded-2xl bg-dark-900 border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">{t.completedTitle}</span>
              <span className="text-2xl font-heading font-black text-emerald-400">{completedTasks.length + 8}</span>
            </div>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5 shadow-glow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* 2. Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-900 border border-white/10 max-w-lg text-xs font-heading font-bold">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'tasks' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.tabTasks} ({pendingTasks.length})
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'whatsapp' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{t.tabWhatsApp}</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'history' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.tabHistory}
        </button>
      </div>

      {/* 3. Task List & Field Execution Form */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Assigned Tasks List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {pendingTasks.map((task) => {
              const isCritical = task.priority === 'CRITICAL';
              const isInProgress = task.status === 'IN_PROGRESS';

              return (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isInProgress ? 'border-cyan-500/60 bg-dark-900 shadow-glow-cyan' :
                    isCritical ? 'border-red-500/40 bg-red-950/20' :
                    'border-white/10 bg-dark-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-300">{task.id}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isCritical ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {task.priority}
                        </span>
                        {task.laneWidth === 'NARROW' && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                            तंग गली (&lt;3m)
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-heading font-bold text-white mt-1">
                        {task.binCode} — {task.binName}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{task.sector}</span>
                      </p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-2xl font-heading font-black text-white">{task.fillBeforeCollection}%</span>
                      <span className="text-[10px] text-slate-400 block">Fill Level</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-dark-950 text-xs text-slate-300 my-3 font-mono">
                    <p><strong>{lang === 'HI' ? 'कचरा प्रकार:' : 'Waste:'}</strong> {task.wasteType} (~{task.estimatedWeightKg} kg)</p>
                    <p className="text-slate-400 mt-0.5">{task.notes}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
                    <span className="text-slate-400">
                      {task.distanceKm} km • ETA: {task.etaMinutes}m
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTriggerWhatsAppAlert(task)}
                        title="Simulate WhatsApp Broadcast"
                        className="p-2 rounded-xl bg-dark-950 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      {task.status !== 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStartTask(task)}
                          className="px-3 py-1.5 rounded-xl bg-dark-950 hover:bg-dark-850 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
                        >
                          {t.startRoute}
                        </button>
                      )}

                      <button
                        onClick={() => setActiveTask(task)}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-bold text-xs shadow-glow-sm"
                      >
                        {t.logCollection}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Execution Form (5 cols) */}
          <div className="lg:col-span-5">
            {activeTask ? (
              <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 shadow-2xl space-y-4 sticky top-28">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {lang === 'HI' ? 'सफाई अभिलेख प्रपत्र' : 'Field Clearance Form'}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-white mt-0.5">{activeTask.binCode}</h3>
                  <p className="text-xs text-slate-400">{activeTask.sector}</p>
                </div>

                <form onSubmit={handleCompleteTask} className="space-y-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-dark-950 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">{t.fillBefore}</span>
                    <span className="text-xl font-bold text-orange-400">{activeTask.fillBeforeCollection}%</span>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">{t.fillAfter}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={fillAfter}
                        onChange={(e) => setFillAfter(e.target.value)}
                        className="w-full accent-emerald-400"
                      />
                      <span className="text-base font-bold text-emerald-400 w-10 text-right">{fillAfter}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">{t.notes}</label>
                    <textarea
                      value={workerNotes}
                      onChange={(e) => setWorkerNotes(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-dark-950 border border-white/10 rounded-xl text-white focus:border-emerald-500 text-xs"
                      placeholder={lang === 'HI' ? 'डिब्बे की सफाई पूर्ण। कोई तकनीकी खराबी नहीं।' : 'Bin cleared and disinfected.'}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTask(null)}
                      className="py-2.5 px-3 rounded-xl bg-dark-950 text-slate-400 border border-white/10 text-xs"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={completing}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-dark-950 font-bold text-xs shadow-glow-sm hover:brightness-110"
                    >
                      {completing ? 'Saving...' : t.submit}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-dark-900 border border-white/10 text-center text-slate-500 flex flex-col items-center justify-center h-72">
                <Truck className="w-10 h-10 mb-2 opacity-40 text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-300">
                  {lang === 'HI' ? 'कार्य शुरू करने के लिए तैयार' : 'Ready for Next Dispatch'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs font-mono">
                  {lang === 'HI' ? 'किसी भी डिब्बे के सामने "सफाई दर्ज करें" बटन दबाएं।' : 'Click "Log Collection" on any pending task.'}
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* WhatsApp & IVR Voice Simulator Tab */}
      {activeTab === 'whatsapp' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-heading font-bold text-white">
                WhatsApp Dispatch & IVR Voice Broadcast Simulator
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Automated bilingual alerts sent to sanitation driver Sunil Kumar for instant mobile dispatch.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
              MCD WhatsApp Bot Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Hindi WhatsApp Preview */}
            <div className="p-4 rounded-xl bg-[#0b141a] border border-emerald-600/40 text-slate-200 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 text-[11px] pb-2 border-b border-white/10">
                <span>📱 WhatsApp Broadcast (हिन्दी)</span>
                <span>To: +91 98112 34567</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-emerald-100">
                {`🚨 स्वच्छरूट दिल्ली — नया कचरा संग्रहण कार्य

नमस्ते सुनील कुमार जी,
वाहन DL-01-EA-4092 के लिए तत्काल कार्य:

📍 स्थान: चांदनी चौक हेरिटेज वॉक
⚠️ प्राथमिकता: अति महत्वपूर्ण (CRITICAL 94%)
🗑️ कचरा: खाद्य व प्लास्टिक स्क्रैप (~460 kg)
⏱️ ETA: 10 मिनट
📲 कार्रवाई: ऐप खोलकर 'सफाई दर्ज करें' दबाएं।`}
              </pre>
            </div>

            {/* IVR Voice Transcript */}
            <div className="p-4 rounded-xl bg-dark-950 border border-cyan-500/30 text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 text-[11px] pb-2 border-b border-white/10">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>IVR Voice Call Audio Transcript</span>
                </span>
                <span>Simulated Voice Synthesizer</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans pt-2">
                "नमस्ते सुनील जी, स्वच्छरूट दिल्ली नियंत्रण कक्ष से सूचित किया जाता है कि चांदनी चौक का स्मार्ट बिन 94% भर चुका है। कृपया अपने वाहन डीएल शून्य एक ईए चार शून्य नौ दो के साथ तुरंत वहां पहुंचकर कचरा संग्रहण करें। धन्यवाद।"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collection Ledger History Tab */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
          <h3 className="text-base font-heading font-bold text-white">Historical Collection Ledger</h3>
          <div className="space-y-2 text-xs font-mono">
            {[
              { code: 'BIN #DL-CC-102', sector: 'Chandni Chowk', time: '10:45 AM', before: 94, after: 8, weight: 460 },
              { code: 'BIN #DL-CP-101', sector: 'Connaught Place', time: '09:30 AM', before: 82, after: 6, weight: 580 },
              { code: 'BIN #DL-LN-106', sector: 'Lajpat Nagar', time: '08:15 AM', before: 86, after: 10, weight: 490 }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between">
                <div>
                  <strong className="text-white block font-heading">{item.code}</strong>
                  <span className="text-slate-400 text-[11px]">{item.sector}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold">{item.before}% → {item.after}%</span>
                  <span className="text-slate-500 text-[10px] block">{item.time} • {item.weight} kg cleared</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
