import {
  GridLoadingOverlay,
  GridRowProps,
  GridRow,
  GridCellProps,
  GridCell,
  GridNoRowsOverlay,
} from "@mui/x-data-grid";

export const DataTestLoadingOverlay = () => (
  <GridLoadingOverlay data-test="loading-overlay" />
);

export const DataTestRow =
  (id: string) =>
  (props: React.HTMLAttributes<HTMLDivElement> & GridRowProps) =>
    <GridRow data-test={`${id}-row-${props.rowId}}`} {...props} />;

export const DataTestCell = (id: string) => (props: GridCellProps<any, any>) =>
  <GridCell data-test={`${id}-${props.field}`} {...props} />;

export const DataTestNoRowsOverlay = () => (
  <GridNoRowsOverlay data-test="empty-placeholder" />
);
