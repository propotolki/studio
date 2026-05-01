"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (phone === 'host') {
        toast({ title: "Добро пожаловать, хост!", description: "Переход в кабинет арендодателя." });
        router.push('/owner');
      } else if (phone === 'admin') {
        toast({ title: "Добро пожаловать, админ!", description: "Переход в панель модерации." });
        router.push('/admin');
      } else if (phone && password) {
        toast({ title: "Вход выполнен", description: "Открываем каталог жилья." });
        router.push('/catalog');
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: "Введите логин и пароль.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4" style={{backgroundImage: 'url(https://placehold.co/1920x1080.png)'}} data-ai-hint="modern apartment interior">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <Card className="w-full max-w-sm z-10 animate-fade-in-up">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Home className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">VK Rental</CardTitle>
            <CardDescription>Войдите через демо-учетку (далее подключается VK ID)</CardDescription>
            <CardDescription className="text-xs pt-2">Demo: введите host или admin для разных ролей.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Логин</Label>
              <Input id="phone" type="text" placeholder="host | admin | любой логин" required value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Войти'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
