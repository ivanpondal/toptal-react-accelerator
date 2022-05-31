import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import Context from "@mui/base/TabsUnstyled/TabsContext";
import { useState } from "react";

function ContextMenu() {
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
        <MenuItem>Add new invoice</MenuItem>
        <MenuItem>Edit client</MenuItem>
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
    renderCell: (params) => <ContextMenu />,
  },
];
const dummyRows = [
  {
    id: 1,
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
