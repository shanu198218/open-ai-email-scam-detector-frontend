"use client";
import { logoutUser } from "@/services/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const Header = () => {
  const router = useRouter();

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
  return (
    <header className="w-full border-b bg-blue/95 backdrop-blur supports-[backdrop-filter]:bg-blue/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="md:text-xl text-md font-semibold">Scam Detector</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <i className="ri-user-line md:text-2xl text-xl"></i>
            <span>user@example.com</span>
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
