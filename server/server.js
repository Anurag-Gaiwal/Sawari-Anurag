////// THIS IS FOR THE CODE THAT IS REQUIRED FOR THE SRVER.

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// console.log(DB);

// It return a promise that is why, "then --> to return an successfull response" & "catch --> To catch error" is used.
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTION ESTABLISHED");
    console.log(process.env.NODE_ENV);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// START THE SERVER
const port = process.env.port;
app.listen(port, () => {
  console.log(`Server running on the port ${port}..`);
});
