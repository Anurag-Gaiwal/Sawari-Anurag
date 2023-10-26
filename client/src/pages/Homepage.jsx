import React from "react";
import styles from "./Homepage.module.css";

import SearchRide from "../components/SearchRide";
import Main from "../components/Main";
import PageNav from "../components/PageNav";
function Homepage() {
  return (
    <div className={styles.homepage}>
      <PageNav />
      <Main />
      {/* <SearchRide /> */}
    </div>
  );
}

export default Homepage;
