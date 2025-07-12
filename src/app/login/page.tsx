
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

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const market = formData.get('market');
    const email = formData.get('email') as string;
    
    // Here you would typically handle authentication and retrieve the user's role
    console.log("Login submitted for market:", market, "with email:", email);
    
    // Mock role determination based on email for demonstration
    const role = email.toLowerCase() === 'admin@marketmate.com' ? 'admin' : 'seller';

    const queryParams = new URLSearchParams({
        market: market as string,
        role: role,
    });
    
    if (role === 'admin') {
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
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Select your market to log in</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                <p className="text-xs text-muted-foreground">Hint: Use `admin@marketmate.com` to log in as an administrator.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required defaultValue="password" />
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
