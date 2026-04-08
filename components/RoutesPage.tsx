import { useState } from 'react';
import { toast } from 'sonner';
import GoogleMapComponent from './GoogleMapComponent';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Route,
  MapPin,
  Clock,
  Fuel,
  TrendingDown,
  Send,
  RefreshCw,
  Lock,
  Unlock,
  Navigation,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

const optimizedRoutes = [
  {
    vehicle: 'V001',
    driver: 'Budi Santoso',
    stops: [
      { id: 1, address: 'Jl. Kebon Sirih No. 12, Menteng', customer: 'PT Basmi Hama Utama', eta: '09:15', status: 'completed' },
      { id: 2, address: 'Jl. Hayam Wuruk No. 88, Glodok', customer: 'CV Bersih Cepat', eta: '10:05', status: 'completed' },
      { id: 3, address: 'Jl. Kelapa Gading Raya No. 45', customer: 'PT Pro Kebersihan', eta: '11:10', status: 'in-progress' },
      { id: 4, address: 'Jl. Bekasi Raya No. 234, Jatinegara', customer: 'Laundri Segar', eta: '12:25', status: 'pending' },
      { id: 5, address: 'Kawasan Industri Pulo Gadung No. 56', customer: 'CV Bangun Mandiri', eta: '13:40', status: 'pending' },
    ],
    distance: '54.1 km',
    duration: '5h 10m',
    fuelCost: 'Rp 285.000',
    locked: false,
  },
  {
    vehicle: 'V002',
    driver: 'Siti Rahayu',
    stops: [
      { id: 1, address: 'Jl. Pluit Selatan No. 11, Penjaringan', customer: 'PT Katering Prima', eta: '08:00', status: 'completed' },
      { id: 2, address: 'Jl. Yos Sudarso No. 890, Sunter', customer: 'PT Bintang Chef', eta: '08:45', status: 'completed' },
      { id: 3, address: 'Jl. Boulevard Barat No. 567, Kelapa Gading', customer: 'PT Sejuk Jaya', eta: '09:50', status: 'completed' },
      { id: 4, address: 'Jl. Raya Fatmawati No. 321, Cilandak', customer: 'PT Roti Nusa Indah', eta: '11:05', status: 'in-progress' },
      { id: 5, address: 'Jl. Daan Mogot No. 678, Kalideres', customer: 'CV Kilat Bersih', eta: '12:30', status: 'pending' },
    ],
    distance: '47.6 km',
    duration: '4h 45m',
    fuelCost: 'Rp 251.000',
    locked: true,
  },
  {
    vehicle: 'V004',
    driver: 'Dewi Kusuma',
    stops: [
      { id: 1, address: 'Jl. Pondok Indah No. 345, Jakarta Selatan', customer: 'PT Sejuk Mandiri', eta: '09:00', status: 'completed' },
      { id: 2, address: 'Jl. Tendean No. 234, Mampang', customer: 'PT Medis Nusantara', eta: '10:10', status: 'in-progress' },
      { id: 3, address: 'Jl. Rasuna Said No. 567, Kuningan', customer: 'PT Kebun Raya Hijau', eta: '11:25', status: 'pending' },
      { id: 4, address: 'Jl. MT. Haryono No. 22, Tebet', customer: 'Segar Mart', eta: '12:40', status: 'pending' },
      { id: 5, address: 'Jl. Condet Raya No. 201, Kramat Jati', customer: 'CV Teknologi Cepat', eta: '14:00', status: 'pending' },
    ],
    distance: '51.2 km',
    duration: '5h 20m',
    fuelCost: 'Rp 270.000',
    locked: false,
  },
  {
    vehicle: 'V006',
    driver: 'Fitri Handayani',
    stops: [
      { id: 1, address: 'Kawasan Industri Cengkareng No. 40', customer: 'Segar Mart', eta: '07:30', status: 'completed' },
      { id: 2, address: 'Jl. Raya Kembangan No. 5, Jakarta Barat', customer: 'PT Kebun Raya Hijau', eta: '08:20', status: 'completed' },
      { id: 3, address: 'Jl. Puri Kencana No. 30, Puri Indah', customer: 'PT Katering Danau', eta: '09:10', status: 'in-progress' },
      { id: 4, address: 'Jl. Daan Mogot No. 70, Grogol', customer: 'UD Perlengkapan Bangunan', eta: '10:30', status: 'pending' },
    ],
    distance: '38.4 km',
    duration: '3h 40m',
    fuelCost: 'Rp 202.000',
    locked: true,
  },
  {
    vehicle: 'V009',
    driver: 'Hendri Susanto',
    stops: [
      { id: 1, address: 'Jl. Jend. Sudirman No. 1, Jakarta Pusat', customer: 'CV Teknologi Cepat', eta: '09:30', status: 'completed' },
      { id: 2, address: 'Jl. Cempaka Putih Raya No. 110', customer: 'PT Medis Nusantara', eta: '10:45', status: 'in-progress' },
      { id: 3, address: 'Jl. Diponegoro No. 71, Menteng', customer: 'Apotek Malam', eta: '11:30', status: 'pending' },
      { id: 4, address: 'Jl. M.H. Thamrin No. 10, Jakarta Pusat', customer: 'PT Langit Tinggi Events', eta: '13:00', status: 'pending' },
      { id: 5, address: 'Kawasan Kota Tua No. 6, Jakarta Barat', customer: 'PT Dekorasi Rumah', eta: '14:15', status: 'pending' },
    ],
    distance: '43.7 km',
    duration: '4h 30m',
    fuelCost: 'Rp 230.000',
    locked: false,
  },
  {
    vehicle: 'V011',
    driver: 'Hendra Gunawan',
    stops: [
      { id: 1, address: 'Kawasan Industri JIEP No. 36, Pulo Gadung', customer: 'PT Kirim Kilat', eta: '08:00', status: 'completed' },
      { id: 2, address: 'Jl. Raya Tanjung Priok No. 31', customer: 'PT Hijau Lestari', eta: '09:15', status: 'completed' },
      { id: 3, address: 'Kawasan Berikat Cakung No. 9', customer: 'PT Kirim Kilat (Drop)', eta: '11:00', status: 'in-progress' },
      { id: 4, address: 'Jl. Cilincing Raya No. 50, Jakarta Utara', customer: 'PT Hijau Lestari (Return)', eta: '12:30', status: 'pending' },
    ],
    distance: '62.8 km',
    duration: '6h 00m',
    fuelCost: 'Rp 331.000',
    locked: false,
  },
];

