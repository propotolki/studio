"use client"

import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Home, ShieldCheck } from "lucide-react"
import { mockListings, mockUsers } from "@/lib/data";

export default function AdminPage() {
  const totalListings = mockListings.length;
  const totalUsers = mockUsers.length;
  const pendingListings = mockListings.filter(l => l.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl font-headline font-bold mb-2">Админ-панель</h1>
        <p className="text-muted-foreground mb-8">Модерация и управление платформой.</p>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="stats"><BarChart className="w-4 h-4 mr-2 hidden sm:inline-block"/>Статистика</TabsTrigger>
            <TabsTrigger value="listings"><Home className="w-4 h-4 mr-2 hidden sm:inline-block"/>Объявления</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-2 hidden sm:inline-block"/>Пользователи</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего объявлений</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalListings}</div>
                  <p className="text-xs text-muted-foreground">{pendingListings} на модерации</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Все роли</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Модерация</CardTitle>
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingListings}</div>
                  <p className="text-xs text-muted-foreground">Ожидают проверки</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings">
            <div className="border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Название</th>
                    <th className="p-3 text-left">Город</th>
                    <th className="p-3 text-left">Цена</th>
                    <th className="p-3 text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {mockListings.map(listing => (
                    <tr key={listing.id} className="border-t">
                      <td className="p-3">{listing.title}</td>
                      <td className="p-3">{listing.city}</td>
                      <td className="p-3">{listing.pricePerNight.toLocaleString('ru-RU')} ₽</td>
                      <td className="p-3">{listing.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Имя</th>
                    <th className="p-3 text-left">Телефон</th>
                    <th className="p-3 text-left">Роль</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

