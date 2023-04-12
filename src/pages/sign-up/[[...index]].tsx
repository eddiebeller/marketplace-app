import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex-center flex h-screen w-screen justify-center">
    <SignUp path="/sign-in" routing="path" signInUrl="/sign-up" />
  </div>
);

export default SignUpPage;
