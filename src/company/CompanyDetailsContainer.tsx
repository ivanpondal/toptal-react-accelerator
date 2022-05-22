import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import CompanyDetailsForm, {
  CompanyDetailsFormData,
} from "./CompanyDetailsForm";

export default function CompanyDetailsContainer() {
  const {
    execute,
    value: updateSuccessResponse,
    error,
    status,
  } = useAsync(
    async (params: CompanyDetailsFormData) =>
      await UserAPI.updateCompanyDetails({
        name: params.companyName,
        address: params.companyAddress,
        vatNumber: params.vatNumber,
        regNumber: params.registrationNumber,
        iban: params.iban,
        swift: params.swift,
      })
  );
  const router = useRouter();

  useEffect(() => {
    if (updateSuccessResponse?.success) {
      router.push("/");
    }
  }, [updateSuccessResponse]);

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  return (
    <CompanyDetailsForm
      onUpdateRequest={execute}
      loading={status === "pending"}
      errorMessage={errorMessage}
    />
  );
}
