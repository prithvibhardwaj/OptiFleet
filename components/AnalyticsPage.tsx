import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Fuel, Clock, Leaf, Award, Target } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fuelData = [
  { month: 'Mar', fuel: 2580, saved: 290 }, { month: 'Apr', fuel: 2400, saved: 380 }, { month: 'May', fuel: 2210, saved: 510 },
  { month: 'Jun', fuel: 2050, saved: 630 }, { month: 'Jul', fuel: 1980, saved: 710 }, { month: 'Aug', fuel: 1850, saved: 790 },
  { month: 'Sep', fuel: 1720, saved: 860 }, { month: 'Oct', fuel: 1590, saved: 940 },
];
const routeTimeData = [
  { day: 'Mon', avgTime: 41, target: 45 }, { day: 'Tue', avgTime: 37, target: 45 }, { day: 'Wed', avgTime: 43, target: 45 },
  { day: 'Thu', avgTime: 39, target: 45 }, { day: 'Fri', avgTime: 35, target: 45 }, { day: 'Sat', avgTime: 40, target: 45 }, { day: 'Sun', avgTime: 38, target: 45 },
];
const vehiclePerformance = [
  { name: 'John Lim', id: 'V001', deliveries: 412, onTime: 99, efficiency: 97 },
  { name: 'Sarah Tan', id: 'V002', deliveries: 394, onTime: 98, efficiency: 96 },
  { name: 'Lisa Koh', id: 'V006', deliveries: 378, onTime: 97, efficiency: 94 },
  { name: 'Amy Wong', id: 'V004', deliveries: 361, onTime: 96, efficiency: 93 },
  { name: 'Kevin Tay', id: 'V009', deliveries: 344, onTime: 96, efficiency: 92 },
  { name: 'Raymond Ong', id: 'V011', deliveries: 328, onTime: 95, efficiency: 91 },
  { name: 'Jane Sim', id: 'V008', deliveries: 315, onTime: 94, efficiency: 90 },
];
const distribution = [
  { name: 'Pest Control', value: 24, color: '#3b9eff' }, { name: 'Catering', value: 21, color: '#00d4aa' },
  { name: 'Laundry', value: 18, color: '#a78bfa' }, { name: 'Construction', value: 16, color: '#f59e0b' },
  { name: 'Cleaning', value: 13, color: '#22d47a' }, { name: 'Healthcare', value: 5, color: '#ff4d6a' },
  { name: 'Others', value: 3, color: '#4a5666' },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-mid)', borderRadius: 8, padding: '7px 11px', boxShadow: 'var(--sh-lg)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
      <p style={{ color: 'var(--tx-lo)', marginBottom: 3 }}>{label}</p>
      {payload.map((p: any) => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function AnalyticsPage() {
  const kpis = [
    { label: 'Total Distance', value: '1,834 km', change: '-14%', up: false, color: 'var(--blue)', cls: 'sc--blue', icon: <Target size={13} />, note: 'vs last month' },
    { label: 'Avg Delivery', value: '39 min', change: '-13%', up: false, color: 'var(--teal)', cls: 'sc--teal', icon: <Clock size={13} />, note: 'improvement' },
    { label: 'Fuel Saved', value: '$940', change: '+19%', up: true, color: 'var(--amber)', cls: 'sc--amber', icon: <Fuel size={13} />, note: 'this month' },
    { label: 'CO₂ Reduced', value: '487 kg', change: null, up: null, color: 'var(--green)', cls: 'sc--green', icon: <Leaf size={13} />, note: '≈ 22 trees' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header className="ph">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SidebarTrigger />
          <div><p className="ph-title">Analytics</p><p className="ph-sub">Performance insights · Last 30 days</p></div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}><Calendar size={13} />Period</button>
          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}><Download size={13} />Export</button>
        </div>
      </header>

      <div style={{ padding: '1.25rem 1.625rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {kpis.map((k, i) => (
            <div key={i} className={`sc ${k.cls}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <p className="sl">{k.label}</p><div style={{ color: k.color, opacity: 0.7 }}>{k.icon}</div>
              </div>
              <div className="sv" style={{ color: k.color }}>{k.value}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4375rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>{k.note}</span>
                {k.change && <span className={k.up ? 'sc-up' : 'sc-down'} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{k.change}
                </span>}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="surface">
            <div className="surface-hd"><Fuel size={13} style={{ color: 'var(--amber)' }} /><span className="surface-title">Fuel Cost vs Savings</span></div>
            <div style={{ padding: '0.875rem' }}>
              <ResponsiveContainer width="100%" height={210}>
                <LineChart data={fuelData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip content={<Tip />} />
                  <Line type="monotone" dataKey="fuel" stroke="var(--amber)" strokeWidth={2} dot={false} name="Cost ($)" />
                  <Line type="monotone" dataKey="saved" stroke="var(--teal)" strokeWidth={2} dot={false} name="Saved ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="surface">
            <div className="surface-hd"><Clock size={13} style={{ color: 'var(--blue)' }} /><span className="surface-title">Route Time · Weekly</span></div>
            <div style={{ padding: '0.875rem' }}>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={routeTimeData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip content={<Tip />} />
                  <Bar dataKey="avgTime" fill="var(--blue)" name="Avg (min)" radius={[4, 4, 0, 0]} opacity={0.85} />
                  <Bar dataKey="target" fill="var(--bg-active)" name="Target" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Driver table + pie */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 265px', gap: '0.75rem' }}>
          <div className="surface">
            <div className="surface-hd"><Award size={13} style={{ color: 'var(--teal)' }} /><span className="surface-title">Driver Performance</span></div>
            <table className="tbl">
              <thead><tr>{['#', 'Driver', 'Vehicle', 'Deliveries', 'On-Time', 'Efficiency'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {vehiclePerformance.map((d, i) => (
                  <tr key={d.name}>
                    <td className="mono" style={{ color: 'var(--tx-lo)', fontSize: '0.75rem' }}>{String(i + 1).padStart(2, '0')}</td>
                    <td style={{ fontWeight: 500 }}>{d.name}</td>
                    <td className="mono" style={{ color: 'var(--tx-mid)', fontSize: '0.75rem' }}>{d.id}</td>
                    <td className="mono">{d.deliveries}</td>
                    <td><span className="badge badge--green">{d.onTime}%</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: 3, background: 'var(--bg-active)', borderRadius: 99, overflow: 'hidden', maxWidth: 72 }}>
                          <div style={{ height: '100%', width: `${d.efficiency}%`, background: 'linear-gradient(90deg, var(--teal), var(--blue))', borderRadius: 99 }} />
                        </div>
                        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--teal)', minWidth: 30 }}>{d.efficiency}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="surface">
            <div className="surface-hd"><BarChart3 size={13} style={{ color: 'var(--purple)' }} /><span className="surface-title">Industry Mix</span></div>
            <div style={{ padding: '0.375rem' }}>
              <ResponsiveContainer width="100%" height={155}>
                <PieChart><Pie data={distribution} cx="50%" cy="50%" outerRadius={68} innerRadius={38} dataKey="value" paddingAngle={2}>
                  {distribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie><Tooltip content={<Tip />} /></PieChart>
              </ResponsiveContainer>
              <div style={{ padding: '0 0.375rem 0.375rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {distribution.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--tx-mid)' }}>{d.name}</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insight cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { icon: <TrendingUp size={13} />, title: 'Efficiency Improved', body: 'Routes are 22% more efficient vs last month', color: 'var(--blue)', dim: 'var(--blue-dim)' },
            { icon: <Target size={13} />, title: 'Target Exceeded', body: 'On-time delivery rate exceeds 95% target consistently', color: 'var(--teal)', dim: 'var(--teal-dim)' },
            { icon: <Fuel size={13} />, title: 'Cost Savings', body: '$940 saved in fuel this month through optimization', color: 'var(--amber)', dim: 'var(--amber-dim)' },
          ].map(ins => (
            <div key={ins.title} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 'var(--r-lg)', padding: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: ins.dim, color: ins.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ins.icon}</div>
              <div>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--tx-hi)', marginBottom: 2 }}>{ins.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--tx-mid)', lineHeight: 1.55 }}>{ins.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}