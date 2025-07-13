
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

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const organization = formData.get('organization');
    const market = formData.get('market');
    const role = formData.get('role');

    // Here you would typically handle registration
    console.log("Registration submitted for org:", organization, "market:", market, "as role:", role);
    
    const queryParams = new URLSearchParams({
        org: organization as string,
        market: market as string,
        role: role as string
    });
    
    if (role === 'admin' && organization === 'new-org') {
       router.push(`/dashboard/admin?${queryParams.toString()}`);
    } else {
       router.push(`/dashboard?${queryParams.toString()}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join an organization and a market</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                 <Select name="organization" required defaultValue="flohmarkt-verein-berlin">
                    <SelectTrigger id="organization">
                        <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="flohmarkt-verein-berlin">Flohmarkt-Verein Berlin</SelectItem>
                        <SelectItem value="stadt-hamburg-events">Stadt Hamburg Events</SelectItem>
                        <SelectItem value="new-org">Create New Organization</SelectItem>
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
                <RadioGroup name="role" defaultValue="seller" className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="role-seller" />
                    <Label htmlFor="role-seller">Seller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="helper" id="role-helper" />
                    <Label htmlFor="role-helper">Helper</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="role-admin" />
                    <Label htmlFor="role-admin">Admin</Label>
                  </div>
                </RadioGroup>
                 <p className="text-xs text-muted-foreground">Admins can only be created for a new organization.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
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
