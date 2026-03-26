import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// ============= ORDERS ROUTES =============

// Get all orders
app.get('/make-server-520f7c55/orders', async (c) => {
  try {
    const orders = await kv.getByPrefix('order:');
    return c.json({ success: true, data: orders });
  } catch (error) {
    console.log('Error fetching orders:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new order
app.post('/make-server-520f7c55/orders', async (c) => {
  try {
    const body = await c.req.json();
    const orderId = body.id || `ORD${Date.now()}`;
    const order = {
      ...body,
      id: orderId,
      status: body.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${orderId}`, order);
    return c.json({ success: true, data: order });
  } catch (error) {
    console.log('Error creating order:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update order
app.put('/make-server-520f7c55/orders/:id', async (c) => {
  try {
    const orderId = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`order:${orderId}`);
    if (!existing) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }
    
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await kv.set(`order:${orderId}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log('Error updating order:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete order
app.delete('/make-server-520f7c55/orders/:id', async (c) => {
  try {
    const orderId = c.req.param('id');
    await kv.del(`order:${orderId}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting order:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Bulk upload orders from CSV
app.post('/make-server-520f7c55/orders/bulk', async (c) => {
  try {
    const body = await c.req.json();
    const { orders } = body;
    
    if (!orders || !Array.isArray(orders)) {
      return c.json({ success: false, error: 'Invalid orders array' }, 400);
    }
    
    const created = [];
    const errors = [];
    
    for (const orderData of orders) {
      try {
        const orderId = `ORD${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const order = {
          id: orderId,
          customer: orderData.customer || orderData.customerName,
          pickup: orderData.pickup || orderData.pickupAddress,
          dropoff: orderData.dropoff || orderData.dropoffAddress,
          window: orderData.window || orderData.deliveryWindow,
          weight: orderData.weight,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        
        await kv.set(`order:${orderId}`, order);
        created.push(order);
      } catch (err) {
        errors.push({ data: orderData, error: err.message });
      }
    }
    
    return c.json({ 
      success: true, 
      data: { created: created.length, errors: errors.length },
      created,
      errors
    });
  } catch (error) {
    console.log('Error bulk uploading orders:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= VEHICLES ROUTES =============

// Get all vehicles
app.get('/make-server-520f7c55/vehicles', async (c) => {
  try {
    const vehicles = await kv.getByPrefix('vehicle:');
    return c.json({ success: true, data: vehicles });
  } catch (error) {
    console.log('Error fetching vehicles:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create vehicle
app.post('/make-server-520f7c55/vehicles', async (c) => {
  try {
    const body = await c.req.json();
    const vehicleId = body.id || `V${Date.now()}`;
    const vehicle = {
      ...body,
      id: vehicleId,
      status: body.status || 'idle',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`vehicle:${vehicleId}`, vehicle);
    return c.json({ success: true, data: vehicle });
  } catch (error) {
    console.log('Error creating vehicle:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update vehicle location and status
app.put('/make-server-520f7c55/vehicles/:id', async (c) => {
  try {
    const vehicleId = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`vehicle:${vehicleId}`);
    if (!existing) {
      return c.json({ success: false, error: 'Vehicle not found' }, 404);
    }
    
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await kv.set(`vehicle:${vehicleId}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log('Error updating vehicle:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete vehicle
app.delete('/make-server-520f7c55/vehicles/:id', async (c) => {
  try {
    const vehicleId = c.req.param('id');
    await kv.del(`vehicle:${vehicleId}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting vehicle:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= DRIVERS ROUTES =============

// Get all drivers
app.get('/make-server-520f7c55/drivers', async (c) => {
  try {
    const drivers = await kv.getByPrefix('driver:');
    return c.json({ success: true, data: drivers });
  } catch (error) {
    console.log('Error fetching drivers:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create driver
app.post('/make-server-520f7c55/drivers', async (c) => {
  try {
    const body = await c.req.json();
    const driverId = body.id || `D${Date.now()}`;
    const driver = {
      ...body,
      id: driverId,
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`driver:${driverId}`, driver);
    return c.json({ success: true, data: driver });
  } catch (error) {
    console.log('Error creating driver:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update driver
app.put('/make-server-520f7c55/drivers/:id', async (c) => {
  try {
    const driverId = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`driver:${driverId}`);
    if (!existing) {
      return c.json({ success: false, error: 'Driver not found' }, 404);
    }
    
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await kv.set(`driver:${driverId}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.log('Error updating driver:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete driver
app.delete('/make-server-520f7c55/drivers/:id', async (c) => {
  try {
    const driverId = c.req.param('id');
    await kv.del(`driver:${driverId}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting driver:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= ROUTES OPTIMIZATION =============

// Get all routes
app.get('/make-server-520f7c55/routes', async (c) => {
  try {
    const routes = await kv.getByPrefix('route:');
    return c.json({ success: true, data: routes });
  } catch (error) {
    console.log('Error fetching routes:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create/Save optimized route
app.post('/make-server-520f7c55/routes', async (c) => {
  try {
    const body = await c.req.json();
    const routeId = body.id || `ROUTE${Date.now()}`;
    const route = {
      ...body,
      id: routeId,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`route:${routeId}`, route);
    return c.json({ success: true, data: route });
  } catch (error) {
    console.log('Error creating route:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Optimize routes (simplified algorithm)
app.post('/make-server-520f7c55/routes/optimize', async (c) => {
  try {
    const body = await c.req.json();
    const { orders: orderIds, optimizeFor = 'fuel' } = body;
    
    // Get orders
    const orders = await kv.mget(orderIds.map((id: string) => `order:${id}`));
    
    // Get available vehicles
    const vehicles = await kv.getByPrefix('vehicle:');
    const availableVehicles = vehicles.filter((v: any) => v.status !== 'maintenance');
    
    if (availableVehicles.length === 0) {
      return c.json({ success: false, error: 'No available vehicles' }, 400);
    }
    
    // Simple round-robin assignment for now
    // In production, you'd use actual route optimization algorithms
    const routes = [];
    const ordersPerVehicle = Math.ceil(orders.length / availableVehicles.length);
    
    for (let i = 0; i < availableVehicles.length; i++) {
      const vehicle = availableVehicles[i];
      const vehicleOrders = orders.slice(i * ordersPerVehicle, (i + 1) * ordersPerVehicle);
      
      if (vehicleOrders.length === 0) continue;
      
      const routeId = `ROUTE${Date.now()}_${vehicle.id}`;
      const route = {
        id: routeId,
        vehicleId: vehicle.id,
        driver: vehicle.driver,
        stops: vehicleOrders.map((order: any, idx: number) => ({
          id: idx + 1,
          orderId: order.id,
          address: order.dropoff,
          customer: order.customer,
          eta: '', // Would be calculated with Google Maps API
          status: 'pending',
        })),
        distance: '0 km', // Would be calculated
        duration: '0h 0m', // Would be calculated
        fuelCost: '$0', // Would be calculated
        locked: false,
        optimizedFor: optimizeFor,
        createdAt: new Date().toISOString(),
      };
      
      await kv.set(`route:${routeId}`, route);
      routes.push(route);
      
      // Update orders status
      for (const order of vehicleOrders) {
        await kv.set(`order:${order.id}`, { ...order, status: 'assigned', routeId });
      }
    }
    
    return c.json({ success: true, data: routes });
  } catch (error) {
    console.log('Error optimizing routes:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= ANALYTICS ROUTES =============

// Get analytics data
app.get('/make-server-520f7c55/analytics', async (c) => {
  try {
    const analytics = await kv.get('analytics:current') || {
      totalDistance: 0,
      avgDeliveryTime: 0,
      fuelSaved: 0,
      co2Reduced: 0,
      updatedAt: new Date().toISOString(),
    };
    
    return c.json({ success: true, data: analytics });
  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update analytics
app.post('/make-server-520f7c55/analytics', async (c) => {
  try {
    const body = await c.req.json();
    const analytics = {
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set('analytics:current', analytics);
    return c.json({ success: true, data: analytics });
  } catch (error) {
    console.log('Error updating analytics:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= GOOGLE MAPS INTEGRATION =============

// Calculate route with Google Maps
app.post('/make-server-520f7c55/maps/route', async (c) => {
  try {
    const body = await c.req.json();
    const { origin, destination, waypoints = [] } = body;
    
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!googleMapsApiKey) {
      return c.json({ 
        success: false, 
        error: 'Google Maps API key not configured',
        message: 'Please add GOOGLE_MAPS_API_KEY to environment variables'
      }, 500);
    }
    
    // Build waypoints string
    const waypointsStr = waypoints.length > 0 
      ? `&waypoints=optimize:true|${waypoints.join('|')}`
      : '';
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypointsStr}&key=${googleMapsApiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      return c.json({ 
        success: false, 
        error: 'Google Maps API error',
        details: data.status
      }, 400);
    }
    
    // Extract route information
    const route = data.routes[0];
    const leg = route.legs[0];
    
    return c.json({ 
      success: true, 
      data: {
        distance: leg.distance.text,
        duration: leg.duration.text,
        distanceValue: leg.distance.value,
        durationValue: leg.duration.value,
        steps: leg.steps,
        polyline: route.overview_polyline.points,
      }
    });
  } catch (error) {
    console.log('Error calculating route:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Geocode address
app.post('/make-server-520f7c55/maps/geocode', async (c) => {
  try {
    const body = await c.req.json();
    const { address } = body;
    
    const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!googleMapsApiKey) {
      return c.json({ 
        success: false, 
        error: 'Google Maps API key not configured' 
      }, 500);
    }
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      return c.json({ 
        success: false, 
        error: 'Geocoding failed',
        details: data.status
      }, 400);
    }
    
    const result = data.results[0];
    return c.json({ 
      success: true, 
      data: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formattedAddress: result.formatted_address,
      }
    });
  } catch (error) {
    console.log('Error geocoding address:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Health check
app.get('/make-server-520f7c55/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
