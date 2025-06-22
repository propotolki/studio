import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import type { Drink } from "@/lib/types";

interface DrinkCardProps {
  drink: Drink;
  onAddToCart: (drink: Drink) => void;
}

export function DrinkCard({ drink, onAddToCart }: DrinkCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3]">
            <Image
                src={drink.image}
                alt={drink.name}
                fill
                className="object-cover"
                data-ai-hint={drink.dataAiHint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-xl font-headline mb-2">{drink.name}</CardTitle>
        <CardDescription className="flex-grow">{drink.description}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
            {drink.ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary">{ingredient}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <p className="text-2xl font-bold font-headline text-primary">{drink.price} ₽</p>
        <Button onClick={() => onAddToCart(drink)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <PlusCircle className="mr-2 h-5 w-5"/>
            Add
        </Button>
      </CardFooter>
    </Card>
  );
}
