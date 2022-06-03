import { GridRowId, DataGrid, GridColDef } from "@mui/x-data-grid";
import { ContextMenu } from "../components/ContextMenu";
import {
  DataTestLoadingOverlay,
  DataTestRow,
  DataTestCell,
  DataTestNoRowsOverlay,
} from "../components/data-test-grid-components";

const columns: GridColDef[] = [
  {
    field: "number",
    headerName: "Invoice number",
    flex: 1.75,
    sortable: false,
  },
  {
    field: "company",
    headerName: "Company name",
    flex: 1.75,
    sortable: false,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1.25,
    sortable: false,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "project",
    headerName: "Project",
    flex: 1,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    sortable: false,
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
        menuItems={[
          { href: "", item: "Print invoice" },
          { href: `/invoices/${params.id}/edit`, item: "Edit invoice" },
        ]}
      />
    ),
  },
];

export const InvoicesTable = (props: {
  invoices: Array<{
    id: string;
    number: string;
    company: string;
    date: number;
    project: string;
    price: number;
  }>;
  loading: boolean;
  onRowClick: (rowId: GridRowId) => unknown;
}) => {
  const { invoices, loading, onRowClick } = props;
  return (
    <DataGrid
      data-test="invoices-table"
      columns={columns}
      rows={invoices}
      hideFooter
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
    />
  );
};
