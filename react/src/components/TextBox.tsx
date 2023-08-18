import "./TextBox.css";

interface Props {
  title: string;
  text: string;
}

const TextBox = ({ title, text }: Props) => {
  return (
    <div className="textBox-container">
      <h1 className="textBox-title">{title}</h1>
      <hr />
      <p className="textBox-text">{text}</p>
    </div>
  );
};

export default TextBox;