// Approximate Jakarta coordinates for demo stop addresses
const stopCoords: Record<string, { lat: number; lng: number }> = {
  'Jl. Kebon Sirih No. 12, Menteng': { lat: -6.1963, lng: 106.8317 },
  'Jl. Hayam Wuruk No. 88, Glodok': { lat: -6.1480, lng: 106.8158 },
  'Jl. Kelapa Gading Raya No. 45': { lat: -6.1524, lng: 106.9040 },
  'Jl. Bekasi Raya No. 234, Jatinegara': { lat: -6.2153, lng: 106.8785 },
  'Kawasan Industri Pulo Gadung No. 56': { lat: -6.1867, lng: 106.9004 },
  'Jl. Pluit Selatan No. 11, Penjaringan': { lat: -6.1262, lng: 106.8020 },
  'Jl. Yos Sudarso No. 890, Sunter': { lat: -6.1397, lng: 106.8812 },
  'Jl. Boulevard Barat No. 567, Kelapa Gading': { lat: -6.1601, lng: 106.8964 },
  'Jl. Raya Fatmawati No. 321, Cilandak': { lat: -6.2913, lng: 106.7959 },
  'Jl. Daan Mogot No. 678, Kalideres': { lat: -6.1569, lng: 106.7272 },
  'Jl. Pondok Indah No. 345, Jakarta Selatan': { lat: -6.2913, lng: 106.7840 },
  'Jl. Tendean No. 234, Mampang': { lat: -6.2548, lng: 106.8197 },
  'Jl. Rasuna Said No. 567, Kuningan': { lat: -6.2297, lng: 106.8308 },
  'Jl. MT. Haryono No. 22, Tebet': { lat: -6.2327, lng: 106.8370 },
  'Jl. Condet Raya No. 201, Kramat Jati': { lat: -6.2654, lng: 106.8826 },
  'Kawasan Industri Cengkareng No. 40': { lat: -6.1400, lng: 106.7220 },
  'Jl. Raya Kembangan No. 5, Jakarta Barat': { lat: -6.1983, lng: 106.7524 },
  'Jl. Puri Kencana No. 30, Puri Indah': { lat: -6.1989, lng: 106.7372 },
  'Jl. Daan Mogot No. 70, Grogol': { lat: -6.1622, lng: 106.7894 },
  'Jl. Jend. Sudirman No. 1, Jakarta Pusat': { lat: -6.2241, lng: 106.8057 },
  'Jl. Cempaka Putih Raya No. 110': { lat: -6.1742, lng: 106.8614 },
  'Jl. Diponegoro No. 71, Menteng': { lat: -6.1914, lng: 106.8428 },
  'Jl. M.H. Thamrin No. 10, Jakarta Pusat': { lat: -6.1944, lng: 106.8229 },
  'Kawasan Kota Tua No. 6, Jakarta Barat': { lat: -6.1348, lng: 106.8131 },
  'Kawasan Industri JIEP No. 36, Pulo Gadung': { lat: -6.1867, lng: 106.9004 },
  'Jl. Raya Tanjung Priok No. 31': { lat: -6.1089, lng: 106.8807 },
  'Kawasan Berikat Cakung No. 9': { lat: -6.1267, lng: 106.9358 },
  'Jl. Cilincing Raya No. 50, Jakarta Utara': { lat: -6.0783, lng: 106.9021 },
};

