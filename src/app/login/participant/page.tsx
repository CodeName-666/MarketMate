
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ParticipantLoginPage() {
  const router = useRouter();

  const handleParticipantSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const organization = formData.get('organization');
    const market = formData.get('market');
    const email = formData.get('email') as string;
    
    console.log("Participant login submitted for org:", organization, "market:", market, "with email:", email);
    
    // Mock role determination based on email for demonstration
    const role = email.toLowerCase().includes('admin') ? 'admin' : 
                 email.toLowerCase().includes('helper') ? 'helper' : 'seller';

    const queryParams = new URLSearchParams({
        org: organization as string,
        market: market as string,
        role: role,
    });
    
    router.push(`/dashboard?${queryParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
            <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Participant Login</CardTitle>
            <CardDescription>Log in to manage your market participation.</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleParticipantSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Select name="organization" required defaultValue="flohmarkt-verein-berlin">
                    <SelectTrigger id="organization">
                        <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="flohmarkt-verein-berlin">Flohmarkt-Verein Berlin</SelectItem>
                        <SelectItem value="stadt-hamburg-events">Stadt Hamburg Events</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="market">Market</Label>
                <Select name="market" required defaultValue="summer-flea-market">
                    <SelectTrigger id="market">
                        <SelectValue placeholder="Select a market" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="summer-flea-market">Summer Flea Market</SelectItem>
                        <SelectItem value="winter-wonderland-market">Winter Wonderland Market</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-participant">Email</Label>
                <Input id="email-participant" name="email" type="email" placeholder="john.doe@example.com" required />
                 <p className="text-xs text-muted-foreground">Hint: Use `helper@marketmate.com` for helper role.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-participant">Password</Label>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password-participant" type="password" required defaultValue="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
