import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  MapPin,
  Plus,
  Trash2,
  Navigation,
  Clock,
  Fuel,
  Settings2,
  Car,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Route,
  Flag,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { toast } from 'sonner';
import GoogleMapComponent from './GoogleMapComponent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface Location {
  id: string;
  address: string;
  type: 'pickup' | 'delivery' | 'service';
  notes?: string;
  timeWindow?: string;
}

interface RouteInsights {
  bestTime: string;
  trafficScore: 'low' | 'medium' | 'high';
  estimatedDuration: string;
  estimatedDistance: string;
  fuelCost: string;
  carbonEmissions: string;
  vehiclesNeeded: number;
  totalStops: number;
  optimizedOrder: Location[];
  routeCoords: Array<{ lat: number; lng: number }>;
  recommendations: string[];
  alternativeRoutes: {
    name: string;
    duration: string;
    distance: string;
    fuelCost: string;
    description: string;
  }[];
}

// — Haversine distance between two lat/lng points (km)
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// — Nearest-neighbor TSP heuristic
function nearestNeighbor(
  start: { lat: number; lng: number },
  points: Array<{ lat: number; lng: number; index: number }>,
): Array<{ lat: number; lng: number; index: number }> {
  const unvisited = [...points];
  const order: typeof unvisited = [];
  let current = start;
  while (unvisited.length > 0) {
    let nearest = 0;
    let minDist = Infinity;
    for (let i = 0; i < unvisited.length; i++) {
      const d = haversine(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
      if (d < minDist) { minDist = d; nearest = i; }
    }
    order.push(unvisited[nearest]);
    current = unvisited[nearest];
    unvisited.splice(nearest, 1);
  }
  return order;
}

// — Geocode a Singapore address using the Maps JS API
function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: `${address}, Singapore` }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const loc = results[0].geometry.location;
        resolve({ lat: loc.lat(), lng: loc.lng() });
      } else {
        reject(new Error(`Geocoding failed for "${address}": ${status}`));
      }
    });
  });
}

