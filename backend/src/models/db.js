import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../../data');

/**
 * SwachhRoute Delhi - In-Memory Relational Database
 * Seeded with accurate Delhi Geographic and Municipal Corporation Data
 */
class DelhiDatabase {
  constructor() {
    this.users = [];
    this.bins = [];
    this.tasks = [];
    this.reports = [];
    this.vehicles = [];
    this.notifications = [];
    this.auditLogs = [];
    this.landfills = [];
    this.hotspots = [];
    this.wards = [];
    this.pitchDeck = null;

    this.loadData();
  }

  loadData() {
    try {
      const binsRaw = fs.readFileSync(path.join(DATA_DIR, 'seed_bins.json'), 'utf8');
      this.bins = JSON.parse(binsRaw);
    } catch (e) {
      console.warn('Fallback: seed_bins.json load error', e.message);
    }

    try {
      const lfRaw = fs.readFileSync(path.join(DATA_DIR, 'landfills.json'), 'utf8');
      this.landfills = JSON.parse(lfRaw);
    } catch (e) {
      console.warn('Fallback: landfills.json load error', e.message);
    }

    try {
      const hsRaw = fs.readFileSync(path.join(DATA_DIR, 'hotspots.json'), 'utf8');
      this.hotspots = JSON.parse(hsRaw);
    } catch (e) {
      console.warn('Fallback: hotspots.json load error', e.message);
    }

    try {
      const wardsRaw = fs.readFileSync(path.join(DATA_DIR, 'wards.json'), 'utf8');
      this.wards = JSON.parse(wardsRaw);
    } catch (e) {
      console.warn('Fallback: wards.json load error', e.message);
    }

    try {
      const deckRaw = fs.readFileSync(path.join(DATA_DIR, 'pitch_deck.json'), 'utf8');
      this.pitchDeck = JSON.parse(deckRaw);
    } catch (e) {
      console.warn('Fallback: pitch_deck.json load error', e.message);
    }

    this.seedUsersAndTasks();
  }

