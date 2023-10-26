// const express = require("express");
// const userController = require("./../controllers/userController");
// const authController = require("./../controllers/authControllers");

// const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.get("/dashboard", authController.protect, userController.viewDashboard);

// // router.post("/forgotPassword", authController.forgotPassword);
// // router.patch("/resetPassword/:token", authController.resetPassword);

// // router.patch(
// //   "/updateMyPassword",
// //   authController.protect,
// //   authController.updatePassword
// // );

// // router.patch("/updateMe", authController.protect, userController.updateMe);
// // router.delete("/deleteMe", authController.protect, userController.deleteMe);
// // router
// //   .route("/")
// //   .get(userController.getAllUsers)
// //   .post(userController.createUser);

// // router
// //   .route("/:id")
// //   .get(userController.getUser)
// //   .patch(userController.updateUser)
// //   .delete(userController.deleteUser);

// module.exports = router;
const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authControllers");
// const rideController = require("./../controllers/rideController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/myProfile")
  .get(authController.protect, userController.getMyProfile);

// Keep the existing route for updating and deleting users by their ID
router
  .route("/:id")
  .get(userController.getMyProfileById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// router
//   .route("/PublishedRide")
//   .get(rideController.createRide)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
module.exports = router;
