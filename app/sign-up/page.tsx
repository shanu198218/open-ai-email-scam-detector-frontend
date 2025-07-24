import SignInPage from "@/components/pages/sign-in";
import Image from "next/image";

export default function SignUp() {
  return (
    <div>
      <SignInPage signUp={true} />
    </div>
  );
}
