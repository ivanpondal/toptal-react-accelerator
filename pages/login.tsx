import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginFormContainer from "../src/auth/LoginFormContainer";
import { NonAuthGuard } from "../src/auth/NonAuthGuard";
import NavBarContainer from "../src/components/NavBarContainer";

export default function Login() {
  return (
    <NonAuthGuard>
      <NavBarContainer activePage="login" />
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
            Invoice
          </Typography>
          <LoginFormContainer />
        </Box>
      </Container>
    </NonAuthGuard>
  );
}
