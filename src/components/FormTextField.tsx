import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  UseFormRegister,
} from "react-hook-form";
import React from "react";

export function ControlledFormTextField<TFieldValues>(
  props: {
    id: FieldPath<TFieldValues>;
    errorField?: FieldError;
    dataTestId: string;
    control: Control<TFieldValues, any>;
  } & TextFieldProps
) {
  const { id, control, errorField, dataTestId, ...restProps } = props;
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => {
        const { ref, ...restField } = field;
        return (
          <TextField
            id={id}
            margin="normal"
            fullWidth
            error={!!errorField}
            helperText={
              errorField && (
                <span data-test={`${dataTestId}-error`}>
                  {errorField?.message}
                </span>
              )
            }
            inputProps={{ "data-test": dataTestId }}
            ref={ref}
            {...restField}
            {...restProps}
          />
        );
      }}
    />
  );
}

export default function FormTestField<TFieldValues>(
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
