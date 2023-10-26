const Ride = require("./../models/rideModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModels");

exports.createRide = catchAsync(async (req, res, next) => {
  //   req.body.user = req.user.id;
  console.log(`this is reqbodyuser ${req.body.user}`);
  const ride = await Ride.create({
    user: req.user,
    startLocation: req.body.startLocation,
    destination: req.body.destination,
    exactStartLocation: req.body.exactStartLocation,
    exactEndLocation: req.body.exactEndLocation,
    startCoordinates: req.body.startCoordinates,
    endCoordinates: req.body.endCoordinates,
    routeDescription: req.body.routeDescription,
    // aprovalstatus: req.body.aprovalstatus,
    passengers: req.body.passengers,
    date: req.body.date,
  });

  res.status(201).json({
    success: true,
    ride,
  });
});
// router.get('/fetchAllProducts', async(req, res)=>{
//     try{
//         const products = await Product.find();
//         res.json(products)
//     }catch (error) {
//         console.error(error.message)
//         res.status(400).send("Internal Server Error.");
//     }
// })
exports.getAllRides = catchAsync(async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json({
      status: "ok",
      data: {
        rides,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal Server Error.");
  }
});
exports.getMyProfileById = catchAsync(async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`ride controller ${data}`);
    req.user = data.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
});
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you pass the userId as a parameter
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.requestRide = catchAsync(async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const userId = req.user; // Assuming req.user already contains the user's ID

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return next(new AppError("Ride not found", 404));
    }

    // Check if the user has already requested this ride
    const existingRequest = ride.rideRequests.find((request) =>
      request.equals(userId)
    );

    if (existingRequest) {
      return res.status(400).json({
        status: "error",
        error: "You have already requested this ride",
      });
    }

    // Add the user's ID to the ride's rideRequests array
    ride.rideRequests.push(userId);

    await ride.save();

    res.status(201).json({
      status: "ok",
      data: {
        message: "Ride requested successfully",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  }
});
// Function to retrieve all rides published by a user
// exports.getMyPublishedRides = async (req, res) => {
//   try {
//     const userId = req.user; // Assuming you have user information in the request object
//     const rides = await Ride.find({ user: userId }).exec();
//     // const rides = await Ride.find({
//     //   rideRequests: {
//     //     $elemMatch: {
//     //       _id: userId,
//     //       currentStatus: 0, // Assuming 0 represents a pending approval status
//     //     },
//     //   },
//     // }).exec();
//     rides.map((ride, index) => {
//       console.log(
//         "Ride from rideController getmypublished rides",
//         ride.rideRequests
//       );
//       console.log("index  ", index);
//     });
//     // console.log(
//     //   "Ride from rideController getmypublished rides",
//     //   rides.rideRequests
//     // );
//     res.json({
//       status: "ok",
//       data: {
//         rides,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
exports.getMyPublishedRides = async (req, res) => {
  try {
    const userId = req.user; // Assuming you have user information in the request object
    const rides = await Ride.find({ user: userId }).exec();

    // Define a function to fetch user details by user ID
    const getUserDetails = async (userId) => {
      const user = await User.findById(userId);
      return user;
    };

    // Iterate through rides and fetch user details for each ride request
    for (const ride of rides) {
      for (const rideRequest of ride.rideRequests) {
        console.log("Rides original", rideRequest);
        const userDetails = await getUserDetails(rideRequest._id);
        rideRequest.userDetails = userDetails; // Append user details to the ride request
        console.log("Ride pranav:", rideRequest);
      }
    }

    res.json({
      status: "ok",
      data: {
        rides,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to retrieve all ride requests made by a user
exports.getMyRequestedRides = async (req, res) => {
  try {
    const userId = req.user; // Assuming you have user information in the request object
    const rides = await Ride.find({ "rideRequests._id": userId }).exec();
    // const rides = await Ride.find({
    //   rideRequests: {
    //     $elemMatch: {
    //       _id: userId,
    //       approvalStatus: 0, // Assuming 0 represents a pending approval status
    //     },
    //   },
    // }).exec();
    console.log("Hellooghgghhgfhgfgfgg", rides);

    res.json({
      status: "ok",
      data: {
        rides,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // Function to accept or reject a ride request
// exports.acceptOrRejectRequest = async (req, res) => {
//   try {
//     const { rideId, requestId } = req.params;
//     const { action } = req.body; // Action can be 'accept' or 'reject'

//     // Check if the user has permission to accept/reject this request
//     const ride = await Ride.findById(rideId).exec();
//     if (!ride || ride.user.toString() !== req.user) {
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     // Find the ride request in the array and update its status
//     const requestIndex = ride.rideRequests.findIndex(
//       (request) => request._id.toString() === requestId
//     );
//     if (requestIndex === -1) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     if (action === "accept") {
//       ride.rideRequests[requestIndex].currentStatus = 1; // Update to 'accepted'
//     } else if (action === "reject") {
//       ride.rideRequests[requestIndex].currentStatus = 2; // Update to 'rejected'
//     }

//     await ride.save();
//     res.json({ message: "Request updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
exports.acceptOrRejectRequest = catchAsync(async (req, res) => {
  try {
    const { rideId, requestId } = req.params;
    const { action } = req.body; // Action can be 'accept' or 'reject'

    // Check if the user has permission to accept/reject this request
    const ride = await Ride.findById(rideId);
    console.log("Userrrrrrrrrr", req.user);
    if (!ride || ride.user.toString() !== req.user) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Find the ride request in the array and update its status
    const requestIndex = ride.rideRequests.findIndex(
      (request) => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (action === "accept") {
      ride.rideRequests[requestIndex].currentStatus = 1; // Update to 'accepted'
      console.log(
        "Ride requesttttttttttttsssssssssss",
        ride.rideRequests[requestIndex].currentStatus
      );
    } else if (action === "reject") {
      ride.rideRequests[requestIndex].currentStatus = 2; // Update to 'rejected'
      console.log(
        "Ride requesttttttttttttsssssssssss",
        ride.rideRequests[requestIndex].currentStatus
      );
    }

    await ride.save();
    console.log("Updated rideeeeeeeeeeeeeee", ride);
    res.json({ message: "Request updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
