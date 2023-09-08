import TextBox from "../components/TextBox";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import "../components/NavButton";
import NavButton from "../components/NavButton";
import "./Input.css";
import { useInput } from "../utils/InputContext";

const title = "Instructions";
const instructions =
  "very instructive information...blahblahblahablahalnabkajbrejkhwgcbjwrtg";

const Input = () => {
  let navigate = useNavigate();
  const { inputValues, setInputValues } = useInput();

  // TODO: Here, since the raw data needs to be processed and converted into
  // completed and not completed classes, first there must a call to a function that does this
  // before the data is added to the context
  const handleInputChange = (id, value) => {
    // const { id, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
    console.log(inputValues);
  };

  return (
    <div className="container">
      <div className="center">
        <TextBox title={title} text={instructions} />
        <Form
          name="raw_data"
          handleUpdate={(name, value) => handleInputChange(name, value)}
          onSubmit={(text) => {
            // handleInputChange(name, text);
            console.log(text);
          }}
        />
        <NavButton
          text="Next"
          className="next-button"
          onClick={() => {
            navigate("/login");
            // handleAdd();
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
