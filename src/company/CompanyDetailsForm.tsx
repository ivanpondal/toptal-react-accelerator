import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const schema = yup.object({
  companyName: yup.string().min(3).max(16).required(),
  companyAddress: yup.string().required(),
  vatNumber: yup.string().required(),
  registrationNumber: yup.string().required(),
  iban: yup.string(),
  swift: yup.string(),
});

export type CompanyDetailsFormData = {
  companyName: string;
  companyAddress: string;
  vatNumber: string;
  registrationNumber: string;
  iban: string;
  swift: string;
};

export type CompanyDetailsFormProps = {
  onUpdateRequest: (values: CompanyDetailsFormData) => unknown;
  loading?: boolean;
  errorMessage?: string;
};

export default function CompanyDetailsForm(props: CompanyDetailsFormProps) {
  const { loading, errorMessage } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDetailsFormData>({ resolver: yupResolver(schema) });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(props.onUpdateRequest)}
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
        id="companyName"
        label="Company Name"
        autoFocus
        error={!!errors.companyName}
        helperText={
          <span data-test="company-name-error">
            {errors.companyName?.message}
          </span>
        }
        inputProps={{ "data-test": "company-name" }}
        disabled={loading}
        {...register("companyName")}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="companyAddress"
        label="Company Address"
        error={!!errors.companyAddress}
        helperText={
          <span data-test="company-address-error">
            {errors.companyAddress?.message}
          </span>
        }
        inputProps={{ "data-test": "company-address" }}
        disabled={loading}
        {...register("companyAddress")}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="vatNumber"
        label="VAT Number"
        error={!!errors.vatNumber}
        helperText={
          <span data-test="company-vat-error">{errors.vatNumber?.message}</span>
        }
        inputProps={{ "data-test": "company-vat" }}
        disabled={loading}
        {...register("vatNumber")}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="registrationNumber"
        label="Registration Number"
        error={!!errors.registrationNumber}
        helperText={
          <span data-test="company-reg-error">
            {errors.registrationNumber?.message}
          </span>
        }
        inputProps={{ "data-test": "company-reg" }}
        disabled={loading}
        {...register("registrationNumber")}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="iban"
        label="IBAN"
        error={!!errors.iban}
        helperText={
          <span data-test="company-iban-error">{errors.iban?.message}</span>
        }
        inputProps={{ "data-test": "company-iban" }}
        disabled={loading}
        {...register("iban")}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="swift"
        label="Swift"
        error={!!errors.swift}
        helperText={
          <span data-test="company-swift-error">{errors.swift?.message}</span>
        }
        inputProps={{ "data-test": "company-swift" }}
        disabled={loading}
        {...register("swift")}
      />

      <Box position="relative" sx={{ mt: 3, mb: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          data-test="submit-login"
          disabled={loading}
        >
          Update
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
