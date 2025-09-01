import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Pill,
  ShoppingCart,
  TrendingUp,
  Bell,
  Users,
  AlertTriangle,
  Calendar,
  Package,
  DollarSign,
  Activity
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Mock data
const stats = [
  {
    title: "إجمالي الأدوية",
    value: "2,847",
    change: "+12%",
    icon: Pill,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "مبيعات اليوم",
    value: "127",
    change: "+8%",
    icon: ShoppingCart,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "إيرادات اليوم",
    value: "₪ 4,250",
    change: "+15%",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    title: "تنبيهات",
    value: "23",
    change: "-5%",
    icon: Bell,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  }
];

const recentSales = [
  { id: "#001", customer: "أحمد محمد", amount: "₪ 85.50", time: "منذ 5 دقائق" },
  { id: "#002", customer: "فاطمة علي", amount: "₪ 120.00", time: "منذ 12 دقيقة" },
  { id: "#003", customer: "محمد سالم", amount: "₪ 45.25", time: "منذ 18 دقيقة" },
  { id: "#004", customer: "نور الدين", amount: "₪ 210.75", time: "منذ 25 دقيقة" },
];

const lowStockMedicines = [
  { name: "باراسيتامول 500مغ", current: 8, minimum: 50, status: "نفاد" },
  { name: "أموكسيسيلين 250مغ", current: 15, minimum: 30, status: "قليل" },
  { name: "إيبوبروفين 400مغ", current: 12, minimum: 25, status: "قليل" },
  { name: "فيتامين د3", current: 5, minimum: 40, status: "نفاد" },
];

const expiringMedicines = [
  { name: "أسبرين 100مغ", expiry: "2024-01-15", days: 5 },
  { name: "كريم مضاد حيوي", expiry: "2024-01-20", days: 10 },
  { name: "شراب السعال", expiry: "2024-01-25", days: 15 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground">
              مرحباً بك في نظام إدارة الصيدلية
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button className="pharmacy-gradient">
              عرض التقارير
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {stat.change}
                    </span>
                    {' من الشهر الماضي'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Sales */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                آخر المبيعات
              </CardTitle>
              <CardDescription>
                المعاملات الأخيرة في الصيدلية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{sale.customer}</p>
                        <p className="text-xs text-muted-foreground">{sale.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{sale.amount}</p>
                      <p className="text-xs text-muted-foreground">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-warning" />
                تنبيهات المخزون
              </CardTitle>
              <CardDescription>
                الأدوية التي تحتاج إعادة تموين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockMedicines.map((medicine, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{medicine.name}</p>
                        <p className="text-xs text-muted-foreground">
                          متوفر: {medicine.current} / مطلوب: {medicine.minimum}
                        </p>
                      </div>
                      <Badge
                        variant={medicine.status === "نفاد" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {medicine.status}
                      </Badge>
                    </div>
                    <Progress
                      value={(medicine.current / medicine.minimum) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expiring Medicines */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              الأدوية منتهية الصلاحية قريباً
            </CardTitle>
            <CardDescription>
              الأدوية التي ستنتهي صلاحيتها خلال 30 يوم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {expiringMedicines.map((medicine, index) => (
                <div key={index} className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <h4 className="font-medium text-foreground">{medicine.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    انتهاء الصلاحية: {medicine.expiry}
                  </p>
                  <Badge variant="destructive" className="mt-2 text-xs">
                    {medicine.days} يوم متبقي
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}