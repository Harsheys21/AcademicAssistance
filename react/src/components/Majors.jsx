import React, { useState } from "react";
import "./MajorOption";
import MajorOption from "./MajorOption";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";

// interface Props {
//   items: string[];
//   heading?: string;
//   //
//   onSelectItem: (item: string) => void; // just like onClick
// }

function Majors(props) {
  // Hook, function that allows us to tap into built in features of React
  // each component has its own state
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="center">
          <h1>{props.heading}</h1>
          {props.items.length === 0 && <p>No item found</p>}
          <ul className="list-group">
            {props.items.map((item, index) => (
              <React.Fragment key={index}>
                <MajorOption
                  active={selectedIndex === index}
                  text={item}
                  onClick={() => {
                    setSelectedIndex(index);
                    props.onSelectItem(item);
                  }}
                />
              </React.Fragment>
            ))}
          </ul>
          <NavButton
            text="Prev"
            className="prev-button"
            onClick={() => navigate("/")}
          />
          <NavButton
            text="Next"
            className="next-button"
            onClick={() => navigate("/input")}
          />
        </div>
      </div>
    </>
  );
}

export default Majors;
