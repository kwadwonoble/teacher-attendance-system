const express = require("express");

const router = express.Router();

const {
  saveAttendance,
  getAttendance,
  getAttendanceByDate,
  generateAttendancePDF,
  getDashboardStats,
  getMonthlyAbsentees,
} = require("../controllers/attendanceController");

// SAVE
router.post("/", saveAttendance);

// GET ALL
router.get("/", getAttendance);

// PDF FIRST
router.get("/pdf/:date", generateAttendancePDF);


router.get(
  "/dashboard/stats",
  getDashboardStats
);


router.get(
  "/analytics/absences/:month",
  getMonthlyAbsentees
);

// DATE AFTER
router.get("/:date", getAttendanceByDate);

module.exports = router;