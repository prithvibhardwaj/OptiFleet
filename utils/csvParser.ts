export interface CSVOrder {
  customer?: string;
  customerName?: string;
  pickup?: string;
  pickupAddress?: string;
  dropoff?: string;
  dropoffAddress?: string;
  window?: string;
  deliveryWindow?: string;
  weight?: string;
}

export function parseCSV(csvText: string): CSVOrder[] {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV file must contain a header row and at least one data row');
  }
  
  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Parse data rows
  const orders: CSVOrder[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = parseCSVLine(line);
    
    if (values.length !== headers.length) {
      console.warn(`Row ${i + 1} has ${values.length} columns but header has ${headers.length} columns. Skipping.`);
      continue;
    }
    
    const order: any = {};
    headers.forEach((header, index) => {
      order[header] = values[index];
    });
    
    orders.push(order);
  }
  
  return orders;
}

// Helper function to parse CSV line (handles quoted values with commas)
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

export function validateOrder(order: CSVOrder): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const customer = order.customer || order.customerName;
  const pickup = order.pickup || order.pickupAddress;
  const dropoff = order.dropoff || order.dropoffAddress;
  
  if (!customer) {
    errors.push('Customer name is required');
  }
  
  if (!pickup) {
    errors.push('Pickup address is required');
  }
  
  if (!dropoff) {
    errors.push('Dropoff address is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function detectDuplicates(orders: CSVOrder[]): number[] {
  const seen = new Set<string>();
  const duplicateIndices: number[] = [];
  
  orders.forEach((order, index) => {
    const customer = order.customer || order.customerName;
    const dropoff = order.dropoff || order.dropoffAddress;
    const key = `${customer}:${dropoff}`.toLowerCase();
    
    if (seen.has(key)) {
      duplicateIndices.push(index);
    } else {
      seen.add(key);
    }
  });
  
  return duplicateIndices;
}

export function generateCSVTemplate(): string {
  return `customer,pickup,dropoff,window,weight
Ace Pest Control HQ,123 Clementi Ave 3,456 Ang Mo Kio St 21,09:00 - 11:00,12kg
Clean Pro Services,789 Jurong West St 52,321 Bedok North Ave 1,10:00 - 12:00,8kg
Fresh Laundry Co,234 Tampines St 21,567 Yishun Ring Rd,13:00 - 15:00,15kg`;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
