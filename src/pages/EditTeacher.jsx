import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTeachers, updateTeacher } from "../services/teacherService";
import toast from "react-hot-toast";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    phone: "",
    town: "",
  });

  useEffect(() => {
    loadTeacher();
  }, []);

  const loadTeacher = async () => {
    try {
      const teachers = await getTeachers();
      const teacher = teachers.find((t) => t._id === id);

      if (teacher) {
        setFormData(teacher);
      }
    } catch (error) {
      toast.error("Failed to load teacher");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTeacher(id, formData);

      toast.success("Teacher updated successfully");

      navigate("/teachers");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          Edit Teacher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 w-full rounded"
          />

          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            placeholder="Town"
            className="border p-3 w-full rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Teacher
          </button>

        </form>

      </div>
    </DashboardLayout>
  );
}

export default EditTeacher;