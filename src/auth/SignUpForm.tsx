import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match")
    .required("password confirmation is a required field"),
});

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormProps = {
  onSignUpRequest: (values: SignUpFormData) => unknown;
  loading?: boolean;
  errorMessage?: string;
};

export default function LoginForm(props: SignUpFormProps) {
  const { loading, errorMessage } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(schema) });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(props.onSignUpRequest)}
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
        id="name"
        label="Name"
        autoComplete="name"
        autoFocus
        error={!!errors.name}
        helperText={<span data-test="name-error">{errors.name?.message}</span>}
        inputProps={{ "data-test": "name" }}
        disabled={loading}
        {...register("name")}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
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
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
        error={!!errors.confirmPassword}
        helperText={
          <span data-test="confirm-password-error">
            {errors.confirmPassword?.message}
          </span>
        }
        inputProps={{ "data-test": "confirm-password" }}
        disabled={loading}
        {...register("confirmPassword")}
      />
      <Box position="relative" sx={{ mt: 3, mb: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          data-test="submit-sign-up"
          disabled={loading}
        >
          Sign Up
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
    </Box>
  );
}
