import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTeachers, deleteTeacher } from "../services/teacherService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  // LOAD TEACHERS FROM BACKEND
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      toast.error("Failed to load teachers");
    }
  };

  // DELETE TEACHER (BACKEND)
  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      toast.success("Teacher deleted");
      loadTeachers(); // refresh list
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  // SEARCH FILTER
  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold">Teachers</h1>

          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-[300px]"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Town</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher._id} className="border-b">

                    <td className="p-3">
                      {teacher.firstName} {teacher.lastName}
                    </td>

                    <td className="p-3">
                        {teacher.subject === "JHS"
                            ? `JHS (${teacher.jhsSubject})`
                            : teacher.subject}
                    </td>
                    <td className="p-3">{teacher.phone}</td>
                    <td className="p-3">{teacher.town}</td>

                    <td className="p-3 flex gap-2">

                      <Link
                        to={`/edit-teacher/${teacher._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No teachers found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Teachers;