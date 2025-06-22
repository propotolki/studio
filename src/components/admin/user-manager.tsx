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
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, PlusCircle, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { users as mockUsers } from "@/lib/data"
import type { User, LoyaltyTier } from "@/lib/types"

const loyaltyTiers: LoyaltyTier[] = ['Coffee Guest', 'SVO Participant', 'ANO Partner', 'KUPNO Projects'];
const emptyUser: User = { id: '', name: '', phone: '', role: 'customer', loyaltyTier: 'Coffee Guest', loyaltyPercentage: 5, bonusBalance: 0 };

export function UserManager() {
  const [users, setUsers] = useState<User[]>(mockUsers.filter(u => u.role !== 'owner'))
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(emptyUser);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setIsEditMode(true);
      setCurrentUser(user);
    } else {
      setIsEditMode(false);
      setCurrentUser(emptyUser);
    }
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (isEditMode) {
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      setUsers([...users, { ...currentUser, id: (users.length + 10).toString() }]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (id: string) => {
      setUsers(users.filter(u => u.id !== id));
  }
  
  const handleLoyaltyChange = (tier: LoyaltyTier) => {
    let percentage = 5;
    if (tier !== 'Coffee Guest') percentage = 10;
    setCurrentUser({...currentUser, loyaltyTier: tier, loyaltyPercentage: percentage });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">User Management</h2>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Register User
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Loyalty Tier</TableHead>
              <TableHead>Bonuses</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell><Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                <TableCell>{user.loyaltyTier || 'N/A'}</TableCell>
                <TableCell>{user.bonusBalance || (user.ordersCompleted ? `${user.ordersCompleted} orders` : 'N/A')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(user)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteUser(user.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
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
            <DialogTitle>{isEditMode ? 'Edit User' : 'Register New User'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Update user details.' : 'Create a new user account.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={currentUser.name} onChange={e => setCurrentUser({...currentUser, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={currentUser.phone} onChange={e => setCurrentUser({...currentUser, phone: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select value={currentUser.role} onValueChange={(value: 'customer' | 'admin') => setCurrentUser({...currentUser, role: value})}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {currentUser.role === 'customer' && (
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loyalty" className="text-right">Loyalty</Label>
                <Select value={currentUser.loyaltyTier} onValueChange={(value: LoyaltyTier) => handleLoyaltyChange(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                        {loyaltyTiers.map(tier => <SelectItem key={tier} value={tier}>{tier}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSaveUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
