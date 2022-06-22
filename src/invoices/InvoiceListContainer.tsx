import { Alert, Box, IconButton, Typography } from "@mui/material";
import { InvoicesTable } from "./InvoicesTable";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import Link from "next/link";
import { useInvoiceStore } from "./InvoiceStore";
import { InvoiceSortingParams } from "./invoice-list-types";

export const InvoiceListContainer = (props: {
  sorting?: InvoiceSortingParams;
  page?: number;
}) => {
  const router = useRouter();
  const { sorting, page } = props;

  const renderQueryParams = useCallback(
    (params: {
      sortingParams?: InvoiceSortingParams | null;
      pageNumber?: number;
    }) => {
      const { sortingParams = sorting, pageNumber = page } = params;

      let paginationQueryParams;
      if (pageNumber) {
        paginationQueryParams = `page=${pageNumber}`;
      }

      let sortingQueryParams;
      if (sortingParams) {
        sortingQueryParams = `sortBy=${
          sortingParams.field
        }&sortOrder=${sortingParams.order?.toUpperCase()}`;
      } else if (sortingParams === null) {
        sortingQueryParams = undefined;
      }

      let queryParams = [paginationQueryParams, sortingQueryParams]
        .filter((value) => value !== undefined)
        .join("&");

      return queryParams ? `?${queryParams}` : "";
    },
    [sorting, page]
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
      />
    </div>
  );
};
