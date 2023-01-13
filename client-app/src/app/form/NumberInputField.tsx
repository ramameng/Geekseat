import { BaseTextFieldProps, InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
import NumberFormat from "react-number-format";

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat<unknown> | null) => void;
  onChange: (event: {
    target: { name: string; value: number | undefined };
  }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<unknown>,
  NumberFormatCustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
});

interface Props extends BaseTextFieldProps {
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
  andorment?: string;
}

export function NumberInputField(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    helpers.setValue(e.target.value);
    if (props.onChange !== undefined) {
      props.onChange(e);
    }
  };

  return (
    <TextField
      {...field}
      {...props}
      id={props.name}
      error={meta.touched && !!meta.error}
      fullWidth
      InputProps={
        props.andorment
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  {props.andorment}
                </InputAdornment>
              ),
              inputComponent: NumberFormatCustom as any,
            }
          : {
              inputComponent: NumberFormatCustom as any,
            }
      }
      color="primary"
      onChange={handleChange}
    />
  );
}
