import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterFormPage1.module.css";
function RegisterForm() {
  const [email, setEmail] = useState("jack@example.com");
  const [gender, setGender] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState();
  const [address, setAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [carDetails, setCarDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");

  //   const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    // e.preventDefault();
    // if (email && password) login(email, password);
  }
  return (
    <main className={styles.login}>
      {/* <PageNav /> */}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <select
            value={selectedOption}
            onChange={() => setSelectedOption(event.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Driver">Driver</option>
            <option value="Passenger">Passenger</option>
          </select>
        </div>

        {selectedOption === "Driver" && (
          <>
            <div className={styles.row}>
              <label htmlFor="licenseNumber">License Number</label>
              <input
                type="text"
                id="licenseNumber"
                onChange={(e) => setLicenseNumber(e.target.value)}
                value={licenseNumber}
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="carDetails "> Car Details</label>
              <input
                type="text"
                id="carDetails"
                onChange={(e) => setCarDetails(e.target.value)}
                value={carDetails}
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="vehicleNumber">Vehicle number</label>
              <input
                type="text"
                id="vehicleNumber"
                onChange={(e) => setVehicleNumber(e.target.value)}
                value={vehicleNumber}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  const imageFile = event.target.files[0];
                  setSelectedImage(imageFile);
                }}
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

            <div>
              <button type="primary">Next</button>
            </div>
          </>
        )}
        {selectedOption === "Passenger" && (
          <>
            <div className={styles.row}>
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  const imageFile = event.target.files[0];
                  setSelectedImage(imageFile);
                }}
              />
            </div>

            <div>
              <button type="primary">Next</button>
            </div>
          </>
        )}
      </form>
    </main>
  );
}

export default RegisterForm;
