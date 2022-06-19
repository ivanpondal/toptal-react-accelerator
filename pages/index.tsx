import { Button, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import { useAuthContext } from "../src/auth/AuthContext";
import { AuthGuard } from "../src/auth/AuthGuard";
import LatestClientsTableContainer from "../src/clients/LatestClientsTableContainer";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import { LatestInvoicesTableContainer } from "../src/invoices/LatestInvoicesTableContainer";

const Home: NextPage = () => {
  const { logout } = useAuthContext();

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Button onClick={logout}>Logout</Button>
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <LatestClientsTableContainer />
            </Grid>
            <Grid item md={6} xs={12}>
              <LatestInvoicesTableContainer />
            </Grid>
          </Grid>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
};

export default Home;
