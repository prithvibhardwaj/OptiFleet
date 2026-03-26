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
  Users,
  Package,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { toast } from 'sonner@2.0.3';
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
  recommendations: string[];
  alternativeRoutes: {
    name: string;
    duration: string;
    distance: string;
    fuelCost: string;
    description: string;
  }[];
}

export default function OptimizeRoutePage() {
  const [locations, setLocations] = useState<Location[]>([
    { id: '1', address: '', type: 'pickup' },
  ]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
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

  const handleOptimize = () => {
    // Validate inputs
    if (!startLocation.trim()) {
      toast.error('Please enter a start location');
      return;
    }

    const emptyLocations = locations.filter((loc) => !loc.address.trim());
    if (emptyLocations.length > 0) {
      toast.error('Please fill in all location addresses');
      return;
    }

    // Simulate optimization
    setIsOptimizing(true);
    toast.success('Route optimization started! Analyzing routes...');
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock insights based on inputs
      const mockInsights: RouteInsights = {
        bestTime: '8:30 AM - 9:00 AM',
        trafficScore: 'low',
        estimatedDuration: '4h 25m',
        estimatedDistance: '67.8 km',
        fuelCost: '$42.50',
        carbonEmissions: '18.2 kg CO₂',
        vehiclesNeeded: Math.ceil(locations.length / 5),
        totalStops: locations.length,
        recommendations: [
          'Start early (before 9 AM) to avoid peak traffic on PIE and CTE',
          'Route optimized to minimize left turns and reduce fuel consumption',
          'Consider combining stops in Woodlands and Yishun into single vehicle route',
          'Weather forecast shows clear conditions - no delays expected',
          locations.length > 8 ? 'High stop count - consider using 2 vehicles for faster delivery' : 'Optimal for single vehicle route',
        ],
        alternativeRoutes: [
          {
            name: 'Optimized Route (Recommended)',
            duration: '4h 25m',
            distance: '67.8 km',
            fuelCost: '$42.50',
            description: 'Best balance of time, distance, and fuel efficiency',
          },
          {
            name: 'Avoid Expressways',
            duration: '5h 10m',
            distance: '62.3 km',
            fuelCost: '$39.20',
            description: 'Uses local roads, better for multiple stops in same area',
          },
          {
            name: 'Priority Lane Route',
            duration: '4h 15m',
            distance: '71.2 km',
            fuelCost: '$44.80',
            description: 'Uses expressways with less congestion, faster but longer',
          },
        ],
      };
      
      setInsights(mockInsights);
      setIsOptimizing(false);
      toast.success('Route optimized successfully!');
    }, 2000);
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
                  className="flex items-start gap-3 p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors"
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

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLocation(location.id)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
