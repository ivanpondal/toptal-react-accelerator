import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  UseFormRegister,
} from "react-hook-form";

export function ControlledFormTextField<TFieldValues>(
  props: {
    id: FieldPath<TFieldValues>;
    errorField?: FieldError;
    dataTestId: string;
    register: UseFormRegister<TFieldValues>;
    control: Control<TFieldValues, any>;
  } & TextFieldProps
) {
  const { id, control, errorField, dataTestId, register, ...restProps } = props;
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <FormTextField
          id={id}
          errorField={errorField}
          dataTestId={dataTestId}
          register={register}
          {...field}
          {...restProps}
        />
      )}
    />
  );
}

export default function FormTextField<TFieldValues>(
  props: {
    id: FieldPath<TFieldValues>;
    errorField?: FieldError;
    dataTestId: string;
    register: UseFormRegister<TFieldValues>;
  } & TextFieldProps
) {
  const { id, errorField, dataTestId, register, ...restProps } = props;
  return (
    <TextField
      id={id}
      margin="normal"
      fullWidth
      error={!!errorField}
      helperText={
        errorField && (
          <span data-test={`${dataTestId}-error`}>{errorField?.message}</span>
        )
      }
      inputProps={{ "data-test": dataTestId }}
      {...register(id)}
      {...restProps}
    />
  );
}
