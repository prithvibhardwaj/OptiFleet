import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Fuel,
  Clock,
  Leaf,
  Award,
  Target,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const fuelData = [
  { month: 'Mar', fuel: 2580, saved: 290 },
  { month: 'Apr', fuel: 2400, saved: 380 },
  { month: 'May', fuel: 2210, saved: 510 },
  { month: 'Jun', fuel: 2050, saved: 630 },
  { month: 'Jul', fuel: 1980, saved: 710 },
  { month: 'Aug', fuel: 1850, saved: 790 },
  { month: 'Sep', fuel: 1720, saved: 860 },
  { month: 'Oct', fuel: 1590, saved: 940 },
];

const routeTimeData = [
  { day: 'Mon', avgTime: 41, target: 45 },
  { day: 'Tue', avgTime: 37, target: 45 },
  { day: 'Wed', avgTime: 43, target: 45 },
  { day: 'Thu', avgTime: 39, target: 45 },
  { day: 'Fri', avgTime: 35, target: 45 },
  { day: 'Sat', avgTime: 40, target: 45 },
  { day: 'Sun', avgTime: 38, target: 45 },
];

const vehiclePerformance = [
  { name: 'V001 - John Lim', deliveries: 412, onTime: 99, efficiency: 97 },
  { name: 'V002 - Sarah Tan', deliveries: 394, onTime: 98, efficiency: 96 },
  { name: 'V006 - Lisa Koh', deliveries: 378, onTime: 97, efficiency: 94 },
  { name: 'V004 - Amy Wong', deliveries: 361, onTime: 96, efficiency: 93 },
  { name: 'V009 - Kevin Tay', deliveries: 344, onTime: 96, efficiency: 92 },
  { name: 'V011 - Raymond Ong', deliveries: 328, onTime: 95, efficiency: 91 },
  { name: 'V008 - Jane Sim', deliveries: 315, onTime: 94, efficiency: 90 },
];

const routeDistribution = [
  { name: 'Pest Control', value: 24, color: '#3b82f6' },
  { name: 'Catering', value: 21, color: '#10b981' },
  { name: 'Laundry', value: 18, color: '#8b5cf6' },
  { name: 'Construction', value: 16, color: '#f59e0b' },
  { name: 'Cleaning', value: 13, color: '#ec4899' },
  { name: 'Healthcare', value: 5, color: '#ef4444' },
  { name: 'Others', value: 3, color: '#6b7280' },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Performance insights and trends
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
                  <h3 className="text-3xl mb-1">1,834 km</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -14% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Delivery Time</p>
                  <h3 className="text-3xl mb-1">39 min</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -13% improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fuel Saved (Month)</p>
                  <h3 className="text-3xl mb-1">$940</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +19% vs last month
                  </p>
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
                  <p className="text-sm text-muted-foreground mb-1">CO₂ Reduced</p>
                  <h3 className="text-3xl mb-1">487 kg</h3>
                  <p className="text-xs text-muted-foreground">≈ 22 trees planted</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fuel Savings Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="w-5 h-5" />
                Fuel Cost & Savings Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fuelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="fuel" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Fuel Cost ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saved" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Savings ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Route Time Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Average Route Time (Weekly)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={routeTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="avgTime" fill="#3b82f6" name="Avg Time (min)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target (min)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tables and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Driver Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclePerformance.map((driver, index) => (
                  <div key={driver.name} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm">{driver.name}</h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-muted-foreground">{driver.deliveries} deliveries</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            {driver.onTime}% on-time
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${driver.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {driver.efficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Route Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Industry Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={routeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {routeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-blue-900">Efficiency Improved</h4>
                  <p className="text-sm text-blue-700">
                    Routes are 22% more efficient compared to last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-green-900">Target Exceeded</h4>
                  <p className="text-sm text-green-700">
                    On-time delivery rate exceeds 95% target consistently
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  <Fuel className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-amber-900">Cost Savings</h4>
                  <p className="text-sm text-amber-700">
                    $940 saved in fuel costs this month through optimization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
