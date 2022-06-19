import { Container, Box, Typography, Grid } from "@mui/material";
import { AuthGuard } from "../src/auth/AuthGuard";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import { InvoiceListContainer } from "../src/invoices/InvoiceListContainer";

export default function InvoiceList() {
  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="lg">
          <InvoiceListContainer />
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
