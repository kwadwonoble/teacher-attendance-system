import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Teachers",
      path: "/teachers",
    },

    {
      name: "Add Teacher",
      path: "/add-teacher",
    },

    {
      name: "Attendance",
      path: "/attendance",
    },

    {
      name: "Attendance History",
      path: "/attendance-history",
    },

    {
      name: "Absence Analytics",
      path: "/absence-analytics",
    },

  ];

  return (

    <div className="w-[260px] bg-blue-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        School Attendance
      </h1>

      <div className="flex flex-col gap-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-white text-blue-900"
                : "hover:bg-blue-700"
            }`}
          >

            {item.name}

          </Link>

        ))}

      </div>

    </div>

  );
}

export default Sidebar;