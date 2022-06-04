import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthGuard } from "../src/auth/AuthGuard";
import CompanyDetailsContainer from "../src/company/CompanyDetailsContainer";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";

export default function CompanyDetails() {
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
              Company Details
            </Typography>
            <CompanyDetailsContainer />
          </Box>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
}
