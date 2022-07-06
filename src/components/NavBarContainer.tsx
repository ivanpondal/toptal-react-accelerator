import { useAuthContext } from "../auth/AuthContext";
import NavBar from "./NavBar";

export default function NavBarContainer() {
  const { logout } = useAuthContext();

  return (
    <NavBar
      onLogout={logout}
      pages={[
        { title: "Clients", link: "/clients" },
        { title: "Invoices", link: "/invoices" },
      ]}
    />
  );
}
