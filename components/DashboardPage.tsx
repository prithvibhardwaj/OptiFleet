import { useState, useEffect, useRef } from 'react';
import { Truck, Package, Zap, TrendingUp, TrendingDown, Fuel, Leaf, MapPin, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import GoogleMapComponent from './GoogleMapComponent';

const vehiclePaths: Record<string, Array<{ lat: number; lng: number }>> = {
  V001: [{ lat: -6.1963, lng: 106.8317 }, { lat: -6.1524, lng: 106.9040 }, { lat: -6.2153, lng: 106.8785 }, { lat: -6.1867, lng: 106.9004 }],
  V002: [{ lat: -6.1397, lng: 106.8812 }, { lat: -6.1262, lng: 106.8020 }, { lat: -6.0783, lng: 106.9021 }, { lat: -6.1569, lng: 106.7272 }],
  V004: [{ lat: -6.2913, lng: 106.7840 }, { lat: -6.2548, lng: 106.8197 }, { lat: -6.2297, lng: 106.8308 }, { lat: -6.2654, lng: 106.8826 }],
  V006: [{ lat: -6.1400, lng: 106.7220 }, { lat: -6.1983, lng: 106.7524 }, { lat: -6.1989, lng: 106.7372 }, { lat: -6.1622, lng: 106.7894 }],
  V008: [{ lat: -6.1742, lng: 106.8614 }, { lat: -6.1914, lng: 106.8428 }, { lat: -6.1944, lng: 106.8229 }, { lat: -6.1348, lng: 106.8131 }],
  V009: [{ lat: -6.2241, lng: 106.8057 }, { lat: -6.1742, lng: 106.8614 }, { lat: -6.1914, lng: 106.8428 }, { lat: -6.1944, lng: 106.8229 }],
  V011: [{ lat: -6.1867, lng: 106.9004 }, { lat: -6.1089, lng: 106.8807 }, { lat: -6.1267, lng: 106.9358 }, { lat: -6.0783, lng: 106.9021 }],
};

const statusCfg = {
  'en-route': { dot: 'dot--blue dot--pulse', badge: 'badge--blue', label: 'En Route', color: '#3b9eff' },
  'idle': { dot: 'dot--amber', badge: 'badge--amber', label: 'Idle', color: '#f59e0b' },
  'done': { dot: 'dot--green', badge: 'badge--green', label: 'Done', color: '#22d47a' },
};

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const progressRef = useRef<Record<string, { segIdx: number; t: number }>>({});

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    Object.keys(vehiclePaths).forEach(id => { if (!progressRef.current[id]) progressRef.current[id] = { segIdx: 0, t: 0 }; });
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        const path = vehiclePaths[v.id];
        if (!path || v.status !== 'en-route') return v;
        const prog = progressRef.current[v.id];
        let { segIdx, t } = prog;
        t += 0.05;
        if (t >= 1) { t -= 1; segIdx = Math.min(segIdx + 1, path.length - 2); }
        progressRef.current[v.id] = { segIdx, t };
        const a = path[segIdx]; const b = path[Math.min(segIdx + 1, path.length - 1)];
        return { ...v, lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setVehicles([
      { id: 'V001', plate: 'B 1234 BDS', type: 'Van', driver: 'Budi Santoso', status: 'en-route', lat: -6.2241, lng: 106.8057 },
      { id: 'V002', plate: 'B 5678 STR', type: 'Van', driver: 'Siti Rahayu', status: 'en-route', lat: -6.1321, lng: 106.8598 },
      { id: 'V003', plate: 'B 9012 AFC', type: 'Truck', driver: 'Ahmad Fauzi', status: 'idle', lat: -6.1721, lng: 106.8898 },
      { id: 'V004', plate: 'B 3456 DKS', type: 'Van', driver: 'Dewi Kusuma', status: 'en-route', lat: -6.2913, lng: 106.7840 },
      { id: 'V005', plate: 'B 7890 RPT', type: 'Van', driver: 'Rizki Pratama', status: 'done', lat: -6.2421, lng: 106.8698 },
      { id: 'V006', plate: 'B 2345 FTH', type: 'Van', driver: 'Fitri Handayani', status: 'en-route', lat: -6.1621, lng: 106.7298 },
      { id: 'V007', plate: 'B 6789 EKW', type: 'Truck', driver: 'Eko Widodo', status: 'done', lat: -6.2221, lng: 106.8498 },
      { id: 'V008', plate: 'B 0123 RNW', type: 'Van', driver: 'Rina Wulandari', status: 'en-route', lat: -6.1821, lng: 106.8798 },
      { id: 'V009', plate: 'B 4567 HDS', type: 'Van', driver: 'Hendri Susanto', status: 'en-route', lat: -6.2281, lng: 106.8451 },
      { id: 'V010', plate: 'B 8901 PKS', type: 'Truck', driver: 'Priyanka Sharma', status: 'idle', lat: -6.1651, lng: 106.8751 },
      { id: 'V011', plate: 'B 2468 HGN', type: 'Van', driver: 'Hendra Gunawan', status: 'en-route', lat: -6.1411, lng: 106.9211 },
      { id: 'V012', plate: 'B 1357 MYS', type: 'Van', driver: 'Maya Sari', status: 'done', lat: -6.2561, lng: 106.8631 },
    ]);
    setOrders(Array.from({ length: 22 }, (_, i) => ({ id: `ORD-${String(i + 1).padStart(3, '0')}`, status: i < 14 ? 'assigned' : 'pending' })));
    setLoading(false);
  };

  const enRoute = vehicles.filter(v => v.status === 'en-route').length;
  const idle = vehicles.filter(v => v.status === 'idle').length;
  const done = vehicles.filter(v => v.status === 'done').length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; })();

  const kpis = [
    { label: 'Active Vehicles', value: String(vehicles.length), sub: `${enRoute} en route`, note: 'All operational', up: true, color: 'var(--blue)', cls: 'sc--blue', icon: <Truck size={14} /> },
    { label: 'Total Orders', value: String(orders.length), sub: `${pending} pending`, note: 'Real-time sync', up: true, color: 'var(--teal)', cls: 'sc--teal', icon: <Package size={14} /> },
    { label: 'Fuel Saved Today', value: '$312', sub: 'SGD', note: '+18% vs yesterday', up: true, color: 'var(--amber)', cls: 'sc--amber', icon: <Fuel size={14} /> },
    { label: 'CO₂ Avoided', value: '63 kg', sub: '≈ 3 trees', note: 'IPCC Tier 1', up: null, color: 'var(--green)', cls: 'sc--green', icon: <Leaf size={14} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header className="ph">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SidebarTrigger />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p className="ph-title">Fleet Command</p>
              <span className="badge badge--live"><span className="dot dot--green" style={{ width: 5, height: 5 }} />LIVE</span>
            </div>
            <p className="ph-sub">{greeting}, Ken · {new Date().toLocaleDateString('en-SG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge--muted"><MapPin size={10} /> Jakarta</span>
          <button className="btn btn-secondary" onClick={loadData} style={{ padding: '0.375rem 0.75rem' }}>
            <RefreshCw size={13} className={loading ? 'spin' : ''} />{loading ? 'Syncing…' : 'Refresh'}
          </button>
          <button className="btn btn-primary" style={{ padding: '0.375rem 0.875rem' }}><Zap size={13} />Optimize</button>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <div style={{ textAlign: 'center', color: 'var(--tx-lo)' }}>
            <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.8125rem' }}>Loading fleet data…</p>
          </div>
        </div>
      ) : (
        <div style={{ padding: '1.25rem 1.625rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {kpis.map((k, i) => (
              <div key={i} className={`sc ${k.cls}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <p className="sl">{k.label}</p>
                  <div style={{ color: k.color, opacity: 0.7 }}>{k.icon}</div>
                </div>
                <div className="sv" style={{ color: k.color }}>{k.value}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4375rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>{k.sub}</span>
                  {k.up !== null ? (
                    <span className={k.up ? 'sc-up' : 'sc-down'} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{k.note}
                    </span>
                  ) : <span style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)' }}>{k.note}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Fleet status bar */}
          <div style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 'var(--r-lg)', padding: '0.6875rem 1.125rem', display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Activity size={12} style={{ color: 'var(--tx-lo)' }} />
              <span className="section-label">Fleet Status</span>
            </div>
            <div style={{ flex: 1, display: 'flex', gap: '1.5rem' }}>
              {[{ n: enRoute, label: 'En Route', color: 'var(--blue)' }, { n: idle, label: 'Idle', color: 'var(--amber)' }, { n: done, label: 'Done', color: 'var(--green)' }].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4375rem' }}>
                  <span className="dot" style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
                  <span className="mono" style={{ fontSize: '0.8125rem', color: s.color, fontWeight: 500 }}>{s.n}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {vehicles.map(v => {
                const c = v.status === 'en-route' ? 'var(--blue)' : v.status === 'idle' ? 'var(--amber)' : 'var(--green)';
                return <div key={v.id} title={`${v.id} — ${v.driver}`} style={{ width: 5, height: 18, borderRadius: 3, background: c, opacity: v.status === 'done' ? 0.35 : 1 }} />;
              })}
            </div>
          </div>

          {/* Map + list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '0.75rem' }}>
            <div className="surface">
              <div className="surface-hd" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={13} style={{ color: 'var(--teal)' }} />
                  <span className="surface-title">Live Fleet Map</span>
                </div>
                <span className="mono" style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)' }}>Updates every 3s</span>
              </div>
              <div style={{ height: 440 }}>
                <GoogleMapComponent className="w-full h-full" center={{ lat: -6.2088, lng: 106.8456 }} zoom={11}
                  markers={vehicles.map(v => ({ id: v.id, position: { lat: v.lat, lng: v.lng }, title: `${v.id} — ${v.driver}`, color: v.status === 'en-route' ? '#3b9eff' : v.status === 'idle' ? '#f59e0b' : '#22d47a' }))} />
              </div>
            </div>

            <div className="surface" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="surface-hd" style={{ justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={13} style={{ color: 'var(--tx-mid)' }} />
                  <span className="surface-title">Vehicles</span>
                </div>
                <span className="mono" style={{ fontSize: '0.6875rem', color: 'var(--teal)' }}>{vehicles.length} total</span>
              </div>
              <div style={{ overflowY: 'auto', flex: 1 }}>
                {vehicles.map(v => {
                  const cfg = statusCfg[v.status as keyof typeof statusCfg] || statusCfg.idle;
                  return (
                    <div key={v.id} className="data-row">
                      <span className={`dot ${cfg.dot}`} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: 1 }}>
                          <span className="mono" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{v.id}</span>
                          <span style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)' }}>{v.type}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--tx-mid)' }}>{v.driver}</span>
                      </div>
                      <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 'var(--r-lg)', padding: '0.875rem 1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="ip ip--green" style={{ width: 34, height: 34, borderRadius: 9 }}><Zap size={15} /></div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--tx-hi)', marginBottom: 1 }}>All routes optimized</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>Fleet running at peak efficiency · Ready to plan tomorrow</p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '0.4375rem 1.125rem' }}><ArrowUpRight size={13} />Plan Tomorrow</button>
          </div>
        </div>
      )}
    </div>
  );
}