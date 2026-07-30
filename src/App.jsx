import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import LoginPage from "./pages/Login/LoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";

function ProtectedRoute({ children, role }) {
  const { user, admin } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (role === "admin" && user.email !== admin.email)
    return <Navigate to="/employee" replace />;

  if (role === "employee" && user.email === admin.email)
    return <Navigate to="/admin" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}