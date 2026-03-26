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
import { toast } from 'sonner';

const initialVehicles = [
  { id: 'V001', plate: 'SBD 1234 A', type: 'Van', driver: 'John Lim', status: 'active' },
  { id: 'V002', plate: 'SBD 5678 B', type: 'Van', driver: 'Sarah Tan', status: 'active' },
  { id: 'V003', plate: 'SBD 9012 C', type: 'Truck', driver: 'Mike Chen', status: 'active' },
  { id: 'V004', plate: 'SBD 3456 D', type: 'Van', driver: 'Amy Wong', status: 'active' },
  { id: 'V005', plate: 'SBD 7890 E', type: 'Van', driver: 'David Ng', status: 'active' },
  { id: 'V006', plate: 'SBD 2345 F', type: 'Van', driver: 'Lisa Koh', status: 'active' },
  { id: 'V007', plate: 'SBD 6789 G', type: 'Truck', driver: 'Tom Lee', status: 'active' },
  { id: 'V008', plate: 'SBD 0123 H', type: 'Van', driver: 'Jane Sim', status: 'active' },
  { id: 'V009', plate: 'SBD 4567 J', type: 'Van', driver: 'Kevin Tay', status: 'active' },
  { id: 'V010', plate: 'SBD 8901 K', type: 'Truck', driver: 'Priya Nair', status: 'active' },
  { id: 'V011', plate: 'SBD 2468 L', type: 'Van', driver: 'Raymond Ong', status: 'active' },
  { id: 'V012', plate: 'SBD 1357 M', type: 'Van', driver: 'Mei Lin', status: 'inactive' },
];

const initialDrivers = [
  { id: 'D001', name: 'John Lim', email: 'john@optifleet.sg', phone: '+65 9123 4567', vehicle: 'V001', status: 'active' },
  { id: 'D002', name: 'Sarah Tan', email: 'sarah@optifleet.sg', phone: '+65 9234 5678', vehicle: 'V002', status: 'active' },
  { id: 'D003', name: 'Mike Chen', email: 'mike@optifleet.sg', phone: '+65 9345 6789', vehicle: 'V003', status: 'active' },
  { id: 'D004', name: 'Amy Wong', email: 'amy@optifleet.sg', phone: '+65 9456 7890', vehicle: 'V004', status: 'active' },
  { id: 'D005', name: 'David Ng', email: 'david@optifleet.sg', phone: '+65 9567 8901', vehicle: 'V005', status: 'active' },
  { id: 'D006', name: 'Lisa Koh', email: 'lisa@optifleet.sg', phone: '+65 9678 9012', vehicle: 'V006', status: 'active' },
  { id: 'D007', name: 'Tom Lee', email: 'tom@optifleet.sg', phone: '+65 9789 0123', vehicle: 'V007', status: 'active' },
  { id: 'D008', name: 'Jane Sim', email: 'jane@optifleet.sg', phone: '+65 9890 1234', vehicle: 'V008', status: 'active' },
  { id: 'D009', name: 'Kevin Tay', email: 'kevin@optifleet.sg', phone: '+65 9901 2345', vehicle: 'V009', status: 'active' },
  { id: 'D010', name: 'Priya Nair', email: 'priya@optifleet.sg', phone: '+65 9012 3456', vehicle: 'V010', status: 'active' },
  { id: 'D011', name: 'Raymond Ong', email: 'raymond@optifleet.sg', phone: '+65 9113 2244', vehicle: 'V011', status: 'active' },
  { id: 'D012', name: 'Mei Lin', email: 'meilin@optifleet.sg', phone: '+65 9224 3355', vehicle: null, status: 'inactive' },
];

const initialIntegrations = [
  { name: 'Xero Accounting', description: 'Sync invoices and expenses automatically', status: 'connected', icon: '💰' },
  { name: 'Google Maps API', description: 'Advanced routing and geocoding', status: 'connected', icon: '🗺️' },
  { name: 'Slack Notifications', description: 'Real-time team alerts and updates', status: 'connected', icon: '💬' },
  { name: 'QuickBooks', description: 'Financial management integration', status: 'available', icon: '📊' },
  { name: 'POS System', description: 'Auto-import orders from POS terminals', status: 'available', icon: '🛒' },
  { name: 'EnterpriseSG Portal', description: 'Grant applications and compliance', status: 'available', icon: '🏛️' },
  { name: 'Stripe Payments', description: 'Accept payments from customers', status: 'available', icon: '💳' },
  { name: 'WhatsApp Business', description: 'Customer delivery notifications via WhatsApp', status: 'available', icon: '📱' },
];

