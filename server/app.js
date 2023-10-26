////// THIS IS FOR THE CODE THAT IS SPECIFIC FOR THE EXPRESS.

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const rideRouter = require("./routes/rideRoutes");

const app = express();
app.use(cors());

//*** MIDDLEWARES FROM EXPRESS ***//
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// CUSTOM MIDDLEWARES :
app.use((req, res, next) => {
  console.log("Hello World from the middleware 👋🏻");
  next();
});

/* MY CODE */
/////***** ROUTES ******//////

//*** GET request to fetch ALL Data ***//
// app.get("/api/v1/tours", getAllTours);

//*** GET request to fetch SINGLE Data ***//
// app.get("/api/v1/tours/:id", getTour);

//*** POST request to put Data ***//
// app.post("/api/v1/tours", createTour);

//*** PATCH request to put Data ***//
// app.patch("/api/v1/tours/:id", updateTour);

//*** DELETE request to put Data ***//
// app.delete("/api/v1/tours/:id", deleteTour);

// BETTER WAY ..... inside tourRoutes && userRoutes files.

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rides", rideRouter);

// Handling all the routes other then the defined one's :
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in this server !!`);
  // err.statusCode = 404;
  // err.status = 'Fail',

  next(new AppError(`Can't find ${req.originalUrl} in this server !!`, 404));
});

// GLOBAL ERROR HANDLING FUNCTION :
app.use(globalErrorHandler);

module.exports = app;
