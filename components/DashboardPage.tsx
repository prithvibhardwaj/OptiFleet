import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Truck,
  Package,
  Zap,
  TrendingUp,
  Fuel,
  Leaf,
  MapPin,
  Loader2,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import GoogleMapComponent from './GoogleMapComponent';

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    setVehicles([
      { id: 'V001', name: 'Vehicle 1', plate: 'SBD 1234 A', type: 'Van', driver: 'John Lim', status: 'en-route', lat: 1.3521, lng: 103.8198, stops: 5 },
      { id: 'V002', name: 'Vehicle 2', plate: 'SBD 5678 B', type: 'Van', driver: 'Sarah Tan', status: 'en-route', lat: 1.3321, lng: 103.8598, stops: 5 },
      { id: 'V003', name: 'Vehicle 3', plate: 'SBD 9012 C', type: 'Truck', driver: 'Mike Chen', status: 'idle', lat: 1.3721, lng: 103.8898, stops: 0 },
      { id: 'V004', name: 'Vehicle 4', plate: 'SBD 3456 D', type: 'Van', driver: 'Amy Wong', status: 'en-route', lat: 1.3121, lng: 103.8398, stops: 5 },
      { id: 'V005', name: 'Vehicle 5', plate: 'SBD 7890 E', type: 'Van', driver: 'David Ng', status: 'done', lat: 1.3421, lng: 103.8698, stops: 0 },
      { id: 'V006', name: 'Vehicle 6', plate: 'SBD 2345 F', type: 'Van', driver: 'Lisa Koh', status: 'en-route', lat: 1.3621, lng: 103.8298, stops: 4 },
      { id: 'V007', name: 'Vehicle 7', plate: 'SBD 6789 G', type: 'Truck', driver: 'Tom Lee', status: 'done', lat: 1.3221, lng: 103.8498, stops: 0 },
      { id: 'V008', name: 'Vehicle 8', plate: 'SBD 0123 H', type: 'Van', driver: 'Jane Sim', status: 'en-route', lat: 1.3821, lng: 103.8798, stops: 5 },
      { id: 'V009', name: 'Vehicle 9', plate: 'SBD 4567 J', type: 'Van', driver: 'Kevin Tay', status: 'en-route', lat: 1.3281, lng: 103.8451, stops: 5 },
      { id: 'V010', name: 'Vehicle 10', plate: 'SBD 8901 K', type: 'Truck', driver: 'Priya Nair', status: 'idle', lat: 1.3651, lng: 103.8751, stops: 0 },
      { id: 'V011', name: 'Vehicle 11', plate: 'SBD 2468 L', type: 'Van', driver: 'Raymond Ong', status: 'en-route', lat: 1.3411, lng: 103.8211, stops: 4 },
      { id: 'V012', name: 'Vehicle 12', plate: 'SBD 1357 M', type: 'Van', driver: 'Mei Lin', status: 'done', lat: 1.3561, lng: 103.8631, stops: 0 },
    ]);

    setOrders([
      { id: 'ORD-001', customer: 'Ace Pest Control HQ', status: 'assigned' },
      { id: 'ORD-002', customer: 'Clean Pro Services', status: 'assigned' },
      { id: 'ORD-003', customer: 'Fresh Laundry Co', status: 'pending' },
      { id: 'ORD-004', customer: 'BuildMaster Supplies', status: 'assigned' },
      { id: 'ORD-005', customer: 'Premium Catering Pte Ltd', status: 'assigned' },
      { id: 'ORD-006', customer: 'CoolAir Servicing', status: 'pending' },
      { id: 'ORD-007', customer: 'SwiftClean Solutions', status: 'pending' },
      { id: 'ORD-008', customer: 'ProGarden Landscaping', status: 'assigned' },
      { id: 'ORD-009', customer: 'Lakeside Catering', status: 'assigned' },
      { id: 'ORD-010', customer: 'TechFix IT Services', status: 'pending' },
      { id: 'ORD-011', customer: 'MediSupply SG', status: 'assigned' },
      { id: 'ORD-012', customer: 'Eco Waste Management', status: 'assigned' },
      { id: 'ORD-013', customer: 'NovaBake Confectionery', status: 'assigned' },
      { id: 'ORD-014', customer: 'HomeDecor Express', status: 'pending' },
      { id: 'ORD-015', customer: 'FreshMart Grocers', status: 'assigned' },
      { id: 'ORD-016', customer: 'SkyHigh Events', status: 'pending' },
      { id: 'ORD-017', customer: 'Bedok Aircon Services', status: 'pending' },
      { id: 'ORD-018', customer: 'Punggol Hardware', status: 'assigned' },
      { id: 'ORD-019', customer: 'StarChef Catering', status: 'assigned' },
      { id: 'ORD-020', customer: 'IslandMove Logistics', status: 'pending' },
      { id: 'ORD-021', customer: 'SunShine Florist', status: 'pending' },
      { id: 'ORD-022', customer: 'NightOwl Pharmacy', status: 'pending' },
    ]);

    setLoading(false);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route':
        return 'bg-blue-500';
      case 'idle':
        return 'bg-amber-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en-route':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">En Route</Badge>;
      case 'idle':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Idle</Badge>;
      case 'done':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl">OptiFleet Solutions</h1>
                <p className="text-muted-foreground">
                  {greeting}, Ken 👋
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Singapore
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={loadData}>
                <Zap className="w-4 h-4 mr-2" />
                {loading ? 'Loading...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Vehicles</p>
                    <h3 className="text-3xl mb-1">{vehicles.length}</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      All operational
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                    <h3 className="text-3xl mb-1">{orders.length}</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Real-time data
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card className="border-l-4 border-l-amber-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fuel Cost Saved</p>
                  <h3 className="text-3xl mb-1">$312</h3>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CO₂ Saved</p>
                  <h3 className="text-3xl mb-1">63kg</h3>
                  <p className="text-xs text-muted-foreground">≈ 3 trees planted</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Fleet Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-xl h-[500px] overflow-hidden border border-border">
                <GoogleMapComponent
                  className="w-full h-full"
                  center={{ lat: 1.3521, lng: 103.8198 }}
                  zoom={12}
                  markers={vehicles.map(v => ({
                    id: v.id,
                    position: { lat: v.lat, lng: v.lng },
                    title: `${v.name} — ${v.driver} (${v.status})`,
                    color: v.status === 'en-route' ? '#3b82f6' : v.status === 'idle' ? '#f59e0b' : '#22c55e',
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Active Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {vehicles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No vehicles available</p>
                  </div>
                ) : (
                  vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${getStatusColor(vehicle.status)} rounded-full`}></div>
                          <h4 className="text-sm">{vehicle.name || vehicle.id}</h4>
                        </div>
                        {getStatusBadge(vehicle.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{vehicle.driver}</p>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">{vehicle.type || 'Van'}</span>
                        <span className="text-muted-foreground">{vehicle.plate || 'N/A'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optimization Status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1">Optimization Status</h3>
                  <p className="text-sm text-muted-foreground">All routes optimized for today. Ready to optimize tomorrow's routes.</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Optimize Tomorrow
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
}
