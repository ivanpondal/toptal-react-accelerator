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

  return <LoginForm onLoginRequest={execute} loading={status === "pending"}/>;
}
