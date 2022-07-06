import { useAuthContext } from "../auth/AuthContext";
import NavBar, { AppPage } from "./NavBar";

export default function NavBarContainer(props: { activePage?: AppPage }) {
  const { activePage } = props;
  const { logout } = useAuthContext();

  return <NavBar onLogout={logout} activePage={activePage} />;
}
