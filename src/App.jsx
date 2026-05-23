import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import AttendanceDetails from "./pages/AttendanceDetails";
import NotFound from "./pages/NotFound";
import EditTeacher from "./pages/EditTeacher";
import ProtectedRoute from "./components/ProtectedRoute";
import AbsenceAnalytics from "./pages/AbsenceAnalytics";

function App() {
  return (
    <BrowserRouter>

        <Routes>

            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers"
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-teacher"
              element={
                <ProtectedRoute>
                  <AddTeacher />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-teacher/:id"
              element={
                <ProtectedRoute>
                  <EditTeacher />
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance-history"
              element={
                <ProtectedRoute>
                  <AttendanceHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance/:id"
              element={
                <ProtectedRoute>
                  <AttendanceDetails />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />


            

            <Route
              path="/attendance-history"
              element={<AttendanceHistory />}
              />

            <Route
              path="/absence-analytics"
              element={<AbsenceAnalytics />}
            />




        </Routes>
 
    </BrowserRouter>
  );
}

export default App;