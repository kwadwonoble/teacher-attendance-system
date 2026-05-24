import API from "../api/api";

// GET ALL TEACHERS
export const getTeachers = async () => {

  const res = await API.get(
    "/teachers"
  );

  return res.data;

};

// ADD TEACHER
export const addTeacher = async (
  teacherData
) => {

  const res = await API.post(
    "/teachers",
    teacherData
  );

  return res.data;

};

// DELETE TEACHER
export const deleteTeacher = async (
  id
) => {

  const res = await API.delete(
    `/teachers/${id}`
  );

  return res.data;

};

// UPDATE TEACHER
export const updateTeacher = async (
  id,
  teacherData
) => {

  const res = await API.put(
    `/teachers/${id}`,
    teacherData
  );

  return res.data;

};