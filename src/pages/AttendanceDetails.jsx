import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function AttendanceDetails() {

  const { id } = useParams();

  const records =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  const attendance = records[id];

  if (!attendance) {
    return (
      <DashboardLayout>
        <h1>Attendance Not Found</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Details
        </h1>

        <p className="mb-6 text-lg">
          Date: <strong>{attendance.date}</strong>
        </p>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-blue-100">

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Subject
                </th>

                <th className="p-3 text-left">
                  Time
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.records.map((teacher) => (

                <tr
                  key={teacher.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {teacher.firstName} {teacher.lastName}
                  </td>

                  <td className="p-3">
                    {teacher.subject}
                  </td>

                  <td className="p-3">
                    {teacher.time || "-"}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        teacher.status === "Present"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {teacher.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AttendanceDetails;