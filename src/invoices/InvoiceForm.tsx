import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import FormTextField, {
  ControlledFormTextField,
} from "../components/form-wrappers";
import LoadingButton from "../components/LoadingButton";
import ClearIcon from "@mui/icons-material/Clear";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const schema = yup.object({
  invoiceDate: yup.date().required(),
  invoiceDueDate: yup.date().min(yup.ref("invoiceDate")).required(),
  invoiceNumber: yup.string().min(3).required(),
  invoiceProjectCode: yup
    .string()
    .nullable()
    .notRequired()
    .min(3)
    .transform((value) => (!!value ? value : null)),
  invoiceClientId: yup.string().required(),
  items: yup.array().of(
    yup.object().shape({
      description: yup.string().min(3).required(),
      value: yup.number().moreThan(0).required(),
    })
  ),
  total: yup.number().moreThan(0).required(),
});

export type InvoiceDetailsFormData = {
  invoiceDate: Date;
  invoiceDueDate: Date;
  invoiceNumber: string;
  invoiceProjectCode?: string;
  invoiceClientId: string;
  items: Array<{
    description: string;
    value: number;
  }>;
  total: number;
};

export type InvoiceDetailsFormProps = {
  onSubmitRequest: (values: InvoiceDetailsFormData) => Promise<boolean>;
  clientNames: { [key: string]: { id: string; label: string } };
  isUpdateForm?: boolean;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  invoice?: InvoiceDetailsFormData;
};

export default function InvoiceForm(props: InvoiceDetailsFormProps) {
  const {
    clientNames,
    loading,
    errorMessage,
    successMessage,
    onSubmitRequest,
    invoice,
    isUpdateForm = false,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<InvoiceDetailsFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      invoiceNumber: "",
      invoiceProjectCode: "",
      items: [{ description: "", value: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const total = watch("items")
    .map((item) => item.value)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value))
    .filter((value) => value > 0)
    .reduce((prev, curr) => prev + curr, 0);

  setValue("total", total);

  useEffect(() => {
    if (invoice) {
      reset(invoice);
    }
  }, [reset, invoice]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(async (data) => {
        const success = await onSubmitRequest(data);
        if (success && !isUpdateForm) {
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

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={3} sx={{ mt: 2, mb: 1 }}>
          <Controller
            name="invoiceDate"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                {...field}
                renderInput={(params) => {
                  return (
                    <TextField
                      margin="normal"
                      fullWidth
                      helperText={
                        errors.invoiceDate && (
                          <span data-test="invoice-date-error">
                            {errors.invoiceDate?.message}
                          </span>
                        )
                      }
                      inputProps={{ "data-test": "invoice-date" }}
                      sx={{ m: 0 }}
                      {...params}
                      error={!!errors.invoiceDate}
                      disabled={loading}
                    />
                  );
                }}
              />
            )}
          />

          <Controller
            name="invoiceDueDate"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DesktopDatePicker
                label="Due Date"
                inputFormat="MM/dd/yyyy"
                {...field}
                renderInput={(params) => {
                  return (
                    <TextField
                      margin="normal"
                      fullWidth
                      helperText={
                        errors.invoiceDueDate && (
                          <span data-test="invoice-due-date-error">
                            {errors.invoiceDueDate?.message}
                          </span>
                        )
                      }
                      inputProps={{ "data-test": "invoice-due-date" }}
                      sx={{ m: 0 }}
                      {...params}
                      error={!!errors.invoiceDueDate}
                      disabled={loading}
                    />
                  );
                }}
              />
            )}
          />
        </Stack>
      </LocalizationProvider>

      <ControlledFormTextField
        id="invoiceNumber"
        control={control}
        label="Number"
        errorField={errors.invoiceNumber}
        dataTestId="invoice-number"
        disabled={loading}
        required
      />

      <ControlledFormTextField
        id="invoiceProjectCode"
        control={control}
        label="Project Code"
        errorField={errors.invoiceProjectCode}
        dataTestId="invoice-project-code"
        disabled={loading}
      />

      <Controller
        name="invoiceClientId"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            disablePortal
            sx={{ mt: 2, mb: 1 }}
            options={Object.values(clientNames)}
            onChange={(_, data) => field.onChange(data?.id)}
            value={field.value ? clientNames[field.value] : null}
            renderInput={(params) => {
              let { inputProps, ...restParams } = params;
              return (
                <TextField
                  margin="normal"
                  sx={{ m: 0 }}
                  {...restParams}
                  inputProps={{
                    "data-test": "invoice-company-id",
                    ...inputProps,
                  }}
                  helperText={
                    errors.invoiceClientId && (
                      <span data-test="invoice-company-id-error">
                        {errors.invoiceClientId?.message}
                      </span>
                    )
                  }
                  error={!!errors.invoiceClientId}
                  disabled={loading}
                />
              );
            }}
          />
        )}
      />

      <Typography variant="h6" sx={{ mt: 2 }}>
        Invoice items
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ mt: 0, mb: 1 }}
        data-test-id="invoice-item-1"
      >
        <Grid item xs={12} sm={6}>
          <ControlledFormTextField
            sx={{ m: 0 }}
            id="items.0.description"
            control={control}
            label="Description"
            errorField={errors.items?.at(0)?.description}
            dataTestId="invoice-item-description"
            disabled={loading}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            sx={{ m: 0 }}
            id="items.0.value"
            label="Value"
            errorField={errors.items?.at(0)?.value}
            dataTestId="invoice-item-value"
            register={register}
            disabled={loading}
            type="number"
            required
          />
        </Grid>
      </Grid>

      {fields.slice(1).map((field, index) => {
        // need to offset index since first item is fixed
        const idx = index + 1;
        return (
          <div key={field.id}>
            <Divider sx={{ mt: 3 }} />
            <Grid
              container
              spacing={3}
              sx={{ mt: 0, mb: 1 }}
              data-test-id={`invoice-item-${idx + 1}`}
            >
              <Grid item xs={12} sm={6}>
                <ControlledFormTextField
                  sx={{ m: 0 }}
                  id={`items.${idx}.description`}
                  control={control}
                  label="Description"
                  errorField={errors.items?.at(idx)?.description}
                  dataTestId={`invoice-item-description`}
                  disabled={loading}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={3}>
                  <FormTextField
                    sx={{ m: 0 }}
                    id={`items.${idx}.value`}
                    label="Value"
                    errorField={errors.items?.at(idx)?.value}
                    dataTestId={`invoice-item-value`}
                    register={register}
                    disabled={loading}
                    type="number"
                    required
                  />
                  <IconButton
                    onClick={() => remove(idx)}
                    sx={{ minWidth: 56 }}
                    disabled={loading}
                  >
                    <ClearIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </div>
        );
      })}

      <Button
        variant="outlined"
        fullWidth
        size="large"
        sx={{ mt: 2, mb: 1 }}
        onClick={() => append({ description: "", value: undefined })}
        disabled={loading}
      >
        Add
      </Button>

      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Total
        </Typography>

        <Typography variant="h5">$ &nbsp;</Typography>

        <Typography variant="h4">{total.toFixed(2)}</Typography>
      </Box>

      <LoadingButton
        sx={{ mt: 2, mb: 2 }}
        type="submit"
        dataTestId="submit-client"
        loading={loading}
      >
        {isUpdateForm ? "Update" : "Register"}
      </LoadingButton>
    </Box>
  );
}
