import TextBox from "../components/TextBox";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import "../components/NavButton";
import NavButton from "../components/NavButton";
import "./Input.css";
import { useInput } from "../utils/InputContext";
import axios from "axios";
import { useState } from "react";

const title = "Instructions";
const instructions =
  "Go to your academic whatever page, hit Cmd + A  or CTRL + A on your keyboard, then copy that text and paste it into this here textbox";

const Input = () => {
  let navigate = useNavigate();
  const { inputValues, setInputValues } = useInput();

  const [userInput, setUserInput] = useState("");
  const [processedData, setProcessedData] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Here, since the raw data needs to be processed and converted into
  // completed and not completed classes, first there must a call to a function that does this
  // before the data is added to the context

  const processInput = () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/process", { input: userInput })
      .then((response) => {
        setProcessedData(response.data.result);
        console.log("Result: ", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // OR: The raw data is added as well as the processed data?
  const handleInputChange = (id, value) => {
    setUserInput(value);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
    // console.log(inputValues);
  };

  return (
    <div className="container">
      <div className="center">
        <TextBox title={title} text={instructions} />
        {loading && <p>Loading...</p>}
        <h6>Processed Data: {processedData}</h6>
        <Form
          name="raw_data"
          handleUpdate={(name, value) => handleInputChange(name, value)}
          onSubmit={(text) => {
            console.log(text);
            processInput();
          }}
        />
        <NavButton
          text="Next"
          className="next-button"
          onClick={() => {
            navigate("/login");
          }}
        />
        <NavButton
          text="Prev"
          className="prev-button"
          onClick={() => navigate("/concentrations")}
        />
      </div>
    </div>
  );
};

export default Input;
