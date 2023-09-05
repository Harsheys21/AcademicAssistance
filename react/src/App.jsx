import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Input from "./components/Input";
import Majors from "./components/Majors";

function App() {
  return (
    <>
      {/* temporary style, focusing on Auth functionality */}
      {/* 
      <div>
        <Login></Login>
      </div> */}
      {/* <Input></Input> */}

      <Router>
        <Routes>
          <Route path="/jha" element={<Login />} />
          <Route path="/oogabooga" element={<Input />} />
          <Route
            path="/jhamaster"
            element={
              <Majors
                onSelectItem={(item) => console.log(item)}
                heading="Majors"
                items={["thing1", "thing2", "thing3"]}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
