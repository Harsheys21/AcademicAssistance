import { useState } from "react";
import "../components/MajorOption";
import MajorOption from "../components/MajorOption";
import NavButton from "../components/NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";

interface Props {
  items: string[];
  heading?: string;
  //
  onSelectItem: (item: string) => void; // just like onClick
}

function Majors({ items, heading, onSelectItem }: Props) {
  // Hook, function that allows us to tap into built in features of React
  // each component has its own state
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let navigate = useNavigate();

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <>
            <MajorOption
              active={selectedIndex === index}
              text={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            />
            {/* <li
              //{} = DYNAMICALLY
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item}
              // set selectedIndex to index of the current item
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            >
              {item}
            </li> */}
          </>
        ))}
      </ul>
      <NavButton
        text="Prev"
        className="prev-button"
        onClick={() => navigate("/oogabooga")}
      />
      <NavButton
        text="Next"
        className="next-button"
        onClick={() => navigate("/oogabooga")}
      />
    </>
  );
}

export default Majors;
