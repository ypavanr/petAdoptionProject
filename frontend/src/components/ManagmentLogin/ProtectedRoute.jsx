import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");
  const staffId = localStorage.getItem("staff_id");

  if (!staffId || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
