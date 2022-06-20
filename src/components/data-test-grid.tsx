import {
  GridLoadingOverlay,
  GridRowProps,
  GridRow,
  GridCellProps,
  GridCell,
  GridNoRowsOverlay,
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
