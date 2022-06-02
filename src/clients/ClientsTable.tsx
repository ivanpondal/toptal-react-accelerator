import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  DataGrid,
  GridCell,
  GridCellProps,
  GridColDef,
  GridLoadingOverlay,
  GridNoRowsOverlay,
  GridRow,
  GridRowId,
  GridRowProps,
} from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "next/link";
import { ClientInvoicesAggregate } from "../api/base";

function ContextMenu(props: { rowId: GridRowId }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem href="">Add new invoice</MenuItem>
        <Link href={`/clients/${props.rowId}/edit/`} passHref>
          <MenuItem>Edit client</MenuItem>
        </Link>
      </Menu>
    </>
  );
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    sortable: false,
  },
  {
    field: "companyName",
    headerName: "Company name",
    flex: 1,
    sortable: false,
  },
  {
    field: "totalBilled",
    headerName: "Total billed",
    flex: 1,
    sortable: false,
    type: "number",
  },
  {
    field: "invoicesCount",
    headerName: "Invoice count",
    flex: 1,
    sortable: false,
    type: "number",
  },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    sortable: false,
    renderCell: (params) => <ContextMenu rowId={params.id} />,
  },
];

const DataTestLoadingOverlay = () => (
  <GridLoadingOverlay data-test="loading-overlay" />
);

const DataTestRow = (
  props: React.HTMLAttributes<HTMLDivElement> & GridRowProps
) => <GridRow data-test={`client-row-${props.rowId}}`} {...props} />;

const DataTestCell = (props: GridCellProps<any, any>) => (
  <GridCell data-test={`client-${props.field}`} {...props} />
);

const DataTestNoRowsOverlay = () => (
  <GridNoRowsOverlay data-test="empty-placeholder" />
);

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
        Row: DataTestRow,
        Cell: DataTestCell,
        NoRowsOverlay: DataTestNoRowsOverlay,
      }}
    />
  );
}
