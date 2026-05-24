import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";
import toast from "react-hot-toast";

function AttendanceHistory() {

  const [attendanceData, setAttendanceData] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {

    try {

      const res =
        await API.get("/attendance");

      setAttendanceData(res.data);

    } catch (error) {

      toast.error(
        "Failed to load attendance"
      );

    }
  };

  const filteredAttendance =
    selectedDate
      ? attendanceData.filter(
          (item) => item.date === selectedDate
        )
      : attendanceData;

  // DOWNLOAD PDF
  const downloadPDF = (date) => {

    window.open(
      `https://teacher-attendance-system-1-qgf0.onrender.com/api/attendance/pdf/${date}`,
      "_blank"
    );
  };

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold">
            Attendance History
          </h1>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

        </div>

        {filteredAttendance.length > 0 ? (

          filteredAttendance.map((attendance) => (

            <div
              key={attendance._id}
              className="mb-8 border rounded-lg p-4"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">
                  Date: {attendance.date}
                </h2>

                <button
                  onClick={() =>
                    downloadPDF(attendance.date)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Download PDF
                </button>

              </div>

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-blue-100">

                    <th className="p-3 text-left">
                      Teacher
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

                  {attendance.records.map((record, index) => (

                    <tr
                      key={index}
                      className="border-b"
                    >

                      <td className="p-3">

                        {record.teacherId
                          ? `${record.teacherId.firstName} ${record.teacherId.lastName}`
                          : "Unknown"}

                      </td>

                      <td className="p-3 capitalize">

                        {record.status}

                      </td>

                      <td className="p-3">

                        {record.time || "--"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ))

        ) : (

          <p className="text-gray-500">
            No attendance found
          </p>

        )}

      </div>

    </DashboardLayout>
  );
}

export default AttendanceHistory;