import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(16).required(),
});

type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onLoginRequest: (values: LoginFormData) => unknown;
  loading?: boolean;
  errorMessage?: string;
};

export default function LoginForm(props: LoginFormProps) {
  const { loading, errorMessage } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(props.onLoginRequest)}
      noValidate
      sx={{ mt: 1 }}
    >
      {errorMessage && (
        <Alert data-test="form-error" severity="error">
          {errorMessage}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        error={!!errors.email}
        helperText={
          <span data-test="email-error">{errors.email?.message}</span>
        }
        inputProps={{ "data-test": "email" }}
        disabled={loading}
        {...register("email")}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={
          <span data-test="password-error">{errors.password?.message}</span>
        }
        inputProps={{ "data-test": "password" }}
        disabled={loading}
        {...register("password")}
      />
      <Box position="relative" sx={{ mt: 3, mb: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          data-test="submit-login"
          disabled={loading}
        >
          Sign In
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              mt: -1.5,
              ml: -1.5,
            }}
          />
        )}
      </Box>
      <Link href="#" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
}
