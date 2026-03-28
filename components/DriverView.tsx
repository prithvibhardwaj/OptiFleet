import { useState } from 'react';
import { Navigation, Phone, MapPin, CheckCircle2, Clock, AlertTriangle, RefreshCw, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import GoogleMapComponent from './GoogleMapComponent';
import { SidebarTrigger } from './ui/sidebar';
import { Progress } from './ui/progress';

const taskCoords: Record<string, { lat: number; lng: number }> = {
  '123 Clementi Ave 3, #05-12, Singapore 129588': { lat: 1.3152, lng: 103.7649 },
  '88 Commonwealth Crescent, #01-08, Singapore 149520': { lat: 1.3026, lng: 103.7983 },
  '456 Ang Mo Kio St 21, Block 456, Singapore 560456': { lat: 1.3691, lng: 103.8454 },
  '789 Bedok North Ave 1, #02-34, Singapore 460789': { lat: 1.3326, lng: 103.9176 },
  '234 Tampines St 21, Singapore 520234': { lat: 1.3496, lng: 103.9568 },
};

const tasks = [
  { id: 1, customer: 'Ace Pest Control HQ', address: '123 Clementi Ave 3, #05-12, Singapore 129588', contact: '+65 9123 4567', eta: '09:15', status: 'completed', notes: 'Equipment delivery — signed by Mr. Tan at reception', completedAt: '09:10' },
  { id: 2, customer: 'SwiftClean Solutions', address: '88 Commonwealth Crescent, #01-08, Singapore 149520', contact: '+65 9871 2345', eta: '10:05', status: 'completed', notes: 'Cleaning supplies pickup — 9kg, collect signed DO', completedAt: '09:58' },
  { id: 3, customer: 'Clean Pro Services', address: '456 Ang Mo Kio St 21, Block 456, Singapore 560456', contact: '+65 9234 5678', eta: '11:10', status: 'in-progress', notes: 'Laundry chemicals delivery — 8kg. Ask for Ms. Rachel at loading bay.', distance: '3.1 km' },
  { id: 4, customer: 'Fresh Laundry Co', address: '789 Bedok North Ave 1, #02-34, Singapore 460789', contact: '+65 9345 6789', eta: '12:25', status: 'pending', notes: 'Bulk laundry bags — 15kg. Call 10 min before arrival.', distance: '6.4 km' },
  { id: 5, customer: 'BuildMaster Supplies', address: '234 Tampines St 21, Singapore 520234', contact: '+65 9456 7890', eta: '13:40', status: 'pending', notes: 'Heavy materials — use loading ramp at back.', distance: '9.2 km' },
];

export default function DriverView() {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [currentIdx, setCurrentIdx] = useState(2);

  const markDone = (id: number) => {
    setLocalTasks(t => t.map(task => task.id === id ? { ...task, status: 'completed', completedAt: new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' }) } : task));
    if (currentIdx < localTasks.length - 1) setCurrentIdx(i => i + 1);
  };

  const completed = localTasks.filter(t => t.status === 'completed').length;
  const progress = (completed / localTasks.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <header className="ph" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.75rem', padding: '0.875rem 1.625rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SidebarTrigger />
            <div>
              <p className="ph-title">Driver Dashboard</p>
              <p className="ph-sub">John Lim · Vehicle V001</p>
            </div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}><Phone size={13} />Support</button>
        </div>
        {/* Progress */}
        <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-dim)', borderRadius: 8, padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)' }}>Today's Progress</span>
            <span className="mono" style={{ fontSize: '0.8125rem', color: 'var(--teal)' }}>{completed} of {localTasks.length} completed</span>
          </div>
          <Progress value={progress} />
        </div>
      </header>

      <div style={{ padding: '1.25rem 1.625rem', maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {localTasks.map((task, index) => {
          const isCurrent = index === currentIdx && task.status === 'in-progress';
          const isComplete = task.status === 'completed';
          const isPending = task.status === 'pending';

          if (isComplete && index !== currentIdx - 1) return null;

          return (
            <div key={task.id} style={{
              background: 'var(--bg-raised)',
              border: `1px solid ${isCurrent ? 'var(--blue)' : 'var(--border-dim)'}`,
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              opacity: isComplete ? 0.7 : 1,
              boxShadow: isCurrent ? '0 0 0 1px rgba(59,158,255,0.2), var(--sh-md)' : 'none',
            }}>
              {/* Card header */}
              <div style={{ padding: '0.875rem 1.125rem', borderBottom: '1px solid var(--border-dim)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', background: isComplete ? 'var(--green-dim)' : isCurrent ? 'var(--blue-dim)' : 'var(--bg-active)', color: isComplete ? 'var(--green)' : isCurrent ? 'var(--blue)' : 'var(--tx-lo)' }}>
                  {isComplete ? <CheckCircle2 size={16} /> : task.id}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{task.customer}</p>
                  {isCurrent && <span className="badge badge--blue" style={{ marginTop: 3 }}>Current Stop</span>}
                  {isComplete && <span className="badge badge--green" style={{ marginTop: 3 }}>Completed at {task.completedAt}</span>}
                </div>
                {isPending && <ChevronRight size={14} style={{ color: 'var(--tx-lo)' }} />}
              </div>

              {/* Address */}
              <div style={{ padding: '0.75rem 1.125rem', borderBottom: '1px solid var(--border-dim)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'var(--bg-sunken)' }}>
                <MapPin size={13} style={{ color: 'var(--tx-lo)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', lineHeight: 1.5 }}>{task.address}</p>
              </div>

              {/* Details */}
              <div style={{ padding: '0.75rem 1.125rem', display: 'flex', gap: '1.5rem', borderBottom: task.notes ? '1px solid var(--border-dim)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Clock size={12} style={{ color: 'var(--tx-lo)' }} />
                  <div><p style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)' }}>ETA</p><p className="mono" style={{ fontSize: '0.8125rem' }}>{task.eta}</p></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Phone size={12} style={{ color: 'var(--tx-lo)' }} />
                  <div><p style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)' }}>Contact</p><p className="mono" style={{ fontSize: '0.8125rem' }}>{task.contact}</p></div>
                </div>
                {(task as any).distance && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginLeft: 'auto' }}>
                    <Navigation size={12} style={{ color: 'var(--tx-lo)' }} />
                    <span className="mono" style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)' }}>{(task as any).distance}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {task.notes && (
                <div style={{ padding: '0.625rem 1.125rem', background: 'rgba(245,158,11,0.06)', borderTop: '1px solid rgba(245,158,11,0.12)', borderBottom: isCurrent ? '1px solid var(--border-dim)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <AlertTriangle size={12} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--amber)', lineHeight: 1.5 }}>{task.notes}</p>
                </div>
              )}

              {/* Actions */}
              {isCurrent && (
                <div style={{ padding: '0.75rem 1.125rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', height: 42 }}
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(task.address)}`, '_blank')}>
                    <Navigation size={14} />Start Navigation
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', height: 42 }} onClick={() => markDone(task.id)}>
                    <CheckCircle2 size={14} />Mark Completed
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Map */}
        <div className="surface">
          <div className="surface-hd"><MapPin size={13} style={{ color: 'var(--teal)' }} /><span className="surface-title">Remaining Stops</span></div>
          <div style={{ height: 200 }}>
            <GoogleMapComponent className="w-full h-full" center={{ lat: 1.3691, lng: 103.8454 }} zoom={13}
              markers={localTasks.filter(t => t.status !== 'completed').map((t, i) => ({
                id: String(t.id), position: taskCoords[t.address] || { lat: 1.3521 + i * 0.01, lng: 103.8198 + i * 0.01 },
                title: t.customer, color: t.status === 'in-progress' ? '#3b9eff' : '#4a5666',
              }))} />
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ height: 44, justifyContent: 'center' }} onClick={() => { toast.success('Recalculating route…'); setTimeout(() => toast.success('Route updated — saved 4 min'), 1500); }}>
            <RefreshCw size={13} />Recalculate Route
          </button>
          <button className="btn btn-secondary" style={{ height: 44, justifyContent: 'center' }} onClick={() => toast.info('Issue reported to dispatch')}>
            <AlertTriangle size={13} />Report Issue
          </button>
        </div>

        <div style={{ background: 'var(--teal-dim)', border: '1px solid rgba(0,212,170,0.18)', borderRadius: 'var(--r-lg)', padding: '0.75rem 1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--teal)' }}>Route automatically updates when traffic conditions change</p>
        </div>
      </div>
    </div>
  );
}