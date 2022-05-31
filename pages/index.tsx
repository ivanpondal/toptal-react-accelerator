import { Button, Container, Grid } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User, UserAPI } from "../src/api/base";
import { useAuthContext } from "../src/auth/AuthContext";
import { AuthGuard } from "../src/auth/AuthGuard";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";

const Home: NextPage = () => {
  const { logout } = useAuthContext();
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    UserAPI.me().then((userResponse) => setUser(userResponse));
  }, []);

  useEffect(() => {
    console.log(user);
    if (user?.companyDetails === null) {
      router.push({
        pathname: "/company-details",
        query: {
          firstLogin: true,
        },
      });
    }
  }, [user]);

  return (
    <AuthGuard>
      <Button onClick={logout}>Logout</Button>
      <Container component="main" maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <ClientsTableContainer />
          </Grid>
        </Grid>
      </Container>
    </AuthGuard>
  );
};

export default Home;
