"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

import { loginUser, registerUser } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface SignUpPageProps {
  signUp: boolean;
}

export default function SignInPage({ signUp = false }: SignUpPageProps) {
  const mode = signUp ? "sign-up" : "sign-in";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data =
        mode === "sign-in"
          ? await loginUser(email, password)
          : await registerUser(name, email, password);

      toast({
        title:
          mode === "sign-in" ? "Login successful" : "Registration successful",
        variant: "success",
        description: `Welcome ${mode === "sign-in" ? "" : name}  `,
      });
      console.log(data);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      console.log("error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {" "}
            {mode === "sign-in" ? "Welcome back" : "Create an account"}{" "}
          </CardTitle>
          <CardDescription className="text-center text-gray-500 font-semibold">
            {" "}
            {mode === "sign-in"
              ? "Sign in your account"
              : "Sign up your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <i className="ri-google-line text-blue-500 text-2xl font-bold"></i>
            <span className="">Continue with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <Separator className="w-full" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background font-semibold text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "sign-up" && (
              <div className="space-y-2">
                <Label htmlFor="email"> Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email"> Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                required
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                required
                className="placeholder:text-gray-400"
              />
            </div>
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
              {mode === "sign-in" ? "Sign in" : "Sign up"}
            </Button>
            {mode === "sign-in" ? (
              <p className="text-center text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/sign-up"
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Sign up
                </a>
              </p>
            ) : (
              <p className="text-center text-gray-500">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Sign in
                </a>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
