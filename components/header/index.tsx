"use client";
import { getCurrentUser, logoutUser } from "@/services/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({
        title: "logout successful",
        variant: "success",
      });
      router.push("/sign-in");
    } catch (error) {
      console.error("login failed", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getCurrentUser();
        setUserEmail(user.email);
        console.log(user);
      } catch (err) {
        console.error("Failed to get user:", err);
      }
    };

    fetchUser();
  }, []);

  console.log("email", userEmail);
  return (
    <header className="w-full border-b bg-blue/95 backdrop-blur supports-[backdrop-filter]:bg-blue/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="md:text-xl text-md font-semibold">Scam Detector</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <i className="ri-user-line md:text-2xl text-xl text-gray-700"></i>
            <span>{userEmail}</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="flex items-center "
          >
            <i className="ri-logout-circle-line md:text-2xl text-xl text-red-500"></i>
            <span className="text-red-500">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
