import { Alert, Box, IconButton, Typography } from "@mui/material";
import { InvoicesTable } from "./InvoicesTable";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
          if (model.length === 0) {
            router.push("/invoices");
          } else {
            router.push(
              `/invoices?sortBy=${
                model[0].field
              }&sortOrder=${model[0].sort?.toUpperCase()}`
            );
          }
        }}
        pagination
        onPageChange={(page) => router.push(`invoices?page=${page + 1}`)}
        totalRowCount={totalInvoices}
        pageSize={invoices.length}
      />
    </div>
  );
};
