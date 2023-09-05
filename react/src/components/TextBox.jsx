import "./TextBox.css";

// interface Props {
//   title: string;
//   text: string;
// }

const TextBox = (props) => {
  return (
    <div className="textBox-container">
      <h1 className="textBox-title">{props.title}</h1>
      <hr />
      <p className="textBox-text">{props.text}</p>
    </div>
  );
};

export default TextBox;
