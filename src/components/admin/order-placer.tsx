"use client"

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { drinks as mockDrinks, users as mockUsers } from "@/lib/data";
import type { Drink, OrderItem, User } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, User as UserIcon } from "lucide-react";


export function OrderPlacer() {
  const { toast } = useToast();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleAddToCart = (drink: Drink) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.drink.id === drink.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.drink.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { drink, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (drinkId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(drinkId);
    } else {
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.drink.id === drinkId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (drinkId: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.drink.id !== drinkId));
  };
  
  const handlePlaceOrder = () => {
      if(!selectedUser) {
          toast({ variant: 'destructive', title: 'Error', description: 'Please select a user first.'});
          return;
      }
      if(orderItems.length === 0) {
          toast({ variant: 'destructive', title: 'Error', description: 'The order is empty.'});
          return;
      }

      toast({ title: 'Order Placed!', description: `Order for ${mockUsers.find(u => u.id === selectedUser)?.name} has been placed.`});
      setOrderItems([]);
      setSelectedUser(null);
  }

  const total = orderItems.reduce((acc, item) => acc + item.drink.price * item.quantity, 0);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold font-headline mb-4">Select Drinks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDrinks.map(drink => (
            <Card key={drink.id} className="overflow-hidden">
              <CardHeader className="p-0">
                  <Image src={drink.image} alt={drink.name} width={300} height={200} className="w-full h-32 object-cover" data-ai-hint={drink.dataAiHint} />
              </CardHeader>
              <CardContent className="p-3">
                <h3 className="font-semibold truncate">{drink.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-primary">{drink.price} ₽</span>
                  <Button size="sm" onClick={() => handleAddToCart(drink)}><PlusCircle className="h-4 w-4"/></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="font-headline">New Order</CardTitle>
                <CardDescription>Create an order on behalf of a user.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="user-select" className="flex items-center mb-2"><UserIcon className="h-4 w-4 mr-2"/>Select User</Label>
                    <Select onValueChange={setSelectedUser} value={selectedUser || undefined}>
                        <SelectTrigger id="user-select">
                            <SelectValue placeholder="Select a user..." />
                        </SelectTrigger>
                        <SelectContent>
                            {mockUsers.filter(u => u.role !== 'owner').map(user => (
                                <SelectItem key={user.id} value={user.id}>{user.name} - {user.phone}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Separator/>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {orderItems.length > 0 ? orderItems.map(item => (
                         <div key={item.drink.id} className="flex items-center gap-2 text-sm">
                            <p className="flex-grow truncate">{item.drink.name}</p>
                            <span className="font-mono">{item.quantity}x</span>
                            <span className="font-semibold w-16 text-right">{item.drink.price * item.quantity} ₽</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleRemoveItem(item.drink.id)}><Trash2 className="h-4 w-4"/></Button>
                         </div>
                    )) : (
                        <div className="text-center text-muted-foreground py-8">
                            <ShoppingCart className="h-8 w-8 mx-auto mb-2"/>
                            <p>No items in order</p>
                        </div>
                    )}
                </div>
                <Separator/>
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{total} ₽</span>
                </div>
                <Button className="w-full" onClick={handlePlaceOrder} disabled={!selectedUser || orderItems.length === 0}>Place Order</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
