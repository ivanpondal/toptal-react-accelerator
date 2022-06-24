import { Alert, Box, IconButton, Typography } from "@mui/material";
import { InvoicesTable } from "./InvoicesTable";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import Link from "next/link";
import { useInvoiceStore } from "./InvoiceStore";
import { InvoiceSortingParams } from "./invoice-list-types";
import { ClientAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";

export const InvoiceListContainer = (props: {
  sorting?: InvoiceSortingParams;
  page?: number;
  companyNameFilter?: string;
}) => {
  const router = useRouter();

  const { execute: loadClientNames, value: clientNames } = useAsync(
    useCallback(async () => {
      return await ClientAPI.getAllNames()
        .then((res) => res.clients)
        .then((clients) =>
          clients.map((item) => ({
            id: item.id,
            label: item.companyName,
          }))
        );
    }, [])
  );

  useEffect(() => {
    loadClientNames({});
  }, [loadClientNames]);

  let filterClientNames = clientNames ? clientNames : [];

  const { sorting, page, companyNameFilter } = props;

  const renderQueryParams = useCallback(
    (params: {
      sortingParams?: InvoiceSortingParams | null;
      pageNumber?: number;
      companyFilter?: string | null;
    }) => {
      const {
        sortingParams = sorting,
        pageNumber = page,
        companyFilter = companyNameFilter,
      } = params;

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

      let companyFilterQueryParam;
      if (companyFilter) {
        companyFilterQueryParam = `companyFilter=${companyFilter}`;
      } else if (companyFilter === null) {
        companyFilterQueryParam = undefined;
      }

      let queryParams = [
        paginationQueryParam,
        sortingQueryParam,
        companyFilterQueryParam,
      ]
        .filter((value) => value !== undefined)
        .join("&");

      return queryParams ? `?${queryParams}` : "";
    },
    [sorting, page, companyNameFilter]
  );

  const tableSortModel = sorting
    ? [
        {
          field: sorting.field as string,
          sort: sorting.order,
        },
      ]
    : [];

  const {
    invoices,
    total: totalInvoices,
    fetchStatus,
    errorMessage,
  } = useInvoiceStore((state) => state.invoiceList);
  const fetchInvoiceList = useInvoiceStore((state) => state.fetchInvoiceList);

  // sorting or page change event
  useEffect(() => {
    fetchInvoiceList({ sort: sorting, page: page });
  }, [fetchInvoiceList, sorting, page]);

  return (
    <div style={{ display: "block" }}>
      {errorMessage && (
        <Alert sx={{ mb: 1 }} severity="error" data-test="invoices-fetch-error">
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", mt: 3, mb: 1 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Invoices
        </Typography>
        <Link href="/invoices/new" passHref>
          <IconButton data-test="add-invoice">
            <AddBoxIcon color="primary" />
          </IconButton>
        </Link>
      </Box>
      <InvoicesTable
        invoices={invoices}
        loading={fetchStatus === "pending"}
        onRowClick={(rowId) => router.push(`/invoices/${rowId}/view`)}
        sortable={true}
        sortModel={tableSortModel}
        onSortModelChange={(model) => {
          const sortingParams =
            model.length === 0
              ? null
              : ({
                  field: model[0].field,
                  order: model[0].sort,
                } as InvoiceSortingParams);
          router.push(
            `/invoices${renderQueryParams({ sortingParams: sortingParams })}`
          );
        }}
        pagination
        onPageChange={(page) =>
          router.push(`invoices${renderQueryParams({ pageNumber: page + 1 })}`)
        }
        totalRowCount={totalInvoices}
        filtering
        onFilterChange={(filterModel) => {
          const companyFilter =
            filterModel.items.length === 0 ? null : filterModel.items[0].value;
          router.push(
            `invoices${renderQueryParams({
              companyFilter: companyFilter,
            })}`
          );
        }}
        filterClientNames={filterClientNames}
        selectedClientName={companyNameFilter}
      />
    </div>
  );
};
