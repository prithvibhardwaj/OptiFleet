import { ordersApi, vehiclesApi, driversApi } from './api';

export async function seedInitialData() {
  try {
    console.log('Seeding initial data...');

    // Seed vehicles
    const vehicles = [
      { id: 'V001', name: 'Vehicle 1', plate: 'SBD 1234 A', type: 'Van', driver: 'John Lim', status: 'en-route', lat: 1.3521, lng: 103.8198 },
      { id: 'V002', name: 'Vehicle 2', plate: 'SBD 5678 B', type: 'Van', driver: 'Sarah Tan', status: 'en-route', lat: 1.3321, lng: 103.8598 },
      { id: 'V003', name: 'Vehicle 3', plate: 'SBD 9012 C', type: 'Truck', driver: 'Mike Chen', status: 'idle', lat: 1.3721, lng: 103.8898 },
      { id: 'V004', name: 'Vehicle 4', plate: 'SBD 3456 D', type: 'Van', driver: 'Amy Wong', status: 'en-route', lat: 1.3121, lng: 103.8398 },
      { id: 'V005', name: 'Vehicle 5', plate: 'SBD 7890 E', type: 'Van', driver: 'David Ng', status: 'done', lat: 1.3421, lng: 103.8698 },
      { id: 'V006', name: 'Vehicle 6', plate: 'SBD 2345 F', type: 'Van', driver: 'Lisa Koh', status: 'en-route', lat: 1.3621, lng: 103.8298 },
      { id: 'V007', name: 'Vehicle 7', plate: 'SBD 6789 G', type: 'Truck', driver: 'Tom Lee', status: 'done', lat: 1.3221, lng: 103.8498 },
      { id: 'V008', name: 'Vehicle 8', plate: 'SBD 0123 H', type: 'Van', driver: 'Jane Sim', status: 'en-route', lat: 1.3821, lng: 103.8798 },
    ];

    for (const vehicle of vehicles) {
      await vehiclesApi.create(vehicle);
    }

    // Seed drivers
    const drivers = [
      { id: 'D001', name: 'John Lim', email: 'john@optifleet.sg', phone: '+65 9123 4567', vehicle: 'V001', status: 'active' },
      { id: 'D002', name: 'Sarah Tan', email: 'sarah@optifleet.sg', phone: '+65 9234 5678', vehicle: 'V002', status: 'active' },
      { id: 'D003', name: 'Mike Chen', email: 'mike@optifleet.sg', phone: '+65 9345 6789', vehicle: 'V003', status: 'active' },
      { id: 'D004', name: 'Amy Wong', email: 'amy@optifleet.sg', phone: '+65 9456 7890', vehicle: 'V004', status: 'active' },
      { id: 'D005', name: 'David Ng', email: 'david@optifleet.sg', phone: '+65 9567 8901', vehicle: 'V005', status: 'active' },
      { id: 'D006', name: 'Lisa Koh', email: 'lisa@optifleet.sg', phone: '+65 9678 9012', vehicle: 'V006', status: 'active' },
      { id: 'D007', name: 'Tom Lee', email: 'tom@optifleet.sg', phone: '+65 9789 0123', vehicle: 'V007', status: 'active' },
      { id: 'D008', name: 'Jane Sim', email: 'jane@optifleet.sg', phone: '+65 9890 1234', vehicle: 'V008', status: 'active' },
    ];

    for (const driver of drivers) {
      await driversApi.create(driver);
    }

    // Seed sample orders
    const orders = [
      { customer: 'Ace Pest Control HQ', pickup: '123 Clementi Ave 3', dropoff: '456 Ang Mo Kio St 21', window: '09:00 - 11:00', weight: '12kg', status: 'pending' },
      { customer: 'Clean Pro Services', pickup: '789 Jurong West St 52', dropoff: '321 Bedok North Ave 1', window: '10:00 - 12:00', weight: '8kg', status: 'assigned' },
      { customer: 'Fresh Laundry Co', pickup: '234 Tampines St 21', dropoff: '567 Yishun Ring Rd', window: '13:00 - 15:00', weight: '15kg', status: 'pending' },
      { customer: 'BuildMaster Supplies', pickup: '890 Woodlands Ave 6', dropoff: '432 Pasir Ris Dr 3', window: '08:00 - 10:00', weight: '45kg', status: 'pending' },
      { customer: 'Premium Catering', pickup: '567 Serangoon North Ave 1', dropoff: '234 Marine Parade Rd', window: '11:00 - 13:00', weight: '22kg', status: 'assigned' },
      { customer: 'CoolAir Servicing', pickup: '345 Hougang Ave 8', dropoff: '678 Bukit Batok West Ave 6', window: '14:00 - 16:00', weight: '18kg', status: 'pending' },
    ];

    for (const order of orders) {
      await ordersApi.create(order);
    }

    console.log('Initial data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
}
