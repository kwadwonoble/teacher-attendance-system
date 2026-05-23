const Teacher = require("../models/Teacher");

// GET ALL
const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

// ADD
const addTeacher = async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.json(teacher);
};

// UPDATE
const updateTeacher = async (req, res) => {
  const updated = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};

module.exports = {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};