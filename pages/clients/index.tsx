import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { AuthGuard } from "../../src/auth/AuthGuard";
import { ClientListContainer } from "../../src/clients/ClientListContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";

export default function ClientList() {
  const router = useRouter();

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <ClientListContainer />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
