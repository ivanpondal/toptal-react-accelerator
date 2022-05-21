import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginForm from "../src/auth/LoginForm";
import LoginFormContainer from "../src/auth/LoginFormContainer";

export default function Login() {
  return (
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
        <LoginFormContainer/>
      </Box>
    </Container>
  );
}