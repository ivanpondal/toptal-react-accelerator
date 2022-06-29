import { Alert, Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import ClientsTable, { TableClient } from "./ClientsTable";
import { useAsync } from "../hooks/useAsync";
import { useCallback, useEffect } from "react";
import { ClientAPI } from "../api/base";
import { ClientSortingParams } from "./client-list-types";

export const ClientListContainer = (props: {
  sorting?: ClientSortingParams;
  page?: number;
}) => {
  const { sorting, page } = props;
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
    const limit = 10;
    let offset = 0;
    if (page) {
      offset = (page - 1) * limit;
    }
    execute({ sort: sorting, limit: 10, offset: offset });
  }, [execute, sorting, page]);

  const renderQueryParams = useCallback(
    (params: {
      sortingParams?: ClientSortingParams | null;
      pageNumber?: number;
    }) => {
      const { sortingParams = sorting, pageNumber = page } = params;

      let paginationQueryParam;
      if (pageNumber) {
        paginationQueryParam = `page=${pageNumber}`;
      }

      let sortingQueryParam;
      if (sortingParams) {
        sortingQueryParam = `sortBy=${
          sortingParams.field
        }&sortOrder=${sortingParams.order?.toUpperCase()}`;
      } else if (sortingParams === null) {
        sortingQueryParam = undefined;
      }

      let queryParams = [paginationQueryParam, sortingQueryParam]
        .filter((value) => value !== undefined)
        .join("&");

      return queryParams ? `?${queryParams}` : "";
    },
    [sorting, page]
  );

  const tableSortModel = sorting
    ? [
        {
          field:
            sorting.field === "clientName" ? "name" : (sorting.field as string),
          sort: sorting.order,
        },
      ]
    : [];

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
        sortable={true}
        sortModel={tableSortModel}
        onSortModelChange={(model) => {
          const sortingParams =
            model.length === 0
              ? null
              : ({
                  field:
                    model[0].field === "name" ? "clientName" : model[0].field,
                  order: model[0].sort,
                } as ClientSortingParams);
          router.push(
            `/clients${renderQueryParams({ sortingParams: sortingParams })}`
          );
        }}
        pagination
        page={page}
        totalRowCount={totalClients}
        onPageChange={(page) =>
          router.push(`/clients${renderQueryParams({ pageNumber: page + 1 })}`)
        }
      />
    </div>
  );
};
