import { Alert, Box, IconButton, Typography } from "@mui/material";
import { InvoicesTable } from "./InvoicesTable";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { InvoiceAPI } from "../api/base";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";
import Link from "next/link";

export const InvoiceListContainer = () => {
  const router = useRouter();

  const {
    execute,
    value: invoicesResponse,
    error,
    status,
  } = useAsync((params: any) =>
    InvoiceAPI.getAll(params)
      .then((res) => res.invoices)
      .then((res) =>
        res.map((invoiceWithDetails) => {
          return {
            id: invoiceWithDetails.invoice.id,
            number: invoiceWithDetails.invoice.invoice_number,
            company: invoiceWithDetails.client.companyDetails.name,
            date: invoiceWithDetails.invoice.date,
            project: invoiceWithDetails.invoice.projectCode,
            price: invoiceWithDetails.invoice.value,
          };
        })
      )
  );

  useEffect(() => {
    execute({ sort: { creation: "desc" }, limit: 10 });
  }, []);

  let invoices = invoicesResponse ? invoicesResponse : [];

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

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
        loading={status === "pending"}
        onRowClick={(rowId) => router.push(`/invoices/${rowId}/view`)}
      />
    </div>
  );
};