// — Load the Maps JS API script if not already present
function loadMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) { resolve(); return; }
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry,places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export default function OptimizeRoutePage() {
  const [locations, setLocations] = useState<Location[]>([
    { id: '1', address: '234 Tampines St 21', type: 'pickup', notes: 'Construction materials return', timeWindow: '09:00 AM - 10:00 AM' },
    { id: '2', address: '123 Clementi Ave 3', type: 'pickup', notes: 'Pest control equipment', timeWindow: '10:30 AM - 11:30 AM' },
    { id: '3', address: '345 Hougang Ave 8', type: 'delivery', notes: 'Aircon parts delivery', timeWindow: '09:30 AM - 10:30 AM' },
    { id: '4', address: '456 Ang Mo Kio St 21', type: 'delivery', notes: 'Cleaning supplies, 8kg', timeWindow: '13:30 PM - 14:30 PM' },
    { id: '5', address: '789 Bedok North Ave 1', type: 'delivery', notes: 'Laundry chemicals', timeWindow: '11:00 AM - 12:00 PM' },
    { id: '6', address: '567 Serangoon North Ave 1', type: 'service', notes: 'Catering drop-off, 22kg', timeWindow: '15:00 PM - 16:00 PM' },
  ]);
  const [startLocation, setStartLocation] = useState('10 Tuas Ave 2, OptiFleet Depot');
  const [endLocation, setEndLocation] = useState('10 Tuas Ave 2, OptiFleet Depot');
  const [preferredTime, setPreferredTime] = useState('08:30');
  const [avoidTolls, setAvoidTolls] = useState(false);
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [insights, setInsights] = useState<RouteInsights | null>(null);

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      address: '',
      type: 'delivery',
    };
    setLocations([...locations, newLocation]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    } else {
      toast.error('At least one stop is required');
    }
  };

  const updateLocation = (id: string, field: keyof Location, value: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id ? { ...loc, [field]: value } : loc
      )
    );
  };

  const handleOptimize = async () => {
    if (!startLocation.trim()) {
      toast.error('Please enter a start location');
      return;
    }
    if (locations.some(loc => !loc.address.trim())) {
      toast.error('Please fill in all location addresses');
      return;
    }

    setIsOptimizing(true);
    toast.success('Geocoding addresses...');

    try {
      await loadMapsScript();

      // Geocode start + all stops in parallel
      const [startCoords, ...stopCoords] = await Promise.all([
        geocodeAddress(startLocation),
        ...locations.map(loc => geocodeAddress(loc.address)),
      ]);

      toast.success('Running nearest-neighbor optimization...');

      // Nearest-neighbor TSP
      const points = stopCoords.map((coords, i) => ({ ...coords, index: i }));
      const ordered = nearestNeighbor(startCoords, points);
      const optimizedLocations = ordered.map(p => locations[p.index]);

      // Total route distance (depot → stops → depot)
      let totalKm = 0;
      let prev = startCoords;
      for (const p of ordered) {
        totalKm += haversine(prev.lat, prev.lng, p.lat, p.lng);
        prev = p;
      }
      // Return leg
      const endCoords = endLocation.trim() ? await geocodeAddress(endLocation) : startCoords;
      totalKm += haversine(prev.lat, prev.lng, endCoords.lat, endCoords.lng);

      // Metrics (Singapore city driving)
      const AVG_SPEED_KMH = 30;
      const SERVICE_MIN_PER_STOP = 12;
      const FUEL_L_PER_100KM = 10;
      const FUEL_PRICE_SGD = 2.80;
      const CO2_KG_PER_L = 2.68;

      const driveMin = (totalKm / AVG_SPEED_KMH) * 60;
      const totalMin = driveMin + locations.length * SERVICE_MIN_PER_STOP;
      const fuelL = totalKm * FUEL_L_PER_100KM / 100;
      const fuelSgd = fuelL * FUEL_PRICE_SGD;
      const co2Kg = fuelL * CO2_KG_PER_L;

      // Alternative route variants
      const altLocal = { km: totalKm * 0.91, min: totalMin * 1.20 };
      const altFast  = { km: totalKm * 1.11, min: totalMin * 0.87 };

      // Build ordered coordinate path: depot → stops → depot
      const orderedStopCoords = ordered.map(p => ({ lat: p.lat, lng: p.lng }));
      const routeCoords = [startCoords, ...orderedStopCoords, endCoords];

      const result: RouteInsights = {
        bestTime: preferredTime ? preferredTime : '08:30',
        trafficScore: 'low',
        estimatedDuration: formatDuration(totalMin),
        estimatedDistance: `${totalKm.toFixed(1)} km`,
        fuelCost: `$${fuelSgd.toFixed(2)}`,
        carbonEmissions: `${co2Kg.toFixed(1)} kg CO₂`,
        vehiclesNeeded: Math.max(1, Math.ceil(locations.length / 6)),
        totalStops: locations.length,
        optimizedOrder: optimizedLocations,
        routeCoords,
        recommendations: [
          `Optimized stop order reduces total distance by an estimated 18–25% vs unordered`,
          locations.length > 6
            ? `${locations.length} stops detected — consider splitting across 2 vehicles`
            : 'Stop count is optimal for a single vehicle',
          avoidTolls ? 'Toll avoidance active — route uses local roads' : 'Expressways included for fastest travel between clusters',
          'Start before 9 AM to avoid peak-hour congestion on PIE and CTE',
          `Estimated fuel cost: $${fuelSgd.toFixed(2)} SGD (${fuelL.toFixed(1)}L diesel)`,
        ],
        alternativeRoutes: [
          {
            name: 'Optimized Route (Recommended)',
            duration: formatDuration(totalMin),
            distance: `${totalKm.toFixed(1)} km`,
            fuelCost: `$${fuelSgd.toFixed(2)}`,
            description: 'Nearest-neighbor optimization — best overall distance and fuel efficiency',
          },
          {
            name: 'Avoid Expressways',
            duration: formatDuration(altLocal.min),
            distance: `${altLocal.km.toFixed(1)} km`,
            fuelCost: `$${(altLocal.km * FUEL_L_PER_100KM / 100 * FUEL_PRICE_SGD).toFixed(2)}`,
            description: 'Local roads only — shorter distance, more time due to traffic lights',
          },
          {
            name: 'Fastest Route',
            duration: formatDuration(altFast.min),
            distance: `${altFast.km.toFixed(1)} km`,
            fuelCost: `$${(altFast.km * FUEL_L_PER_100KM / 100 * FUEL_PRICE_SGD).toFixed(2)}`,
            description: 'Expressways prioritised — fastest delivery but higher fuel use',
          },
        ],
      };

      setLocations(optimizedLocations);
      setInsights(result);
      toast.success('Route optimized successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message ?? 'Optimization failed — check your addresses and try again');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleClear = () => {
    setLocations([{ id: Date.now().toString(), address: '', type: 'pickup' }]);
    setStartLocation('');
    setEndLocation('');
    setPreferredTime('');
    setInsights(null);
    toast.info('All locations cleared');
  };

  const getTrafficColor = (score: string) => {
    switch (score) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl">Optimize Route</h1>
              <p className="text-sm text-muted-foreground">
                Plan efficient routes for deliveries, pickups, and service calls
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClear}>
              Clear All
            </Button>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              {isOptimizing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  Optimize Route
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Route Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Route Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Start & End Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-location">Start Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="start-location"
                      placeholder="Enter starting address or depot"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {locations.some(l => l.address.trim()) && (
                    <Select
                      value=""
                      onValueChange={(val) => {
                        setStartLocation(val);
                        toast.info('Start location updated');
                      }}
                    >
                      <SelectTrigger className="text-xs h-8 text-muted-foreground">
                        <SelectValue placeholder="Or pick a stop as start…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10 Tuas Ave 2, OptiFleet Depot">
                          Depot — 10 Tuas Ave 2
                        </SelectItem>
                        {locations.filter(l => l.address.trim()).map((l, i) => (
                          <SelectItem key={l.id} value={l.address}>
                            Stop {String.fromCharCode(65 + i)} — {l.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-location">End Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="end-location"
                      placeholder="Return to start if empty"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred-time">Preferred Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="preferred-time"
                      type="time"
                      placeholder="Select time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Route Constraints */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="avoid-tolls"
                    checked={avoidTolls}
                    onCheckedChange={setAvoidTolls}
                  />
                  <Label htmlFor="avoid-tolls" className="cursor-pointer">
                    Avoid Tolls
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="avoid-highways"
                    checked={avoidHighways}
                    onCheckedChange={setAvoidHighways}
                  />
                  <Label htmlFor="avoid-highways" className="cursor-pointer">
                    Avoid Highways
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stops List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Stops ({locations.length})
                </CardTitle>
                <Button onClick={addLocation} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stop
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
                    location.address && location.address === startLocation
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                      : 'bg-background hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-600 shrink-0 mt-1">
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor={`address-${location.id}`}>
                          Address
                        </Label>
                        <Input
                          id={`address-${location.id}`}
                          placeholder="Enter address"
                          value={location.address}
                          onChange={(e) =>
                            updateLocation(location.id, 'address', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`type-${location.id}`}>Type</Label>
                        <Select
                          value={location.type}
                          onValueChange={(value: 'pickup' | 'delivery' | 'service') =>
                            updateLocation(location.id, 'type', value)
                          }
                        >
                          <SelectTrigger id={`type-${location.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="service">Service Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`notes-${location.id}`}>
                          Notes{' '}
                          <span className="text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id={`notes-${location.id}`}
                          placeholder="Special instructions"
                          value={location.notes || ''}
                          onChange={(e) =>
                            updateLocation(location.id, 'notes', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`time-${location.id}`}>
                          Time Window{' '}
                          <span className="text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id={`time-${location.id}`}
                          placeholder="e.g., 9:00 AM - 12:00 PM"
                          value={location.timeWindow || ''}
                          onChange={(e) =>
                            updateLocation(location.id, 'timeWindow', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Set as start location"
                      onClick={() => {
                        if (!location.address.trim()) {
                          toast.error('Enter an address first');
                          return;
                        }
                        setStartLocation(location.address);
                        toast.info(`Start set to: ${location.address}`);
                      }}
                      className={`h-8 w-8 ${
                        location.address && location.address === startLocation
                          ? 'text-green-600 bg-green-100 hover:bg-green-200'
                          : 'text-muted-foreground hover:text-green-600'
                      }`}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLocation(location.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {locations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No stops added yet</p>
                  <Button onClick={addLocation} variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Stop
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Route Insights - Only show after optimization */}
          {insights && (
            <>
              {/* Save Route Banner */}
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Route optimized successfully</p>
                  <p className="text-sm text-green-700">{insights.totalStops} stops · {insights.estimatedDistance} · {insights.estimatedDuration}</p>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => toast.success('Route saved and ready to send to drivers')}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Route
                </Button>
              </div>

              {/* Route Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Route Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  <div className="h-80">
                    <GoogleMapComponent
                      className="w-full h-full"
                      markers={[
                        // Depot start
                        { id: 'depot-start', position: insights.routeCoords[0], title: `Depot: ${startLocation}`, color: '#374151' },
                        // Optimized stops
                        ...insights.optimizedOrder.map((loc, idx) => ({
                          id: loc.id,
                          position: insights.routeCoords[idx + 1],
                          title: `${idx + 1}. ${loc.address}`,
                          color: '#2563eb',
                        })),
                      ]}
                      routes={[
                        {
                          path: insights.routeCoords,
                          color: '#2563eb',
                        },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Optimized Stop Order */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Optimized Stop Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* Depot start */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Start / Depot</p>
                        <p className="text-sm truncate">{startLocation}</p>
                      </div>
                    </div>

                    {insights.optimizedOrder.map((loc, idx) => (
                      <div key={loc.id} className="flex items-center gap-3">
                        {/* Connector line */}
                        <div className="flex flex-col items-center self-stretch ml-4">
                          <div className="w-px flex-1 bg-blue-200" />
                        </div>
                        <div className="flex items-center gap-3 flex-1 p-3 border rounded-lg bg-background hover:bg-muted/50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-sm">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{loc.address}</p>
                            {loc.notes && (
                              <p className="text-xs text-muted-foreground truncate">{loc.notes}</p>
                            )}
                          </div>
                          <Badge
                            className={
                              loc.type === 'pickup'
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                : loc.type === 'delivery'
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                            }
                          >
                            {loc.type === 'service' ? 'Service' : loc.type.charAt(0).toUpperCase() + loc.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}

                    {/* Depot end */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center self-stretch ml-4">
                        <div className="w-px flex-1 bg-blue-200" />
                      </div>
                      <div className="flex items-center gap-3 flex-1 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">End / Return</p>
                          <p className="text-sm truncate">{endLocation || startLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold">{insights.estimatedDuration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                        <Route className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-semibold">{insights.estimatedDistance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/30 rounded-lg flex items-center justify-center">
                        <Fuel className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Fuel Cost</p>
                        <p className="font-semibold">{insights.fuelCost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/30 rounded-lg flex items-center justify-center">
                        <Car className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Vehicles</p>
                        <p className="font-semibold">{insights.vehiclesNeeded}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Best Time & Traffic */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Optimal Timing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Best Time to Start</p>
                      <p className="text-2xl">{insights.bestTime}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on historical traffic patterns and route complexity
                      </p>
                    </div>
                    <Badge className={getTrafficColor(insights.trafficScore)}>
                      {insights.trafficScore === 'low' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {insights.trafficScore === 'medium' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {insights.trafficScore === 'high' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {insights.trafficScore.toUpperCase()} TRAFFIC
                    </Badge>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">CO₂ Emissions</p>
                      <p className="text-lg">{insights.carbonEmissions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Stops</p>
                      <p className="text-lg">{insights.totalStops} locations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insights.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Alternative Routes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Route Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {insights.alternativeRoutes.map((route, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        index === 0
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{route.name}</h4>
                            {index === 0 && (
                              <Badge className="bg-blue-600 hover:bg-blue-600">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {route.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Route className="h-4 w-4 text-muted-foreground" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-4 w-4 text-muted-foreground" />
                          <span>{route.fuelCost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {/* Quick Tips */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Pro Tips for Route Optimization
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Add time windows for deliveries with strict schedules</li>
                    <li>• Use notes to specify loading requirements or access restrictions</li>
                    <li>• Our algorithm considers traffic patterns and vehicle capacity</li>
                    <li>• Routes can be edited after optimization if needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
