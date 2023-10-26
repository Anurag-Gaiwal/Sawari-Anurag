import { NavLink, Outlet } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import RegisterFormPage1 from "./RegisterFormPage1.jsx";
import PageNav from "../components/PageNav";
function RegisterForm() {
  return (
    <>
      <PageNav />
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="registerformpage1">page1</NavLink>
            {/* <RegisterFormPage1 /> */}
          </li>
          <li>
            <NavLink to="registerformpage2">page2</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default RegisterForm;
