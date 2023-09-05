import { useState } from "react";
import "./Form.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import "./NavButton";
import NavButton from "./NavButton";

const Form = (props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(inputText);
    setInputText("");
  };

  let navigate = useNavigate();

  return (
    <form className="text-input-form" onSubmit={handleSubmit}>
      <div>
        {/* <label htmlFor="inputText">Enter Text:</label> */}
        <textarea
          value={inputText}
          onChange={handleInputChange}
          cols={60}
          rows={5}
        />
      </div>
      <button type="submit">Submit</button>
      <NavButton
        text="Next"
        className="next-button"
        onClick={() => navigate("/jhamaster")}
      />
    </form>
  );
};

export default Form;
