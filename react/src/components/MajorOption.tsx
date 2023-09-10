import "./MajorOption.css";

interface Props {
  active: boolean;
  text?: string;
  onClick: () => void;
}

function MajorOption({ active, text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`majorOption ${active && "majorOption--active"}`}
    >
      <h2>{text}</h2>
    </button>
  );
}

export default MajorOption;
