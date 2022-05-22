import Link from "@mui/material/Link";
import NextLink from "next/link";
import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import SignUpForm from "./SignUpForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUpFormContainer() {
  const {
    execute,
    value: signUpSuccessResponse,
    error,
    status,
  } = useAsync(UserAPI.register);
  const router = useRouter();

  useEffect(() => {
    if (signUpSuccessResponse?.userId) {
      router.push("/login");
    }
  }, [signUpSuccessResponse]);

  let errorMessage;
  if (error === "Email already used by another account") {
    errorMessage = error;
  } else if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <>
      <SignUpForm
        onSignUpRequest={execute}
        loading={status === "pending"}
        errorMessage={errorMessage}
      />
      <NextLink href="/login" passHref>
        <Link variant="body2">Already have an account? Login</Link>
      </NextLink>
    </>
  );
}
