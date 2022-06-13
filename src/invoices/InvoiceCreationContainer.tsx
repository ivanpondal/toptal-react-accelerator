import { ClientAPI } from "../api/base";
import InvoiceForm from "./InvoiceForm";
import { useAsync } from "../hooks/useAsync";
import { useEffect } from "react";

export default function InvoiceCreationContainer() {
  const {
    execute,
    value: clientNames,
    error,
    status,
  } = useAsync(async () => {
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
  });

  useEffect(() => {
    execute({});
  }, []);

  let clientNamesForm = clientNames ? clientNames : {};

  return (
    <InvoiceForm
      onSubmitRequest={(val) => console.log(val)}
      clientNames={clientNamesForm}
    />
  );
}
