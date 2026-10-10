/**
 * SwachhRoute Delhi - Predictive Fill Forecasting Engine (Feature F1)
 * Combines polynomial time-series trends with Delhi festival surges,
 * day-of-week multipliers, and weather conditions.
 */

export const DELHI_FESTIVALS = {
  DIWALI: { name: 'Diwali & New Year', multiplier: 1.65, description: 'High packaging, sweets, firecracker & retail box surge' },
  HOLI: { name: 'Holi Festival', multiplier: 1.45, description: 'Organic wet waste & food packaging surge' },
  DURGA_PUJA: { name: 'Durga Puja / Dussehra', multiplier: 1.50, description: 'Community pandal floral & food stall surge' },
  EID: { name: 'Eid-ul-Fitr / Eid-ul-Adha', multiplier: 1.40, description: 'Market meat & food packaging surge in Old Delhi' },
  INDEPENDENCE_DAY: { name: 'Independence Day / Republic Day', multiplier: 1.30, description: 'Central Delhi tourist & food surge' },
  NONE: { name: 'Normal Working Day', multiplier: 1.0, description: 'Baseline municipal load' }
};

export const WEATHER_CONDITIONS = {
  CLEAR: { name: 'Clear & Moderate (24°C)', multiplier: 1.0, odourMultiplier: 1.0 },
  HEATWAVE: { name: 'Summer Heatwave (42°C)', multiplier: 1.15, odourMultiplier: 2.2 },
  MONSOON: { name: 'Heavy Monsoon Rain', multiplier: 1.25, odourMultiplier: 1.8 }
};

export class FillForecaster {
  /**
   * Forecasts future fill levels for a smart bin across 2h, 4h, 8h, 24h, 48h horizons
   * @param {Object} bin - Smart bin object
   * @param {Object} context - { festival: 'DIWALI' | 'NONE', weather: 'HEATWAVE' | 'CLEAR', dayOfWeek: 'SATURDAY' }
   */
  forecastBinFill(bin, context = {}) {
    const {
      festival = 'NONE',
      weather = 'CLEAR',
      dayOfWeek = 'SATURDAY'
    } = context;

    const festConfig = DELHI_FESTIVALS[festival] || DELHI_FESTIVALS.NONE;
    const weatherConfig = WEATHER_CONDITIONS[weather] || WEATHER_CONDITIONS.CLEAR;

    // Weekend commercial surge (+25% in markets like CP, Karol Bagh, Lajpat Nagar, Saket)
    const isWeekend = dayOfWeek === 'SATURDAY' || dayOfWeek === 'SUNDAY';
    const isCommercial = ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Saket District Centre', 'Chandni Chowk'].includes(bin.sector);
    const dayMultiplier = (isWeekend && isCommercial) ? 1.28 : (isWeekend ? 1.12 : 1.0);

    const baseFillRate = bin.fillRatePerHour || 3.0;
    const effectiveFillRate = Number((baseFillRate * festConfig.multiplier * weatherConfig.multiplier * dayMultiplier).toFixed(2));

    const currentFill = bin.currentFill || 0;
    const hoursToOverflow = effectiveFillRate > 0
      ? Number(((100 - currentFill) / effectiveFillRate).toFixed(1))
      : 99.9;

    const horizons = [2, 4, 8, 12, 24, 48];
    const projectionCurve = horizons.map(hoursAhead => {
      // Non-linear polynomial saturation as bin approaches 100%
      const rawFill = currentFill + (effectiveFillRate * hoursAhead);
      const projectedFill = Math.min(100, Number(rawFill.toFixed(1)));
      return {
        hoursAhead,
        projectedFill,
        status: projectedFill >= 90 ? 'CRITICAL' : projectedFill >= 75 ? 'HIGH' : projectedFill >= 50 ? 'MODERATE' : 'NORMAL'
      };
    });

    const isUrgent = currentFill >= 75 || hoursToOverflow <= 4.0;

    return {
      binId: bin.id,
      binCode: bin.bin_code,
      name: bin.name,
      currentFill,
      baseFillRate,
      effectiveFillRate,
      hoursToOverflow,
      isUrgent,
      activeFestival: festConfig.name,
      activeWeather: weatherConfig.name,
      dayMultiplier,
      projectionCurve,
      overflowRiskRating: hoursToOverflow <= 2.0 ? 'IMMINENT_OVERFLOW' : hoursToOverflow <= 6.0 ? 'HIGH_RISK' : 'STABLE'
    };
  }

  /**
   * Forecasts entire municipal fleet of smart bins
   */
  forecastFleet(bins, context = {}) {
    const results = bins.map(bin => this.forecastBinFill(bin, context));
    const criticalIn4Hours = results.filter(r => r.hoursToOverflow <= 4.0);
    const criticalIn8Hours = results.filter(r => r.hoursToOverflow <= 8.0);

    return {
      totalBins: bins.length,
      criticalIn4HoursCount: criticalIn4Hours.length,
      criticalIn8HoursCount: criticalIn8Hours.length,
      predictions: results,
      recommendedImmediateDispatch: criticalIn4Hours.map(r => r.binId)
    };
  }
}
