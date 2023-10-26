import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterFormPage1.module.css";
function RegisterForm() {
  const [email, setEmail] = useState("jack@example.com");
  const [gender, setGender] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  //   const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    // e.preventDefault();
    // if (email && phoneNumber) login(email, phoneNumber);
  }
  return (
    <main className={styles.login}>
      {/* <PageNav /> */}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="address "> Address</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            onChange={(e) => setphoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>

        <div>
          <button type="primary">Save</button>
        </div>
      </form>
    </main>
  );
}

export default RegisterForm;
