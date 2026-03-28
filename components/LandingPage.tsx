import { useEffect, useRef } from 'react';
import { Zap, Route, MapPin, BarChart3, FileText, Leaf, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

// ── Animated route-network canvas background ──────────────────────────────────
function RouteNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let scrollY = 0;
    const PARALLAX = 0.35;       // how fast bg moves relative to scroll
    const VIRTUAL_MULT = 4;      // virtual canvas spans 4× viewport height

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    // Build nodes distributed across virtual height
    const buildScene = () => {
      const vH = window.innerHeight * VIRTUAL_MULT;
      const NODE_COUNT = 55;
      const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * vH,
        r: Math.random() * 1.8 + 1.2,
        isDepot: i < 5,
        hue: Math.random() > 0.55 ? 'teal' as const : 'blue' as const,
        phase: Math.random() * Math.PI * 2,
      }));

      const MAX_DIST = 210;
      type Edge = { a: number; b: number; len: number };
      const edges: Edge[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) edges.push({ a: i, b: j, len: d });
        }
      }

      const DOT_COUNT = 22;
      const dots = Array.from({ length: DOT_COUNT }, () => ({
        edgeIdx: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.0008 + Math.random() * 0.0018,
        hue: Math.random() > 0.5 ? 'teal' as const : 'blue' as const,
      }));

      return { nodes, edges, dots, MAX_DIST };
    };

    let scene = buildScene();
    window.addEventListener('resize', () => { scene = buildScene(); });

    let tick = 0;

    const draw = () => {
      const { nodes, edges, dots, MAX_DIST } = scene;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const yShift = scrollY * PARALLAX;

      ctx.save();
      ctx.translate(0, -yShift);

      // cull window  (draw only what's visible + 150px margin)
      const viewTop = yShift - 150;
      const viewBot = yShift + H + 150;

      // edges
      edges.forEach(({ a, b, len }) => {
        const na = nodes[a]; const nb = nodes[b];
        if (na.y < viewTop && nb.y < viewTop) return;
        if (na.y > viewBot && nb.y > viewBot) return;
        const alpha = 0.05 + (1 - len / MAX_DIST) * 0.09;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(0,212,170,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // nodes
      nodes.forEach(n => {
        if (n.y < viewTop || n.y > viewBot) return;
        const pulse = Math.sin(tick * 0.025 + n.phase) * 0.5 + 0.5;
        const teal = n.hue === 'teal';

        if (n.isDepot) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3 + pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,170,${0.06 + pulse * 0.06})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = teal
          ? `rgba(0,212,170,${n.isDepot ? 0.7 + pulse * 0.3 : 0.25 + pulse * 0.2})`
          : `rgba(59,158,255,${0.2 + pulse * 0.2})`;
        ctx.fill();
      });

      // moving vehicle dots
      dots.forEach(dot => {
        if (dot.edgeIdx >= edges.length) return;
        dot.t += dot.speed;
        if (dot.t > 1) dot.t = 0;

        const { a, b } = edges[dot.edgeIdx];
        const na = nodes[a]; const nb = nodes[b];
        const x = na.x + (nb.x - na.x) * dot.t;
        const y = na.y + (nb.y - na.y) * dot.t;
        if (y < viewTop || y > viewBot) return;

        // glow
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = dot.hue === 'teal'
          ? 'rgba(0,212,170,0.12)'
          : 'rgba(59,158,255,0.12)';
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = dot.hue === 'teal' ? '#00d4aa' : '#3b9eff';
        ctx.fill();
      });

      ctx.restore();
      tick++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.75 }}
    />
  );
}

// ── Bidirectional scroll-reveal hook ─────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        } else {
          el.classList.remove('revealed');
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { val: '40%', label: 'Fuel cost reduction', sub: 'vs unoptimized routes', color: '#00d4aa' },
  { val: '98%', label: 'On-time delivery rate', sub: 'across all fleet types', color: '#3b9eff' },
  { val: '25%', label: 'CO₂ emissions cut', sub: 'verified by NEA methodology', color: '#4ade80' },
  { val: '3×', label: 'Faster dispatch', sub: 'vs manual scheduling', color: '#f59e0b' },
];

