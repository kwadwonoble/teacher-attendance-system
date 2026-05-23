const express = require("express");
const router = express.Router();

const {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

router.get("/", getTeachers);
router.post("/", addTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;