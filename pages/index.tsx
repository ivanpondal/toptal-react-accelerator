import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAuthContext } from "../src/auth/AuthContext";
import { AuthGuard } from "../src/auth/AuthGuard";

const Home: NextPage = () => {
  const { logout } = useAuthContext();
  
  return (
    <AuthGuard>
      <Button onClick={logout}>Logout</Button>
    </AuthGuard>
  );
};

export default Home;
