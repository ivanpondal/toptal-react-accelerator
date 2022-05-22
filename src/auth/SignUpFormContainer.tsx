import Link from "@mui/material/Link";
import NextLink from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUpFormContainer() {
  return (
    <>
      <SignUpForm onSignUpRequest={(data) => console.log(data)} />
      <NextLink href="/login" passHref>
        <Link variant="body2">Already have an account? Login</Link>
      </NextLink>
    </>
  );
}
