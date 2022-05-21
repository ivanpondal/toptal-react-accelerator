import { useEffect, useReducer } from "react";
import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import LoginForm from "./LoginForm";

export default function LoginFormContainer() {
  const {
    execute,
    value: loginSuccessResponse,
    error,
    status,
  } = useAsync(UserAPI.login);

  useEffect(() => {
    console.log(loginSuccessResponse);
  }, [loginSuccessResponse]);

  let errorMessage;
  if (error === "Invalid Credentials") {
    errorMessage = "Invalid user credentials";
  } else if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <LoginForm
      onLoginRequest={execute}
      loading={status === "pending"}
      errorMessage={errorMessage}
    />
  );
}
