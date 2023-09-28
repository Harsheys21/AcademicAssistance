import React from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/NavButton";
import "./Welcome.css";

const Welcome = () => {
  let navigate = useNavigate();
  return (
    <div className="container">
      <div className="center">
        <h1>Welcome</h1>
        <p>Here are some instructions:</p>
        <p>Blah Blah Blah Blahbitty blah</p>
        <button onClick={() => navigate("/login")}>Already a user?</button>
        <NavButton
          text="Next"
          className="next-button"
          onClick={() => navigate("/grad")}
        />
      </div>
    </div>
  );
};

export default Welcome;
