import SignInPage from "@/components/pages/sign-in";
import Image from "next/image";

export default function SignIn() {
  return (
    <div>
      <SignInPage signUp={false} />
    </div>
  );
}
