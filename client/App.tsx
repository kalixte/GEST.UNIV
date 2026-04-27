import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Teachers from "./pages/admin/Teachers";
import Courses from "./pages/admin/Courses";
import Settings from "./pages/admin/Settings";
import Logs from "./pages/admin/Logs";
import RHDashboard from "./pages/rh/Dashboard";
import HourEntry from "./pages/rh/HourEntry";
import Validation from "./pages/rh/Validation";
import Payroll from "./pages/rh/Payroll";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherSummary from "./pages/teacher/Summary";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/teachers" element={<Teachers />} />
      <Route path="/admin/courses" element={<Courses />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/logs" element={<Logs />} />

      {/* RH Routes */}
      <Route path="/rh" element={<RHDashboard />} />
      <Route path="/rh/entry" element={<HourEntry />} />
      <Route path="/rh/validation" element={<Validation />} />
      <Route path="/rh/payroll" element={<Payroll />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/summary" element={<TeacherSummary />} />

      {/* Other Routes */}
      <Route path="/profile" element={<Profile />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
