import { TextField, TextFieldProps } from "@mui/material";
import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";

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
