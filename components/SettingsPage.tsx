import { useState } from 'react';
import { Building2, Truck, Users, Plug, Shield, Trash2, Plus, CheckCircle2, Link } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

const initVehicles = [
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

const initDrivers = [
  { id: 'D001', name: 'John Lim', phone: '+65 9123 4567', vehicle: 'V001', status: 'active' },
  { id: 'D002', name: 'Sarah Tan', phone: '+65 9234 5678', vehicle: 'V002', status: 'active' },
  { id: 'D003', name: 'Mike Chen', phone: '+65 9345 6789', vehicle: 'V003', status: 'active' },
  { id: 'D004', name: 'Amy Wong', phone: '+65 9456 7890', vehicle: 'V004', status: 'active' },
  { id: 'D005', name: 'David Ng', phone: '+65 9567 8901', vehicle: 'V005', status: 'active' },
  { id: 'D006', name: 'Lisa Koh', phone: '+65 9678 9012', vehicle: 'V006', status: 'active' },
  { id: 'D007', name: 'Tom Lee', phone: '+65 9789 0123', vehicle: 'V007', status: 'active' },
  { id: 'D008', name: 'Jane Sim', phone: '+65 9890 1234', vehicle: 'V008', status: 'active' },
  { id: 'D009', name: 'Kevin Tay', phone: '+65 9901 2345', vehicle: 'V009', status: 'active' },
  { id: 'D010', name: 'Priya Nair', phone: '+65 9012 3456', vehicle: 'V010', status: 'active' },
  { id: 'D011', name: 'Raymond Ong', phone: '+65 9113 2244', vehicle: 'V011', status: 'active' },
  { id: 'D012', name: 'Mei Lin', phone: '+65 9224 3355', vehicle: null, status: 'inactive' },
];

const initIntegrations = [
  { name: 'Xero Accounting', desc: 'Sync invoices and expenses automatically', status: 'connected', icon: '💰' },
  { name: 'Google Maps API', desc: 'Advanced routing and geocoding', status: 'connected', icon: '🗺️' },
  { name: 'Slack Notifications', desc: 'Real-time team alerts and updates', status: 'connected', icon: '💬' },
  { name: 'QuickBooks', desc: 'Financial management integration', status: 'available', icon: '📊' },
  { name: 'POS System', desc: 'Auto-import orders from POS terminals', status: 'available', icon: '🛒' },
  { name: 'EnterpriseSG Portal', desc: 'Grant applications and compliance', status: 'available', icon: '🏛️' },
  { name: 'Stripe Payments', desc: 'Accept payments from customers', status: 'available', icon: '💳' },
  { name: 'WhatsApp Business', desc: 'Customer delivery notifications', status: 'available', icon: '📱' },
];

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
    <Label style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)' }}>{label}</Label>
    {children}
  </div>
);

