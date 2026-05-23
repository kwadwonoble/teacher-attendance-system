import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTeachers } from "../services/teacherService";
import API from "../api/api";
import toast from "react-hot-toast";

function Attendance() {

  const [teachers, setTeachers] = useState([]);

  const [attendance, setAttendance] = useState({});

  const [timeRecords, setTimeRecords] = useState({});

  // LOAD TEACHERS
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

  // TOGGLE ATTENDANCE
  const toggleAttendance = (id) => {

    const currentTime =
      new Date().toLocaleTimeString();

    setAttendance((prev) => ({

      ...prev,

      [id]: !prev[id],

    }));

    // SAVE TIME WHEN PRESENT
    setTimeRecords((prev) => ({

      ...prev,

      [id]:
        !attendance[id]
          ? currentTime
          : null,

    }));
  };

  // SUBMIT
  const handleSubmit = async () => {

    try {

      const today =
        new Date().toISOString().split("T")[0];

      const formattedRecords =
        teachers.map((teacher) => ({

          teacherId: teacher._id,

          status:
            attendance[teacher._id]
              ? "present"
              : "absent",

          time:
            attendance[teacher._id]
              ? timeRecords[teacher._id]
              : null,

        }));

      await API.post("/attendance", {

        date: today,

        records: formattedRecords,

      });

      toast.success(
        "Attendance saved successfully"
      );

      setAttendance({});
      setTimeRecords({});

    } catch (error) {

      toast.error(
        "Failed to save attendance"
      );

    }
  };

  // DOWNLOAD PDF
  const downloadPDF = () => {

    const today =
      new Date().toISOString().split("T")[0];

    window.open(
      `http://localhost:5000/api/attendance/pdf/${today}`,
      "_blank"
    );
  };

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Take Attendance
        </h1>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-100">

              <th className="p-3 text-left">
                Teacher
              </th>

              <th className="p-3 text-left">
                Subject
              </th>

              <th className="p-3 text-left">
                Present
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {teachers.map((teacher) => (

              <tr
                key={teacher._id}
                className="border-b"
              >

                <td className="p-3">

                  {teacher.firstName}{" "}
                  {teacher.lastName}

                </td>

                <td className="p-3">
                    {teacher.subject === "JHS"
                        ? `JHS (${teacher.jhsSubject})`
                        : teacher.subject}
                    

                  

                </td>

                <td className="p-3">

                  <input
                    type="checkbox"
                    checked={
                      !!attendance[teacher._id]
                    }
                    onChange={() =>
                      toggleAttendance(
                        teacher._id
                      )
                    }
                    className="w-5 h-5"
                  />

                </td>

                {/* LIVE STATUS */}
                <td className="p-3">

                  {attendance[teacher._id]
                    ? "Present"
                    : "Absent"}

                </td>

                {/* LIVE TIME */}
                <td className="p-3">

                  {attendance[teacher._id]
                    ? timeRecords[
                        teacher._id
                      ]
                    : "--"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Submit Attendance
          </button>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Download Today PDF
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Attendance;


                
