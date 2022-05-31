import { Box, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClientsTable from "./ClientsTable";

export default function ClientsTableContainer() {
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Latest clients
        </Typography>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Button>All Clients</Button>
        <Button>Add Client</Button>
      </Box>
      <ClientsTable />
    </>
  );
}
