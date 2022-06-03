import { ClientAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import ClientForm, { ClientDetailsFormData } from "./ClientForm";

export default function ClientCreationContainer() {
  const {
    execute,
    value: updateSuccessResponse,
    error,
    status,
  } = useAsync(
    async (params: ClientDetailsFormData) =>
      await ClientAPI.create({
        email: params.clientEmail,
        name: params.clientName,
        companyDetails: {
          name: params.companyName,
          address: params.companyAddress,
          vatNumber: params.vatNumber,
          regNumber: params.registrationNumber,
          iban: params.iban,
          swift: params.iban,
        },
      })
  );

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let successMessage;
  if (updateSuccessResponse) {
    successMessage = "Client has been created successfully!";
  }

  return (
    <ClientForm
      onSubmitRequest={execute}
      errorMessage={errorMessage}
      successMessage={successMessage}
      loading={status === "pending"}
    />
  );
}
