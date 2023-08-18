import Input from "./pages/Input";
import Majors from "./pages/Majors";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
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
    // <>
    //   <div>
    //     <Input />
    //   </div>
    // </>
  );
}

export default App;
