import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "../../src/auth/AuthGuard";
import ClientContainer from "../../src/clients/ClientContainer";
import CompanyDetailsContainer from "../../src/company/CompanyDetailsContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";

export default function NewClient() {
  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create client
            </Typography>
            <ClientContainer />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
