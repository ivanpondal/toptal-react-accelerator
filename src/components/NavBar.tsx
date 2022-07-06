import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "next/link";

export type AppPage = "login" | "signup" | "home" | "clients" | "invoices";

export default function NavBar(props: {
  onLogout: () => unknown;
  activePage?: AppPage;
}) {
  const { onLogout, activePage } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            data-active={activePage === "home"}
          >
            INVOICE.APP
          </Typography>

          {!(activePage === "login" || activePage === "signup") && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link href="/clients" passHref>
                  <MenuItem data-active={activePage === "clients"}>
                    <Typography textAlign="center">Clients</Typography>
                  </MenuItem>
                </Link>

                <Link href="/invoices" passHref>
                  <MenuItem data-active={activePage === "invoices"}>
                    <Typography textAlign="center">Invoices</Typography>
                  </MenuItem>
                </Link>

                <MenuItem onClick={onLogout} data-test="logout-button">
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            INVOICE.APP
          </Typography>

          {!(activePage === "login" || activePage === "signup") && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link href="/clients" passHref>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  data-active={activePage === "clients"}
                >
                  Clients
                </Button>
              </Link>

              <Link href="/invoices" passHref>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  data-active={activePage === "invoices"}
                >
                  Invoices
                </Button>
              </Link>

              <Button
                sx={{ my: 2, ml: "auto", color: "white", display: "block" }}
                onClick={onLogout}
                data-test="logout-button"
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
