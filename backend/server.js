const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();


const teacherRoutes = require("./routes/teacherRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

// SECURITY
app.use(helmet());

// RATE LIMITING
const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

});

app.use(limiter);

app.use(cors({

  origin: "http://localhost:5173",

})); 
app.use(express.json());

// ROUTES
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});