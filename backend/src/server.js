import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { db } from './models/db.js';
import { simulator } from './simulator/SensorGenerator.js';
import { RouteOptimizer } from './algorithms/RouteOptimizer.js';
import { FillForecaster } from './algorithms/FillForecaster.js';
import { LandfillBalancer } from './algorithms/LandfillBalancer.js';
import { CleanlinessVerifier } from './algorithms/CleanlinessVerifier.js';
import { whatsAppSimulator } from './services/WhatsAppSimulator.js';
import { AIBridge } from './services/aiBridge.js';
import { generateToken, authenticateToken, requireRole } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

let cityGraphData = {};
try {
  const rawGraph = fs.readFileSync(path.join(DATA_DIR, 'city_graph.json'), 'utf8');
  cityGraphData = JSON.parse(rawGraph);
} catch (err) {
  console.warn('City graph file load warning:', err.message);
}

const routeOptimizer = new RouteOptimizer(cityGraphData, db.getLandfills());
const fillForecaster = new FillForecaster();
const landfillBalancer = new LandfillBalancer(db.getLandfills(), routeOptimizer.cityGraph);
const cleanlinessVerifier = new CleanlinessVerifier();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Start background 15s IoT telemetry simulation
simulator.startAutoSimulation(15000);

// ==========================================
// 1. HEALTH & SYSTEM DIAGNOSTICS
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'SwachhRoute Delhi Municipal OS',
    team: 'CodeGoblins (Akshat Kumar, Akshat Vats, Akshay Yadav)',
    version: '2.0.0',
    jurisdiction: 'National Capital Territory of Delhi (MCD)',
    activeBins: db.getBins().length,
    activeLandfills: db.getLandfills().length,
    activeWards: db.getWards().length,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. AUTHENTICATION & DEMO USERS
// ==========================================
app.get('/api/auth/demo-users', (req, res) => {
  res.json({
    admin: { email: 'admin@nirmaan.delhi.gov.in', password: 'admin123', label: 'Admin (MCD Command HQ)' },
    worker: { email: 'worker@nirmaan.delhi.gov.in', password: 'worker123', label: 'Worker (Fleet Operations)' },
    citizen: { email: 'citizen@delhi.in', password: 'citizen123', label: 'Citizen (Delhi Resident)' }
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role = 'CITIZEN', phone, zone, designation } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = db.createUser({
      name,
      email,
      passwordHash,
      role: role.toUpperCase(),
      phone: phone || '+91 99999 00000',
      zone: zone || 'Central Delhi',
      designation: designation || (role === 'CITIZEN' ? 'Resident' : 'Municipal Operator')
    });

    const token = generateToken(newUser);
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        zone: newUser.zone,
        designation: newUser.designation,
        phone: newUser.phone,
        avatarUrl: newUser.avatarUrl
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration error: ' + err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        zone: user.zone,
        designation: user.designation,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        vehiclePlate: user.assignedVehiclePlate || 'DL-01-EA-4092'
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login error: ' + err.message });
  }
});

// ==========================================
// 3. SMART BIN TELEMATICS (IoT GRID)
// ==========================================
app.get('/api/bins', (req, res) => {
  const bins = db.getBins();
  const criticalCount = bins.filter(b => b.status === 'CRITICAL' || b.currentFill >= 90).length;
  const highCount = bins.filter(b => b.status === 'HIGH' || (b.currentFill >= 75 && b.currentFill < 90)).length;
  const normalCount = bins.length - criticalCount - highCount;

  res.json({
    totalBins: bins.length,
    criticalCount,
    highCount,
    normalCount,
    bins
  });
});

app.get('/api/bins/:id', (req, res) => {
  const bin = db.getBinById(req.params.id);
  if (!bin) return res.status(404).json({ error: 'Bin not found' });
  res.json({ bin });
});

app.post('/api/bins/:id/surge', (req, res) => {
  const { targetFill = 94 } = req.body;
  const updatedBin = simulator.triggerSpecificBinSurge(req.params.id, targetFill);
  if (!updatedBin) return res.status(404).json({ error: 'Bin not found' });
  res.json({ message: 'Surge applied successfully', bin: updatedBin });
});

app.post('/api/bins/:id/collect', (req, res) => {
  const updatedBin = simulator.collectBin(req.params.id);
  if (!updatedBin) return res.status(404).json({ error: 'Bin not found' });
  res.json({ message: 'Bin emptied successfully', bin: updatedBin });
});

