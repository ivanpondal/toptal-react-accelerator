import { Container, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AuthGuard } from "../../src/auth/AuthGuard";
import ClientEditContainer from "../../src/clients/ClientEditContainer";
import { CompanyDetailsGuard } from "../../src/company/CompanyDetailsGuard";
import NavBarContainer from "../../src/components/NavBarContainer";

export default function EditClient() {
  const router = useRouter();
  const { id: clientId } = router.query;

  if (!clientId || Array.isArray(clientId)) {
    // loading
    return null;
  }

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
              Edit client
            </Typography>
            <ClientEditContainer clientId={clientId} />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
