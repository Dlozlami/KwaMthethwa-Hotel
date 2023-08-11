import { Outlet, Link } from "react-router-dom";
import LogoBTN from "./logoBTN";

export default function NavBar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <LogoBTN />
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
