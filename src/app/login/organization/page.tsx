
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

export default function OrganizationLoginPage() {
  const router = useRouter();

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
            <CardTitle>Organization Login</CardTitle>
            <CardDescription>Log in to manage your organization and markets.</CardDescription>
          </CardHeader>
          <CardContent>
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
                    Login
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an organization account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