export default function SettingsPage() {
  const [vehicles, setVehicles] = useState(initVehicles);
  const [drivers, setDrivers] = useState(initDrivers);
  const [integrations, setIntegrations] = useState(initIntegrations);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ id: '', plate: '', type: 'Van' });
  const [newDriver, setNewDriver] = useState({ name: '', email: '', phone: '' });
  const [company, setCompany] = useState({ name: 'OptiFleet Solutions', reg: '202312345A', address: '123 Innovation Drive, #05-12, Singapore 138632', email: 'contact@optifleet.sg', phone: '+65 6789 0123', industry: 'Logistics & Fleet Management' });
  const [security, setSecurity] = useState({ twoFactor: false, locationTracking: true, exportEncryption: true, dataAnonymization: false });

  const statusBadge = (s: string) => s === 'active' ? <span className="badge badge--green">Active</span> : <span className="badge badge--muted">Inactive</span>;

  const surfaceCard = (children: React.ReactNode) => (
    <div className="surface" style={{ padding: '1.25rem' }}>{children}</div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header className="ph">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SidebarTrigger />
          <div><p className="ph-title">Settings</p><p className="ph-sub">Manage company, vehicles, drivers, and integrations</p></div>
        </div>
      </header>

      <div style={{ padding: '1.25rem 1.625rem' }}>
        <Tabs defaultValue="company">
          <TabsList style={{ marginBottom: '1.25rem' }}>
            {[['company', 'Company Info', <Building2 size={13} />], ['vehicles', 'Vehicles', <Truck size={13} />], ['drivers', 'Drivers', <Users size={13} />], ['integrations', 'Integrations', <Plug size={13} />], ['security', 'Security', <Shield size={13} />]].map(([val, lbl, icon]) => (
              <TabsTrigger key={val as string} value={val as string} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>{icon as any}{lbl as string}</TabsTrigger>
            ))}
          </TabsList>

          {/* Company */}
          <TabsContent value="company">
            {surfaceCard(<>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.25rem' }}>Company Information</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '0.875rem' }}>
                <Row label="Company Name"><Input value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} /></Row>
                <Row label="Registration Number"><Input value={company.reg} onChange={e => setCompany({ ...company, reg: e.target.value })} /></Row>
              </div>
              <Row label="Address"><Input value={company.address} onChange={e => setCompany({ ...company, address: e.target.value })} /></Row>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginTop: '0.875rem', marginBottom: '0.875rem' }}>
                <Row label="Email"><Input type="email" value={company.email} onChange={e => setCompany({ ...company, email: e.target.value })} /></Row>
                <Row label="Phone"><Input value={company.phone} onChange={e => setCompany({ ...company, phone: e.target.value })} /></Row>
              </div>
              <Row label="Industry"><Input value={company.industry} onChange={e => setCompany({ ...company, industry: e.target.value })} /></Row>
              <div style={{ marginTop: '1.25rem', paddingTop: '1.125rem', borderTop: '1px solid var(--border-dim)' }}>
                <button className="btn btn-primary" onClick={() => toast.success('Company information saved')} style={{ padding: '0.4375rem 1rem' }}>Save Changes</button>
              </div>
            </>)}
          </TabsContent>

          {/* Vehicles */}
          <TabsContent value="vehicles">
            <div className="surface">
              <div className="surface-hd" style={{ justifyContent: 'space-between' }}>
                <span className="surface-title">Fleet Management ({vehicles.length} vehicles)</span>
                <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
                  <DialogTrigger asChild><button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem' }}><Plus size={13} />Add Vehicle</button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Add New Vehicle</DialogTitle><DialogDescription>Register a new vehicle to your fleet</DialogDescription></DialogHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: '0.5rem 0' }}>
                      <Row label="Vehicle ID"><Input placeholder="e.g. V013" value={newVehicle.id} onChange={e => setNewVehicle({ ...newVehicle, id: e.target.value })} /></Row>
                      <Row label="License Plate"><Input placeholder="e.g. SBD 9999 Z" value={newVehicle.plate} onChange={e => setNewVehicle({ ...newVehicle, plate: e.target.value })} /></Row>
                      <Row label="Vehicle Type"><Input placeholder="Van or Truck" value={newVehicle.type} onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value })} /></Row>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
                        <button className="btn btn-secondary" onClick={() => setShowAddVehicle(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => { if (!newVehicle.id || !newVehicle.plate) { toast.error('ID and plate required'); return; } if (vehicles.find(v => v.id === newVehicle.id)) { toast.error('ID already exists'); return; } setVehicles(v => [...v, { ...newVehicle, driver: 'Unassigned', status: 'active' }]); setNewVehicle({ id: '', plate: '', type: 'Van' }); setShowAddVehicle(false); toast.success('Vehicle added'); }}>Add Vehicle</button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <table className="tbl">
                <thead><tr>{['Vehicle ID', 'License Plate', 'Type', 'Assigned Driver', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v.id}>
                      <td className="mono" style={{ color: 'var(--teal)', fontSize: '0.75rem' }}>{v.id}</td>
                      <td className="mono" style={{ fontSize: '0.75rem' }}>{v.plate}</td>
                      <td>{v.type}</td>
                      <td>{v.driver}</td>
                      <td>{statusBadge(v.status)}</td>
                      <td>
                        <button onClick={() => { setVehicles(vs => vs.filter(x => x.id !== v.id)); toast.success(`Vehicle ${v.id} removed`); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tx-lo)', padding: 4, borderRadius: 4, transition: 'color 120ms' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--red)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-lo)'}>
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Drivers */}
          <TabsContent value="drivers">
            <div className="surface">
              <div className="surface-hd" style={{ justifyContent: 'space-between' }}>
                <span className="surface-title">Driver Management ({drivers.length} drivers)</span>
                <Dialog open={showAddDriver} onOpenChange={setShowAddDriver}>
                  <DialogTrigger asChild><button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem' }}><Plus size={13} />Add Driver</button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Add New Driver</DialogTitle><DialogDescription>Add a new driver to your team</DialogDescription></DialogHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: '0.5rem 0' }}>
                      <Row label="Full Name"><Input placeholder="Driver's name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} /></Row>
                      <Row label="Email"><Input type="email" placeholder="driver@company.com" value={newDriver.email} onChange={e => setNewDriver({ ...newDriver, email: e.target.value })} /></Row>
                      <Row label="Phone"><Input placeholder="+65 9XXX XXXX" value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} /></Row>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
                        <button className="btn btn-secondary" onClick={() => setShowAddDriver(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => { if (!newDriver.name) { toast.error('Name required'); return; } const id = `D${String(drivers.length + 1).padStart(3, '0')}`; setDrivers(d => [...d, { id, ...newDriver, vehicle: null, status: 'active' }]); setNewDriver({ name: '', email: '', phone: '' }); setShowAddDriver(false); toast.success(`${newDriver.name} added`); }}>Add Driver</button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <table className="tbl">
                <thead><tr>{['Name', 'Phone', 'Assigned Vehicle', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {drivers.map(d => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 500 }}>{d.name}</td>
                      <td className="mono" style={{ fontSize: '0.75rem', color: 'var(--tx-mid)' }}>{d.phone}</td>
                      <td className="mono" style={{ fontSize: '0.75rem' }}>{d.vehicle || <span style={{ color: 'var(--tx-lo)' }}>—</span>}</td>
                      <td>{statusBadge(d.status)}</td>
                      <td>
                        <button onClick={() => { setDrivers(ds => ds.filter(x => x.id !== d.id)); toast.success(`${d.name} removed`); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tx-lo)', padding: 4, borderRadius: 4, transition: 'color 120ms' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--red)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-lo)'}>
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {integrations.map(intg => (
                <div key={intg.name} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 'var(--r-lg)', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0, lineHeight: 1 }}>{intg.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{intg.name}</p>
                      {intg.status === 'connected' ? <span className="badge badge--green"><CheckCircle2 size={9} />Connected</span> : <span className="badge badge--muted">Available</span>}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', marginBottom: '0.625rem' }}>{intg.desc}</p>
                    <button className={intg.status === 'connected' ? 'btn btn-secondary' : 'btn btn-primary'} style={{ padding: '0.3125rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => { const now = intg.status === 'connected' ? 'available' : 'connected'; setIntegrations(ints => ints.map(x => x.name === intg.name ? { ...x, status: now } : x)); toast.success(`${intg.name} ${now === 'connected' ? 'connected' : 'disconnected'}`); }}>
                      {intg.status === 'connected' ? 'Disconnect' : <><Link size={11} />Connect</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            {surfaceCard(<>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.125rem' }}>Data Privacy & Access Control</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
                  { key: 'locationTracking', label: 'Driver Location Tracking', desc: 'Enable real-time GPS tracking for all vehicles' },
                  { key: 'exportEncryption', label: 'Data Export Encryption', desc: 'Encrypt all exported reports and data files' },
                  { key: 'dataAnonymization', label: 'Customer Data Anonymization', desc: 'Anonymize customer information in analytics reports' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem', background: 'var(--bg-hover)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-dim)' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: 2 }}>{item.label}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--tx-mid)' }}>{item.desc}</p>
                    </div>
                    <Switch checked={(security as any)[item.key]} onCheckedChange={val => { setSecurity({ ...security, [item.key]: val }); toast.success(`${item.label} ${val ? 'enabled' : 'disabled'}`); }} />
                  </div>
                ))}
              </div>
            </>)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}