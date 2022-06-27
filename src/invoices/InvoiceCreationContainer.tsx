import { ClientAPI, InvoiceAPI } from "../api/base";
import InvoiceForm, { InvoiceDetailsFormData } from "./InvoiceForm";
import { useAsync } from "../hooks/useAsync";
import { useCallback, useEffect, useState } from "react";

export default function InvoiceCreationContainer() {
  const { execute: loadClientNames, value: clientNames } = useAsync(
    useCallback(async () => {
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
    }, [])
  );

  const [successfulUpdateMessage, setSuccessfulUpdateMessage] = useState<
    string | null
  >(null);

  const { execute, value, error, status } = useAsync(
    useCallback(async (params: InvoiceDetailsFormData) => {
      setSuccessfulUpdateMessage(null);
      return await InvoiceAPI.create({
        invoice_number: params.invoiceNumber,
        client_id: params.invoiceClientId,
        date: params.invoiceDate.valueOf(),
        dueDate: params.invoiceDueDate.valueOf(),
        value: params.total,
        projectCode: params.invoiceProjectCode,
        meta: { items: params.items },
      }).then(() =>
        setSuccessfulUpdateMessage("Invoice created successfully!")
      );
    }, [])
  );

  useEffect(() => {
    loadClientNames({});
  }, [loadClientNames]);

  let clientNamesForm = clientNames ? clientNames : {};

  let errorMessage;
  if (error === "invoice with that number already exists") {
    errorMessage = "Invoice number already exists";
  } else if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let successMessage = successfulUpdateMessage
    ? successfulUpdateMessage
    : undefined;

  return (
    <InvoiceForm
      onSubmitRequest={execute}
      clientNames={clientNamesForm}
      loading={status === "pending"}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
}
