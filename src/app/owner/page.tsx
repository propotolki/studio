"use client"

import { useState } from 'react';
import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, UserMinus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { users as mockUsers } from '@/lib/data';
import type { User } from '@/lib/types';


export default function OwnerPage() {
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [admins, setAdmins] = useState<User[]>(mockUsers.filter(u => u.role === 'admin'));

  const handleAssignAdmin = () => {
    if (phone.length < 11) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please enter a valid phone number.' });
      return;
    }
    // This is a mock implementation.
    // In a real app, you would find the user by phone and update their role.
    const newAdmin: User = { id: (admins.length + 20).toString(), name: `New Admin`, phone: phone, role: 'admin', ordersCompleted: 0 };
    setAdmins([...admins, newAdmin]);
    toast({ title: 'Success', description: `User with phone ${phone} has been assigned as an administrator.` });
    setPhone('');
  }
  
  const handleRemoveAdmin = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({ title: 'Admin Removed', description: 'The user is no longer an administrator.' });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl font-headline font-bold mb-2">Owner's Panel</h1>
        <p className="text-muted-foreground mb-8">Manage administrator access.</p>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Assign Administrator</CardTitle>
                    <CardDescription>Grant admin rights to a user by their phone number.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">User's Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter 11-digit phone number"/>
                    </div>
                    <Button onClick={handleAssignAdmin} className="w-full">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Assign as Admin
                    </Button>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Current Administrators</CardTitle>
                    <CardDescription>List of users with admin privileges.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.map(admin => (
                                <TableRow key={admin.id}>
                                    <TableCell>{admin.name}</TableCell>
                                    <TableCell>{admin.phone}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveAdmin(admin.id)} className="text-destructive hover:text-destructive">
                                            <UserMinus className="h-4 w-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
