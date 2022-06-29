import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import {
  CustomPagination,
  DataTestCell,
  DataTestLoadingOverlay,
  DataTestNoRowsOverlay,
  DataTestRow,
  GridPaginationProps,
  GridSortingProps,
  PAGE_SIZE,
} from "../components/custom-grid";
import { ContextMenu } from "../components/ContextMenu";

const columns: (sortable: boolean) => GridColDef[] = (sortable) => [
  {
    field: "name",
    headerName: "Name",
    sortable: sortable,
  },
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1.5,
    sortable: sortable,
  },
  {
    field: "totalBilled",
    headerName: "Total billed",
    sortable: sortable,
    type: "number",
  },
  {
    field: "invoicesCount",
    headerName: "Invoice count",
    flex: 1.5,
    sortable: sortable,
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
          { href: `/clients/${params.id}`, item: "Edit client" },
        ]}
      />
    ),
  },
];

export type TableClient = {
  totalBilled: number;
  invoicesCount: number;
  id: string;
  name: string;
  companyName: string;
};

export default function ClientsTable(
  props: {
    clients: Array<TableClient>;
    loading: boolean;
    onRowClick: (rowId: GridRowId) => unknown;
  } & GridPaginationProps &
    GridSortingProps
) {
  const {
    clients,
    loading,
    onRowClick,
    sortModel,
    onSortModelChange,
    sortable = false,
    pagination,
    page,
    totalRowCount,
    onPageChange,
  } = props;
  return (
    <div data-test="clients-table">
      <DataGrid
        columns={columns(sortable)}
        rows={clients}
        hideFooter={!pagination}
        disableColumnMenu
        autoHeight
        loading={loading}
        onRowClick={(params) => onRowClick(params.id)}
        components={{
          LoadingOverlay: DataTestLoadingOverlay,
          Row: DataTestRow("client"),
          Cell: DataTestCell("client"),
          NoRowsOverlay: DataTestNoRowsOverlay,
          NoResultsOverlay: DataTestNoRowsOverlay,
          Pagination: CustomPagination,
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        sortingMode="server"
        pagination={pagination}
        paginationMode={pagination ? "server" : "client"}
        rowCount={totalRowCount}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        onPageChange={onPageChange}
        page={page ? page - 1 : undefined}
      />
    </div>
  );
}
