"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "@/lib/logger";
import { getRoleForEmail } from "@/lib/auth";
import { useState } from "react";

const formSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  market: z.string().min(1, "Market is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type ParticipantForm = z.infer<typeof formSchema>;

export default function ParticipantLoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "flohmarkt-verein-berlin",
      market: "summer-flea-market",
      email: "",
      password: "password",
    },
  });

  const onSubmit = async (data: ParticipantForm) => {
    setSubmitError(null);
    if (!data.organization || !data.market) {
      setSubmitError("Organization and market are required.");
      return;
    }
    const role = await getRoleForEmail(data.email);
    log(
      "Participant login submitted for org:",
      data.organization,
      "market:",
      data.market,
      "with email:",
      data.email
    );
    const queryParams = new URLSearchParams({
      org: data.organization,
      market: data.market,
      role,
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
            <CardDescription>
              Log in to manage your market participation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="organization">
                        <SelectValue placeholder="Select an organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flohmarkt-verein-berlin">
                          Flohmarkt-Verein Berlin
                        </SelectItem>
                        <SelectItem value="stadt-hamburg-events">
                          Stadt Hamburg Events
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.organization && (
                  <p className="text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="market">Market</Label>
                <Controller
                  name="market"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="market">
                        <SelectValue placeholder="Select a market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer-flea-market">
                          Summer Flea Market
                        </SelectItem>
                        <SelectItem value="winter-wonderland-market">
                          Winter Wonderland Market
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.market && (
                  <p className="text-sm text-red-500">{errors.market.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-participant">Email</Label>
                <Input
                  id="email-participant"
                  type="email"
                  placeholder="john.doe@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Hint: Use `helper@marketmate.com` for helper role.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-participant">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password-participant"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
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
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
