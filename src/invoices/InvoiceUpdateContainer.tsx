import { ClientAPI, InvoiceAPI } from "../api/base";
import InvoiceForm, { InvoiceDetailsFormData } from "./InvoiceForm";
import { useAsync } from "../hooks/useAsync";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function InvoiceUpdateContainer(props: { invoiceId?: string }) {
  const { invoiceId } = props;

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
            invoiceProjectCode: invoice.projectCode,
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

  const [successfulUpdateMessage, setSuccessfulUpdateMessage] = useState<
    string | null
  >(null);

  const {
    execute,
    value,
    error,
    status: updateStatus,
  } = useAsync(async (params: InvoiceDetailsFormData) => {
    setSuccessfulUpdateMessage(null);
    return await InvoiceAPI.update({
      id: invoiceId ? invoiceId : "",
      invoice_number: params.invoiceNumber,
      client_id: params.invoiceClientId,
      date: params.invoiceDate.valueOf(),
      dueDate: params.invoiceDueDate.valueOf(),
      value: params.total,
      projectCode: params.invoiceProjectCode,
      meta: { items: params.items },
    }).then(() => setSuccessfulUpdateMessage("Invoice updated successfully!"));
  });

  let clientNamesForm = clientNames ? clientNames : {};
  let invoiceForm = invoice ? invoice : undefined;

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let successMessage = successfulUpdateMessage
    ? successfulUpdateMessage
    : undefined;

  const loading =
    invoiceLoadingStatus === "pending" && updateStatus === "pending";

  let invoiceNotFoundMessage;
  if (
    invoiceLoadingStatus === "error" &&
    invoiceLoadingError === "Invoice not found"
  ) {
    invoiceNotFoundMessage = "Invoice was not found :(";
  }

  return invoiceNotFoundMessage ? (
    <Typography variant="h4" data-test="not-found-message">
      {invoiceNotFoundMessage}
    </Typography>
  ) : (
    <>
      <Typography variant="h5">Update invoice</Typography>
      <InvoiceForm
        invoice={invoiceForm}
        onSubmitRequest={execute}
        clientNames={clientNamesForm}
        loading={loading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isUpdateForm
      />
    </>
  );
}
