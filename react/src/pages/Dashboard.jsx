import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();
  return (
    <div>
      <p>Successfully logged in</p>
      <h1>Dashboard</h1>
      <p>Display previous data here: (Previously generated schedules)</p>
      <button onClick={() => navigate("/")}>Generate new schedule</button>
    </div>
  );
};

export default Dashboard;
