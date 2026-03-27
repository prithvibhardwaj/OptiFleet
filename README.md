# OptiFleet — Intelligent Fleet Optimization Platform

OptiFleet is a full-featured fleet management and route optimization platform built for Singapore's logistics and service industries. It combines AI-powered route planning, live vehicle tracking, driver task management, deep analytics, and automated ESG compliance reporting in a single web application.

Designed for pest control, cleaning, laundry, catering, construction, aircon servicing, healthcare logistics, and any other business that needs to move people or goods efficiently.

---

## Features

### Live Fleet Dashboard

The central command view for fleet managers.

- **Live Vehicle Map** — All vehicles plotted on a Google Map of Singapore. En-route vehicles animate along their actual assigned routes in real time, updating every 3 seconds.
- **Fleet Status Cards** — At a glance: active vehicles, total orders, fuel cost saved today, and CO₂ emissions avoided.
- **Vehicle List** — Scrollable sidebar showing every vehicle's name, driver, type, plate number, and current status (En Route / Idle / Completed) with colour-coded badges.
- **Refresh** — One-click data refresh with a loading state.

---

### Order Management

Handles inbound delivery and service orders.

- **Order Table** — Lists all orders with ID, customer name, address, status (Pending / Assigned / Delivered), and timestamp.
- **Bulk CSV Import** — Upload any CSV or spreadsheet file to import orders in bulk. The system parses the file and populates the order list instantly — no strict format required for demo purposes.
- **CSV Template Download** — Download a pre-formatted CSV template to share with customers or dispatchers.
- **Delete Orders** — Remove individual orders from the list with a single click.
- **Status Filtering** — Orders are colour-coded by status for quick visual scanning.

---

### Route Optimization

The core AI engine of OptiFleet.

- **Multi-Stop Input** — Add any number of stops, each with an address, stop type (Pickup / Delivery / Service Call), optional notes, and an optional time window.
- **Start & End Location** — Set a depot or any custom start/end address.
- **Preferred Start Time** — Choose when the route begins; the optimizer factors this in.
- **Route Constraints** — Toggle switches to avoid tolls and/or avoid expressways.
- **Real Optimization Algorithm** — Uses the Google Maps Geocoder to convert addresses to coordinates, then runs a nearest-neighbor TSP (Travelling Salesman Problem) heuristic to find the shortest-distance stop order.
- **Haversine Distance Calculation** — All distances computed using the Haversine great-circle formula for accuracy across Singapore's geography.
- **Visible Reordering** — The stop list physically reorders after optimization so the change is immediately obvious. Default stops are intentionally set in a zigzag pattern (east–west–northeast–north–east–northeast) so the optimized west-to-east sweep is striking.
- **Route Map** — After optimization, a Google Map renders the full route as a blue polyline with numbered markers at each stop and grey depot markers at start and end.
- **Optimized Stop Order Panel** — A visual step-by-step list (Depot → 1 → 2 → ... → Depot) with address, notes, and type badge for each stop.
- **Key Metrics** — Estimated total duration, total distance, fuel cost (SGD), and number of vehicles needed.
- **Optimal Timing** — Recommended start time with a traffic score (Low / Medium / High).
- **CO₂ Emissions** — Carbon output calculated from fuel consumption using IPCC Tier 1 methodology (2.68 kg CO₂/L diesel).
- **Recommendations** — Contextual tips based on stop count, toll settings, and time of day.
- **Three Route Variants** — Recommended (nearest-neighbor), Avoid Expressways (9% shorter distance, 20% more time), and Fastest (11% more distance, 13% faster).
- **Save Route** — Saves the optimized route and marks it ready to dispatch to drivers.

---

### Routes Overview

Summary view of all active routes for the day.

- **Route Cards** — Each vehicle's full route shown as a collapsible card with driver name, vehicle ID, total distance, duration, fuel cost, and lock status.
- **Stop-by-Stop Breakdown** — Each stop listed with address, customer name, ETA, and status (Completed / In Progress / Pending).
- **Lock / Unlock Routes** — Lock a finalized route to prevent accidental edits. Locked routes display a lock badge and disable editing.
- **Re-optimize All** — Triggers a fleet-wide re-optimization with progress feedback, showing additional savings achieved.
- **Send to All Drivers** — Dispatches all routes simultaneously, firing a confirmation toast per driver.
- **Per-Route Send** — Send an individual route to its assigned driver.
- **Map View Tab** — Switches to a Google Map showing stop markers for all active routes across Singapore.

---

### Driver View

A mobile-optimized interface for drivers in the field.

- **Task List** — Shows the driver's full stop sequence. Completed stops collapse (only the most recent is shown), the current stop is highlighted with a pulsing blue indicator, and upcoming stops are listed below.
- **Progress Bar** — Header shows today's completion progress (e.g. "2 of 5 completed").
- **Stop Details** — Each card shows customer name, full address, ETA, contact number, and an amber warning panel for important delivery notes.
- **Start Navigation** — Opens Google Maps turn-by-turn navigation to the stop address in a new tab.
- **Mark Completed** — Marks the current stop as done, records the completion time, and advances to the next stop automatically.
- **Recalculate Route** — Simulates a live traffic-aware recalculation and shows time saved.
- **Report Issue** — Notifies the dispatch team of a problem at the current stop.
- **Live Map** — A Google Map at the bottom of the view shows all remaining stops as markers.

---

### Analytics

Performance intelligence for fleet managers.

