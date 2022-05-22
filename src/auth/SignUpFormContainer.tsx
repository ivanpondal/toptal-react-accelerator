import Link from "@mui/material/Link";
import NextLink from "next/link";
import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import SignUpForm from "./SignUpForm";

export default function SignUpFormContainer() {
  const {
    execute,
    value: signUpSuccessResponse,
    error,
    status,
  } = useAsync(UserAPI.register);

  let errorMessage;

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
