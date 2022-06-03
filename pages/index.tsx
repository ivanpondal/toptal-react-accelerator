import { Button, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import { useAuthContext } from "../src/auth/AuthContext";
import { AuthGuard } from "../src/auth/AuthGuard";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import { InvoicesTableContainer } from "../src/invoices/InvoicesTableContainer";

const Home: NextPage = () => {
  const { logout } = useAuthContext();

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Button onClick={logout}>Logout</Button>
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <ClientsTableContainer />
            </Grid>
            <Grid item md={6} xs={12}>
              <InvoicesTableContainer />
            </Grid>
          </Grid>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
};

export default Home;
