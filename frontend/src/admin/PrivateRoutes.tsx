import { Navigate, Outlet, type To } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return <div>Loading</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
