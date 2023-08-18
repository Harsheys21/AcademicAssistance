import TextBox from "../components/TextBox";
import Form from "../components/Form";

const title = "Instructions";
const instructions =
  "this is what you gotta do...summa lumma dimma lumma you assumin imma human what i gotta do to get it thru to u im superhuman";

const Input = () => {
  return (
    <div>
      <TextBox title={title} text={instructions} />
      <Form onSubmit={(text) => console.log(text)} />
    </div>
  );
};

export default Input;
