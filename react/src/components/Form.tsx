import { useState } from "react";
import "./Form.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import "./NavButton";
import NavButton from "./NavButton";

interface Props {
  onSubmit: (inputText: string) => void;
}

const Form = ({ onSubmit }: Props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value);
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputText);
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
