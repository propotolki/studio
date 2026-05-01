"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Loader2 } from "lucide-react";
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

    // Simulate API call
    setTimeout(() => {
      if (phone === 'host') {
        toast({ title: "Welcome, Host!", description: "Redirecting to host cabinet." });
        router.push('/owner');
      } else if (phone === 'admin') {
        toast({ title: "Welcome, Admin!", description: "Redirecting to moderation panel." });
        router.push('/admin');
      } else if (phone && password) {
        toast({ title: "Login Successful", description: "Welcome! Opening rental marketplace." });
        router.push('/menu');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid phone number or password.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4" style={{backgroundImage: 'url(https://placehold.co/1920x1080.png)'}} data-ai-hint="coffee shop interior">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <Card className="w-full max-w-sm z-10 animate-fade-in-up">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Coffee className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">VK Rental Mini App</CardTitle>
            <CardDescription>Войдите через демо-учетку (далее подключается VK ID)</CardDescription>
            <CardDescription className="text-xs pt-2">Demo: введите host или admin в поле телефона для разных ролей.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Login</Label>
              <Input id="phone" type="text" placeholder="host | admin | any user login" required value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