// ==========================================
// 4. ROUTE OPTIMIZATION (F2 MULTI-TRUCK & DIJKSTRA)
// ==========================================
app.post('/api/routes/optimize', (req, res) => {
  try {
    const {
      vehicleType = 'HEAVY_COMPACTOR',
      vehicleCapacityKg = 6000,
      minPriorityThreshold = 45,
      maxStops = 8,
      trafficMultiplier = 1.0,
      festivalSurge = 1.0
    } = req.body;

    const bins = db.getBins();
    const route = routeOptimizer.optimizeCollectionRoute(bins, {
      vehicleType,
      vehicleCapacityKg,
      minPriorityThreshold,
      maxStops,
      trafficMultiplier,
      festivalSurge
    });

    res.json({
      success: true,
      route,
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Route optimization failed: ' + err.message });
  }
});

app.post('/api/routes/multi-truck', (req, res) => {
  try {
    const bins = db.getBins();
    const fleetPlans = routeOptimizer.optimizeMultiTruckFleet(bins, db.vehicles, req.body);
    res.json({
      success: true,
      ...fleetPlans
    });
  } catch (err) {
    res.status(500).json({ error: 'Multi-truck planning error: ' + err.message });
  }
});

// ==========================================
// 5. LANDFILL LOAD BALANCING (F4)
// ==========================================
app.get('/api/landfills', (req, res) => {
  const landfills = db.getLandfills();
  const evaluation = landfillBalancer.selectOptimalLandfill('DEPOT', 4000);
  res.json({
    landfills,
    systemEvaluation: evaluation
  });
});

app.post('/api/landfills/balance', (req, res) => {
  const { fromNodeId = 'DEPOT', payloadKg = 4000 } = req.body;
  const decision = landfillBalancer.selectOptimalLandfill(fromNodeId, payloadKg);
  res.json({ decision });
});

// ==========================================
// 6. PREDICTIVE FILL FORECASTING (F1)
// ==========================================
app.post('/api/forecasting', (req, res) => {
  const { festival = 'NONE', weather = 'CLEAR', dayOfWeek = 'SATURDAY' } = req.body;
  const bins = db.getBins();
  const fleetForecast = fillForecaster.forecastFleet(bins, { festival, weather, dayOfWeek });
  res.json(fleetForecast);
});

// ==========================================
// 7. ILLEGAL DUMPING HOTSPOTS (F6)
// ==========================================
app.get('/api/hotspots', (req, res) => {
  res.json({
    hotspots: db.getHotspots(),
    totalHotspots: db.getHotspots().length,
    criticalZones: ['East Delhi (Shahdara)', 'Central Delhi', 'North Delhi']
  });
});

// ==========================================
// 8. MCD WARDS SCORECARD (F9)
// ==========================================
app.get('/api/wards', (req, res) => {
  res.json({
    wards: db.getWards(),
    totalWards: db.getWards().length,
    cityTotalDieselSavedMonthL: 18570,
    cityTotalCo2AvertedMonthTons: 49.8
  });
});

// ==========================================
// 9. PITCH DECK PRESENTATION DATA
// ==========================================
app.get('/api/pitch-deck', (req, res) => {
  res.json(db.getPitchDeck() || { error: 'Pitch deck data unavailable' });
});

// ==========================================
// 10. CITIZEN GRIEVANCE & PHOTO PROOF (F5)
// ==========================================
app.get('/api/complaints', (req, res) => {
  res.json({ reports: db.getReports() });
});

app.post('/api/complaints', (req, res) => {
  const report = db.addReport(req.body);
  res.status(201).json({ message: 'Grievance submitted successfully', report });
});

app.post('/api/complaints/:id/verify-proof', (req, res) => {
  const { beforeImageUrl, afterImageUrl, workerId, workerName } = req.body;
  const report = db.getReportById(req.params.id);
  if (!report) return res.status(404).json({ error: 'Report not found' });

  const certificate = cleanlinessVerifier.verifyResolution(
    { imageUrl: beforeImageUrl || report.imageUrl, severity: report.severity },
    { imageUrl: afterImageUrl, workerId, workerName },
    report
  );

  db.updateReportStatus(report.id, 'RESOLVED', workerName, certificate);

  res.json({
    message: 'Cleanliness proof verified and resolution certificate issued',
    certificate,
    report: db.getReportById(req.params.id)
  });
});

// ==========================================
// 11. WORKER FIELD TASKS & WHATSAPP / IVR (F8)
// ==========================================
app.get('/api/tasks', (req, res) => {
  res.json({ tasks: db.getTasks() });
});

app.post('/api/tasks/:id/status', (req, res) => {
  const { status, fillAfter, notes } = req.body;
  const updatedTask = db.updateTaskStatus(req.params.id, { status, fillAfter, notes });
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Task updated successfully', task: updatedTask });
});

app.post('/api/worker/whatsapp-alert', (req, res) => {
  const { taskId, workerId } = req.body;
  const task = db.getTaskById(taskId) || db.getTasks()[0];
  const worker = db.findUserById(workerId) || db.findUserByEmail('worker@nirmaan.delhi.gov.in');

  const alertPayload = whatsAppSimulator.generateWhatsAppPayload(task, worker);
  res.json({ success: true, alertPayload });
});

// ==========================================
// 12. SIMULATOR CONTROLS
// ==========================================
app.post('/api/simulator/advance-time', (req, res) => {
  const { hours = 2 } = req.body;
  simulator.advanceTime(hours);
  res.json({ message: `Time advanced by +${hours} hours`, bins: db.getBins() });
});

app.post('/api/simulator/reset', (req, res) => {
  db.loadData();
  res.json({ message: 'Sensor grid reset to baseline seed state', bins: db.getBins() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌱 SwachhRoute Delhi Municipal OS REST API`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 14 Delhi Localities, 3 Landfills, 12 MCD Wards active`);
  console.log(`====================================================`);
});
