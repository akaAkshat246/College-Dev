import { db } from '../models/db.js';

/**
 * SwachhRoute Delhi - IoT Sensor Generator & Real-time Simulation Controller
 */
export class SensorSimulator {
  constructor() {
    this.timer = null;
    this.isRunning = false;
  }

  startAutoSimulation(intervalMs = 15000) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.tick();
    }, intervalMs);
  }

  stopAutoSimulation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isRunning = false;
  }

  tick() {
    const bins = db.getBins();
    bins.forEach(bin => {
      if (bin.currentFill < 98) {
        const delta = Number(((bin.fillRatePerHour / 60) * (Math.random() * 0.8 + 0.6)).toFixed(2));
        const newFill = Math.min(100, Math.round(bin.currentFill + delta));
        this._updateBinCalculations(bin, newFill);
      }
    });
  }

  /**
   * Triggers an instant surge on a specific smart bin (e.g. Connaught Place or Chandni Chowk)
   */
  triggerSpecificBinSurge(binId = 'BIN-CP-101', targetFill = 94) {
    const bin = db.getBinById(binId) || db.getBins()[0];
    if (!bin) return null;

    const history = [...(bin.history || [])];
    history.push({
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fill: targetFill
    });

    const updated = this._updateBinCalculations(bin, targetFill, 7.8);
    updated.history = history;
    return updated;
  }

  /**
   * Empties a bin after collection
   */
  collectBin(binId) {
    const bin = db.getBinById(binId);
    if (!bin) return null;

    const updated = this._updateBinCalculations(bin, 8, 2.0);
    updated.lastCollectedHoursAgo = 0;
    updated.history = [
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), fill: 8 }
    ];

    return updated;
  }

  /**
   * Advance simulation time by N hours
   */
  advanceTime(hours = 2) {
    const bins = db.getBins();
    bins.forEach(bin => {
      const addedFill = Math.round(bin.fillRatePerHour * hours);
      const newFill = Math.min(100, bin.currentFill + addedFill);
      this._updateBinCalculations(bin, newFill);
      bin.lastCollectedHoursAgo = (bin.lastCollectedHoursAgo || 0) + hours;
    });

    return { success: true, message: `Advanced Delhi simulation by ${hours} hours.` };
  }

  _updateBinCalculations(bin, newFill, customRate = null) {
    bin.currentFill = newFill;
    if (customRate) bin.fillRatePerHour = customRate;

    const remainingPercent = Math.max(0, 100 - newFill);
    const rate = Math.max(0.5, bin.fillRatePerHour || 2.0);
    const eta = Number((remainingPercent / rate).toFixed(1));
    bin.overflowEtaHours = eta;

    if (newFill >= 90 || eta <= 2.0) {
      bin.status = 'CRITICAL';
      bin.overflowRisk = 'CRITICAL';
    } else if (newFill >= 75 || eta <= 5.0) {
      bin.status = 'HIGH';
      bin.overflowRisk = 'HIGH';
    } else if (newFill >= 50 || eta <= 12.0) {
      bin.status = 'MODERATE';
      bin.overflowRisk = 'MODERATE';
    } else {
      bin.status = 'NORMAL';
      bin.overflowRisk = 'NORMAL';
    }

    db.updateBin(bin.id, bin);
    return bin;
  }
}

export const simulator = new SensorSimulator();
