'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Database,
  Zap,
  Palette,
  Menu,
  X,
  Users,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useAuthStore } from '@/stores/authStore';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Overview and statistics'
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
    description: 'Manage users'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'View user statistics'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    description: 'Generate reports'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System configuration'
  }
];

const systemInfo = [
  {
    title: 'Database',
    value: 'MongoDB',
    icon: Database,
    description: 'Cloud database'
  },
  {
    title: 'Security',
    value: 'JWT',
    icon: Shield,
    description: 'Authentication'
  },
  {
    title: 'Performance',
    value: 'Fast',
    icon: Zap,
    description: 'Optimized for speed'
  },
  {
    title: 'UI Framework',
    value: 'shadcn/ui',
    icon: Palette,
    description: 'Modern components'
  }
];

export function Sidebar({ className }: SidebarProps) {
  const { collapsed, hidden, toggleCollapsed, toggleHidden } = useSidebarStore();
  const { user, logout, isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (hidden) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={toggleHidden}
          size="sm"
          variant="outline"
          className="h-10 w-10 p-0 rounded-full shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 ease-in-out z-40",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <div>
              <h2 className="font-bold text-sm">User Management</h2>
              <p className="text-xs text-muted-foreground">System</p>
            </div>
          </div>
        )}
        <div className={cn(
          "flex items-center space-x-1",
          collapsed ? "justify-center w-full" : ""
        )}>
          <Button
            onClick={toggleHidden}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            onClick={toggleCollapsed}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group hover:shadow-md",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent/80 hover:text-accent-foreground hover:scale-[1.02]"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                      isActive
                        ? "text-primary-foreground"
                        : "text-foreground group-hover:text-accent-foreground group-hover:scale-110"
                    )} />
                    {!collapsed && (
                      <div className="flex-1 min-w-0">
                        <div className={cn(
                          "font-medium text-sm transition-colors duration-200",
                          isActive
                            ? "text-primary-foreground font-semibold"
                            : "text-foreground group-hover:text-accent-foreground"
                        )}>
                          {item.title}
                        </div>
                        {item.description && (
                          <div className={cn(
                            "text-xs transition-colors duration-200",
                            isActive
                              ? "text-primary-foreground/90"
                              : "text-muted-foreground group-hover:text-accent-foreground"
                          )}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* System Info */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              System Info
            </h3>
            <div className="space-y-3">
              {systemInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50 hover:bg-muted/80 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                  <info.icon className="h-4 w-4 text-foreground group-hover:text-accent-foreground transition-colors duration-200" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground group-hover:text-accent-foreground transition-colors duration-200">{info.title}</div>
                    <div className="text-xs text-muted-foreground group-hover:text-accent-foreground transition-colors duration-200">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {isAuthenticated && user ? (
          !collapsed ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-primary-foreground font-bold text-xs">
                    {user.email?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground group-hover:text-accent-foreground transition-colors duration-200">
                    {user.email || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-accent-foreground transition-colors duration-200">
                    {user.email}
                  </div>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer">
                <span className="text-primary-foreground font-bold text-xs">
                  {user.email?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )
        ) : (
          !collapsed ? (
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 hover:shadow-sm transition-all duration-200 cursor-pointer group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground group-hover:text-accent-foreground transition-colors duration-200">Admin User</div>
                <div className="text-xs text-muted-foreground group-hover:text-accent-foreground transition-colors duration-200">admin@example.com</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-2 rounded-lg hover:bg-accent/50 hover:shadow-sm transition-all duration-200 cursor-pointer group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

Sidebar.displayName = 'Sidebar';