import { useState } from 'react';
import { Input } from './ui/input';
import { TrendingUp, MapPin, Zap, ArrowRight, Leaf, Route, BarChart3, FileText } from 'lucide-react';

interface LoginPageProps { onLogin: () => void; onBack?: () => void; }

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    onLogin();
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0d1117' }}>

      {/* ── Left brand panel — scrollable ── */}
      <div className="hidden lg:block w-[54%] overflow-y-auto relative"
        style={{ background: 'linear-gradient(145deg, #0d1117 0%, #111827 60%, #0d1f1a 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Background grid (fixed inside panel) */}
        <div className="sticky top-0 left-0 right-0 h-0 overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute inset-x-0 top-0 h-screen opacity-[0.035]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 p-12 flex flex-col gap-10">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            {onBack && (
              <button onClick={onBack} className="mr-2 text-xs text-slate-500 hover:text-slate-300 transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                ← Back
              </button>
            )}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.25)' }}>
              <Zap size={17} style={{ color: '#00d4aa' }} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">OptiFleet</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,212,170,0.1)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.2)' }}>
              Jakarta
            </span>
          </div>

          {/* Headline */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#00d4aa' }}>Intelligent Fleet Platform</p>
            <h1 className="text-5xl font-bold leading-[1.15] tracking-tight text-white mb-5">
              Smarter routes.<br />
              <span style={{ background: 'linear-gradient(135deg, #00d4aa, #3b9eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Cleaner cities.
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)' }} className="text-base leading-relaxed max-w-sm">
              AI-powered route optimization, live fleet tracking, and automated ESG compliance reporting — built for Southeast Asian logistics.
            </p>
          </div>

          {/* Stats grid */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Platform results</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '40%', label: 'Cost reduction', icon: <TrendingUp size={13} />, color: '#00d4aa' },
                { val: '98%', label: 'On-time delivery', icon: <MapPin size={13} />, color: '#3b9eff' },
                { val: '15–25%', label: 'CO₂ reduced', icon: <Leaf size={13} />, color: '#4ade80' },
                { val: '3×', label: 'Faster dispatch', icon: <Route size={13} />, color: '#f59e0b' },
                { val: '12+', label: 'Industries served', icon: <BarChart3 size={13} />, color: '#a78bfa' },
                { val: 'A+', label: 'ESG impact score', icon: <FileText size={13} />, color: '#f472b6' },
              ].map(s => (
                <div key={s.val} className="rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ color: s.color }} className="mb-1.5">{s.icon}</div>
                  <div className="text-xl font-semibold tracking-tight" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature list */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>What's included</p>
            <div className="space-y-2.5">
              {[
                { icon: <Route size={14} />, title: 'Nearest-neighbor TSP optimization', desc: 'Geocodes every stop and finds the shortest route instantly' },
                { icon: <MapPin size={14} />, title: 'Live fleet tracking', desc: 'Vehicles animate along actual assigned routes in real time' },
                { icon: <BarChart3 size={14} />, title: 'Driver performance analytics', desc: 'On-time rate, fuel efficiency, and delivery scores per driver' },
                { icon: <FileText size={14} />, title: 'Automated ESG reports', desc: 'One-click PDF for EnterpriseSG EDG and NEA submission' },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="mt-0.5 shrink-0" style={{ color: '#00d4aa' }}>{f.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)' }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              "We cut our fuel bill by 38% in the first month. The route optimization just works — I type in the stops and it handles everything."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.25)' }}>JL</div>
              <div>
                <p className="text-xs font-semibold text-white">Jason Lim</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Operations Manager · Ace Pest Control Pte Ltd</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs pb-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Trusted by pest control, logistics, catering, cleaning, and construction fleets across Jakarta.
          </p>

        </div>
      </div>

      {/* ── Right form panel — fixed, never scrolls ── */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden"
        style={{ background: '#0d1117' }}>
        <div className="w-full max-w-[380px]">

          {/* Mobile logo + back */}
          <div className="flex items-center gap-2 mb-8 justify-center lg:hidden">
            {onBack && (
              <button onClick={onBack} className="mr-auto text-xs" style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
            )}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.25)' }}>
              <Zap size={15} style={{ color: '#00d4aa' }} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">OptiFleet</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>Welcome back</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Sign in to your fleet dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Email address</label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="h-11"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' } as React.CSSProperties}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Password</label>
                <button type="button" className="text-xs font-medium" style={{ color: '#00d4aa', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="h-11"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' } as React.CSSProperties}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 mt-1 transition-opacity disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #00d4aa, #00b894)', color: '#0d1117' }}
            >
              {loading
                ? <><span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#0d1117' }} />Signing in…</>
                : <>Sign in <ArrowRight size={15} /></>
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No account?{' '}
              <button className="font-medium" style={{ color: '#00d4aa', background: 'none', border: 'none', cursor: 'pointer' }}>
                Contact sales
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>opti-fleet.vercel.app · React 18 + TypeScript · Jakarta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
