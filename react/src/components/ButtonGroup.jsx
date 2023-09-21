import React from "react";
import MajorOption from "./ButtonOption";

function ButtonGroup(props) {
  return (
    <>
      <h3>{props.title}</h3>
      {/* {course_data.LOW_NS.length === 0 && "None"} */}
      {props.cat.length === 0 ? (
        <p>None</p>
      ) : (
        <ul className="list-group">
          {props.cat.map((item, index) => (
            <React.Fragment key={index}>
              <MajorOption
                name={props.name}
                clickActive={false}
                text={item}
                onClick={(name, text) => {
                  props.handleInaccuracySelected(name, text, index);
                }}
              />
            </React.Fragment>
          ))}
        </ul>
      )}
    </>
  );
}

export default ButtonGroup;
