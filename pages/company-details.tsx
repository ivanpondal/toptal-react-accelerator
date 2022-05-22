import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthGuard } from "../src/auth/AuthGuard";
import CompanyDetailsContainer from "../src/company/CompanyDetailsContainer";

export default function CompanyDetails() {
  return (
    <AuthGuard>
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
    </AuthGuard>
  );
}
