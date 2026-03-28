import { PageType } from '../App';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from './ui/sidebar';
import { LayoutDashboard, Package, Route, Car, BarChart3, FileText, Settings, LogOut, Zap, ChevronRight } from 'lucide-react';

interface AppSidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const groups = [
  {
    key: 'fleet', label: 'Fleet', items: [
      { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'orders' as PageType, label: 'Orders', icon: Package },
      { id: 'optimize' as PageType, label: 'Optimize Route', icon: Route },
      { id: 'routes' as PageType, label: 'Route Summary', icon: BarChart3 },
      { id: 'driver' as PageType, label: 'Driver View', icon: Car },
    ]
  },
  {
    key: 'insights', label: 'Insights', items: [
      { id: 'analytics' as PageType, label: 'Analytics', icon: BarChart3 },
      { id: 'reports' as PageType, label: 'ESG Reports', icon: FileText },
    ]
  },
  {
    key: 'system', label: 'System', items: [
      { id: 'settings' as PageType, label: 'Settings', icon: Settings },
    ]
  },
];

export default function AppSidebar({ currentPage, setCurrentPage }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader style={{ padding: '1rem 0.875rem', borderBottom: '1px solid var(--border-dim)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--teal-dim)', border: '1px solid rgba(0,212,170,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', flexShrink: 0 }}>
            <Zap size={14} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--tx-hi)', lineHeight: 1.2 }}>OptiFleet</div>
            <div style={{ fontSize: '0.5625rem', color: 'var(--tx-lo)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Fleet Intelligence</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ padding: '0.375rem 0' }}>
        {groups.map(g => (
          <SidebarGroup key={g.key} style={{ padding: '0.5rem 0.5rem' }}>
            <SidebarGroupLabel style={{ padding: '0.25rem 0.5rem 0.25rem', marginBottom: '0.125rem' }}>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu style={{ gap: 1 }}>
                {g.items.map(item => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton onClick={() => setCurrentPage(item.id)} isActive={currentPage === item.id} tooltip={item.label} style={{ height: 32 }}>
                      <item.icon size={13} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {currentPage === item.id && <ChevronRight size={11} style={{ opacity: 0.45 }} />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter style={{ borderTop: '1px solid var(--border-dim)', padding: '0.75rem' }}>
        <div style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-dim)', borderRadius: 9, padding: '0.5625rem 0.75rem', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--blue-dim)', border: '1px solid rgba(59,158,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, color: 'var(--blue)', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>KT</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--tx-hi)', lineHeight: 1.25 }}>Ken Tan</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)', lineHeight: 1.25 }}>Free plan</div>
          </div>
          <button onClick={() => setCurrentPage('pricing')} style={{ background: 'var(--teal-dim)', border: '1px solid rgba(0,212,170,0.22)', color: 'var(--teal)', borderRadius: 5, padding: '0.1875rem 0.5rem', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Upgrade
          </button>
        </div>
        <button onClick={() => setCurrentPage('login')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.375rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, color: 'var(--tx-lo)', fontSize: '0.8125rem', transition: 'all 150ms' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--tx-mid)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = 'var(--tx-lo)'; }}>
          <LogOut size={13} /><span>Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}