import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";
import toast from "react-hot-toast";

function AbsenceAnalytics() {

  const [month, setMonth] = useState("");

  const [data, setData] = useState([]);

  const loadAnalytics = async () => {

    try {

      const res =
        await API.get(
          `/attendance/analytics/absences/${month}`
        );

      setData(res.data);

    } catch (error) {

      toast.error(
        "Failed to load analytics"
      );

    }
  };

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="month"
            value={month}
            onChange={(e) =>
              setMonth(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <button
            onClick={loadAnalytics}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Generate Report
          </button>

        </div>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-blue-100">

              <th className="p-3 text-left">
                Teacher
              </th>

              <th className="p-3 text-left">
                Number of Absences
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length > 0 ? (

              data.map((item, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-3">
                    {item.teacher}
                  </td>

                  <td className="p-3">
                    {item.absences}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="2"
                  className="p-6 text-center text-gray-500"
                >
                  No analytics data
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default AbsenceAnalytics;