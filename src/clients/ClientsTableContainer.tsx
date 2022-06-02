import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import ClientsTable from "./ClientsTable";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import { useEffect } from "react";
import { ClientAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ClientsTableContainer() {
  const router = useRouter();

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
            companyName: client.companyDetails.name,
            ...client,
          };
        })
      )
  );

  useEffect(() => {
    execute({ sort: { creation: "desc" }, limit: 10 });
  }, []);

  let clients = clientsResponse ? clientsResponse : [];

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Latest clients
        </Typography>
        <Link href="/clients" passHref>
          <Button data-test="view-all-clients">All Clients</Button>
        </Link>
        <Link href="/clients/new" passHref>
          <IconButton data-test="add-client">
            <AddBoxIcon color="primary" />
          </IconButton>
        </Link>
      </Box>
      {errorMessage && (
        <Alert sx={{ mb: 1 }} severity="error" data-test="clients-fetch-error">
          {errorMessage}
        </Alert>
      )}
      <ClientsTable
        clients={clients}
        loading={status === "pending"}
        onRowClick={(rowId) => router.push(`/clients/${rowId}`)}
      />
    </>
  );
}
