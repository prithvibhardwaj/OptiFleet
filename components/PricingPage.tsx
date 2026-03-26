import { useState } from 'react';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type FleetType = '2-wheeler' | '4-wheeler';

interface PricingTier {
  name: string;
  vehicles: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
}

const twoWheelerTiers: PricingTier[] = [
  {
    name: 'Starter',
    vehicles: '1-10 vehicles',
    monthlyPrice: 20,
    yearlyPrice: 200,
    features: [
      'Up to 10 two-wheelers',
      'Real-time GPS tracking',
      'Basic route optimization',
      'Mobile driver app',
      'Email support',
      'CSV order upload',
    ],
  },
  {
    name: 'Growth',
    vehicles: '11-20 vehicles',
    monthlyPrice: 18,
    yearlyPrice: 180,
    popular: true,
    features: [
      'Up to 20 two-wheelers',
      'Real-time GPS tracking',
      'Advanced route optimization',
      'Mobile driver app',
      'Priority support',
      'CSV order upload',
      'Analytics dashboard',
      'ESG reporting',
    ],
  },
  {
    name: 'Professional',
    vehicles: '21-30 vehicles',
    monthlyPrice: 17,
    yearlyPrice: 170,
    features: [
      'Up to 30 two-wheelers',
      'Real-time GPS tracking',
      'Advanced route optimization',
      'Mobile driver app',
      'Priority support',
      'CSV order upload',
      'Analytics dashboard',
      'ESG reporting',
      'Custom integrations',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    vehicles: '30+ vehicles',
    monthlyPrice: 15,
    yearlyPrice: 150,
    features: [
      'Unlimited two-wheelers',
      'Real-time GPS tracking',
      'AI-powered optimization',
      'Mobile driver app',
      'Dedicated support',
      'CSV order upload',
      'Advanced analytics',
      'ESG reporting',
      'Custom integrations',
      'API access',
      'White-label options',
      'Custom SLA',
    ],
  },
];

const fourWheelerTiers: PricingTier[] = [
  {
    name: 'Starter',
    vehicles: '1-10 vehicles',
    monthlyPrice: 30,
    yearlyPrice: 300,
    features: [
      'Up to 10 four-wheelers',
      'Real-time GPS tracking',
      'Basic route optimization',
      'Mobile driver app',
      'Email support',
      'CSV order upload',
    ],
  },
  {
    name: 'Growth',
    vehicles: '11-20 vehicles',
    monthlyPrice: 28,
    yearlyPrice: 280,
    popular: true,
    features: [
      'Up to 20 four-wheelers',
      'Real-time GPS tracking',
      'Advanced route optimization',
      'Mobile driver app',
      'Priority support',
      'CSV order upload',
      'Analytics dashboard',
      'ESG reporting',
    ],
  },
  {
    name: 'Professional',
    vehicles: '21-30 vehicles',
    monthlyPrice: 27,
    yearlyPrice: 270,
    features: [
      'Up to 30 four-wheelers',
      'Real-time GPS tracking',
      'Advanced route optimization',
      'Mobile driver app',
      'Priority support',
      'CSV order upload',
      'Analytics dashboard',
      'ESG reporting',
      'Custom integrations',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    vehicles: '30+ vehicles',
    monthlyPrice: 25,
    yearlyPrice: 250,
    features: [
      'Unlimited four-wheelers',
      'Real-time GPS tracking',
      'AI-powered optimization',
      'Mobile driver app',
      'Dedicated support',
      'CSV order upload',
      'Advanced analytics',
      'ESG reporting',
      'Custom integrations',
      'API access',
      'White-label options',
      'Custom SLA',
    ],
  },
];

export default function PricingPage() {
  const [fleetType, setFleetType] = useState<FleetType>('2-wheeler');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const currentTiers = fleetType === '2-wheeler' ? twoWheelerTiers : fourWheelerTiers;

  const getTierIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Zap className="w-6 h-6" />;
      case 1:
        return <Building2 className="w-6 h-6" />;
      case 2:
        return <Building2 className="w-6 h-6" />;
      case 3:
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Upgrade your plan</h1>
          <p className="text-slate-400 text-lg mb-8">
            Choose the perfect plan for your fleet size
          </p>

          {/* Fleet Type Toggle */}
          <div className="inline-flex items-center bg-slate-800/50 rounded-lg p-1 mb-8">
            <button
              onClick={() => setFleetType('2-wheeler')}
              className={`px-6 py-2 rounded-md transition-all ${
                fleetType === '2-wheeler'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Wheeler
            </button>
            <button
              onClick={() => setFleetType('4-wheeler')}
              className={`px-6 py-2 rounded-md transition-all ${
                fleetType === '4-wheeler'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4-Wheeler
            </button>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-800/50 rounded-lg p-1 ml-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`relative p-6 border-2 transition-all hover:scale-105 ${
                tier.popular
                  ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/50 shadow-xl shadow-indigo-500/20'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 hover:bg-indigo-600 text-white">
                  POPULAR
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  tier.popular ? 'bg-indigo-600/20' : 'bg-slate-700/50'
                }`}>
                  {getTierIcon(index)}
                </div>
                <h3 className="text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400">{tier.vehicles}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-slate-400 text-lg mr-1">$</span>
                  <span className="text-white text-5xl">
                    {billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                  <span className="text-slate-400 text-sm ml-2">
                    USD / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className="text-slate-500 text-sm">per driver</p>
              </div>

              <Button
                className={`w-full mb-6 ${
                  tier.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {tier.popular ? 'Get Started' : 'Upgrade'}
              </Button>

              <div className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Need a custom plan?{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">
              Contact sales
            </a>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700/50 p-6">
              <h4 className="text-white mb-2">How does the pricing work?</h4>
              <p className="text-slate-400 text-sm">
                You pay per driver per month (or year). The price per driver decreases as your fleet size increases, giving you better economies of scale.
              </p>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50 p-6">
              <h4 className="text-white mb-2">Can I switch between plans?</h4>
              <p className="text-slate-400 text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50 p-6">
              <h4 className="text-white mb-2">What's the difference between 2-wheeler and 4-wheeler pricing?</h4>
              <p className="text-slate-400 text-sm">
                4-wheeler fleets have different operational requirements and typically involve higher-value deliveries, which is reflected in the pricing structure.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
