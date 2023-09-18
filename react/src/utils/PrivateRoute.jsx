import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ authtoken }) => {
  return authtoken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
