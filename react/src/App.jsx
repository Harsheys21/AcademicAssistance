import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Input from "./pages/Input";
import Majors from "./pages/Majors";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import { InputProvider } from "./utils/InputContext";
import Inaccuracies from "./pages/Inaccuracies";
import Grad from "./pages/Grad";

function App() {
  // TODO: Style website with MUI
  return (
    <>
      <InputProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/grad" element={<Grad />} />
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
            {/* TODO: Input -> python script API -> loading page -> Inaccuracies -> Login */}
            <Route path="/inaccuracies" element={<Inaccuracies items={[]} />} />
            <Route path="/login" element={<Login />} />
            {/* TODO: Make login button on login page route to dashboard */}
            {/* TODO: Make dashboard component accessible to logged in users only (Private Routes) */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
            </Route>
          </Routes>
        </Router>
      </InputProvider>
    </>
  );
}

export default App;
