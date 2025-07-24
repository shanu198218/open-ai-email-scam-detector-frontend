import { Header } from "@/components/header";
import AnalyzePage from "@/components/pages/analyze";
import SignInPage from "@/components/pages/sign-in";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background px-2">
      <Header />
      <AnalyzePage />
    </div>
  );
}
