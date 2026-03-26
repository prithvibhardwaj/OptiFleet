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
      { id: 'V009', name: 'Vehicle 9', plate: 'SBD 4567 J', type: 'Van', driver: 'Kevin Tay', status: 'en-route', lat: 1.3281, lng: 103.8451 },
      { id: 'V010', name: 'Vehicle 10', plate: 'SBD 8901 K', type: 'Truck', driver: 'Priya Nair', status: 'idle', lat: 1.3651, lng: 103.8751 },
      { id: 'V011', name: 'Vehicle 11', plate: 'SBD 2468 L', type: 'Van', driver: 'Raymond Ong', status: 'en-route', lat: 1.3411, lng: 103.8211 },
      { id: 'V012', name: 'Vehicle 12', plate: 'SBD 1357 M', type: 'Van', driver: 'Mei Lin', status: 'done', lat: 1.3561, lng: 103.8631 },
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
      { id: 'D009', name: 'Kevin Tay', email: 'kevin@optifleet.sg', phone: '+65 9901 2345', vehicle: 'V009', status: 'active' },
      { id: 'D010', name: 'Priya Nair', email: 'priya@optifleet.sg', phone: '+65 9012 3456', vehicle: 'V010', status: 'active' },
      { id: 'D011', name: 'Raymond Ong', email: 'raymond@optifleet.sg', phone: '+65 9113 2244', vehicle: 'V011', status: 'active' },
      { id: 'D012', name: 'Mei Lin', email: 'meilin@optifleet.sg', phone: '+65 9224 3355', vehicle: 'V012', status: 'active' },
    ];

    for (const driver of drivers) {
      await driversApi.create(driver);
    }

    // Seed sample orders
    const orders = [
      { customer: 'Ace Pest Control HQ', pickup: '123 Clementi Ave 3', dropoff: '456 Ang Mo Kio St 21', window: '09:00 - 11:00', weight: '12kg', status: 'assigned' },
      { customer: 'Clean Pro Services', pickup: '789 Jurong West St 52', dropoff: '321 Bedok North Ave 1', window: '10:00 - 12:00', weight: '8kg', status: 'assigned' },
      { customer: 'Fresh Laundry Co', pickup: '234 Tampines St 21', dropoff: '567 Yishun Ring Rd', window: '13:00 - 15:00', weight: '15kg', status: 'pending' },
      { customer: 'BuildMaster Supplies', pickup: '890 Woodlands Ave 6', dropoff: '432 Pasir Ris Dr 3', window: '08:00 - 10:00', weight: '45kg', status: 'assigned' },
      { customer: 'Premium Catering Pte Ltd', pickup: '567 Serangoon North Ave 1', dropoff: '234 Marine Parade Rd', window: '11:00 - 13:00', weight: '22kg', status: 'assigned' },
      { customer: 'CoolAir Servicing', pickup: '345 Hougang Ave 8', dropoff: '678 Bukit Batok West Ave 6', window: '14:00 - 16:00', weight: '18kg', status: 'pending' },
      { customer: 'SwiftClean Solutions', pickup: '102 Bishan St 12', dropoff: '88 Commonwealth Crescent', window: '09:30 - 11:30', weight: '9kg', status: 'pending' },
      { customer: 'ProGarden Landscaping', pickup: '5 Toh Guan Rd East', dropoff: '20 Lorong 8 Toa Payoh', window: '08:00 - 09:30', weight: '38kg', status: 'assigned' },
      { customer: 'Lakeside Catering', pickup: '30 Jurong Port Rd', dropoff: '14 Ghim Moh Rd', window: '06:00 - 08:00', weight: '60kg', status: 'assigned' },
      { customer: 'TechFix IT Services', pickup: '1 Fusionopolis Way', dropoff: '10 Anson Rd', window: '10:00 - 12:00', weight: '5kg', status: 'pending' },
      { customer: 'MediSupply SG', pickup: '110 Toa Payoh Lorong 1', dropoff: '3 Hospital Dr', window: '07:00 - 08:00', weight: '25kg', status: 'assigned' },
      { customer: 'Eco Waste Management', pickup: '31 Tuas Ave 1', dropoff: '50 Changi South Ave 1', window: '07:30 - 09:30', weight: '120kg', status: 'assigned' },
      { customer: 'NovaBake Confectionery', pickup: '9 Joo Koon Circle', dropoff: '15 Bukit Timah Rd', window: '05:00 - 07:00', weight: '30kg', status: 'assigned' },
      { customer: 'HomeDecor Express', pickup: '22 Sin Ming Lane', dropoff: '33 Tanjong Pagar Plaza', window: '12:00 - 14:00', weight: '55kg', status: 'pending' },
      { customer: 'FreshMart Grocers', pickup: '40 Pandan Loop', dropoff: '82 Tiong Bahru Rd', window: '04:00 - 06:00', weight: '75kg', status: 'assigned' },
      { customer: 'SkyHigh Events', pickup: '6 Raffles Blvd', dropoff: '1 Harbourfront Walk', window: '15:00 - 17:00', weight: '40kg', status: 'pending' },
      { customer: 'Bedok Aircon Services', pickup: '418 Bedok North Ave 2', dropoff: '201 Tampines St 21', window: '11:00 - 13:00', weight: '20kg', status: 'pending' },
      { customer: 'Punggol Hardware', pickup: '5 Punggol Field', dropoff: '70 Jurong West Ave 1', window: '08:30 - 10:00', weight: '85kg', status: 'assigned' },
      { customer: 'StarChef Catering', pickup: '11 Woodlands Close', dropoff: '22 Upper Serangoon Rd', window: '05:30 - 07:30', weight: '48kg', status: 'assigned' },
      { customer: 'IslandMove Logistics', pickup: '36 Kranji Loop', dropoff: '9 Changi North Way', window: '09:00 - 11:00', weight: '200kg', status: 'pending' },
      { customer: 'SunShine Florist', pickup: '4 Queensway', dropoff: '121 Orchard Rd', window: '06:00 - 08:00', weight: '6kg', status: 'pending' },
      { customer: 'NightOwl Pharmacy', pickup: '30 Biopolis St', dropoff: '298 Tiong Bahru Rd', window: '22:00 - 23:00', weight: '8kg', status: 'pending' },
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
