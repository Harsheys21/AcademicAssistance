import TextBox from "./TextBox";
import Form from "./Form";
import { useNavigate, useParams } from "react-router-dom";
import "./NavButton";
import NavButton from "./NavButton";
import "./Input.css";

const title = "Instructions";
const instructions =
  "very instructive information...blahblahblahablahalnabkajbrejkhwgcbjwrtg";

const Input = () => {
  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="center">
        <TextBox title={title} text={instructions} />
        <Form onSubmit={(text) => console.log(text)} />
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
