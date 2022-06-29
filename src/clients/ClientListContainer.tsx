import { Alert, Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import ClientsTable, { TableClient } from "./ClientsTable";
import { useAsync } from "../hooks/useAsync";
import { useCallback, useEffect } from "react";
import { ClientAPI } from "../api/base";

export const ClientListContainer = (props: { page?: number }) => {
  const { page } = props;
  let errorMessage = "";

  const {
    execute,
    value: clientListResponse,
    error,
    status,
  } = useAsync(
    useCallback(
      (params: any) =>
        ClientAPI.gqlGetAll(params).then((res) => ({
          clients: res.clients.results.map((client) => ({
            companyName: client.companyDetails.name,
            ...client,
          })),
          total: res.clients.total,
        })),
      []
    )
  );

  useEffect(() => {
    execute({ limit: 10 });
  }, [execute]);

  let totalClients = 0;
  let clients: TableClient[] = [];
  if (clientListResponse) {
    clients = clientListResponse.clients;
    totalClients = clientListResponse.total;
  }

  return (
    <div style={{ display: "block" }}>
      {errorMessage && (
        <Alert sx={{ mb: 1 }} severity="error" data-test="clients-fetch-error">
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", mt: 3, mb: 1 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Clients
        </Typography>
        <Link href="/clients/new" passHref>
          <IconButton data-test="add-client">
            <AddBoxIcon color="primary" />
          </IconButton>
        </Link>
      </Box>
      <ClientsTable
        clients={clients}
        loading={status === "pending"}
        onRowClick={(rowId) => router.push(`/clients/${rowId}`)}
        // sortable={true}
        // sortModel={tableSortModel}
        // onSortModelChange={(_) => {}}
        pagination
        page={page}
        totalRowCount={totalClients}
      />
    </div>
  );
};