export default function SettingsPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);

  const [newVehicle, setNewVehicle] = useState({ id: '', plate: '', type: 'Van' });
  const [newDriver, setNewDriver] = useState({ name: '', email: '', phone: '' });

  const [company, setCompany] = useState({
    name: 'OptiFleet Solutions',
    reg: '202312345A',
    address: '123 Innovation Drive, #05-12, Singapore 138632',
    email: 'contact@optifleet.sg',
    phone: '+65 6789 0123',
    industry: 'Logistics & Fleet Management',
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    locationTracking: true,
    exportEncryption: true,
    dataAnonymization: false,
  });

  const handleSaveCompany = () => {
    toast.success('Company information saved successfully');
  };

  const handleAddVehicle = () => {
    if (!newVehicle.id.trim() || !newVehicle.plate.trim()) {
      toast.error('Vehicle ID and license plate are required');
      return;
    }
    if (vehicles.find(v => v.id === newVehicle.id)) {
      toast.error(`Vehicle ID ${newVehicle.id} already exists`);
      return;
    }
    setVehicles([...vehicles, { ...newVehicle, driver: 'Unassigned', status: 'active' }]);
    setNewVehicle({ id: '', plate: '', type: 'Van' });
    setShowAddVehicle(false);
    toast.success(`Vehicle ${newVehicle.id} added to fleet`);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success(`Vehicle ${id} removed from fleet`);
  };

  const handleAddDriver = () => {
    if (!newDriver.name.trim() || !newDriver.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    const id = `D${String(drivers.length + 1).padStart(3, '0')}`;
    setDrivers([...drivers, { id, ...newDriver, vehicle: null, status: 'active' }]);
    setNewDriver({ name: '', email: '', phone: '' });
    setShowAddDriver(false);
    toast.success(`${newDriver.name} added as driver`);
  };

  const handleDeleteDriver = (id: string, name: string) => {
    setDrivers(drivers.filter(d => d.id !== id));
    toast.success(`${name} removed`);
  };

  const handleToggleIntegration = (name: string, currentStatus: string) => {
    if (currentStatus === 'connected') {
      toast.info(`${name} disconnected`);
      setIntegrations(integrations.map(i => i.name === name ? { ...i, status: 'available' } : i));
    } else {
      toast.success(`${name} connected successfully`);
      setIntegrations(integrations.map(i => i.name === name ? { ...i, status: 'connected' } : i));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                    <Label>Company Name</Label>
                    <Input value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input value={company.reg} onChange={e => setCompany({ ...company, reg: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={company.address} onChange={e => setCompany({ ...company, address: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={company.email} onChange={e => setCompany({ ...company, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={company.phone} onChange={e => setCompany({ ...company, phone: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input value={company.industry} onChange={e => setCompany({ ...company, industry: e.target.value })} />
                </div>
                <div className="pt-4 border-t border-border">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveCompany}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles */}
          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fleet Management ({vehicles.length} vehicles)</CardTitle>
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
                        <DialogDescription>Register a new vehicle to your fleet</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Vehicle ID</Label>
                          <Input
                            placeholder="e.g. V013"
                            value={newVehicle.id}
                            onChange={e => setNewVehicle({ ...newVehicle, id: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>License Plate</Label>
                          <Input
                            placeholder="e.g. SBD 9999 Z"
                            value={newVehicle.plate}
                            onChange={e => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Vehicle Type</Label>
                          <Input
                            placeholder="Van or Truck"
                            value={newVehicle.type}
                            onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setShowAddVehicle(false)}>Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddVehicle}>Add Vehicle</Button>
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
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
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
                  <CardTitle>Driver Management ({drivers.length} drivers)</CardTitle>
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
                        <DialogDescription>Add a new driver to your team</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input
                            placeholder="Enter driver's name"
                            value={newDriver.name}
                            onChange={e => setNewDriver({ ...newDriver, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="driver@company.com"
                            value={newDriver.email}
                            onChange={e => setNewDriver({ ...newDriver, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            placeholder="+65 9XXX XXXX"
                            value={newDriver.phone}
                            onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                          <Button variant="outline" onClick={() => setShowAddDriver(false)}>Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddDriver}>Add Driver</Button>
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
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteDriver(driver.id, driver.name)}>
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
                          <Button variant="outline" size="sm" onClick={() => handleToggleIntegration(integration.name, integration.status)}>
                            Disconnect
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleToggleIntegration(integration.name, integration.status)}>
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
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={val => {
                        setSecurity({ ...security, twoFactor: val });
                        toast.success(val ? '2FA enabled' : '2FA disabled');
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Driver Location Tracking</h4>
                      <p className="text-sm text-muted-foreground">Enable real-time GPS tracking for all vehicles</p>
                    </div>
                    <Switch
                      checked={security.locationTracking}
                      onCheckedChange={val => {
                        setSecurity({ ...security, locationTracking: val });
                        toast.success(val ? 'Location tracking enabled' : 'Location tracking disabled');
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Data Export Encryption</h4>
                      <p className="text-sm text-muted-foreground">Encrypt all exported reports and data files</p>
                    </div>
                    <Switch
                      checked={security.exportEncryption}
                      onCheckedChange={val => {
                        setSecurity({ ...security, exportEncryption: val });
                        toast.success(val ? 'Export encryption enabled' : 'Export encryption disabled');
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="mb-1">Customer Data Anonymization</h4>
                      <p className="text-sm text-muted-foreground">Anonymize customer information in analytics reports</p>
                    </div>
                    <Switch
                      checked={security.dataAnonymization}
                      onCheckedChange={val => {
                        setSecurity({ ...security, dataAnonymization: val });
                        toast.success(val ? 'Data anonymization enabled' : 'Data anonymization disabled');
                      }}
                    />
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
