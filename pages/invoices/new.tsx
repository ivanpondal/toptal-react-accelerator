import { Container, Box, Typography } from "@mui/material";
import { AuthGuard } from "../../src/auth/AuthGuard";
import ClientCreationContainer from "../../src/clients/ClientCreationContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import InvoiceCreationContainer from "../../src/invoices/InvoiceCreationContainer";

export default function NewInvoice() {
  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Create invoice
            </Typography>
            <InvoiceCreationContainer />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
