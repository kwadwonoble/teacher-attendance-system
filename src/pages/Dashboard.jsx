import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";
import toast from "react-hot-toast";

function Dashboard() {

  const [stats, setStats] = useState({

    totalTeachers: 0,

    totalAttendanceDays: 0,

    totalPresent: 0,

    totalAbsent: 0,

  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const res =
        await API.get(
          "/attendance/dashboard/stats"
        );

      setStats(res.data);

    } catch (error) {

      toast.error(
        "Failed to load dashboard"
      );

    }
  };

  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">

          <h2 className="text-lg">
            Total Teachers
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalTeachers}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">

          <h2 className="text-lg">
            Attendance Days
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalAttendanceDays}
          </p>

        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">

          <h2 className="text-lg">
            Total Present
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalPresent}
          </p>

        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow">

          <h2 className="text-lg">
            Total Absent
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.totalAbsent}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;