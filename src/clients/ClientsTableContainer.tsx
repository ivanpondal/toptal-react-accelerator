import { Box, Button, IconButton, Typography } from "@mui/material";
import ClientsTable from "./ClientsTable";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";

export default function ClientsTableContainer() {
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Latest clients
        </Typography>
        <Button href="/clients">All Clients</Button>
        <IconButton href="/clients/new">
          <AddBoxIcon color="primary" />
        </IconButton>
      </Box>
      <ClientsTable />
    </>
  );
}
