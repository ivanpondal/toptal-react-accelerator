import { useEffect, useState } from "react";
import { ClientAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import ClientForm, { ClientDetailsFormData } from "./ClientForm";

export default function ClientEditContainer(props: { clientId: string }) {
  const { clientId } = props;

  const [loadedClientDetails, setLoadedClientDetails] =
    useState<boolean>(false);
  const [clientDetails, setClientDetails] =
    useState<ClientDetailsFormData | null>(null);

  const {
    execute,
    value: updateSuccessResponse,
    error,
    status,
  } = useAsync(
    async (params: ClientDetailsFormData) =>
      await ClientAPI.update({
        id: clientId,
        email: params.clientEmail,
        name: params.clientName,
        companyDetails: {
          name: params.companyName,
          address: params.companyAddress,
          vatNumber: params.vatNumber,
          regNumber: params.registrationNumber,
          iban: params.iban,
          swift: params.swift,
        },
      })
  );

  useEffect(() => {
    ClientAPI.getById(clientId)
      .then((response) => {
        const { client } = response;
        return {
          clientName: client.name,
          clientEmail: client.email,
          companyName: client.companyDetails.name,
          companyAddress: client.companyDetails.address,
          vatNumber: client.companyDetails.vatNumber,
          registrationNumber: client.companyDetails.regNumber,
          iban: client.companyDetails.iban,
          swift: client.companyDetails.swift,
        };
      })
      .then((clientDetails) => {
        setLoadedClientDetails(true);
        setClientDetails(clientDetails);
      });
  }, [clientId]);

  if (!loadedClientDetails) {
    // loading
    return null;
  }

  let clientDetailsForm;
  if (clientDetails) {
    clientDetailsForm = clientDetails;
  }

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let successMessage;
  if (updateSuccessResponse) {
    successMessage = "Client has been updated successfully!";
  }

  return (
    <ClientForm
      onSubmitRequest={execute}
      errorMessage={errorMessage}
      successMessage={successMessage}
      loading={status === "pending"}
      clientDetails={clientDetailsForm}
      resetOnSubmit={false}
    />
  );
}
