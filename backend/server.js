const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const teacherRoutes =
  require("./routes/teacherRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

// MIDDLEWARE

app.use(express.json());

app.use(

  cors({

    origin: "*",

    credentials: true,

  })

);

// ROUTES

app.use(
  "/api/teachers",
  teacherRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

// TEST ROUTE

app.get("/", (req, res) => {

  res.send(
    "Teacher Attendance API Running"
  );

});

// DATABASE CONNECTION

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log("MongoDB Connected");

    app.listen(
      process.env.PORT || 5000,

      () => {

        console.log(

          `Server running on port ${process.env.PORT}`

        );

      }

    );

  })

  .catch((error) => {

    console.log(error);

  });