import { Autocomplete, TextField } from "@mui/material";
import {
  GridLoadingOverlay,
  GridRowProps,
  GridRow,
  GridCellProps,
  GridCell,
  GridNoRowsOverlay,
  GridFilterInputValueProps,
} from "@mui/x-data-grid";
import React from "react";

export const DataTestLoadingOverlay = () => (
  <GridLoadingOverlay data-test="loading-overlay" />
);

export const DataTestRow = (id: string) =>
  React.memo(function DataTestRow(
    props: React.HTMLAttributes<HTMLDivElement> & GridRowProps
  ) {
    return <GridRow data-test={`${id}-row-${props.rowId}}`} {...props} />;
  });

export const DataTestCell = (id: string) =>
  React.memo(function DataTestCell(props: GridCellProps<any, any>) {
    return <GridCell data-test={`${id}-${props.field}`} {...props} />;
  });

export const DataTestNoRowsOverlay = () => (
  <GridNoRowsOverlay data-test="empty-placeholder" />
);

export const AutocompleteFilter = (
  props: GridFilterInputValueProps & Record<string, any>
) => {
  const { item, options, applyValue } = props;
  console.log("filter", props);
  return (
    <Autocomplete
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
      options={options}
      onChange={(_, data) =>
        applyValue({ ...item, value: data ? data.label : null })
      }
      value={item.value ? item.value : null}
      isOptionEqualToValue={(option, value) =>
        value ? option.label === value : false
      }
      renderInput={(params) => {
        return <TextField margin="normal" sx={{ m: 0 }} {...params} />;
      }}
    />
  );
};
