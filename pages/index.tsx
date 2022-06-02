import { Button, Container, Grid } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User, UserAPI } from "../src/api/base";
import { useAuthContext } from "../src/auth/AuthContext";
import { AuthGuard } from "../src/auth/AuthGuard";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";
import { CompanyDetailsGuard } from "../src/company/CompanyDetailsGuard";

const Home: NextPage = () => {
  const { logout } = useAuthContext();

  return (
    <AuthGuard>
      <CompanyDetailsGuard>
        <Button onClick={logout}>Logout</Button>
        <Container component="main" maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <ClientsTableContainer />
            </Grid>
          </Grid>
        </Container>
      </CompanyDetailsGuard>
    </AuthGuard>
  );
};

export default Home;
