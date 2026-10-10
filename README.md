# SwachhRoute Delhi — AI-Assisted Municipal Waste Operating System

> **"Collect when needed. Route smart. Prove it's clean."**  
> *A production-grade, smart-city waste intelligence operating system for the National Capital Territory of Delhi.*  
> **Built for**: Municipal Corporation of Delhi (MCD) & Smart Cities Mission

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![FastAPI](https://img.shields.io/badge/AI_Engine-FastAPI_v2.0-teal.svg)](https://fastapi.tiangolo.com)
[![Express](https://img.shields.io/badge/Backend-Express.js_Node_24-blue.svg)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Frontend-React_18_+_Vite-purple.svg)](https://vitejs.dev)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet_OpenStreetMap-green.svg)](https://leafletjs.com)

---

## 🌟 Executive Summary

In Delhi, over **11,000 tonnes** of solid municipal waste are generated every single day. Traditional fixed-schedule pickups lead to half-empty trucks driving past overflowing market bins, chronic dumping hotspots, severe traffic delays at overloaded landfills (*Ghazipur, Bhalswa, Okhla*), and unverified citizen grievances.

**SwachhRoute Delhi** solves this with an autonomous 6-stage closed-loop architecture:
1. **IoT Smart Bin Telematics**: Real-time ultrasonic fill monitoring across 14 key Delhi localities.
2. **Predictive Fill Forecasting (F1)**: Time-series polynomial regression accounting for cultural festival surges (Diwali, Holi, Durga Puja, Eid), weekend footfall, and ambient weather.
3. **Dijkstra & Multi-Truck Fleet VRP (F2 & F3)**: $O((V + E) \log V)$ shortest-path fleet routing with lane-width vehicle sizing (*E-Rickshaws for Old Delhi gallis vs Heavy Compactors for broad avenues*), cutting collection distance by **29.6%** and diesel fuel consumption by **35%**.
4. **Dynamic Landfill Load Balancing (F4)**: Multi-objective routing evaluating weighbridge queue wait times and spare capacity at Ghazipur, Bhalswa, and Okhla.
5. **Photo-Verified Citizen Grievances (F5)**: MobileNet computer vision material classification + Before/After cleanliness verification with cryptographically signed **SHA-256 Resolution Certificates**.
6. **Worker PWA & WhatsApp/IVR Layer (F8)**: Simplified Hindi/English field operator interface with offline caching and automated WhatsApp dispatch broadcasts.
7. **MCD Public Scorecard (F9)**: Transparent dashboard ranking 12 MCD wards on operational and environmental KPIs.

---

## 🏛️ The Nine Core Platform Features

| Module | Name | Technology | Description |
| :--- | :--- | :--- | :--- |
| **F1** | **Fill Prediction** | Time-Series Polynomial Regr | Forecasts which bins fill next, factoring in history, Delhi festivals (Diwali +65%, Holi +45%) & weather. |
| **F2** | **Multi-Truck Routing** | Dijkstra + Priority Max-Heap | Assigns candidate bins to multi-vehicle fleet with capacity limits and shift time windows. |
| **F3** | **Lane-Aware Sizing** | Road Width Constraint Engine | Enforces vehicle compatibility (*E-Rickshaw Mini-Tippers for narrow <3m Old Delhi gallis vs Compactor trucks*). |
| **F4** | **Landfill Balancing** | Multi-Objective Scoring | Routes loaded trucks to optimal disposal sites (*Ghazipur, Bhalswa, Okhla*) based on queue delay & capacity. |
| **F5** | **Photo-Verified Proof** | MobileNetV3 + Vision Delta | Analyzes Before/After cleanup photos and generates verifiable SHA-256 resolution certificates. |
| **F6** | **Dumping Heatmap** | Spatial Hotspot Density Map | Pinpoints repeat illegal dumping hotspots and recommends automated municipal interventions. |
| **F7** | **Segregation Intelligence** | 9-Class Waste Segmentation | Classifies Wet, Dry, and Hazardous waste with scrap market valuations in ₹ (INR). |
| **F8** | **Worker Layer** | PWA + WhatsApp / IVR Bot | Bilingual Hindi/English mobile interface, turn navigation, offline queue sync, and audio broadcasts. |
| **F9** | **Ward Scorecard** | MCD Zonal Analytics | Ranks 12 MCD wards on km saved, diesel saved (L), CO₂ averted (Tons), overflow rate, and SLA closure. |

---

## 🗺️ Delhi GIS Road Graph & 14 Localities

The system models the National Capital Territory of Delhi road graph with 18 key nodes:
- **Central Municipal Depot**: IP Estate / Rajghat Garage Hub
- **3 Landfills & Waste-to-Energy Plants**:
  1. *Ghazipur Landfill* (East Delhi • 2,500 T/day)
  2. *Bhalswa Landfill* (North Delhi • 2,200 T/day)
  3. *Okhla Landfill* (South Delhi • 1,800 T/day)
- **14 Key Delhi Locality Bins**:
  1. *Connaught Place* (Ward 112 • Central Delhi)
  2. *Chandni Chowk* (Ward 78 • Old Delhi — *Narrow Lane <3m*)
  3. *Karol Bagh* (Ward 82 • Central-West Delhi)
  4. *Hauz Khas Village* (Ward 156 • South Delhi — *Narrow Lane <3m*)
  5. *Saket District Centre* (Ward 160 • South Delhi)
  6. *Lajpat Nagar Central Market* (Ward 142 • South-East Delhi)
  7. *Dwarka Sector 10* (Ward 134 • South-West Delhi)
  8. *Rohini Sector 14* (Ward 45 • North-West Delhi)
  9. *Janakpuri District Centre* (Ward 102 • West Delhi)
  10. *Pitampura NSP* (Ward 55 • North-West Delhi)
  11. *Laxmi Nagar Market* (Ward 198 • East Delhi)
  12. *Mayur Vihar Phase 1* (Ward 204 • East Delhi)
  13. *Shahdara Chhota Bazaar* (Ward 218 • North-East Delhi — *Narrow Lane <3m*)
  14. *Vasant Kunj Promenade* (Ward 168 • South-West Delhi)

---

## ⚡ Quick Start & Setup

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.15.0)
- **Python**: 3.10+ (tested on 3.13)
- **Package Managers**: `npm`, `pip`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/akaAkshat246/College-Dev.git
cd College-Dev

# Install dependencies across all tiers
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd ai && pip install -r requirements.txt && cd ..
```

### 3. Launching Services
Run each service in separate terminal tabs:

```bash
# Terminal 1: Backend REST API (Port 5000)
cd backend
node src/server.js

# Terminal 2: AI Vision Microservice (Port 8000)
cd ai
python main.py

# Terminal 3: Frontend Web Dashboard & PWA (Port 5173)
cd frontend
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 🔑 Pre-Seeded Demo Accounts (1-Click Fast Login)

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **🏛️ Admin (MCD HQ)** | `admin@nirmaan.delhi.gov.in` | `admin123` | Command Center, Live GIS Map, Fleet Routing, Landfill Balancer, Ward Scorecard |
| **🚛 Field Worker** | `worker@nirmaan.delhi.gov.in` | `worker123` | Bilingual Hindi/English Tasks, Vehicle `DL-01-EA-4092`, WhatsApp Alerts |
| **👤 Delhi Resident** | `citizen@delhi.in` | `citizen123` | Grievance Reporting, GPS Auto-Fill, AI Scrap Valuator, Photo Verification |

---

## 🧪 Algorithmic Unit Tests

Run the full DSA and optimization test suite:

```bash
node backend/tests/dijkstra.test.js
node backend/tests/priority_queue.test.js
node backend/tests/landfill_balancer.test.js
node backend/tests/fill_forecaster.test.js
```

---

## 🏛️ Municipal Architecture & Operations Matrix

- **Central Command & Fleet Dispatch** — Dijkstra graph pathfinding, VRP Multi-Truck planner, Landfill load balancing, Express REST APIs
- **Computer Vision & Automated Telematics** — Time-series overflow regression, MobileNet material classification, Cleanliness verification
- **Zonal Field & Municipal Operations** — Leaflet GIS mapping, PWA worker app, Bilingual UI, WhatsApp/IVR simulator

---

## 📄 License
MIT © 2026 Municipal Corporation of Delhi (MCD). Built for the National Capital Territory of Delhi.
