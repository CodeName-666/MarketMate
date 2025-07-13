
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
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
    
    // Admins logging into a specific market are still directed to the market-specific admin view
    router.push(`/dashboard?${queryParams.toString()}`);
  };

  const handleOrganizationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
     
    // For org login, we assume they are an admin of that org.
    // The org context would be derived from the user's credentials in a real app.
    const organization = email.toLowerCase().includes('berlin') ? 'flohmarkt-verein-berlin' : 'stadt-hamburg-events';
    
    console.log("Organization admin login submitted for email:", email);

    const queryParams = new URLSearchParams({
        org: organization,
        role: 'admin',
    });

    router.push(`/dashboard/admin?${queryParams.toString()}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Log in to manage your markets or participation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="participant">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participant">Participant Login</TabsTrigger>
                <TabsTrigger value="organization">Organization Login</TabsTrigger>
              </TabsList>
              <TabsContent value="participant">
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
                    Login as Participant
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="organization">
                <form onSubmit={handleOrganizationSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-org">Admin Email</Label>
                      <Input id="email-org" name="email" type="email" placeholder="admin@flohmarkt-berlin.de" required />
                       <p className="text-xs text-muted-foreground">Hint: Any email works. 'berlin' in email logs into Berlin org.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-org">Password</Label>
                         <Link href="#" className="text-sm font-medium text-primary hover:underline">
                            Forgot password?
                         </Link>
                      </div>
                      <Input id="password-org" type="password" required defaultValue="password"/>
                    </div>
                    <Button type="submit" className="w-full">
                        Login as Organization
                    </Button>
                </form>
              </TabsContent>
            </Tabs>
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
