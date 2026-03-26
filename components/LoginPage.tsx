import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { TrendingUp, MapPin, Zap } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.svg" alt="OptiFleet Logo" className="h-16 w-auto object-contain brightness-0 invert" />
          </div>
          
          <div className="space-y-6 mt-16">
            <h2 className="text-white text-4xl leading-tight">
              Intelligent Fleet<br />
              Optimization Platform
            </h2>
            <p className="text-blue-100 text-lg max-w-md">
              AI-powered route optimization, real-time tracking, and sustainability reporting for modern logistics.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <TrendingUp className="w-6 h-6 text-white mb-2" />
            <p className="text-2xl text-white mb-1">40%</p>
            <p className="text-blue-100 text-sm">Cost Reduction</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <MapPin className="w-6 h-6 text-white mb-2" />
            <p className="text-2xl text-white mb-1">98%</p>
            <p className="text-blue-100 text-sm">On-Time Delivery</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <Zap className="w-6 h-6 text-white mb-2" />
            <p className="text-2xl text-white mb-1">60%</p>
            <p className="text-blue-100 text-sm">CO₂ Saved</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.svg" alt="OptiFleet Logo" className="h-20 w-auto object-contain" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ken@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-blue-600 hover:text-blue-700">
                Contact sales
              </button>
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Trusted by leading companies in pest control, laundry, cleaning,<br />
              construction, catering, relocation, and aircon servicing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