export default function RoutesPage() {
  const [routes, setRoutes] = useState(optimizedRoutes);
  const [openRoutes, setOpenRoutes] = useState<string[]>([routes[0].vehicle]);

  const toggleRouteLock = (vehicleId: string) => {
    setRoutes(routes.map(route => 
      route.vehicle === vehicleId 
        ? { ...route, locked: !route.locked }
        : route
    ));
  };

  const toggleRoute = (vehicleId: string) => {
    setOpenRoutes(prev =>
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const getStopStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStopStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'pending':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const totalDistance = routes.reduce((acc, route) => acc + parseFloat(route.distance), 0).toFixed(1);
  const totalDuration = routes.reduce((acc, route) => {
    const hours = parseInt(route.duration.split('h')[0]);
    const mins = parseInt(route.duration.split('h')[1].split('m')[0]);
    return acc + hours * 60 + mins;
  }, 0);
  const totalFuel = routes.reduce((acc, route) => acc + parseFloat(route.fuelCost.substring(1)), 0).toFixed(2);

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl">Route Optimization Summary</h1>
              <p className="text-sm text-muted-foreground">
                View and manage optimized routes for your fleet
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => {
              toast.success('Re-optimizing all routes...');
              setTimeout(() => toast.success('All routes re-optimized — 6% additional savings found'), 2000);
            }}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Re-optimize
            </Button>
            <Button onClick={() => {
              routes.forEach(r => toast.success(`Route sent to ${r.driver}`));
            }}>
              <Send className="w-4 h-4 mr-2" />
              Send to All Drivers
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                    <Route className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Routes</p>
                    <p className="text-2xl">{routes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Distance</p>
                    <p className="text-2xl">{totalDistance} km</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Duration</p>
                    <p className="text-2xl">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                    <Fuel className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel Cost</p>
                    <p className="text-2xl">${totalFuel}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      18% saved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Routes */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-3">
              {routes.map((route) => (
                <Card key={route.vehicle} className={route.locked ? 'border-l-4 border-l-blue-600' : ''}>
                  <Collapsible
                    open={openRoutes.includes(route.vehicle)}
                    onOpenChange={() => toggleRoute(route.vehicle)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {openRoutes.includes(route.vehicle) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                            <Navigation className="w-5 h-5 text-blue-600" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg">{route.vehicle} - {route.driver}</CardTitle>
                              {route.locked && (
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Locked
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {route.stops.length} stops
                              </span>
                              <span className="flex items-center gap-1">
                                <Route className="w-3 h-3" />
                                {route.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {route.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Fuel className="w-3 h-3" />
                                {route.fuelCost}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleRouteLock(route.vehicle)}
                          >
                            {route.locked ? (
                              <>
                                <Unlock className="w-4 h-4 mr-2" />
                                Unlock
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Lock
                              </>
                            )}
                          </Button>
                          <Button size="sm" onClick={() => toast.success(`Route sent to ${route.driver}`)}>
                            <Send className="w-4 h-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {route.stops.map((stop, index) => (
                            <div
                              key={stop.id}
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                            >
                              {/* Stop Number */}
                              <div
                                className={`w-7 h-7 ${getStopStatusColor(stop.status)} rounded-full flex items-center justify-center text-white text-sm shrink-0`}
                              >
                                {stop.status === 'completed' ? '✓' : index + 1}
                              </div>

                              {/* Stop Details */}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{stop.customer}</p>
                                <p className="text-sm text-muted-foreground truncate">{stop.address}</p>
                              </div>

                              {/* ETA and Status */}
                              <div className="flex items-center gap-2 shrink-0">
                                <Badge variant="outline" className="text-xs">
                                  ETA: {stop.eta}
                                </Badge>
                                <Badge className={getStopStatusBadge(stop.status)}>
                                  {stop.status === 'completed' && 'Completed'}
                                  {stop.status === 'in-progress' && 'In Progress'}
                                  {stop.status === 'pending' && 'Pending'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardContent className="p-0 overflow-hidden rounded-lg">
                  <div className="h-[600px]">
                    <GoogleMapComponent
                      className="w-full h-full"
                      center={{ lat: -6.2088, lng: 106.8456 }}
                      zoom={12}
                      markers={routes.flatMap(route =>
                        route.stops.map((stop, idx) => ({
                          id: `${route.vehicle}-${idx}`,
                          position: stopCoords[stop.address] || { lat: -6.2088 + (idx * 0.01), lng: 106.8456 + (idx * 0.01) },
                          title: `${stop.customer} — ETA ${stop.eta}`,
                          color: stop.status === 'completed' ? '#22c55e' : stop.status === 'in-progress' ? '#3b82f6' : '#9ca3af',
                        }))
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
