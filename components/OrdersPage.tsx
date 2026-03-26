import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Upload,
  Plus,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Loader2,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { ordersApi } from '../utils/api';
import { parseCSV, validateOrder, detectDuplicates, generateCSVTemplate, downloadCSV } from '../utils/csvParser';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    pickup: '',
    dropoff: '',
    window: '',
    weight: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getAll();
      if (response.success) {
        setOrders(response.data || []);
      } else {
        console.error('Failed to load orders:', response.error);
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async () => {
    try {
      const response = await ordersApi.create(newOrder);
      if (response.success) {
        toast.success('Order created successfully');
        setShowAddDialog(false);
        setNewOrder({ customer: '', pickup: '', dropoff: '', window: '', weight: '' });
        loadOrders();
      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creating order');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await ordersApi.delete(orderId);
      if (response.success) {
        toast.success('Order deleted');
        loadOrders();
      } else {
        toast.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    try {
      setUploading(true);
      const text = await file.text();
      const parsedOrders = parseCSV(text);

      // Validate orders
      const validOrders = [];
      const invalidOrders = [];

      for (const order of parsedOrders) {
        const validation = validateOrder(order);
        if (validation.valid) {
          validOrders.push(order);
        } else {
          invalidOrders.push({ order, errors: validation.errors });
        }
      }

      // Check for duplicates
      const duplicateIndices = detectDuplicates(validOrders);
      if (duplicateIndices.length > 0) {
        toast.warning(`Found ${duplicateIndices.length} duplicate orders`);
      }

      if (invalidOrders.length > 0) {
        toast.error(`${invalidOrders.length} orders have validation errors`);
      }

      if (validOrders.length === 0) {
        toast.error('No valid orders found in CSV');
        return;
      }

      // Upload to backend
      const response = await ordersApi.bulkUpload(validOrders);
      if (response.success) {
        toast.success(`Successfully uploaded ${response.data.created} orders`);
        if (response.data.errors > 0) {
          toast.warning(`${response.data.errors} orders failed to upload`);
        }
        loadOrders();
      } else {
        toast.error('Failed to upload orders');
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast.error('Error processing CSV file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate();
    downloadCSV('optifleet_orders_template.csv', template);
    toast.success('Template downloaded');
  };

  const handleExportCSV = () => {
    const header = 'id,customer,pickup,dropoff,window,weight,status\n';
    const rows = orders.map(o => 
      `${o.id},"${o.customer}","${o.pickup}","${o.dropoff}",${o.window},${o.weight},${o.status}`
    ).join('\n');
    downloadCSV(`optifleet_orders_${new Date().toISOString().split('T')[0]}.csv`, header + rows);
    toast.success('Orders exported');
  };

  const handleAutoAssign = async () => {
    const pendingOrders = orders.filter(o => o.status === 'pending');
    if (pendingOrders.length === 0) {
      toast.info('No pending orders to assign');
      return;
    }

    toast.info(`Auto-assigning ${pendingOrders.length} orders...`);
    // This will be handled by the routes optimization
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Assigned</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const assignedCount = orders.filter(o => o.status === 'assigned').length;
  const errorCount = orders.filter(o => o.status === 'error').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl">Orders & Tasks</h1>
                <p className="text-sm text-muted-foreground">
                  Manage deliveries and task assignments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Manual
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Order</DialogTitle>
                    <DialogDescription>
                      Manually add a new delivery order to the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Customer Name</Label>
                        <Input 
                          placeholder="Enter customer name" 
                          value={newOrder.customer}
                          onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Order ID</Label>
                        <Input placeholder="Auto-generated" disabled />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Pickup Address</Label>
                      <Textarea 
                        placeholder="Enter pickup address" 
                        rows={2}
                        value={newOrder.pickup}
                        onChange={(e) => setNewOrder({...newOrder, pickup: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dropoff Address</Label>
                      <Textarea 
                        placeholder="Enter dropoff address" 
                        rows={2}
                        value={newOrder.dropoff}
                        onChange={(e) => setNewOrder({...newOrder, dropoff: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Delivery Window</Label>
                        <Input 
                          type="text" 
                          placeholder="e.g. 09:00 - 11:00"
                          value={newOrder.window}
                          onChange={(e) => setNewOrder({...newOrder, window: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Weight/Volume</Label>
                        <Input 
                          placeholder="e.g. 12kg"
                          value={newOrder.weight}
                          onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddOrder}>
                        Add Order
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <h3 className="text-3xl">{orders.length}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <h3 className="text-3xl text-amber-600">{pendingCount}</h3>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assigned</p>
                  <h3 className="text-3xl text-blue-600">{assignedCount}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Errors</p>
                  <h3 className="text-3xl text-red-600">{errorCount}</h3>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Upload Orders</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Drag and drop your CSV file here, or click to browse. Supports CSV with columns: Customer, Pickup, Dropoff, Window, Weight
              </p>
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order List</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Dropoff</TableHead>
                    <TableHead>Window</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.pickup}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.dropoff}</TableCell>
                      <TableCell>{order.window}</TableCell>
                      <TableCell>{order.weight}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Loading orders...</p>
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No orders found. Upload a CSV or add manually.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {orders.length} orders
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleAutoAssign}
              >
                Auto-Assign Vehicles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
