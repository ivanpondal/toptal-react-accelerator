import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import LoadingButton from "../components/LoadingButton";
import FormTextField from "../components/FormTextField";

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
  iban?: string;
  swift?: string;
};

export type CompanyDetailsFormProps = {
  onUpdateRequest: (values: CompanyDetailsFormData) => unknown;
  loading?: boolean;
  errorMessage?: string;
  companyDetails?: CompanyDetailsFormData;
};

export default function CompanyDetailsForm(props: CompanyDetailsFormProps) {
  const { loading, errorMessage, companyDetails } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyDetailsFormData>({
    resolver: yupResolver(schema),
    defaultValues: companyDetails,
  });

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

      <FormTextField
        id="companyName"
        label="Company Name"
        errorField={errors.companyName}
        dataTestId="company-name"
        register={register}
        disabled={loading}
        required
        autoFocus
      />

      <FormTextField
        id="companyAddress"
        label="Company Address"
        errorField={errors.companyAddress}
        dataTestId="company-address"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="vatNumber"
        label="VAT Number"
        errorField={errors.vatNumber}
        dataTestId="company-vat"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="registrationNumber"
        label="Registration Number"
        errorField={errors.registrationNumber}
        dataTestId="company-reg-number"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="iban"
        label="IBAN"
        errorField={errors.iban}
        dataTestId="company-iban"
        register={register}
        disabled={loading}
      />

      <FormTextField
        id="swift"
        label="Swift"
        errorField={errors.swift}
        dataTestId="company-swift"
        register={register}
        disabled={loading}
      />

      <LoadingButton
        type="submit"
        dataTestId="submit-company-details"
        loading={loading}
        sx={{ mt: 2, mb: 2 }}
      >
        Update
      </LoadingButton>
    </Box>
  );
}
