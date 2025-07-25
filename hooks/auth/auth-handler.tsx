"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { checkAuth } from "@/services/auth";
import PageLoader from "@/components/common/page-loader";

type Props = {
  children: ReactNode;
};

const AuthHandler = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthetication = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push("/sign-in");
      }
      setLoading(false);
    };

    checkAuthetication();
  }, [router]);

  if (loading) return <PageLoader />;
  if (authenticated) return <>{children}</>;
  return false;
};

export default AuthHandler;
