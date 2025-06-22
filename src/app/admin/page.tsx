import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Utensils, ShoppingCart } from "lucide-react"
import { MenuManager } from "@/components/admin/menu-manager";
import { UserManager } from "@/components/admin/user-manager";
import { OrderPlacer } from "@/components/admin/order-placer";
import { ChartContainer, ChartTooltip, ChartTooltipContent, Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from "@/components/ui/chart";
import { users, drinks } from "@/lib/data";

const chartData = users.filter(u => u.role === 'admin').map(admin => ({
  name: admin.name.split(' ')[0],
  orders: admin.ordersCompleted,
  fill: `var(--color-orders)`,
}));

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
}

export default function AdminPage() {
  const totalUsers = users.length;
  const totalMenuItems = drinks.length;
  const totalOrders = users.reduce((acc, user) => acc + (user.ordersCompleted || 0), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Manage your cafe operations from one place.</p>
        
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="stats"><BarChart className="w-4 h-4 mr-2 hidden sm:inline-block"/>Statistics</TabsTrigger>
            <TabsTrigger value="menu"><Utensils className="w-4 h-4 mr-2 hidden sm:inline-block"/>Menu</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2 hidden sm:inline-block"/>Users</TabsTrigger>
            <TabsTrigger value="order"><ShoppingCart className="w-4 h-4 mr-2 hidden sm:inline-block"/>Place Order</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+5 since last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMenuItems}</div>
                  <p className="text-xs text-muted-foreground">2 new drinks added</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Orders by Barista</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <RechartsBarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="orders" radius={8} />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <MenuManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>
          
          <TabsContent value="order">
            <OrderPlacer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
