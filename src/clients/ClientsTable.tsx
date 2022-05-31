import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "next/link";

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
    field: "clientName",
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
    field: "invoiceCount",
    headerName: "Invoice count",
    flex: 1,
    sortable: false,
    type: "number",
  },
  {
    field: "contextualAction",
    headerName: "",
    type: "actions",
    sortable: false,
    renderCell: (params) => <ContextMenu rowId={params.id} />,
  },
];
const dummyRows = [
  {
    id: 234,
    clientName: "Bob",
    companyName: "Fantasia",
    totalBilled: 234.5,
    invoiceCount: 324,
  },
  {
    id: 2,
    clientName: "Bob",
    companyName: "Fantasia",
    totalBilled: 234.5,
    invoiceCount: 324,
  },
];

export default function ClientsTable() {
  return (
    <DataGrid
      columns={columns}
      rows={dummyRows}
      hideFooter
      disableColumnMenu
      autoHeight
    />
  );
}
