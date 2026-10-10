const API_BASE = 'http://localhost:5000/api';

export const api = {
  // --- BINS TELEMATICS ---
  async getBins() {
    try {
      const res = await fetch(`${API_BASE}/bins`);
      if (!res.ok) throw new Error('Failed to fetch bins');
      return await res.json();
    } catch (err) {
      console.warn('API error, using fallback:', err);
      return null;
    }
  },

  async simulateBinSurge(binId = 'BIN-CC-102', targetFill = 94) {
    try {
      const res = await fetch(`${API_BASE}/bins/${binId}/surge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetFill })
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async collectBin(binId) {
    try {
      const res = await fetch(`${API_BASE}/bins/${binId}/collect`, {
        method: 'POST'
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- ROUTING & MULTI-TRUCK (F2 & F3) ---
  async optimizeRoute(options = {}) {
    try {
      const res = await fetch(`${API_BASE}/routes/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async optimizeMultiTruck(options = {}) {
    try {
      const res = await fetch(`${API_BASE}/routes/multi-truck`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- LANDFILL LOAD BALANCING (F4) ---
  async getLandfills() {
    try {
      const res = await fetch(`${API_BASE}/landfills`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { landfills: [] };
    }
  },

  async balanceLandfill(fromNodeId = 'DEPOT', payloadKg = 4000) {
    try {
      const res = await fetch(`${API_BASE}/landfills/balance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromNodeId, payloadKg })
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- PREDICTIVE FORECASTING (F1) ---
  async getForecasting(options = {}) {
    try {
      const res = await fetch(`${API_BASE}/forecasting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- HOTSPOTS (F6) ---
  async getHotspots() {
    try {
      const res = await fetch(`${API_BASE}/hotspots`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { hotspots: [] };
    }
  },

  // --- MCD WARDS SCORECARD (F9) ---
  async getWards() {
    try {
      const res = await fetch(`${API_BASE}/wards`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { wards: [] };
    }
  },

  // --- PITCH DECK PRESENTATION ---
  async getPitchDeck() {
    try {
      const res = await fetch(`${API_BASE}/pitch-deck`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- CITIZEN GRIEVANCE & PHOTO PROOF (F5) ---
  async getReports() {
    try {
      const res = await fetch(`${API_BASE}/complaints`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { reports: [] };
    }
  },

  async submitReport(payload) {
    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async verifyReportProof(reportId, payload) {
    try {
      const res = await fetch(`${API_BASE}/complaints/${reportId}/verify-proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- WORKER TASKS & WHATSAPP (F8) ---
  async getTasks() {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { tasks: [] };
    }
  },

  async updateTaskStatus(taskId, payload) {
    try {
      const res = await fetch(`${API_BASE}/tasks/${taskId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async sendWorkerWhatsAppAlert(taskId, workerId) {
    try {
      const res = await fetch(`${API_BASE}/worker/whatsapp-alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, workerId })
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // --- SIMULATOR CONTROLS ---
  async advanceTime(hours = 2) {
    try {
      const res = await fetch(`${API_BASE}/simulator/advance-time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours })
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async resetSimulator() {
    try {
      const res = await fetch(`${API_BASE}/simulator/reset`, {
        method: 'POST'
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