  seedUsersAndTasks() {
    const defaultHash = bcrypt.hashSync('password123', 10);
    const adminHash = bcrypt.hashSync('admin123', 10);
    const workerHash = bcrypt.hashSync('worker123', 10);
    const citizenHash = bcrypt.hashSync('citizen123', 10);

    this.users = [
      {
        id: 'USR-ADMIN-01',
        name: 'Shri Rajesh Meena, IAS',
        email: 'admin@nirmaan.delhi.gov.in',
        passwordHash: adminHash,
        role: 'ADMIN',
        designation: 'Additional Commissioner (Sanitation & AI Command)',
        zone: 'Central Delhi MCD HQ',
        phone: '+91 11 2322 8000',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        createdAt: new Date().toISOString()
      },
      {
        id: 'USR-WORKER-01',
        name: 'Sunil Kumar (सुनील कुमार)',
        email: 'worker@nirmaan.delhi.gov.in',
        passwordHash: workerHash,
        role: 'WORKER',
        designation: 'Senior Fleet Driver & Field Operator',
        zone: 'Central & Old Delhi Zone',
        phone: '+91 98112 34567',
        vehicleId: 'VEH-DL-01',
        assignedVehiclePlate: 'DL-01-EA-4092',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        tasksCompletedToday: 8,
        shiftStatus: 'ON_DUTY',
        createdAt: new Date().toISOString()
      },
      {
        id: 'USR-CITIZEN-01',
        name: 'Ananya Sharma',
        email: 'citizen@delhi.in',
        passwordHash: citizenHash,
        role: 'CITIZEN',
        designation: 'Delhi Resident',
        zone: 'South Delhi (Saket)',
        phone: '+91 98765 43210',
        karmaPoints: 420,
        reportsSubmitted: 6,
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        createdAt: new Date().toISOString()
      }
    ];

    this.vehicles = [
      {
        id: 'VEH-DL-01',
        plateNumber: 'DL-01-EA-4092',
        vehicleType: 'HEAVY_COMPACTOR',
        vehicleName: 'Fleet Compactor 1 (10-Ton)',
        assignedWorkerId: 'USR-WORKER-01',
        assignedWorkerName: 'Sunil Kumar',
        capacityKg: 6000,
        currentLoadKg: 3200,
        fuelPercent: 84,
        status: 'EN_ROUTE',
        currentSector: 'Chandni Chowk & Central Zone',
        latitude: 28.6506,
        longitude: 77.2303
      },
      {
        id: 'VEH-DL-02',
        plateNumber: 'DL-04-GB-9811',
        vehicleType: 'E_RICKSHAW',
        vehicleName: 'Electric Mini-Tipper 2 (1.5-Ton)',
        assignedWorkerId: null,
        assignedWorkerName: 'Ramesh Yadav',
        capacityKg: 1500,
        currentLoadKg: 650,
        fuelPercent: 96,
        status: 'AVAILABLE',
        currentSector: 'Central Depot Hub',
        latitude: 28.6304,
        longitude: 77.2475
      },
      {
        id: 'VEH-DL-03',
        plateNumber: 'DL-11-TC-5520',
        vehicleType: 'LIGHT_TIPPER',
        vehicleName: 'Medium Tipper 3 (4-Ton)',
        assignedWorkerId: null,
        assignedWorkerName: 'Vijay Singh',
        capacityKg: 4000,
        currentLoadKg: 2800,
        fuelPercent: 72,
        status: 'COLLECTING',
        currentSector: 'Laxmi Nagar & Shahdara',
        latitude: 28.6310,
        longitude: 77.2770
      }
    ];

    this.tasks = [
      {
        id: 'TSK-9101',
        binId: 'BIN-CC-102',
        binCode: 'BIN #DL-CC-102',
        binName: 'Chandni Chowk Dariba Kalan Junction',
        sector: 'Chandni Chowk (Old Delhi)',
        latitude: 28.6506,
        longitude: 77.2303,
        priority: 'CRITICAL',
        assignedWorkerId: 'USR-WORKER-01',
        assignedWorkerName: 'Sunil Kumar',
        vehiclePlate: 'DL-01-EA-4092',
        status: 'IN_PROGRESS',
        fillBeforeCollection: 94,
        fillAfterCollection: null,
        wasteType: 'Food Scraps & Polythene',
        estimatedWeightKg: 460,
        distanceKm: 2.8,
        etaMinutes: 10,
        laneWidth: 'NARROW',
        notes: 'Immediate clearance required before evening wholesale crowd.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        completedAt: null
      },
      {
        id: 'TSK-9102',
        binId: 'BIN-CP-101',
        binCode: 'BIN #DL-CP-101',
        binName: 'Connaught Place Block B Inner Circle',
        sector: 'Connaught Place',
        latitude: 28.6315,
        longitude: 77.2167,
        priority: 'HIGH',
        assignedWorkerId: 'USR-WORKER-01',
        assignedWorkerName: 'Sunil Kumar',
        vehiclePlate: 'DL-01-EA-4092',
        status: 'ASSIGNED',
        fillBeforeCollection: 82,
        fillAfterCollection: null,
        wasteType: 'Mixed Commercial',
        estimatedWeightKg: 580,
        distanceKm: 3.2,
        etaMinutes: 18,
        laneWidth: 'BROAD',
        notes: 'High retail footfall area. Check paper recycling compartment.',
        createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
        completedAt: null
      },
      {
        id: 'TSK-9103',
        binId: 'BIN-LN-106',
        binCode: 'BIN #DL-LN-106',
        binName: 'Lajpat Nagar Central Market Block IV',
        sector: 'Lajpat Nagar',
        latitude: 28.5700,
        longitude: 77.2400,
        priority: 'HIGH',
        assignedWorkerId: 'USR-WORKER-01',
        assignedWorkerName: 'Sunil Kumar',
        vehiclePlate: 'DL-01-EA-4092',
        status: 'ASSIGNED',
        fillBeforeCollection: 86,
        fillAfterCollection: null,
        wasteType: 'Textiles & Plastic Bags',
        estimatedWeightKg: 490,
        distanceKm: 6.8,
        etaMinutes: 28,
        laneWidth: 'MEDIUM',
        notes: 'Garment packaging surge. Disinfectant spray recommended.',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: null
      }
    ];

    this.reports = [
      {
        id: 'REP-DL-501',
        citizenId: 'USR-CITIZEN-01',
        citizenName: 'Ananya Sharma',
        citizenPhone: '+91 98765 43210',
        sector: 'Saket District Centre',
        locality: 'South Delhi',
        locationDesc: 'Rear parking lane behind Select Citywalk Mall, near pillar P-14',
        latitude: 28.5290,
        longitude: 77.2185,
        imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&q=80',
        cleanedImageUrl: null,
        wasteType: 'Commercial Food Packaging & Polythene Bags',
        severity: 'HIGH',
        status: 'IN_PROGRESS',
        assignedWorkerName: 'Sunil Kumar',
        aiVerification: {
          acceptableQuality: true,
          qualityScore: 0.94,
          primaryMaterial: 'Plastic Packaging & Wet Scraps',
          confidence: 0.952,
          recyclable: true,
          estimatedScrapInr: '₹35 – ₹55'
        },
        resolutionCertificate: null,
        timeline: [
          { status: 'SUBMITTED', title: 'Report Logged by Citizen', time: '10:14 AM' },
          { status: 'UNDER_REVIEW', title: 'AI Quality & Vision Check Passed', time: '10:15 AM' },
          { status: 'ASSIGNED', title: 'Assigned to MCD Field Operator Sunil Kumar', time: '10:45 AM' },
          { status: 'IN_PROGRESS', title: 'Vehicle DL-01-EA-4092 Dispatched', time: '11:20 AM' }
        ],
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
      },
      {
        id: 'REP-DL-502',
        citizenId: 'USR-CITIZEN-01',
        citizenName: 'Mohit Rawat',
        citizenPhone: '+91 98110 55443',
        sector: 'Chandni Chowk',
        locality: 'Old Delhi',
        locationDesc: 'Near Sis Ganj Sahib entrance gali corner',
        latitude: 28.6510,
        longitude: 77.2310,
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80',
        cleanedImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
        wasteType: 'Food Packaging & Discarded Cardboard',
        severity: 'CRITICAL',
        status: 'RESOLVED',
        assignedWorkerName: 'Sunil Kumar',
        aiVerification: {
          acceptableQuality: true,
          qualityScore: 0.96,
          primaryMaterial: 'Cardboard & Disposable Cutlery',
          confidence: 0.978,
          recyclable: true,
          estimatedScrapInr: '₹80 – ₹110'
        },
        resolutionCertificate: {
          certificateId: 'CERT-MCD-891A4B02',
          isVerified: true,
          finalCleanlinessRating: 98.4,
          cleanlinessImprovementPercent: 92.4,
          rubbishClearedPercent: 99.1,
          digitalSignatureSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          issuedBy: 'MCD AI Verification Authority',
          verificationSeal: 'MCD_SWACHH_DELHI_VERIFIED_SEAL_2026',
          timestamp: new Date(Date.now() - 1800000).toISOString()
        },
        timeline: [
          { status: 'SUBMITTED', title: 'Report Logged by Citizen', time: '08:30 AM' },
          { status: 'UNDER_REVIEW', title: 'AI Verification Passed', time: '08:31 AM' },
          { status: 'ASSIGNED', title: 'Task Scheduled on Priority Max-Heap', time: '08:45 AM' },
          { status: 'RESOLVED', title: 'Photo Verified Cleaned and Certificate Issued', time: '09:40 AM' }
        ],
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];

    this.notifications = [
      {
        id: 'NTF-01',
        userId: 'USR-ADMIN-01',
        role: 'ADMIN',
        title: 'Critical Bin Alert: Chandni Chowk',
        message: 'Bin #DL-CC-102 reached 94% capacity. Estimated overflow in ~0.9 hours.',
        type: 'CRITICAL',
        read: false,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'NTF-02',
        userId: 'USR-WORKER-01',
        role: 'WORKER',
        title: 'New Critical Dispatch: Chandni Chowk',
        message: 'Task #TSK-9101 assigned to vehicle DL-01-EA-4092. Narrow lane guidance enabled.',
        type: 'ACTION_REQUIRED',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];

    this.auditLogs = [
      { id: 'LOG-01', timestamp: '10:00 AM', action: 'SYSTEM_BOOT', details: 'SwachhRoute Delhi Municipal OS initialized with 14 smart nodes, 3 landfills, and 12 MCD Wards.' },
      { id: 'LOG-02', timestamp: '10:15 AM', action: 'VRP_OPTIMIZE', details: 'Dijkstra Multi-Truck optimization executed: 29.6% route distance saved vs naive route.' },
      { id: 'LOG-03', timestamp: '11:20 AM', action: 'LANDFILL_BALANCING', details: 'Diverted Truck 1 to Bhalswa Landfill (18 min queue vs 50 min at Okhla).' }
    ];
  }

  // --- USER METHODS ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: `USR-${userData.role}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      karmaPoints: userData.role === 'CITIZEN' ? 100 : 0,
      reportsSubmitted: 0,
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  // --- BIN METHODS ---
  getBins() {
    return this.bins;
  }

  getBinById(id) {
    return this.bins.find(b => b.id === id || b.bin_code === id);
  }

  updateBin(id, updates) {
    const idx = this.bins.findIndex(b => b.id === id || b.bin_code === id);
    if (idx !== -1) {
      this.bins[idx] = { ...this.bins[idx], ...updates };
      return this.bins[idx];
    }
    return null;
  }

  // --- TASK METHODS ---
  getTasks(workerId = null) {
    if (workerId) {
      return this.tasks.filter(t => t.assignedWorkerId === workerId);
    }
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find(t => t.id === id);
  }

  updateTaskStatus(id, { status, fillAfter = null, notes = null, resolutionCertificate = null }) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;

    task.status = status;
    if (fillAfter !== null) task.fillAfterCollection = fillAfter;
    if (notes) task.notes = notes;

    if (status === 'COMPLETED') {
      task.completedAt = new Date().toISOString();
      const bin = this.getBinById(task.binId);
      if (bin) {
        const resetFill = fillAfter !== null ? fillAfter : 10;
        bin.currentFill = resetFill;
        bin.status = resetFill < 50 ? 'NORMAL' : resetFill < 75 ? 'MODERATE' : 'HIGH';
        bin.overflowEtaHours = Number(((100 - resetFill) / Math.max(1, bin.fillRatePerHour)).toFixed(1));
        bin.lastCollectedHoursAgo = 0;
        bin.history.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fill: resetFill
        });
      }

      // Auto-resolve corresponding citizen report
      const report = this.reports.find(r => r.sector === task.sector && r.status !== 'RESOLVED');
      if (report) {
        report.status = 'RESOLVED';
        if (resolutionCertificate) report.resolutionCertificate = resolutionCertificate;
        report.timeline.push({
          status: 'RESOLVED',
          title: 'Waste Collected and Cleanliness Verified',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    }

    return task;
  }

  // --- REPORT METHODS ---
  getReports(citizenId = null) {
    if (citizenId) {
      return this.reports.filter(r => r.citizenId === citizenId);
    }
    return this.reports;
  }

  getReportById(id) {
    return this.reports.find(r => r.id === id);
  }

  addReport(reportData) {
    const newReport = {
      id: `REP-DL-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'SUBMITTED',
      resolutionCertificate: null,
      timeline: [
        { status: 'SUBMITTED', title: 'Report Logged by Citizen', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { status: 'UNDER_REVIEW', title: 'AI Vision Validation Passed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ],
      ...reportData
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  updateReportStatus(id, status, workerName = null, resolutionCertificate = null) {
    const report = this.reports.find(r => r.id === id);
    if (!report) return null;

    report.status = status;
    if (workerName) report.assignedWorkerName = workerName;
    if (resolutionCertificate) report.resolutionCertificate = resolutionCertificate;

    report.timeline.push({
      status,
      title: status === 'ASSIGNED' ? `Assigned to MCD Operator ${workerName || 'Staff'}` :
             status === 'IN_PROGRESS' ? 'Collection Team Dispatched' :
             status === 'RESOLVED' ? 'Issue Resolved and Cleanliness Certified' : 'Status Updated',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    return report;
  }

  // --- LANDFILL & WARD METHODS ---
  getLandfills() {
    return this.landfills;
  }

  getHotspots() {
    return this.hotspots;
  }

  getWards() {
    return this.wards;
  }

  getPitchDeck() {
    return this.pitchDeck;
  }

  // --- NOTIFICATION METHODS ---
  getNotifications(userId = null, role = null) {
    if (userId) {
      return this.notifications.filter(n => n.userId === userId || n.role === role);
    }
    return this.notifications;
  }

  markNotificationRead(id) {
    const n = this.notifications.find(item => item.id === id);
    if (n) n.read = true;
    return n;
  }
}

export const db = new DelhiDatabase();
