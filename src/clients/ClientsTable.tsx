import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { ClientInvoicesAggregate } from "../api/base";
import {
  DataTestCell,
  DataTestLoadingOverlay,
  DataTestNoRowsOverlay,
  DataTestRow,
} from "../components/data-test-grid-components";
import { ContextMenu } from "../components/ContextMenu";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
  },
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1.5,
    sortable: false,
  },
  {
    field: "totalBilled",
    headerName: "Total billed",
    sortable: false,
    type: "number",
  },
  {
    field: "invoicesCount",
    headerName: "Invoice count",
    flex: 1.5,
    sortable: false,
    type: "number",
  },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    sortable: false,
    renderCell: (params) => (
      <ContextMenu
        menuItems={[
          { href: "", item: "Add new invoice" },
          { href: `/clients/${params.id}/edit`, item: "Edit client" },
        ]}
      />
    ),
  },
];

export default function ClientsTable(props: {
  clients: ClientInvoicesAggregate[];
  loading: boolean;
  onRowClick: (rowId: GridRowId) => unknown;
}) {
  const { clients, loading, onRowClick } = props;
  return (
    <DataGrid
      data-test="clients-table"
      columns={columns}
      rows={clients}
      hideFooter
      disableColumnMenu
      autoHeight
      loading={loading}
      onRowClick={(params) => onRowClick(params.id)}
      components={{
        LoadingOverlay: DataTestLoadingOverlay,
        Row: DataTestRow("client"),
        Cell: DataTestCell("client"),
        NoRowsOverlay: DataTestNoRowsOverlay,
      }}
    />
  );
}
