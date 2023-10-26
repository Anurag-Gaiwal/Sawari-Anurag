import Main from "../components/Main";
import PageNav from "../components/PageNav";
import PublishRide from "../components/PublishRide";
import styles from "./PublishRideLayout.module.css";
function PublishRideLayout() {
  return (
    <div>
      {/* <h1>Publish a ride</h1> */}
      <PageNav />
      {/* <Main /> */}
      <PublishRide />
    </div>
  );
}

export default PublishRideLayout;
