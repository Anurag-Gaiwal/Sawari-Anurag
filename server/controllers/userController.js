// const User = require("./../models/userModels");
// const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

// exports.updateMe = catchAsync(async (req, res, next) => {
//   // 1) Create error if user POSTs password data
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError(
//         "This route is not for password updates. Please use /updateMyPassword.",
//         400
//       )
//     );
//   }

//   // 2) Filtered out unwanted fields names that are not allowed to be updated
//   const filteredBody = filterObj(req.body, "name", "email");

//   // 3) Update user document
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });
// // userController.js
// exports.viewDashboard = (req, res) => {
//   // Implement logic to fetch and render the user's data on the dashboard
//   res.status(200).json({
//     status: "success",
//     message: "User dashboard data goes here",
//     // Add the data you want to send to the client for rendering the dashboard
//   });
// };

// // exports.getAllUsers = (req, res) => {
// //     res.status(500).json({
// //         status: 'success',
// //         message: 'Is is not yet defined'
// //     })
// // };

// // exports.createUser = (req, res) => {
// //     res.status(500).json({
// //         status: 'success',
// //         message: 'Is is not yet defined'
// //     })
// // };

// // exports.getUser = (req, res) => {
// //     res.status(500).json({
// //         status: 'success',
// //         message: 'Is is not yet defined'
// //     })
// // };

// // exports.updateUser = (req, res) => {
// //     res.status(500).json({
// //         status: 'success',
// //         message: 'Is is not yet defined'
// //     })
// // }

// // exports.deleteUser = (req, res) => {
// //     res.status(500).json({
// //         status: 'success',
// //         message: 'Is is not yet defined'
// //     })
// // };
const User = require("./../models/userModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

// Rest of your code here

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getMyProfile = catchAsync(async (req, res, next) => {
  // You can directly access the authenticated user's data from req.user
  const user = req.user;
  console.log("my profile");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getMyProfileById = catchAsync(async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const userId = decoded.id; // Use the correct field from your JWT payload
    console.log(userId);

    // Assuming your user model has an _id field for MongoDB's ObjectId
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    console.log("User found:", user);

    return res.json({ status: "ok", data: user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
});
