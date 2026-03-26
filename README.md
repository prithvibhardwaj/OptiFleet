# OptiFleet - Advanced Fleet Optimization Platform

OptiFleet is an integrated fleet optimization application designed for route and movement optimization with a superior UI/UX. Built for modern fleet management needs across multiple industries including pest control, laundry, cleaning, construction, catering, relocation, and aircon servicing companies.

![OptiFleet Dashboard](https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&h=630&fit=crop)

## 🚀 Features

### Core Functionality
- **🗺️ Live Vehicle Tracking** - Real-time GPS tracking on Singapore map with Google Maps integration
- **📊 Dashboard** - Comprehensive fleet overview with key metrics and analytics
- **📦 Order Management** - CSV upload support for bulk order imports
- **🎯 Route Optimization** - AI-powered route planning with preferred start times
- **📱 Driver Mobile View** - Dedicated interface for drivers with turn-by-turn navigation
- **📈 Analytics Dashboard** - Advanced analytics and performance metrics
- **🌱 ESG Reporting** - Environmental, Social, and Governance compliance reports
- **⚙️ Settings & Integrations** - Customizable settings and third-party integrations
- **💳 Flexible Pricing** - Tier-based pricing for 2-wheeler and 4-wheeler fleets

### Technical Highlights
- **Modern UI/UX** - Built with React, TypeScript, and Tailwind CSS v4
- **Real-time Data** - Supabase backend for data persistence and real-time updates
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Component Library** - Built on shadcn/ui for consistent, accessible components
- **Type Safety** - Full TypeScript implementation

## 📋 Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Google Maps API key
- Git installed on your machine

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/optifleet.git
cd optifleet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_DB_URL=your_supabase_database_url

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. The application uses a pre-configured key-value store table (`kv_store_520f7c55`)
3. Deploy the edge functions:

```bash
supabase functions deploy server
```

### 5. Google Maps Setup

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
   - Distance Matrix API
3. Add the API key to your `.env` file

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Application Structure

```
/
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── DashboardPage.tsx   # Main dashboard
│   ├── OrdersPage.tsx      # Order management
│   ├── OptimizeRoutePage.tsx  # Route planning
│   ├── RoutesPage.tsx      # Route summary
│   ├── DriverView.tsx      # Driver interface
│   ├── AnalyticsPage.tsx   # Analytics dashboard
│   ├── ReportsPage.tsx     # ESG reporting
│   ├── PricingPage.tsx     # Pricing tiers
│   └── SettingsPage.tsx    # Settings
├── supabase/
│   └── functions/
│       └── server/         # Backend edge functions
├── utils/                  # Utility functions
│   ├── api.ts             # API helpers
│   ├── csvParser.ts       # CSV processing
│   └── seedData.ts        # Demo data
└── styles/
    └── globals.css        # Tailwind v4 global styles
```

## 💰 Pricing Model

OptiFleet offers flexible tier-based pricing for both 2-wheeler and 4-wheeler fleets:

### 2-Wheeler Fleets
- **1-10 vehicles**: $20/driver/month or $200/year
- **11-20 vehicles**: $18/driver/month or $180/year
- **21-30 vehicles**: $17/driver/month or $170/year
- **30+ vehicles**: $15/driver/month or $150/year

### 4-Wheeler Fleets
- **1-10 vehicles**: $30/driver/month or $300/year
- **11-20 vehicles**: $28/driver/month or $280/year
- **21-30 vehicles**: $27/driver/month or $270/year
- **30+ vehicles**: $25/driver/month or $250/year

*All plans include a 14-day free trial. No credit card required.*

## 🎯 Use Cases

OptiFleet is designed for various industries:

- **Pest Control** - Optimize service routes and manage recurring appointments
- **Laundry Services** - Efficient pickup and delivery scheduling
- **Cleaning Companies** - Multi-site cleaning crew coordination
- **Construction** - Material delivery and equipment tracking
- **Catering** - Time-sensitive food delivery optimization
- **Relocation Services** - Move coordination and logistics
- **Aircon Servicing** - Service call optimization

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth, Storage)
- **Maps**: Google Maps API
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks
- **Routing**: Custom page-based routing

## 📝 Key Features in Detail

### Route Optimization
- Input multiple locations with addresses
- Set preferred start times
- Automatic route calculation using Google Maps
- Distance and time estimation
- Driver assignment
- Collapsible route views

### CSV Upload
- Bulk order import via CSV files
- Automatic parsing and validation
- Support for address, customer details, and time windows

### ESG Reporting
- Carbon emission tracking
- Fuel consumption monitoring
- Route efficiency metrics
- Government compliance reporting

### Analytics
- Fleet utilization metrics
- Performance KPIs
- Cost analysis
- Historical trends

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Maps powered by [Google Maps](https://developers.google.com/maps)
- Backend by [Supabase](https://supabase.com)
- Icons from [Lucide](https://lucide.dev)

## 📧 Support

For support, email support@optifleet.com or open an issue in this repository.

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced AI route optimization
- [ ] Real-time driver chat
- [ ] Mobile app (iOS/Android)
- [ ] Fleet maintenance tracking
- [ ] Customer portal
- [ ] API for third-party integrations
- [ ] Automated billing system

---

Made with ❤️ for efficient fleet management
