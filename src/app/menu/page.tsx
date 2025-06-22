"use client"

import { useState } from "react";
import Image from "next/image";
import { AppHeader } from "@/components/app-header";
import { DrinkCard } from "@/components/drink-card";
import { drinks as mockDrinks } from "@/lib/data";
import type { Drink, OrderItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MenuPage() {
  const { toast } = useToast();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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
    toast({
      title: "Added to cart!",
      description: `${drink.name} is waiting for you.`,
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
    setIsPlacingOrder(true);
    // Simulate API call
    setTimeout(() => {
      setIsSheetOpen(false);
      setIsConfirmingOrder(false);
      setIsPlacingOrder(false);
      setOrderItems([]);
      toast({
        title: "Order Placed!",
        description: "Your coffee is being prepared. Estimated pickup in 5 minutes.",
      });
    }, 1500);
  };

  const total = orderItems.reduce((acc, item) => acc + item.drink.price * item.quantity, 0);
  const bonus = Math.floor(total * 0.05); // Assuming 5% bonus for demo

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl font-headline font-bold mb-8 text-center">Our Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockDrinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      
      {orderItems.length > 0 && (
        <div className="sticky bottom-4 w-full flex justify-center z-20">
          <Button onClick={() => setIsSheetOpen(true)} className="rounded-full shadow-lg animate-bounce" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            View Your Order ({orderItems.reduce((acc, item) => acc + item.quantity, 0)}) - {total} ₽
          </Button>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-headline text-2xl">Your Order</SheetTitle>
            <SheetDescription>
              Review your items before placing the order.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex-grow overflow-y-auto -mx-6 px-6">
            {orderItems.length > 0 ? (
              <div className="space-y-4">
                {orderItems.map(item => (
                  <div key={item.drink.id} className="flex items-center gap-4">
                    <Image src={item.drink.image} alt={item.drink.name} width={64} height={64} className="rounded-md object-cover w-16 h-16" data-ai-hint={item.drink.dataAiHint} />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.drink.name}</p>
                      <p className="text-sm text-muted-foreground">{item.drink.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.drink.id, item.quantity - 1)}><MinusCircle className="h-4 w-4" /></Button>
                       <span className="font-bold w-4 text-center">{item.quantity}</span>
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.drink.id, item.quantity + 1)}><PlusCircle className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleRemoveItem(item.drink.id)}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                <ShoppingCart className="h-16 w-16 mb-4"/>
                <p>Your cart is empty.</p>
                <p className="text-sm">Add some delicious coffee to get started!</p>
              </div>
            )}
          </div>
          <Separator />
          <SheetFooter>
            <div className="w-full space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                <span>Bonuses to be credited:</span>
                <span>~{bonus} points</span>
              </div>
              <Button onClick={() => setIsConfirmingOrder(true)} className="w-full" size="lg" disabled={orderItems.length === 0}>
                Place Order
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isConfirmingOrder} onOpenChange={setIsConfirmingOrder}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Your total is <span className="font-bold text-primary">{total} ₽</span>. Are you sure you want to place this order?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPlacingOrder}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePlaceOrder} disabled={isPlacingOrder}>
              {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yes, place order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
