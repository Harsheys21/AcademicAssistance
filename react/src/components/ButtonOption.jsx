import "./ButtonOption.css";

function MajorOption(props) {
  return (
    <button
      onClick={() => {
        props.onClick(props.name, props.text);
      }}
      className={`majorOption ${props.active && "majorOption--active"}`}
    >
      <h2>{props.text}</h2>
    </button>
  );
}

export default MajorOption;
