import React, { useEffect, useState } from "react";
import "../components/MajorOption";
import MajorOption from "../components/MajorOption";
import NavButton from "../components/NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";
import { useInput } from "../utils/InputContext";

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

  const { inputValues, setInputValues } = useInput();

  const handleInputChange = (name, value) => {
    // const { name, value } = data;
    console.log("name, value = ", name, value);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
    // console.log(inputValues);
  };

  useEffect(() => {
    console.log("Updated inputValues:", inputValues);
  }, [inputValues]); // Log inputValues whenever it changes

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
                  name="concentration"
                  active={selectedIndex === index}
                  text={item}
                  onClick={(name, text) => {
                    handleInputChange(name, text);
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