const features = [
  { icon: <Route size={22} />, title: 'Nearest-Neighbor Route Optimization', desc: 'Geocodes every address in real time via Google Maps, then runs a nearest-neighbor TSP heuristic — cutting total distance by 18–25% on average.', color: '#00d4aa' },
  { icon: <MapPin size={22} />, title: 'Live Fleet Tracking', desc: 'Every vehicle is plotted on a live Google Map. En-route vehicles animate along their actual assigned waypoints, updating every 3 seconds.', color: '#3b9eff' },
  { icon: <BarChart3 size={22} />, title: 'Driver Performance Analytics', desc: 'Track on-time delivery rate, fuel efficiency, and completed stops per driver. Month-over-month charts show where the fleet is improving.', color: '#a78bfa' },
  { icon: <FileText size={22} />, title: 'Automated ESG Compliance Reports', desc: 'One click generates a branded PDF — Full ESG Report, EnterpriseSG EDG Green Lane, or NEA Compliance declaration.', color: '#f59e0b' },
  { icon: <Leaf size={22} />, title: 'Carbon Emissions Tracking', desc: 'Every route calculates fuel consumption and CO₂ output in real time. Monthly savings roll up into the ESG report automatically.', color: '#4ade80' },
  { icon: <TrendingUp size={22} />, title: 'Order Management & CSV Import', desc: 'Bulk-import orders from any spreadsheet in seconds. Every order is tracked from pending to assigned to delivered.', color: '#f472b6' },
];

const stories = [
  { quote: 'We cut our fuel bill by 38% in the first month. The route optimization just works — I type in the stops and it handles everything.', name: 'Jason Lim', role: 'Operations Manager', company: 'Ace Pest Control Pte Ltd', initials: 'JL', color: '#00d4aa' },
  { quote: 'The ESG report saved us weeks of manual work for our EnterpriseSG grant application. It generated the exact format they needed in one click.', name: 'Sarah Tan', role: 'Fleet Coordinator', company: 'SwiftClean Solutions', initials: 'ST', color: '#3b9eff' },
  { quote: 'Our drivers used to call in asking for directions. Now they just follow the app. On-time delivery went from 82% to 97% within 6 weeks.', name: 'David Ng', role: 'Logistics Director', company: 'IslandMove Logistics', initials: 'DN', color: '#a78bfa' },
];

const industries = ['Pest Control', 'Laundry & Cleaning', 'Catering & Food Delivery', 'Construction Logistics', 'Healthcare Supplies', 'Aircon Servicing', 'Event Logistics', 'E-commerce Last Mile'];

