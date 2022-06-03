import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import React from "react";
import FormTextField from "../components/FormTextField";
import LoadingButton from "../components/LoadingButton";

const schema = yup.object({
  clientName: yup.string().min(3).required(),
  clientEmail: yup.string().email().required(),
  companyName: yup.string().required(),
  companyAddress: yup.string().required(),
  vatNumber: yup.string().required(),
  registrationNumber: yup.string().required(),
  iban: yup.string().required(),
  swift: yup.string().required(),
});

export type ClientDetailsFormData = {
  clientName: string;
  clientEmail: string;
  companyName: string;
  companyAddress: string;
  vatNumber: string;
  registrationNumber: string;
  iban?: string;
  swift?: string;
};

export type ClientDetailsFormProps = {
  onSubmitRequest: (values: ClientDetailsFormData) => unknown;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  clientDetails?: ClientDetailsFormData;
  resetOnSubmit?: boolean;
};

export default function ClientForm(props: ClientDetailsFormProps) {
  const {
    loading,
    errorMessage,
    successMessage,
    clientDetails,
    onSubmitRequest,
    resetOnSubmit = true,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientDetailsFormData>({
    resolver: yupResolver(schema),
    defaultValues: clientDetails,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((values: ClientDetailsFormData) => {
        onSubmitRequest(values);
        if (resetOnSubmit) {
          reset();
        }
      })}
      noValidate
      sx={{ mt: 1 }}
    >
      {successMessage && (
        <Alert data-test="form-success" severity="success">
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert data-test="form-error" severity="error">
          {errorMessage}
        </Alert>
      )}

      <FormTextField
        id="clientName"
        label="Name"
        errorField={errors.clientName}
        dataTestId="client-name"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="clientEmail"
        label="Email"
        errorField={errors.clientEmail}
        dataTestId="client-email"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="companyName"
        label="Company Name"
        errorField={errors.companyName}
        dataTestId="client-company-name"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="companyAddress"
        label="Company Address"
        errorField={errors.companyAddress}
        dataTestId="client-company-address"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="vatNumber"
        label="VAT Number"
        errorField={errors.vatNumber}
        dataTestId="client-company-vat"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="registrationNumber"
        label="Registration Number"
        errorField={errors.registrationNumber}
        dataTestId="client-company-reg"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="iban"
        label="IBAN"
        errorField={errors.iban}
        dataTestId="client-company-iban"
        register={register}
        disabled={loading}
        required
      />

      <FormTextField
        id="swift"
        label="Swift"
        errorField={errors.swift}
        dataTestId="client-company-swift"
        register={register}
        disabled={loading}
        required
      />

      <LoadingButton
        sx={{ mt: 2, mb: 2 }}
        type="submit"
        dataTestId="submit-login"
        loading={loading}
      >
        Update
      </LoadingButton>
    </Box>
  );
}
