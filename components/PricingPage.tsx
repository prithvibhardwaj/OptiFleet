import { useState } from 'react';
import { Check, Zap, Crown, Building2 } from 'lucide-react';

type FleetType = '2-wheeler' | '4-wheeler';
type Billing = 'monthly' | 'yearly';

interface Tier { name: string; vehicles: string; monthlyPrice: number; yearlyPrice: number; popular?: boolean; features: string[]; }

const twoW: Tier[] = [
  { name: 'Starter', vehicles: '1–10 vehicles', monthlyPrice: 20, yearlyPrice: 200, features: ['Up to 10 two-wheelers', 'Real-time GPS tracking', 'Basic route optimization', 'Mobile driver app', 'Email support', 'CSV order upload'] },
  { name: 'Growth', vehicles: '11–20 vehicles', monthlyPrice: 18, yearlyPrice: 180, popular: true, features: ['Up to 20 two-wheelers', 'Real-time GPS tracking', 'Advanced route optimization', 'Mobile driver app', 'Priority support', 'CSV order upload', 'Analytics dashboard', 'ESG reporting'] },
  { name: 'Professional', vehicles: '21–30 vehicles', monthlyPrice: 17, yearlyPrice: 170, features: ['Up to 30 two-wheelers', 'All Growth features', 'Custom integrations', 'API access'] },
  { name: 'Enterprise', vehicles: '30+ vehicles', monthlyPrice: 15, yearlyPrice: 150, features: ['Unlimited two-wheelers', 'AI-powered optimization', 'Dedicated support', 'White-label options', 'Custom SLA'] },
];

const fourW: Tier[] = [
  { name: 'Starter', vehicles: '1–10 vehicles', monthlyPrice: 30, yearlyPrice: 300, features: ['Up to 10 four-wheelers', 'Real-time GPS tracking', 'Basic route optimization', 'Mobile driver app', 'Email support', 'CSV order upload'] },
  { name: 'Growth', vehicles: '11–20 vehicles', monthlyPrice: 28, yearlyPrice: 280, popular: true, features: ['Up to 20 four-wheelers', 'Real-time GPS tracking', 'Advanced route optimization', 'Mobile driver app', 'Priority support', 'CSV order upload', 'Analytics dashboard', 'ESG reporting'] },
  { name: 'Professional', vehicles: '21–30 vehicles', monthlyPrice: 27, yearlyPrice: 270, features: ['Up to 30 four-wheelers', 'All Growth features', 'Custom integrations', 'API access'] },
  { name: 'Enterprise', vehicles: '30+ vehicles', monthlyPrice: 25, yearlyPrice: 250, features: ['Unlimited four-wheelers', 'AI-powered optimization', 'Dedicated support', 'White-label options', 'Custom SLA'] },
];

const icons = [<Zap size={16} />, <Building2 size={16} />, <Building2 size={16} />, <Crown size={16} />];

export default function PricingPage() {
  const [fleet, setFleet] = useState<FleetType>('2-wheeler');
  const [billing, setBilling] = useState<Billing>('monthly');
  const tiers = fleet === '2-wheeler' ? twoW : fourW;

  const Toggle = ({ value, set, opt1, opt2, extra }: { value: string; set: (v: any) => void; opt1: string; opt2: string; extra?: React.ReactNode }) => (
    <div style={{ display: 'inline-flex', background: 'var(--bg-raised)', border: '1px solid var(--border-mid)', borderRadius: 8, padding: 3 }}>
      {[opt1, opt2].map(o => (
        <button key={o} onClick={() => set(o)} style={{ padding: '0.3125rem 0.875rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-ui)', fontWeight: value === o ? 500 : 400, background: value === o ? 'var(--bg-active)' : 'transparent', color: value === o ? 'var(--tx-hi)' : 'var(--tx-mid)', transition: 'all 140ms', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {o}{o === opt2 && extra}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2.5rem 1.625rem' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'var(--teal-dim)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 999, padding: '0.25rem 0.875rem', fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 600, marginBottom: '1rem' }}>
            <Zap size={11} /> Simple Pricing
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Upgrade your plan</h1>
          <p style={{ fontSize: '1rem', color: 'var(--tx-mid)', marginBottom: '1.5rem' }}>Choose the perfect plan for your fleet size</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Toggle value={fleet} set={setFleet} opt1="2-wheeler" opt2="4-wheeler" />
            <Toggle value={billing} set={setBilling} opt1="monthly" opt2="yearly"
              extra={<span style={{ background: 'var(--green-dim)', color: 'var(--green)', borderRadius: 999, padding: '0.0625rem 0.5rem', fontSize: '0.625rem', fontWeight: 700 }}>Save 17%</span>} />
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {tiers.map((tier, i) => (
            <div key={tier.name} style={{
              background: tier.popular ? 'linear-gradient(135deg, rgba(59,158,255,0.06) 0%, rgba(0,212,170,0.04) 100%)' : 'var(--bg-raised)',
              border: `1px solid ${tier.popular ? 'rgba(0,212,170,0.3)' : 'var(--border-dim)'}`,
              borderRadius: 'var(--r-xl)',
              padding: '1.375rem',
              position: 'relative',
              transition: 'border-color 200ms, transform 200ms',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tier.popular ? 'rgba(0,212,170,0.5)' : 'var(--border-mid)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = tier.popular ? 'rgba(0,212,170,0.3)' : 'var(--border-dim)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
              {tier.popular && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--teal)', color: '#000', borderRadius: 999, padding: '0.1875rem 0.75rem', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
              )}
              {/* Icon + name */}
              <div style={{ textAlign: 'center', marginBottom: '1.125rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: tier.popular ? 'var(--teal-dim)' : 'var(--bg-active)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.625rem', color: tier.popular ? 'var(--teal)' : 'var(--tx-mid)' }}>{icons[i]}</div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{tier.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--tx-lo)', marginTop: 2 }}>{tier.vehicles}</p>
              </div>
              {/* Price */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.125rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--tx-lo)' }}>$</span>
                  <span className="mono" style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: tier.popular ? 'var(--teal)' : 'var(--tx-hi)' }}>
                    {billing === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--tx-lo)' }}>USD/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>per driver</p>
              </div>
              {/* CTA */}
              <button className={tier.popular ? 'btn btn-primary' : 'btn btn-secondary'} style={{ width: '100%', justifyContent: 'center', marginBottom: '1.125rem', height: 38 }}>
                {tier.popular ? 'Get Started' : 'Upgrade'}
              </button>
              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tier.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={13} style={{ color: tier.popular ? 'var(--teal)' : 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--tx-lo)' }}>All plans include a 14-day free trial. No credit card required.</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--tx-lo)', marginTop: 4 }}>Need a custom plan? <button style={{ color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem' }}>Contact sales</button></p>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.125rem' }}>Frequently Asked Questions</h2>
          {[
            { q: 'How does the pricing work?', a: 'You pay per driver per month (or year). The price per driver decreases as your fleet size grows, giving you better economies of scale.' },
            { q: 'Can I switch between plans?', a: 'Yes. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.' },
            { q: "What's the difference between 2-wheeler and 4-wheeler pricing?", a: '4-wheeler fleets typically involve higher-value deliveries and different operational requirements, which is reflected in the pricing.' },
          ].map(faq => (
            <div key={faq.q} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 'var(--r-lg)', padding: '1.125rem', marginBottom: '0.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}>{faq.q}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}