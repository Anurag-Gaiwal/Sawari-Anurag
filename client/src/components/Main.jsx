import { NavLink } from "react-router-dom";
import styles from "./Main.module.css";
function Main() {
  return (
    <div className={styles.background} style={{ color: '#FFFFDD' }}>
      <div className={styles.about}>
        <p className={styles.aboutpara}>
          <strong>
            Share the Journey, Multiply the Fun:<br></br> Your Road to Greener
            Travel with Sawrii!
          </strong>
        </p>
        <span className={styles.navlink}>
          <NavLink to="/register" className={styles.login}>
            Sign Up
          </NavLink>
        </span>
      </div>
      <img
        src="/carpoolOpenDoor.png"
        alt="Background"
        className={styles.backgroundCar}
      />
    </div>
  );
}

export default Main;
