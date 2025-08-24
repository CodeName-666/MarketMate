"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "@/lib/logger";
import { getOrganizationForEmail } from "@/lib/auth";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type OrgForm = z.infer<typeof formSchema>;

export default function OrganizationLoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrgForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "password",
    },
  });

  const onSubmit = async (data: OrgForm) => {
    setSubmitError(null);
    const organization = await getOrganizationForEmail(data.email);
    if (!organization) {
      setSubmitError("No organization associated with this email.");
      return;
    }
    log("Organization admin login submitted for email:", data.email);
    const queryParams = new URLSearchParams({
      org: organization,
      role: "admin",
    });
    router.push(`/dashboard/admin?${queryParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Organization Login</CardTitle>
            <CardDescription>
              Log in to manage your organization and markets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-org">Admin Email</Label>
                <Input
                  id="email-org"
                  type="email"
                  placeholder="admin@flohmarkt-berlin.de"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Hint: Any email works. Specific addresses map to orgs.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-org">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password-org"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an organization account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
