import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  Building2
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const medicines = [
  {
    id: 1,
    name: "باراسيتامول 500مغ",
    company: "فايزر",
    price: 12.50,
    quantity: 150,
    expiry: "2025-06-15",
    barcode: "123456789",
    category: "مسكنات",
    status: "متوفر"
  },
  {
    id: 2,
    name: "أموكسيسيلين 250مغ",
    company: "نوفارتس",
    price: 25.00,
    quantity: 8,
    expiry: "2024-12-20",
    barcode: "987654321",
    category: "مضادات حيوية",
    status: "قليل"
  },
  {
    id: 3,
    name: "فيتامين د3 1000 وحدة",
    company: "باير",
    price: 18.75,
    quantity: 0,
    expiry: "2025-03-10",
    barcode: "456789123",
    category: "فيتامينات",
    status: "نفاد"
  },
  {
    id: 4,
    name: "إيبوبروفين 400مغ",
    company: "GSK",
    price: 15.20,
    quantity: 75,
    expiry: "2025-01-08",
    barcode: "789123456",
    category: "مسكنات",
    status: "متوفر"
  }
];

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    company: "",
    price: "",
    quantity: "",
    expiry: "",
    barcode: "",
    category: "",
    description: ""
  });

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.barcode.includes(searchTerm)
  );

  const handleAddMedicine = () => {
    // Simulate API call
    console.log("Adding medicine:", newMedicine);
    toast.success("تم إضافة الدواء بنجاح");
    setIsAddDialogOpen(false);
    setNewMedicine({
      name: "",
      company: "",
      price: "",
      quantity: "",
      expiry: "",
      barcode: "",
      category: "",
      description: ""
    });
  };

  const getStatusBadge = (status: string, quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">نفاد</Badge>;
    } else if (quantity <= 10) {
      return <Badge variant="secondary">قليل</Badge>;
    } else {
      return <Badge className="bg-success text-success-foreground">متوفر</Badge>;
    }
  };

  const getExpiryStatus = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return <Badge variant="destructive" className="text-xs">منتهي قريباً</Badge>;
    } else if (diffDays <= 90) {
      return <Badge variant="secondary" className="text-xs">تحذير</Badge>;
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">إدارة الأدوية</h1>
            <p className="text-muted-foreground">
              إدارة مخزون الأدوية والمستحضرات الصيدلانية
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="pharmacy-gradient">
                <Plus className="h-4 w-4 ml-2" />
                إضافة دواء جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة دواء جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات الدواء الجديد إلى المخزون
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الدواء *</Label>
                    <Input
                      id="name"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      placeholder="مثال: باراسيتامول 500مغ"
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">الشركة المصنعة *</Label>
                    <Input
                      id="company"
                      value={newMedicine.company}
                      onChange={(e) => setNewMedicine({...newMedicine, company: e.target.value})}
                      placeholder="مثال: فايزر"
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">السعر (₪) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newMedicine.price}
                      onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})}
                      placeholder="12.50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">الكمية *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newMedicine.quantity}
                      onChange={(e) => setNewMedicine({...newMedicine, quantity: e.target.value})}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">تاريخ الانتهاء *</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newMedicine.expiry}
                      onChange={(e) => setNewMedicine({...newMedicine, expiry: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="barcode">الباركود</Label>
                    <Input
                      id="barcode"
                      value={newMedicine.barcode}
                      onChange={(e) => setNewMedicine({...newMedicine, barcode: e.target.value})}
                      placeholder="123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Select value={newMedicine.category} onValueChange={(value) => setNewMedicine({...newMedicine, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مسكنات">مسكنات</SelectItem>
                        <SelectItem value="مضادات حيوية">مضادات حيوية</SelectItem>
                        <SelectItem value="فيتامينات">فيتامينات</SelectItem>
                        <SelectItem value="أدوية مزمنة">أدوية مزمنة</SelectItem>
                        <SelectItem value="مستحضرات تجميل">مستحضرات تجميل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={newMedicine.description}
                    onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})}
                    placeholder="معلومات إضافية عن الدواء..."
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddMedicine} className="pharmacy-gradient">
                  إضافة الدواء
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث بالاسم، الشركة، أو الباركود..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
              <Button variant="outline">
                تصفية
              </Button>
              <Button variant="outline">
                تصدير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medicines Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              قائمة الأدوية ({filteredMedicines.length})
            </CardTitle>
            <CardDescription>
              جميع الأدوية المتوفرة في المخزون
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">اسم الدواء</TableHead>
                    <TableHead className="text-right">الشركة</TableHead>
                    <TableHead className="text-center">السعر</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">انتهاء الصلاحية</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="text-right">
                          <div className="font-medium text-foreground">{medicine.name}</div>
                          <div className="text-sm text-muted-foreground">{medicine.category}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {medicine.company}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          {medicine.price.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-medium">{medicine.quantity}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(medicine.status, medicine.quantity)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {medicine.expiry}
                          </div>
                          {getExpiryStatus(medicine.expiry)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toast.info("سيتم تنفيذ التعديل قريباً")}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => toast.error("سيتم تنفيذ الحذف قريباً")}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}