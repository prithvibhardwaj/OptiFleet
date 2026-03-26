import { useState } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import { Toaster } from './components/ui/sonner';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import OrdersPage from './components/OrdersPage';
import OptimizeRoutePage from './components/OptimizeRoutePage';
import RoutesPage from './components/RoutesPage';
import DriverView from './components/DriverView';
import AnalyticsPage from './components/AnalyticsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import PricingPage from './components/PricingPage';
import AppSidebar from './components/AppSidebar';
import DataSeeder from './components/DataSeeder';

export type PageType = 'login' | 'dashboard' | 'orders' | 'optimize' | 'routes' | 'driver' | 'analytics' | 'reports' | 'settings' | 'pricing';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'orders':
        return <OrdersPage />;
      case 'optimize':
        return <OptimizeRoutePage />;
      case 'routes':
        return <RoutesPage />;
      case 'driver':
        return <DriverView />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'pricing':
        return <PricingPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
      <DataSeeder />
      <Toaster />
    </SidebarProvider>
  );
}
