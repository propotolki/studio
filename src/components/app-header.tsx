"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Coffee, UserCircle, LogOut, Crown, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function AppHeader() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  }

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/menu" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Coffee className="h-6 w-6" />
            <span className="font-headline hidden sm:inline">Ulyanova Cafe Express</span>
          </Link>
          
          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
              <Button variant="ghost" asChild>
                <Link href="/menu">Menu</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/map">Map</Link>
              </Button>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <p>Current User</p>
                    <p className="text-xs text-muted-foreground">customer@example.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile"><UserCircle className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
                 <DropdownMenuItem asChild>
                  <Link href="/admin"><ShieldCheck className="mr-2 h-4 w-4" />Admin Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/owner"><Crown className="mr-2 h-4 w-4" />Owner Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
