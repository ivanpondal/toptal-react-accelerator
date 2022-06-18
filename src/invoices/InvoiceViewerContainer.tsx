import { ClientAPI, InvoiceAPI } from "../api/base";
import { InvoiceDetailsFormData } from "./InvoiceForm";
import { useAsync } from "../hooks/useAsync";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import InvoiceViewer from "./InvoiceViewer";

export default function InvoiceViewerContainer(props: {
  invoiceId?: string;
  print: boolean;
}) {
  const { invoiceId, print } = props;

  const {
    execute: loadInvoice,
    value: invoice,
    error: invoiceLoadingError,
    status: invoiceLoadingStatus,
  } = useAsync(
    async (params: { id: string }): Promise<InvoiceDetailsFormData> => {
      return await InvoiceAPI.getById(params.id)
        .then((res) => res.invoice)
        .then((invoice) => {
          return {
            invoiceDate: new Date(invoice.date),
            invoiceDueDate: new Date(invoice.dueDate),
            invoiceNumber: invoice.invoice_number,
            invoiceProjectCode: invoice.projectCode ? invoice.projectCode : "",
            invoiceClientId: invoice.client_id,
            items: invoice.meta?.items ? invoice.meta?.items : [],
            total: invoice.value,
          };
        });
    }
  );

  useEffect(() => {
    if (invoiceId) {
      loadInvoice({ id: invoiceId });
    }
  }, [invoiceId]);

  const { execute: loadClientNames, value: clientNames } = useAsync(
    async () => {
      return await ClientAPI.getAllNames()
        .then((res) => res.clients)
        .then((clients) =>
          clients.map((item) => [
            item.id,
            {
              id: item.id,
              label: item.companyName,
            },
          ])
        )
        .then((clientPairs) => Object.fromEntries(clientPairs));
    }
  );

  useEffect(() => {
    loadClientNames({});
  }, []);

  let clientNamesForm = clientNames ? clientNames : {};
  let invoiceForm = invoice ? invoice : undefined;

  let errorMessage;
  if (invoiceLoadingStatus === "error") {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let invoiceNotFoundMessage;
  if (
    invoiceLoadingStatus === "error" &&
    invoiceLoadingError === "Invoice not found"
  ) {
    invoiceNotFoundMessage = "Invoice was not found :(";
  }

  useEffect(() => {
    if (print && invoice && clientNames) {
      window.print();
    }
  }, [print, invoice, clientNames]);

  return invoiceNotFoundMessage ? (
    <Typography variant="h4" data-test="not-found-message">
      {invoiceNotFoundMessage}
    </Typography>
  ) : (
    <InvoiceViewer
      invoice={invoiceForm}
      clientNames={clientNamesForm}
      errorMessage={errorMessage}
    />
  );
}
