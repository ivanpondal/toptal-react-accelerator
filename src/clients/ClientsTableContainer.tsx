import { Box, Button, IconButton, Typography } from "@mui/material";
import ClientsTable from "./ClientsTable";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import { useEffect } from "react";
import { ClientAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";

export default function ClientsTableContainer() {
  const {
    execute,
    value: clientsResponse,
    error,
    status,
  } = useAsync((params: any) =>
    ClientAPI.getClients(params)
      .then((res) => res.clients)
      .then((res) =>
        res.map((client) => {
          return {
            clientName: client.name,
            companyName: client.companyDetails.name,
            ...client
          };
        })
      )
  );

  useEffect(() => {
    execute({ sort: { creation: "desc" }, limit: 10 });
  }, []);

  let clients = clientsResponse ? clientsResponse : [];

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
      <ClientsTable clients={clients} loading={status === "pending"} />
    </>
  );
}
