import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-520f7c55`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

// ============= ORDERS API =============

export const ordersApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/orders`, { headers });
    return response.json();
  },

  create: async (order: any) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(order),
    });
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },

  bulkUpload: async (orders: any[]) => {
    const response = await fetch(`${BASE_URL}/orders/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ orders }),
    });
    return response.json();
  },
};

// ============= VEHICLES API =============

export const vehiclesApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/vehicles`, { headers });
    return response.json();
  },

  create: async (vehicle: any) => {
    const response = await fetch(`${BASE_URL}/vehicles`, {
      method: 'POST',
      headers,
      body: JSON.stringify(vehicle),
    });
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },
};

// ============= DRIVERS API =============

export const driversApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/drivers`, { headers });
    return response.json();
  },

  create: async (driver: any) => {
    const response = await fetch(`${BASE_URL}/drivers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(driver),
    });
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${BASE_URL}/drivers/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/drivers/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },
};

// ============= ROUTES API =============

export const routesApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/routes`, { headers });
    return response.json();
  },

  create: async (route: any) => {
    const response = await fetch(`${BASE_URL}/routes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(route),
    });
    return response.json();
  },

  optimize: async (orderIds: string[], optimizeFor: 'fuel' | 'time' = 'fuel') => {
    const response = await fetch(`${BASE_URL}/routes/optimize`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ orders: orderIds, optimizeFor }),
    });
    return response.json();
  },
};

// ============= ANALYTICS API =============

export const analyticsApi = {
  get: async () => {
    const response = await fetch(`${BASE_URL}/analytics`, { headers });
    return response.json();
  },

  update: async (data: any) => {
    const response = await fetch(`${BASE_URL}/analytics`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// ============= GOOGLE MAPS API =============

export const mapsApi = {
  calculateRoute: async (origin: string, destination: string, waypoints: string[] = []) => {
    const response = await fetch(`${BASE_URL}/maps/route`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ origin, destination, waypoints }),
    });
    return response.json();
  },

  geocode: async (address: string) => {
    const response = await fetch(`${BASE_URL}/maps/geocode`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ address }),
    });
    return response.json();
  },
};
