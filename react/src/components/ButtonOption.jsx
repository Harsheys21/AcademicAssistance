import { useState } from "react";
import "./ButtonOption.css";

function MajorOption(props) {
  const clickActive = props.clickActive;
  const [active2, setActive2] = useState(false);
  return (
    <button
      onClick={() => {
        props.onClick(props.name, props.text);
        clickActive && setActive2(true);
      }}
      // vv can be called active from props or set by onCLick
      className={`majorOption ${
        (props.active && "majorOption--active") ||
        (active2 && "majorOption--active")
      }`}
      // TODO: have these buttons be disabled when clicked, and undisabled when clicked again
      // of course this would mean the inaccuracy implementation would need to be updated
      // this is because the course is added to a list when clicked on the inaccuracy page
      // so it must be removed from the list when clicked again
      // its easy but ill leave it for later
      // disabled={props.disabled}
    >
      <h2>{props.text}</h2>
    </button>
  );
}

export default MajorOption;
