
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegisterPage() {
  const router = useRouter();

  const handleParticipantSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const organization = formData.get('organization');
    const market = formData.get('market');
    const role = formData.get('role');

    console.log("Participant registration submitted for org:", organization, "market:", market, "as role:", role);
    
    const queryParams = new URLSearchParams({
        org: organization as string,
        market: market as string,
        role: role as string
    });
    
    router.push(`/dashboard?${queryParams.toString()}`);
  };

  const handleOrganizationSubmit = (e: React.FormEvent<HTMLFormFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrganizationName = formData.get('newOrganizationName') as string;
    
    console.log("New organization submitted:", newOrganizationName);

    // In a real app, you'd save the org and get an ID. We'll simulate one.
    const orgId = newOrganizationName.toLowerCase().replace(/\s+/g, '-');

    const queryParams = new URLSearchParams({
        org: orgId,
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
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Get started with MarketMate</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="participant">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participant">Join a Market</TabsTrigger>
                <TabsTrigger value="organization">Create Organization</TabsTrigger>
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
                    <Select name="market" required>
                        <SelectTrigger id="market">
                            <SelectValue placeholder="Select a market to join" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="summer-flea-market">Summer Flea Market</SelectItem>
                            <SelectItem value="winter-wonderland-market">Winter Wonderland Market</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Register as a</Label>
                    <RadioGroup name="role" defaultValue="seller" className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="role-seller" />
                        <Label htmlFor="role-seller">Seller</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="helper" id="role-helper" />
                        <Label htmlFor="role-helper">Helper</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-participant">Full Name</Label>
                    <Input id="name-participant" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-participant">Email</Label>
                    <Input id="email-participant" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-participant">Password</Label>
                    <Input id="password-participant" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up as Participant
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="organization">
                <form onSubmit={handleOrganizationSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="newOrganizationName">Organization Name</Label>
                      <Input id="newOrganizationName" name="newOrganizationName" type="text" placeholder="My Awesome Flea Market Org" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-admin">Your Full Name</Label>
                      <Input id="name-admin" name="name" type="text" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-admin">Your Admin Email</Label>
                      <Input id="email-admin" name="email" type="email" placeholder="admin@my-org.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-admin">Password</Label>
                      <Input id="password-admin" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Create Organization
                    </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
