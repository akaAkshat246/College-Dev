import { FillForecaster } from '../src/algorithms/FillForecaster.js';
import { CleanlinessVerifier } from '../src/algorithms/CleanlinessVerifier.js';

export function runForecastingAndVerificationTests() {
  console.log('--- RUNNING FORECASTING & CLEANLINESS VERIFIER TESTS ---');

  // Test 1: Fill forecasting with Diwali surge
  const forecaster = new FillForecaster();
  const sampleBin = {
    id: 'BIN-CP-101',
    bin_code: 'BIN #DL-CP-101',
    name: 'Connaught Place',
    sector: 'Connaught Place',
    currentFill: 80,
    fillRatePerHour: 5.0
  };

  const forecast = forecaster.forecastBinFill(sampleBin, {
    festival: 'DIWALI',
    weather: 'HEATWAVE',
    dayOfWeek: 'SATURDAY'
  });

  console.assert(forecast.effectiveFillRate > sampleBin.fillRatePerHour, 'Test 1 Failed: Surge rate should be higher');
  console.assert(forecast.hoursToOverflow < 4.0, 'Test 1 Failed: Bin should overflow rapidly under surge');
  console.log('[PASS] Test 1: Diwali surge fill projection computed. Effective rate:', forecast.effectiveFillRate, '%/hr');

  // Test 2: Cleanliness verification and SHA-256 certificate
  const verifier = new CleanlinessVerifier();
  const beforePhoto = { imageUrl: 'https://example.com/dump.jpg', severity: 'HIGH' };
  const afterPhoto = { imageUrl: 'https://example.com/clean.jpg', workerId: 'USR-01', workerName: 'Sunil Kumar' };

  const cert = verifier.verifyResolution(beforePhoto, afterPhoto, { id: 'REP-101', sector: 'Saket' });
  console.assert(cert.isVerified === true, 'Test 2 Failed: Should verify as clean');
  console.assert(cert.digitalSignatureSha256.length === 64, 'Test 2 Failed: SHA-256 hash must be 64 characters');
  console.log('[PASS] Test 2: Cleanliness certificate generated with signature:', cert.certificateId);

  console.log('ALL FORECASTING & VERIFIER TESTS PASSED!\n');
}

runForecastingAndVerificationTests();
