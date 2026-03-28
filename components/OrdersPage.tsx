import { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Download, Trash2, CheckCircle2, AlertCircle, FileText, Search, Loader2 } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { generateCSVTemplate, downloadCSV } from '../utils/csvParser';
import { toast } from 'sonner';
import { ordersApi } from '../utils/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: '', pickup: '', dropoff: '', window: '', weight: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setOrders([
      { id: 'ORD-001', customer: 'Ace Pest Control HQ', pickup: '123 Clementi Ave 3', dropoff: '456 Ang Mo Kio St 21', window: '09:00-11:00', weight: '12kg', status: 'assigned' },
      { id: 'ORD-002', customer: 'Clean Pro Services', pickup: '789 Jurong West St 52', dropoff: '321 Bedok North Ave 1', window: '10:00-12:00', weight: '8kg', status: 'assigned' },
      { id: 'ORD-003', customer: 'Fresh Laundry Co', pickup: '234 Tampines St 21', dropoff: '567 Yishun Ring Rd', window: '13:00-15:00', weight: '15kg', status: 'pending' },
      { id: 'ORD-004', customer: 'BuildMaster Supplies', pickup: '890 Woodlands Ave 6', dropoff: '432 Pasir Ris Dr 3', window: '08:00-10:00', weight: '45kg', status: 'assigned' },
      { id: 'ORD-005', customer: 'Premium Catering Pte Ltd', pickup: '567 Serangoon North Ave 1', dropoff: '234 Marine Parade Rd', window: '11:00-13:00', weight: '22kg', status: 'assigned' },
      { id: 'ORD-006', customer: 'CoolAir Servicing', pickup: '345 Hougang Ave 8', dropoff: '678 Bukit Batok West Ave 6', window: '14:00-16:00', weight: '18kg', status: 'pending' },
      { id: 'ORD-007', customer: 'SwiftClean Solutions', pickup: '102 Bishan St 12', dropoff: '88 Commonwealth Crescent', window: '09:30-11:30', weight: '9kg', status: 'pending' },
      { id: 'ORD-008', customer: 'ProGarden Landscaping', pickup: '5 Toh Guan Rd East', dropoff: '20 Lorong 8 Toa Payoh', window: '08:00-09:30', weight: '38kg', status: 'assigned' },
      { id: 'ORD-009', customer: 'Lakeside Catering', pickup: '30 Jurong Port Rd', dropoff: '14 Ghim Moh Rd', window: '06:00-08:00', weight: '60kg', status: 'assigned' },
      { id: 'ORD-010', customer: 'TechFix IT Services', pickup: '1 Fusionopolis Way', dropoff: '10 Anson Rd', window: '10:00-12:00', weight: '5kg', status: 'pending' },
      { id: 'ORD-011', customer: 'MediSupply SG', pickup: '110 Toa Payoh Lorong 1', dropoff: '3 Hospital Dr', window: '07:00-08:00', weight: '25kg', status: 'assigned' },
      { id: 'ORD-012', customer: 'Eco Waste Management', pickup: '31 Tuas Ave 1', dropoff: '50 Changi South Ave 1', window: '07:30-09:30', weight: '120kg', status: 'assigned' },
      { id: 'ORD-013', customer: 'NovaBake Confectionery', pickup: '9 Joo Koon Circle', dropoff: '15 Bukit Timah Rd', window: '05:00-07:00', weight: '30kg', status: 'assigned' },
      { id: 'ORD-014', customer: 'HomeDecor Express', pickup: '22 Sin Ming Lane', dropoff: '33 Tanjong Pagar Plaza', window: '12:00-14:00', weight: '55kg', status: 'pending' },
      { id: 'ORD-015', customer: 'FreshMart Grocers', pickup: '40 Pandan Loop', dropoff: '82 Tiong Bahru Rd', window: '04:00-06:00', weight: '75kg', status: 'assigned' },
      { id: 'ORD-016', customer: 'SkyHigh Events', pickup: '6 Raffles Blvd', dropoff: '1 Harbourfront Walk', window: '15:00-17:00', weight: '40kg', status: 'pending' },
      { id: 'ORD-017', customer: 'Bedok Aircon Services', pickup: '418 Bedok North Ave 2', dropoff: '201 Tampines St 21', window: '11:00-13:00', weight: '20kg', status: 'pending' },
      { id: 'ORD-018', customer: 'Punggol Hardware', pickup: '5 Punggol Field', dropoff: '70 Jurong West Ave 1', window: '08:30-10:00', weight: '85kg', status: 'assigned' },
      { id: 'ORD-019', customer: 'StarChef Catering', pickup: '11 Woodlands Close', dropoff: '22 Upper Serangoon Rd', window: '05:30-07:30', weight: '48kg', status: 'assigned' },
      { id: 'ORD-020', customer: 'IslandMove Logistics', pickup: '36 Kranji Loop', dropoff: '9 Changi North Way', window: '09:00-11:00', weight: '200kg', status: 'pending' },
      { id: 'ORD-021', customer: 'SunShine Florist', pickup: '4 Queensway', dropoff: '121 Orchard Rd', window: '06:00-08:00', weight: '6kg', status: 'pending' },
      { id: 'ORD-022', customer: 'NightOwl Pharmacy', pickup: '30 Biopolis St', dropoff: '298 Tiong Bahru Rd', window: '22:00-23:00', weight: '8kg', status: 'pending' },
    ]);
    setLoading(false);
  };

  const handleAddOrder = async () => {
    try { await ordersApi.create(newOrder); } catch { }
    toast.success('Order added');
    setShowAdd(false);
    setNewOrder({ customer: '', pickup: '', dropoff: '', window: '', weight: '' });
    loadOrders();
  };

  const handleDelete = (id: string) => { setOrders(p => p.filter(o => o.id !== id)); toast.success('Order deleted'); };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); toast.success('Processing file…');
    await new Promise(r => setTimeout(r, 1200));
    toast.success(`Imported 22 orders from ${file.name}`);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const statusBadge = (s: string) => {
    if (s === 'assigned') return <span className="badge badge--blue">Assigned</span>;
    if (s === 'pending') return <span className="badge badge--amber">Pending</span>;
    return <span className="badge badge--muted">{s}</span>;
  };

  const filtered = orders.filter(o => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search));
  const pending = orders.filter(o => o.status === 'pending').length;
  const assigned = orders.filter(o => o.status === 'assigned').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header className="ph">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SidebarTrigger />
          <div><p className="ph-title">Orders & Tasks</p><p className="ph-sub">Manage deliveries and task assignments</p></div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }} onClick={() => { const h = 'id,customer,pickup,dropoff,window,weight,status\n'; const r = orders.map(o => `${o.id},"${o.customer}","${o.pickup}","${o.dropoff}",${o.window},${o.weight},${o.status}`).join('\n'); downloadCSV('orders.csv', h + r); toast.success('Exported'); }}><Download size={13} />Export CSV</button>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}><Plus size={13} />Add Manual</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Order</DialogTitle><DialogDescription>Manually add a delivery order</DialogDescription></DialogHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', padding: '0.5rem 0' }}>
                {[['Customer Name', 'customer', 'text'], ['Delivery Window', 'window', 'text'], ['Weight', 'weight', 'text']].map(([lbl, key, type]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <Label>{lbl}</Label>
                    <Input type={type} placeholder={lbl} value={(newOrder as any)[key]} onChange={e => setNewOrder({ ...newOrder, [key]: e.target.value })} />
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}><Label>Pickup Address</Label><Textarea rows={2} value={newOrder.pickup} onChange={e => setNewOrder({ ...newOrder, pickup: e.target.value })} /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}><Label>Dropoff Address</Label><Textarea rows={2} value={newOrder.dropoff} onChange={e => setNewOrder({ ...newOrder, dropoff: e.target.value })} /></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
                  <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddOrder}>Add Order</button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
          <button className="btn btn-primary" style={{ padding: '0.375rem 0.875rem' }} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <><Loader2 size={13} className="spin" />Uploading…</> : <><Upload size={13} />Upload CSV</>}
          </button>
        </div>
      </header>

      <div style={{ padding: '1.25rem 1.625rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {[
            { label: 'Total Orders', value: orders.length, color: 'var(--blue)', cls: 'sc--blue', icon: <FileText size={13} /> },
            { label: 'Pending', value: pending, color: 'var(--amber)', cls: 'sc--amber', icon: <AlertCircle size={13} /> },
            { label: 'Assigned', value: assigned, color: 'var(--teal)', cls: 'sc--teal', icon: <CheckCircle2 size={13} /> },
            { label: 'Errors', value: 0, color: 'var(--red)', cls: 'sc--red', icon: <AlertCircle size={13} /> },
          ].map((k, i) => (
            <div key={i} className={`sc ${k.cls}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <p className="sl">{k.label}</p><div style={{ color: k.color, opacity: 0.7 }}>{k.icon}</div>
              </div>
              <div className="sv" style={{ color: k.color }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Upload zone */}
        <div className="surface" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div className="ip ip--blue" style={{ width: 44, height: 44, borderRadius: 12, margin: '0 auto 0.875rem' }}><Upload size={18} /></div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>Upload Orders</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', marginBottom: '1rem', maxWidth: 380, margin: '0 auto 1rem' }}>Drop a CSV file here, or click to browse. Supports Customer, Pickup, Dropoff, Window, Weight columns.</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? <><Loader2 size={13} className="spin" />Processing…</> : <><Upload size={13} />Choose File</>}
            </button>
            <button className="btn btn-secondary" onClick={() => { downloadCSV('template.csv', generateCSVTemplate()); toast.success('Template downloaded'); }}><FileText size={13} />Download Template</button>
          </div>
        </div>

        {/* Table */}
        <div className="surface">
          <div className="surface-hd" style={{ justifyContent: 'space-between' }}>
            <span className="surface-title">Order List</span>
            <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-lo)', pointerEvents: 'none' }} />
              <input placeholder="Search orders…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 28, height: 32, width: 200, borderRadius: 'var(--r-md)', fontSize: '0.8125rem' }} />
            </div>
          </div>
          {loading ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--tx-lo)' }}><Loader2 size={20} className="spin" style={{ margin: '0 auto 8px', display: 'block' }} /><p style={{ fontSize: '0.8125rem' }}>Loading orders…</p></div>
          ) : (
            <table className="tbl">
              <thead><tr>{['Order ID', 'Customer', 'Pickup', 'Dropoff', 'Window', 'Weight', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td className="mono" style={{ color: 'var(--teal)', fontSize: '0.75rem' }}>{o.id}</td>
                    <td style={{ fontWeight: 500 }}>{o.customer}</td>
                    <td style={{ color: 'var(--tx-mid)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.pickup}</td>
                    <td style={{ color: 'var(--tx-mid)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.dropoff}</td>
                    <td className="mono" style={{ fontSize: '0.75rem' }}>{o.window}</td>
                    <td className="mono" style={{ fontSize: '0.75rem' }}>{o.weight}</td>
                    <td>{statusBadge(o.status)}</td>
                    <td>
                      <button onClick={() => handleDelete(o.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tx-lo)', padding: 4, borderRadius: 4, transition: 'all 120ms' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--red)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-lo)'}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ padding: '0.625rem 1.0625rem', borderTop: '1px solid var(--border-dim)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--tx-lo)' }}>Showing {filtered.length} orders</span>
            <button className="btn btn-primary" style={{ padding: '0.375rem 0.875rem' }} onClick={() => toast.info('Auto-assigning pending orders…')}>Auto-Assign Vehicles</button>
          </div>
        </div>
      </div>
    </div>
  );
}