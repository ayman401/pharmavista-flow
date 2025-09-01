import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Pill,
  ShoppingCart,
  TrendingUp,
  Bell,
  BarChart3,
  Users,
  Menu,
  X,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "الرئيسية", href: "/dashboard", icon: Home },
  { name: "إدارة الأدوية", href: "/medicines", icon: Pill },
  { name: "المبيعات", href: "/sales", icon: ShoppingCart },
  { name: "المشتريات", href: "/purchases", icon: TrendingUp },
  { name: "التنبيهات", href: "/alerts", icon: Bell },
  { name: "التقارير", href: "/reports", icon: BarChart3 },
  { name: "المستخدمين", href: "/users", icon: Users },
];

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-72 transform bg-card border-l border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg pharmacy-gradient">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-card-foreground">
                نظام إدارة الصيدلية
              </h1>
              <p className="text-sm text-muted-foreground">
                Pharmacy Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-right">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">ص</span>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-card-foreground">صيدلي رئيسي</p>
                <p className="text-xs text-muted-foreground">admin@pharmacy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}