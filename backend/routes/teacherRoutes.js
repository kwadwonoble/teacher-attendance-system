const express = require("express");

const router = express.Router();

const Teacher =
  require("../models/Teacher");

// GET ALL TEACHERS
router.get("/", async (req, res) => {

  try {

    const teachers =
      await Teacher.find();

    res.json(teachers);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch teachers",
    });

  }

});

// ADD TEACHER
router.post("/", async (req, res) => {

  try {

    const teacher =
      new Teacher(req.body);

    const savedTeacher =
      await teacher.save();

    res.status(201).json(
      savedTeacher
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to add teacher",
    });

  }

});

// DELETE TEACHER
router.delete("/:id", async (req, res) => {

  try {

    await Teacher.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Teacher deleted",
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to delete teacher",
    });

  }

});

// UPDATE TEACHER
router.put("/:id", async (req, res) => {

  try {

    const updatedTeacher =
      await Teacher.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json(updatedTeacher);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to update teacher",
    });

  }

});

module.exports = router;