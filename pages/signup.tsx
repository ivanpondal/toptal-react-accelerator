import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpFormContainer from "../src/auth/SignUpFormContainer";
import { NonAuthGuard } from "../src/auth/NonAuthGuard";
import NavBarContainer from "../src/components/NavBarContainer";

export default function SignUp() {
  return (
    <NonAuthGuard>
      <NavBarContainer activePage="signup" />
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
            Sign up
          </Typography>
          <SignUpFormContainer />
        </Box>
      </Container>
    </NonAuthGuard>
  );
}
