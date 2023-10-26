// const express = require("express");
// const userController = require("./../controllers/userController");
// // const authController = require("./../controllers/authControllers");
// const rideController = require("./../controllers/rideController");

// const router = express.Router();
// router
//   .route("/Ride")
//   .get(rideController.getMyProfileById, rideController.getAllRides)
//   .post(rideController.getMyProfileById, rideController.createRide)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser)
//   .get(
//     "/my-published-rides",
//     rideController.getMyProfileById,
//     rideController.getMyPublishedRides
//   )
//   .get(
//     "/my-requested-rides",
//     rideController.getMyProfileById,
//     rideController.getMyRequestedRides
//   );

// router
//   .route("/Ride/:rideId/request")
//   .post(rideController.getMyProfileById, rideController.requestRide);
// module.exports = router;

// // router
// //   .route("/Ride")
// //   .post(rideController.getMyProfileById, rideController.createRide)
// //   .patch(userController.updateUser)
// //   .delete(userController.deleteUser);
// // module.exports = router;

// // // API endpoint to retrieve all rides published by a user
// // router
// //   .route("/my-published-rides")
// //   .get(rideController.getMyProfileById, rideController.getMyPublishedRides);

// // // API endpoint to retrieve all ride requests made by a user
// // router
// //   .route("/my-requested-rides")
// //   .get(rideController.getMyProfileById, rideController.getMyRequestedRides);

// // // API endpoint to accept or reject a ride request
// // router
// //   .route("/ride/:rideId/accept-request/:requestId")
// //   .put(rideController.getMyProfileById, rideController.acceptOrRejectRequest);
const express = require("express");
const userController = require("./../controllers/userController");
const rideController = require("./../controllers/rideController");

const router = express.Router();

// Middleware to get user's profile by ID
router.use(rideController.getMyProfileById);

// Define routes for /Ride
router
  .route("/Ride")
  .get(rideController.getAllRides)
  .post(rideController.createRide)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Define route for requesting a ride
router.route("/Ride/:rideId/request").post(rideController.requestRide);
// router.route("/Ride/:rideId/getUserById").get(rideController.getUserById);
router.get("/user/:userId", rideController.getUserDetails);

// Define routes for my-published-rides and my-requested-rides
router.route("/my-published-rides").get(rideController.getMyPublishedRides);

router.route("/my-requested-rides").get(rideController.getMyRequestedRides);

// Define route for accepting or rejecting a ride request
router
  .route("/ride/:rideId/accept-request/:requestId")
  .put(rideController.getMyProfileById, rideController.acceptOrRejectRequest);

module.exports = router;
