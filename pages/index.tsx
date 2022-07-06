import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "../src/auth/AuthGuard";
import LatestClientsTableContainer from "../src/clients/LatestClientsTableContainer";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";
import NavBarContainer from "../src/components/NavBarContainer";
import { LatestInvoicesTableContainer } from "../src/invoices/LatestInvoicesTableContainer";

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <NavBarContainer />
      <CompanyDetailsGuard>
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
