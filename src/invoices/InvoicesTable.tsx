import {
  GridRowId,
  DataGrid,
  GridColDef,
  GridSortModel,
} from "@mui/x-data-grid";
import { ContextMenu } from "../components/ContextMenu";
import {
  DataTestLoadingOverlay,
  DataTestRow,
  DataTestCell,
  DataTestNoRowsOverlay,
} from "../components/data-test-grid";

const columns: (sortable: boolean) => GridColDef[] = (sortable = false) => [
  {
    field: "number",
    headerName: "Invoice number",
    flex: 1.75,
    sortable: false,
  },
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1.75,
    sortable: sortable,
  },
  {
    field: "creationDate",
    headerName: "Date",
    flex: 1.25,
    sortable: sortable,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    flex: 1.25,
    sortable: sortable,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "project",
    headerName: "Project",
    flex: 1,
    sortable: false,
  },
  {
    field: "total",
    headerName: "Price",
    sortable: sortable,
    flex: 1,
    type: "number",
  },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <ContextMenu
        dataTestId="invoice-actions"
        menuItems={[
          {
            href: `/invoices/${params.id}/view?print=true`,
            item: "Print invoice",
            dataTestId: "invoice-print",
          },
          { href: `/invoices/${params.id}/edit`, item: "Edit invoice" },
        ]}
      />
    ),
  },
];

export type TableInvoice = {
  id: string;
  number: string;
  companyName: string;
  creationDate: number;
  dueDate: number;
  project?: string;
  total: number;
};

export type GridSortingProps = {
  sortable?: boolean;
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
};

export type GridPaginationProps = {
  pagination?: true;
  page?: number;
  totalRowCount?: number;
  pageSize?: number;
  onPageChange?: (pageNumber: number) => void;
};

export const InvoicesTable = (
  props: {
    invoices: Array<TableInvoice>;
    loading: boolean;
    onRowClick: (rowId: GridRowId) => unknown;
  } & GridSortingProps &
    GridPaginationProps
) => {
  const {
    invoices,
    loading,
    onRowClick,
    sortModel,
    onSortModelChange,
    sortable = false,
    pagination,
    totalRowCount,
    pageSize,
    onPageChange,
  } = props;
  return (
    <div data-test="invoices-table">
      <DataGrid
        columns={columns(sortable)}
        rows={invoices}
        hideFooter={!pagination}
        disableColumnMenu
        autoHeight
        loading={loading}
        onRowClick={(params) => onRowClick(params.id)}
        components={{
          LoadingOverlay: DataTestLoadingOverlay,
          Row: DataTestRow("invoice"),
          Cell: DataTestCell("invoice"),
          NoRowsOverlay: DataTestNoRowsOverlay,
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        sortingMode="server"
        columnVisibilityModel={{ dueDate: sortable }}
        pagination={pagination}
        paginationMode="server"
        rowsPerPageOptions={[10]}
        rowCount={totalRowCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};
