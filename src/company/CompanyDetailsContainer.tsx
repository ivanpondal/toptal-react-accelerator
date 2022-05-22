import { UserAPI } from "../api/base";
import { useAsync } from "../hooks/useAsync";
import CompanyDetailsForm from "./CompanyDetailsForm";

export default function CompanyDetailsContainer() {
  const {
    execute,
    value: signUpSuccessResponse,
    error,
    status,
  } = useAsync(UserAPI.updateCompanyDetails);

  let errorMessage;

  return (
    <CompanyDetailsForm
      onUpdateRequest={execute}
      loading={status === "pending"}
      errorMessage={errorMessage}
    />
  );
}
