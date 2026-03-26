import { PageType } from '../App';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from './ui/sidebar';
import {
  LayoutDashboard,
  Package,
  Route,
  Car,
  BarChart3,
  FileText,
  Settings,
  Truck,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface AppSidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const menuItems = [
  { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders' as PageType, label: 'Orders', icon: Package },
  { id: 'optimize' as PageType, label: 'Optimize Route', icon: Route },
  { id: 'routes' as PageType, label: 'Route Optimization Summary', icon: BarChart3 },
  { id: 'driver' as PageType, label: 'Driver View', icon: Car },
  { id: 'analytics' as PageType, label: 'Analytics', icon: BarChart3 },
  { id: 'reports' as PageType, label: 'ESG Reports', icon: FileText },
  { id: 'settings' as PageType, label: 'Settings', icon: Settings },
];

export default function AppSidebar({ currentPage, setCurrentPage }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="OptiFleet Logo" className="h-12 w-auto object-contain" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setCurrentPage(item.id)}
                    isActive={currentPage === item.id}
                    tooltip={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between gap-3 mb-3 bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-blue-100 text-blue-600">KT</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">Ken Tan</p>
              <p className="text-xs text-muted-foreground truncate">Free</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('pricing')}
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Upgrade
          </button>
        </div>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full px-2 py-1.5 rounded-lg hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
