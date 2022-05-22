import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContextProvider } from "../src/auth/AuthContext";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
