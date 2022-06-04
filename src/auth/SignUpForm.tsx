import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import FormTextField from "../components/FormTextField";
import LoadingButton from "../components/LoadingButton";

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

      <FormTextField
        id="name"
        label="Name"
        errorField={errors.name}
        dataTestId="name"
        register={register}
        disabled={loading}
        required
        autoFocus
      />

      <FormTextField
        id="email"
        label="Email Address"
        errorField={errors.email}
        dataTestId="email"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="password"
        label="Password"
        type="password"
        errorField={errors.password}
        dataTestId="password"
        register={register}
        disabled={loading}
        required
        autoComplete="current-password"
      />

      <FormTextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        errorField={errors.confirmPassword}
        dataTestId="confirm-password"
        register={register}
        disabled={loading}
        required
      />

      <LoadingButton
        sx={{ mt: 2, mb: 2 }}
        type="submit"
        dataTestId="submit-sign-up"
        loading={loading}
      >
        Sign Up
      </LoadingButton>
    </Box>
  );
}
