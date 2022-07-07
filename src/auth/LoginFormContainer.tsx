import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import { useAuthContext } from "./AuthContext";
import LoginForm from "./LoginForm";

export default function LoginFormContainer() {
  const {
    execute,
    value: loginSuccessResponse,
    error,
    status,
  } = useAsync(UserAPI.login);
  const { setAuthToken } = useAuthContext();
  const router = useRouter();
  const { infoMessage } = router.query;

  useEffect(() => {
    if (loginSuccessResponse) {
      setAuthToken(loginSuccessResponse.token);
    }
  }, [loginSuccessResponse, setAuthToken]);

  let errorMessage;
  if (error === "Invalid Credentials") {
    errorMessage = "Invalid user credentials";
  } else if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <>
      {infoMessage && !errorMessage && (
        <Alert sx={{ mt: 1 }}>{infoMessage}</Alert>
      )}
      <LoginForm
        onLoginRequest={execute}
        loading={status === "pending"}
        errorMessage={errorMessage}
      />
      <NextLink href="/signup" passHref>
        <Link variant="body2">Don&apos;t have an account? Sign Up</Link>
      </NextLink>
    </>
  );
}
