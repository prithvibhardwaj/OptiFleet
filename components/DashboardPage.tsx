import { useState, useEffect, useRef } from 'react';
import { Truck, Package, Zap, TrendingUp, TrendingDown, Fuel, Leaf, MapPin, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import GoogleMapComponent from './GoogleMapComponent';

const vehiclePaths: Record<string, Array<{ lat: number; lng: number }>> = {
  V001: [{ lat: 1.3691, lng: 103.8454 }, { lat: 1.3326, lng: 103.9176 }, { lat: 1.3496, lng: 103.9568 }],
  V002: [{ lat: 1.3721, lng: 103.9474 }, { lat: 1.3491, lng: 103.7495 }],
  V004: [{ lat: 1.3018, lng: 103.9063 }, { lat: 1.3851, lng: 103.8721 }, { lat: 1.3574, lng: 103.8727 }, { lat: 1.3511, lng: 103.9481 }],
  V006: [{ lat: 1.3041, lng: 103.7178 }, { lat: 1.3476, lng: 103.7041 }],
  V008: [{ lat: 1.3821, lng: 103.8798 }, { lat: 1.3600, lng: 103.8700 }, { lat: 1.3400, lng: 103.8900 }, { lat: 1.3550, lng: 103.8500 }],
  V009: [{ lat: 1.3343, lng: 103.8474 }, { lat: 1.2797, lng: 103.8352 }, { lat: 1.2756, lng: 103.8454 }, { lat: 1.2897, lng: 103.8597 }],
  V011: [{ lat: 1.3681, lng: 103.9841 }, { lat: 1.3341, lng: 103.9821 }],
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
      { id: 'V001', plate: 'SBD 1234 A', type: 'Van', driver: 'John Lim', status: 'en-route', lat: 1.3521, lng: 103.8198 },
      { id: 'V002', plate: 'SBD 5678 B', type: 'Van', driver: 'Sarah Tan', status: 'en-route', lat: 1.3321, lng: 103.8598 },
      { id: 'V003', plate: 'SBD 9012 C', type: 'Truck', driver: 'Mike Chen', status: 'idle', lat: 1.3721, lng: 103.8898 },
      { id: 'V004', plate: 'SBD 3456 D', type: 'Van', driver: 'Amy Wong', status: 'en-route', lat: 1.3121, lng: 103.8398 },
      { id: 'V005', plate: 'SBD 7890 E', type: 'Van', driver: 'David Ng', status: 'done', lat: 1.3421, lng: 103.8698 },
      { id: 'V006', plate: 'SBD 2345 F', type: 'Van', driver: 'Lisa Koh', status: 'en-route', lat: 1.3621, lng: 103.8298 },
      { id: 'V007', plate: 'SBD 6789 G', type: 'Truck', driver: 'Tom Lee', status: 'done', lat: 1.3221, lng: 103.8498 },
      { id: 'V008', plate: 'SBD 0123 H', type: 'Van', driver: 'Jane Sim', status: 'en-route', lat: 1.3821, lng: 103.8798 },
      { id: 'V009', plate: 'SBD 4567 J', type: 'Van', driver: 'Kevin Tay', status: 'en-route', lat: 1.3281, lng: 103.8451 },
      { id: 'V010', plate: 'SBD 8901 K', type: 'Truck', driver: 'Priya Nair', status: 'idle', lat: 1.3651, lng: 103.8751 },
      { id: 'V011', plate: 'SBD 2468 L', type: 'Van', driver: 'Raymond Ong', status: 'en-route', lat: 1.3411, lng: 103.8211 },
      { id: 'V012', plate: 'SBD 1357 M', type: 'Van', driver: 'Mei Lin', status: 'done', lat: 1.3561, lng: 103.8631 },
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
          <span className="badge badge--muted"><MapPin size={10} /> Singapore</span>
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
                <GoogleMapComponent className="w-full h-full" center={{ lat: 1.3521, lng: 103.8198 }} zoom={12}
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