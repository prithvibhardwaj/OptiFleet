import { useState } from 'react';
import { toast } from 'sonner';
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
    driver: 'John Lim',
    stops: [
      { id: 1, address: '123 Clementi Ave 3', customer: 'Ace Pest Control HQ', eta: '09:15', status: 'completed' },
      { id: 2, address: '88 Commonwealth Crescent', customer: 'SwiftClean Solutions', eta: '10:05', status: 'completed' },
      { id: 3, address: '456 Ang Mo Kio St 21', customer: 'Clean Pro Services', eta: '11:10', status: 'in-progress' },
      { id: 4, address: '789 Bedok North Ave 1', customer: 'Fresh Laundry Co', eta: '12:25', status: 'pending' },
      { id: 5, address: '234 Tampines St 21', customer: 'BuildMaster Supplies', eta: '13:40', status: 'pending' },
    ],
    distance: '54.1 km',
    duration: '5h 10m',
    fuelCost: '$39.80',
    locked: false,
  },
  {
    vehicle: 'V002',
    driver: 'Sarah Tan',
    stops: [
      { id: 1, address: '11 Woodlands Close', customer: 'StarChef Catering', eta: '08:00', status: 'completed' },
      { id: 2, address: '890 Woodlands Ave 6', customer: 'Premium Catering Pte Ltd', eta: '08:45', status: 'completed' },
      { id: 3, address: '567 Yishun Ring Rd', customer: 'CoolAir Servicing', eta: '09:50', status: 'completed' },
      { id: 4, address: '321 Pasir Ris Dr 3', customer: 'NovaBake Confectionery', eta: '11:05', status: 'in-progress' },
      { id: 5, address: '678 Bukit Batok West Ave 6', customer: 'Elite Cleaners', eta: '12:30', status: 'pending' },
    ],
    distance: '47.6 km',
    duration: '4h 45m',
    fuelCost: '$35.10',
    locked: true,
  },
  {
    vehicle: 'V004',
    driver: 'Amy Wong',
    stops: [
      { id: 1, address: '345 Hougang Ave 8', customer: 'Bedok Aircon Services', eta: '09:00', status: 'completed' },
      { id: 2, address: '234 Marine Parade Rd', customer: 'MediSupply SG', eta: '10:10', status: 'in-progress' },
      { id: 3, address: '567 Serangoon North Ave 1', customer: 'ProGarden Landscaping', eta: '11:25', status: 'pending' },
      { id: 4, address: '22 Upper Serangoon Rd', customer: 'FreshMart Grocers', eta: '12:40', status: 'pending' },
      { id: 5, address: '201 Tampines St 21', customer: 'TechFix IT Services', eta: '14:00', status: 'pending' },
    ],
    distance: '51.2 km',
    duration: '5h 20m',
    fuelCost: '$37.80',
    locked: false,
  },
  {
    vehicle: 'V006',
    driver: 'Lisa Koh',
    stops: [
      { id: 1, address: '40 Pandan Loop', customer: 'FreshMart Grocers', eta: '07:30', status: 'completed' },
      { id: 2, address: '5 Toh Guan Rd East', customer: 'ProGarden Landscaping', eta: '08:20', status: 'completed' },
      { id: 3, address: '30 Jurong Port Rd', customer: 'Lakeside Catering', eta: '09:10', status: 'in-progress' },
      { id: 4, address: '70 Jurong West Ave 1', customer: 'Punggol Hardware', eta: '10:30', status: 'pending' },
    ],
    distance: '38.4 km',
    duration: '3h 40m',
    fuelCost: '$28.30',
    locked: true,
  },
  {
    vehicle: 'V009',
    driver: 'Kevin Tay',
    stops: [
      { id: 1, address: '1 Fusionopolis Way', customer: 'TechFix IT Services', eta: '09:30', status: 'completed' },
      { id: 2, address: '110 Toa Payoh Lorong 1', customer: 'MediSupply SG', eta: '10:45', status: 'in-progress' },
      { id: 3, address: '3 Hospital Dr', customer: 'NightOwl Pharmacy', eta: '11:30', status: 'pending' },
      { id: 4, address: '10 Anson Rd', customer: 'SkyHigh Events', eta: '13:00', status: 'pending' },
      { id: 5, address: '6 Raffles Blvd', customer: 'HomeDecor Express', eta: '14:15', status: 'pending' },
    ],
    distance: '43.7 km',
    duration: '4h 30m',
    fuelCost: '$32.20',
    locked: false,
  },
  {
    vehicle: 'V011',
    driver: 'Raymond Ong',
    stops: [
      { id: 1, address: '36 Kranji Loop', customer: 'IslandMove Logistics', eta: '08:00', status: 'completed' },
      { id: 2, address: '31 Tuas Ave 1', customer: 'Eco Waste Management', eta: '09:15', status: 'completed' },
      { id: 3, address: '9 Changi North Way', customer: 'IslandMove Logistics (Drop)', eta: '11:00', status: 'in-progress' },
      { id: 4, address: '50 Changi South Ave 1', customer: 'Eco Waste (Return)', eta: '12:30', status: 'pending' },
    ],
    distance: '62.8 km',
    duration: '6h 00m',
    fuelCost: '$46.40',
    locked: false,
  },
];

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
                <CardContent className="p-8">
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl h-[600px] flex items-center justify-center border border-border">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="mb-2">Interactive Route Map</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Visual representation of all optimized routes with color-coded paths for each vehicle
                      </p>
                    </div>
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
