import { Box, Typography, Button, IconButton, Alert } from "@mui/material";
import Link from "next/link";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import { InvoicesTable } from "./InvoicesTable";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { InvoiceAPI } from "../api/base";

export const LatestInvoicesTableContainer = () => {
  const router = useRouter();

  const {
    execute,
    value: invoicesResponse,
    error,
    status,
  } = useAsync(
    useCallback(
      (params: any) =>
        InvoiceAPI.getAll(params)
          .then((res) => res.invoices)
          .then((res) =>
            res.map((invoiceWithDetails) => {
              return {
                id: invoiceWithDetails.invoice.id,
                number: invoiceWithDetails.invoice.invoice_number,
                companyName: invoiceWithDetails.client.companyDetails.name,
                creationDate: invoiceWithDetails.invoice.date,
                dueDate: invoiceWithDetails.invoice.dueDate,
                project: invoiceWithDetails.invoice.projectCode,
                total: invoiceWithDetails.invoice.value,
              };
            })
          ),
      []
    )
  );

  useEffect(() => {
    execute({ sort: { creation: "desc" }, limit: 10 });
  }, [execute]);

  let invoices = invoicesResponse ? invoicesResponse : [];

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Latest invoices
        </Typography>
        <Link href="/invoices" passHref>
          <Button data-test="view-all-invoices">All Invoices</Button>
        </Link>
        <Link href="/invoices/new" passHref>
          <IconButton data-test="add-invoice">
            <AddBoxIcon color="primary" />
          </IconButton>
        </Link>
      </Box>
      {errorMessage && (
        <Alert sx={{ mb: 1 }} severity="error" data-test="invoices-fetch-error">
          {errorMessage}
        </Alert>
      )}
      <InvoicesTable
        invoices={invoices}
        loading={status === "pending"}
        onRowClick={(rowId) => router.push(`/invoices/${rowId}/view`)}
      />
    </>
  );
};
