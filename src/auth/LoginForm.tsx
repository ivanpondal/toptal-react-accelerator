import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
};

export default function LoginForm(props: LoginFormProps) {
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
        {...register("password")}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        data-test="submit-login"
      >
        Sign In
      </Button>
      <Link href="#" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
}
