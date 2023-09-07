import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Input from "./components/Input";
import Majors from "./components/Majors";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      {/* temporary style, focusing on Auth functionality */}

      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/concentrations"
            element={
              <Majors
                onSelectItem={(item) => console.log(item)}
                heading="Concentrations"
                items={[
                  "Software Design and Computer Systems",
                  "Machhine Learning and Artificial Intelligence",
                  "Graphics and Visualization",
                  "Web Development",
                  "CyberSecurity",
                ]}
              />
            }
          />
          <Route path="/input" element={<Input />} />
          <Route path="/login" element={<Login />} />
          {/* TODO: Make login button on login page route to dashboard */}
          {/* TODO: Make dashboard component accessible to logged in users only (Private Routes) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
