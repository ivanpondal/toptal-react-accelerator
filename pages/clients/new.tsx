import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "../../src/auth/AuthGuard";
import ClientCreationContainer from "../../src/clients/ClientCreationContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import NavBarContainer from "../../src/components/NavBarContainer";

export default function NewClient() {
  return (
    <AuthGuard>
      <NavBarContainer />
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
            <ClientCreationContainer />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
