"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, PlusCircle, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { drinks as mockDrinks } from "@/lib/data"
import type { Drink } from "@/lib/types"

const emptyDrink: Drink = { id: '', name: '', description: '', ingredients: [], price: 0, image: 'https://placehold.co/600x400.png', dataAiHint: 'coffee drink' };

export function MenuManager() {
  const [drinks, setDrinks] = useState<Drink[]>(mockDrinks)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<Drink>(emptyDrink);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ingredientsInput, setIngredientsInput] = useState('');

  const handleOpenDialog = (drink?: Drink) => {
    if (drink) {
      setIsEditMode(true);
      setCurrentDrink(drink);
      setIngredientsInput(drink.ingredients.join(', '));
    } else {
      setIsEditMode(false);
      setCurrentDrink(emptyDrink);
      setIngredientsInput('');
    }
    setIsDialogOpen(true);
  };

  const handleSaveDrink = () => {
    const updatedDrink = { ...currentDrink, ingredients: ingredientsInput.split(',').map(i => i.trim()).filter(Boolean) };
    if (isEditMode) {
      setDrinks(drinks.map(d => d.id === updatedDrink.id ? updatedDrink : d));
    } else {
      setDrinks([...drinks, { ...updatedDrink, id: (drinks.length + 1).toString() }]);
    }
    setIsDialogOpen(false);
  };
  
  const handleDeleteDrink = (id: string) => {
      setDrinks(drinks.filter(d => d.id !== id));
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-headline">Menu Items</h2>
            <Button onClick={() => handleOpenDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Drink
            </Button>
        </div>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Ingredients</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {drinks.map((drink) => (
                    <TableRow key={drink.id}>
                    <TableCell className="font-medium">{drink.name}</TableCell>
                    <TableCell>{drink.price} ₽</TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {drink.ingredients.map(ing => <Badge key={ing} variant="secondary">{ing}</Badge>)}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog(drink)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteDrink(drink.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Drink' : 'Add New Drink'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? 'Update the details of the drink.' : 'Add a new drink to the menu.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={currentDrink.name} onChange={e => setCurrentDrink({...currentDrink, name: e.target.value})} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input id="price" type="number" value={currentDrink.price} onChange={e => setCurrentDrink({...currentDrink, price: Number(e.target.value)})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" value={currentDrink.description} onChange={e => setCurrentDrink({...currentDrink, description: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ingredients" className="text-right">Ingredients</Label>
                        <Input id="ingredients" value={ingredientsInput} onChange={e => setIngredientsInput(e.target.value)} placeholder="e.g. Espresso, Milk" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveDrink}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
