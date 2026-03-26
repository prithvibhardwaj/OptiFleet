import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  Building2,
  Truck,
  Users,
  Plug,
  Shield,
  Trash2,
  Plus,
  CheckCircle2,
  Link,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const vehicles = [
  { id: 'V001', plate: 'SBD 1234 A', type: 'Van', driver: 'John Lim', status: 'active' },
  { id: 'V002', plate: 'SBD 5678 B', type: 'Van', driver: 'Sarah Tan', status: 'active' },
  { id: 'V003', plate: 'SBD 9012 C', type: 'Truck', driver: 'Unassigned', status: 'inactive' },
  { id: 'V004', plate: 'SBD 3456 D', type: 'Van', driver: 'Amy Wong', status: 'active' },
];

const drivers = [
  { id: 'D001', name: 'John Lim', email: 'john@optifleet.sg', phone: '+65 9123 4567', vehicle: 'V001', status: 'active' },
  { id: 'D002', name: 'Sarah Tan', email: 'sarah@optifleet.sg', phone: '+65 9234 5678', vehicle: 'V002', status: 'active' },
  { id: 'D003', name: 'Amy Wong', email: 'amy@optifleet.sg', phone: '+65 9345 6789', vehicle: 'V004', status: 'active' },
  { id: 'D004', name: 'Mike Chen', email: 'mike@optifleet.sg', phone: '+65 9456 7890', vehicle: null, status: 'inactive' },
];

const integrations = [
  { name: 'Xero Accounting', description: 'Sync invoices and expenses', status: 'connected', icon: '💰' },
  { name: 'QuickBooks', description: 'Financial management integration', status: 'available', icon: '📊' },
  { name: 'POS System', description: 'Auto-import orders from POS', status: 'available', icon: '🛒' },
  { name: 'Google Maps API', description: 'Advanced routing capabilities', status: 'connected', icon: '🗺️' },
  { name: 'Slack Notifications', description: 'Team communication alerts', status: 'available', icon: '💬' },
  { name: 'Government Grant Portal', description: 'EnterpriseSG integration', status: 'available', icon: '🏛️' },
];

export default function SettingsPage() {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl">Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Manage company, vehicles, drivers, and integrations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="w-4 h-4" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="gap-2">
              <Truck className="w-4 h-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="drivers" className="gap-2">
              <Users className="w-4 h-4" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Plug className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Company Info */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="OptiFleet Solutions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-reg">Registration Number</Label>
                    <Input id="company-reg" defaultValue="202312345A" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Input id="company-address" defaultValue="123 Innovation Drive, #05-12, Singapore 138632" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input id="company-email" type="email" defaultValue="contact@optifleet.sg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Phone</Label>
                    <Input id="company-phone" defaultValue="+65 6789 0123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Logistics & Fleet Management" />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles */}
          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fleet Management</CardTitle>
                  <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                        <DialogDescription>
                          Register a new vehicle to your fleet
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Vehicle ID</Label>
                          <Input placeholder="e.g. V009" />
                        </div>
                        <div className="space-y-2">
                          <Label>License Plate</Label>
                          <Input placeholder="e.g. SBD 1234 A" />
                        </div>
                        <div className="space-y-2">
                          <Label>Vehicle Type</Label>
                          <Input placeholder="e.g. Van, Truck" />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setShowAddVehicle(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddVehicle(false)}>
                            Add Vehicle
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Assigned Driver</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.id}</TableCell>
                          <TableCell>{vehicle.plate}</TableCell>
                          <TableCell>{vehicle.type}</TableCell>
                          <TableCell>{vehicle.driver}</TableCell>
                          <TableCell>
                            {vehicle.status === 'active' ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drivers */}
          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Driver Management</CardTitle>
                  <Dialog open={showAddDriver} onOpenChange={setShowAddDriver}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Driver
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Driver</DialogTitle>
                        <DialogDescription>
                          Add a new driver to your team
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input placeholder="Enter driver's name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="driver@company.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input placeholder="+65 9XXX XXXX" />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setShowAddDriver(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddDriver(false)}>
                            Add Driver
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Assigned Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drivers.map((driver) => (
                        <TableRow key={driver.id}>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.email}</TableCell>
                          <TableCell>{driver.phone}</TableCell>
                          <TableCell>{driver.vehicle || '-'}</TableCell>
                          <TableCell>
                            {driver.status === 'active' ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <div key={integration.name} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-border">
                      <div className="text-3xl">{integration.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4>{integration.name}</h4>
                          {integration.status === 'connected' ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline">Available</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                        {integration.status === 'connected' ? (
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Link className="w-3 h-3 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Privacy & Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Driver Location Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable real-time GPS tracking for all vehicles
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Data Export Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        Encrypt all exported reports and data files
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Customer Data Anonymization</h4>
                      <p className="text-sm text-muted-foreground">
                        Anonymize customer information in analytics reports
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>PDPA Compliance:</strong> OptiFleet is fully compliant with Singapore's Personal Data Protection Act (PDPA). 
                      All customer and driver data is encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