- **Key Metrics** — Total distance driven this month, average delivery time, total fuel cost saved, and CO₂ avoided.
- **Fuel Consumption Chart** — 8-month bar chart of actual vs. optimized fuel usage, showing the efficiency gap closing over time.
- **Driver Performance Table** — League table of all drivers ranked by deliveries completed, on-time rate, fuel efficiency, and a composite performance score with trend indicator.
- **Industry Distribution** — Breakdown of orders by industry vertical (pest control, cleaning, catering, healthcare, construction, etc.).
- **Route Efficiency Trend** — Month-over-month route efficiency improvement visualized as a line chart.

---

### ESG Reports

Automated sustainability reporting for regulatory compliance.

- **Sustainability Impact Report** — Full ESG report covering the H2 2025 – Q1 2026 period with an A+ impact score, top 5% in industry.
- **Key ESG Metrics** — Total CO₂ saved (3,124 kg), distance reduced (847 km), fuel saved (594 L), and trees equivalent (142 trees), each with period-on-period improvement percentages.
- **Monthly Breakdown Table** — Month-by-month CO₂, distance, and fuel figures from September 2025 to March 2026, each row marked Verified.
- **Certifications Panel** — Eligibility status for ISO 14001, Singapore Green Plan 2030, and EnterpriseSG Green Certification.
- **Three Downloadable PDF Reports** — Click to generate and download a real PDF instantly:
  - **Full ESG Report** — All metrics, monthly table, certifications, and impact score.
  - **EnterpriseSG Format** — Formatted for Enterprise Development Grant (EDG) green lane applications, including an EDG compliance narrative.
  - **NEA Compliance** — Formatted for National Environment Agency submission, including IPCC Tier 1 methodology declaration.
- All PDFs include a branded header, colour-coded tables, totals row, and page-numbered footer.

---

### Settings

Full configuration management for the fleet operator.

- **Company Information** — Edit company name, registration number, address, phone, email, and industry. Changes save immediately with confirmation.
- **Vehicle Management** — View all vehicles in a table (ID, name, type, plate, capacity). Add new vehicles via a form with duplicate ID validation. Delete existing vehicles.
- **Driver Management** — View all drivers (ID, name, phone, licence). Add new drivers with auto-generated IDs. Delete drivers.
- **Integrations** — Toggle connections to third-party services (accounting software, CRM, government portals). Each integration shows its connection status and can be enabled or disabled.
- **Security Settings** — Four security toggles: two-factor authentication, login alerts, API access, and data export permissions — each with a confirmation toast on change.

---

### Pricing

Transparent, tier-based pricing for different fleet sizes.

**2-Wheeler Fleets**
| Fleet Size | Monthly | Annual |
|---|---|---|
| 1–10 vehicles | $20/driver | $200/driver |
| 11–20 vehicles | $18/driver | $180/driver |
| 21–30 vehicles | $17/driver | $170/driver |
| 30+ vehicles | $15/driver | $150/driver |

**4-Wheeler Fleets**
| Fleet Size | Monthly | Annual |
|---|---|---|
| 1–10 vehicles | $30/driver | $300/driver |
| 11–20 vehicles | $28/driver | $280/driver |
| 21–30 vehicles | $27/driver | $270/driver |
| 30+ vehicles | $25/driver | $250/driver |

All plans include a 14-day free trial. No credit card required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Maps | Google Maps JavaScript API (Geocoder, Geometry, Places) |
| PDF Generation | jsPDF + jspdf-autotable |
| Icons | Lucide React |
| Notifications | Sonner |
| State | React Hooks (useState, useEffect, useRef) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Google Maps API key with Maps JavaScript API, Geocoding API, and Directions API enabled

### Installation

```bash
git clone https://github.com/prithvibhardwaj/OptiFleet.git
cd OptiFleet
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

---

## Project Structure

```
/
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── AppSidebar.tsx          # Navigation sidebar
│   ├── DashboardPage.tsx       # Live fleet dashboard
│   ├── OrdersPage.tsx          # Order management & CSV import
│   ├── OptimizeRoutePage.tsx   # Route optimization engine
│   ├── RoutesPage.tsx          # Active routes overview
│   ├── DriverView.tsx          # Driver mobile interface
│   ├── AnalyticsPage.tsx       # Performance analytics
│   ├── ReportsPage.tsx         # ESG report generation
│   ├── SettingsPage.tsx        # Fleet configuration
│   ├── PricingPage.tsx         # Pricing tiers
│   └── GoogleMapComponent.tsx  # Reusable Google Maps wrapper
├── utils/
│   ├── api.ts                  # API helpers
│   ├── csvParser.ts            # CSV parsing utilities
│   └── seedData.ts             # Demo data (12 vehicles, 22 orders)
├── App.tsx                     # Root component & page routing
└── styles/
    └── globals.css             # Tailwind v4 global styles
```

---

## Use Cases

OptiFleet is designed for any Singapore SME operating a fleet:

- **Pest Control** — Multi-stop service route optimization with time-window constraints
- **Cleaning & Laundry** — Pickup and delivery scheduling across HDB estates
- **Catering** — Time-critical delivery sequencing for hot food
- **Construction Logistics** — Heavy goods routing with loading bay notes
- **Healthcare Supplies** — Priority delivery with compliance documentation
- **Aircon Servicing** — Technician dispatch across multiple zones
- **Event Logistics** — Same-day multi-drop coordination

---

## Deployment

OptiFleet is deployed on Vercel. Every push to `main` triggers an automatic production build. The `VITE_GOOGLE_MAPS_API_KEY` environment variable must be set in the Vercel project settings before the first build.