// ── Component ─────────────────────────────────────────────────────────────────
export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <>
      <style>{`
        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(22px);
          animation: wordIn 0.65s ease forwards;
        }
        @keyframes wordIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-glass {
          background: rgba(13,17,23,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .feature-card {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,212,170,0.22) !important;
          background: rgba(0,212,170,0.035) !important;
        }
        .pill {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.45);
          transition: border-color 0.2s, color 0.2s;
          cursor: default;
        }
        .pill:hover { border-color: rgba(0,212,170,0.4); color: #00d4aa; }
      `}</style>

      {/* Animated canvas background */}
      <RouteNetworkBg />

      <div style={{ position: 'relative', zIndex: 2, background: 'transparent', color: 'rgba(255,255,255,0.85)', fontFamily: 'system-ui,-apple-system,sans-serif', overflowX: 'hidden' }}>

        {/* Page bg behind canvas */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#0d1117' }} />

        {/* All content above canvas */}
        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* ── Nav ── */}
          <nav className="nav-glass sticky top-0 z-50 flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.25)' }}>
                <Zap size={15} style={{ color: '#00d4aa' }} />
              </div>
              <span className="font-bold text-base tracking-tight text-white">OptiFleet</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Fleet optimization for Singapore SMEs</span>
              <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg,#00d4aa,#00b894)', color: '#0d1117' }}>
                Sign in <ArrowRight size={14} />
              </button>
            </div>
          </nav>

          {/* ── Hero ── */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 overflow-hidden">
            {/* Section-level glow (on top of canvas) */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,170,0.07) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-semibold" style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.25)', color: '#00d4aa' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Built for Singapore logistics
              </div>

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                {['Smarter', 'routes.'].map((w, i) => (
                  <span key={w} className="hero-word" style={{ animationDelay: `${i * 120}ms`, marginRight: '0.25em' }}>{w}</span>
                ))}
                <br />
                {['Cleaner', 'cities.'].map((w, i) => (
                  <span key={w} className="hero-word" style={{ animationDelay: `${(i + 2) * 120}ms`, marginRight: '0.25em', background: 'linear-gradient(135deg,#00d4aa,#3b9eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{w}</span>
                ))}
              </h1>

              <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
                AI-powered route optimization, live fleet tracking, and automated ESG compliance reporting — built for Southeast Asian logistics.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button onClick={onLogin} className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#00d4aa,#00b894)', color: '#0d1117' }}>
                  Get started free <ArrowRight size={17} />
                </button>
                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)' }}>
                  See how it works
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown size={16} className="animate-bounce" />
            </div>
          </section>

          {/* ── Stats ── */}
          <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,17,23,0.7)' }}>
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <Reveal key={s.val} delay={i * 80}>
                  <div className="text-center py-7 px-4 rounded-2xl feature-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-4xl font-bold tracking-tight mb-1" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-sm font-medium text-white mb-1">{s.label}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Features ── */}
          <section id="features" className="py-28 px-6" style={{ background: 'rgba(13,17,23,0.6)' }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <div className="text-center mb-16">
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#00d4aa' }}>Platform features</p>
                  <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Everything your fleet needs</h2>
                  <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.38)' }}>From first order to ESG compliance report — all in one platform.</p>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 65}>
                    <div className="p-6 rounded-2xl h-full feature-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}28` }}>
                        <span style={{ color: f.color }}>{f.icon}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Stories ── */}
          <section className="py-28 px-6" style={{ background: 'rgba(13,17,23,0.75)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <div className="text-center mb-16">
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#3b9eff' }}>Customer stories</p>
                  <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Fleets across Singapore trust OptiFleet</h2>
                  <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.38)' }}>From pest control to healthcare logistics.</p>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-5">
                {stories.map((s, i) => (
                  <Reveal key={s.name} delay={i * 90}>
                    <div className="p-6 rounded-2xl flex flex-col gap-4 feature-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="text-3xl leading-none" style={{ color: s.color }}>"</div>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.quote}</p>
                      <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}28` }}>{s.initials}</div>
                        <div>
                          <p className="text-sm font-semibold text-white">{s.name}</p>
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.32)' }}>{s.role} · {s.company}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Industries ── */}
          <section className="py-20 px-6" style={{ background: 'rgba(13,17,23,0.6)' }}>
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>Built for every service fleet</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {industries.map(ind => <span key={ind} className="pill">{ind}</span>)}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="py-36 px-6 relative overflow-hidden" style={{ background: 'rgba(13,17,23,0.5)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,212,170,0.08) 0%, transparent 70%)' }} />
            <Reveal>
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h2 className="text-5xl font-bold tracking-tight text-white mb-5">
                  Start optimizing<br />
                  <span style={{ background: 'linear-gradient(135deg,#00d4aa,#3b9eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>your fleet today.</span>
                </h2>
                <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>14-day free trial. No credit card required. Setup in under 5 minutes.</p>
                <button onClick={onLogin} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-transform hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#00d4aa,#00b894)', color: '#0d1117' }}>
                  Open the dashboard <ArrowRight size={19} />
                </button>
              </div>
            </Reveal>
          </section>

          {/* ── Footer ── */}
          <footer className="px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(13,17,23,0.9)' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
                <Zap size={12} style={{ color: '#00d4aa' }} />
              </div>
              <span className="text-sm font-semibold text-white">OptiFleet</span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>opti-fleet.vercel.app · React 18 + TypeScript · Singapore</p>
            <button onClick={onLogin} className="text-xs font-medium" style={{ color: '#00d4aa', background: 'none', border: 'none', cursor: 'pointer' }}>Sign in →</button>
          </footer>

        </div>{/* /z-2 content */}
      </div>
    </>
  );
}
