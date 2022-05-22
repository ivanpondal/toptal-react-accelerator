import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const { firstLogin } = router.query;
  const [companyDetails, setCompanyDetails] =
    useState<CompanyDetailsFormData | null>(null);
  const [successfulUpdateMessage, setSuccessfulUpdateMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    UserAPI.me().then((userResponse) => {
      let companyDetailsReponse = userResponse?.companyDetails;
      if (companyDetailsReponse) {
        setCompanyDetails({
          companyName: companyDetailsReponse.name,
          companyAddress: companyDetailsReponse.address,
          vatNumber: companyDetailsReponse.vatNumber,
          registrationNumber: companyDetailsReponse.regNumber,
          iban: companyDetailsReponse.iban,
          swift: companyDetailsReponse.swift,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (updateSuccessResponse?.success) {
      if (firstLogin) {
        router.push("/");
      } else {
        setSuccessfulUpdateMessage(
          "Company details were updated successfully!"
        );
      }
    }
  }, [updateSuccessResponse]);

  let errorMessage;
  if (error) {
    errorMessage = "Oops! Something went wrong with the server";
  }

  let companyDetailsForm;
  if (companyDetails) {
    companyDetailsForm = companyDetails;
  }

  return (
    <>
      {firstLogin && (
        <Alert severity="info" sx={{ mt: 1 }}>
          You need to set up your company details before using our app!
        </Alert>
      )}

      {successfulUpdateMessage && (
        <Alert data-test="success-message" sx={{ mt: 1 }}>
          {successfulUpdateMessage}
        </Alert>
      )}
      <CompanyDetailsForm
        onUpdateRequest={execute}
        loading={status === "pending"}
        errorMessage={errorMessage}
        companyDetails={companyDetailsForm}
      />
    </>
  );
}
