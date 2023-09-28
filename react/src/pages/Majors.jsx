import React, { useEffect, useState } from "react";
import "../components/ButtonOption";
import MajorOption from "../components/ButtonOption";
import NavButton from "../components/NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";
import { useInput } from "../utils/InputContext";

function Majors(props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  let navigate = useNavigate();

  const { inputValues, setInputValues } = useInput();

  const handleInputChange = (name, value, index) => {
    console.log("Concentration choseon: ", value);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
      concentration_index: index,
    }));
  };

  useEffect(() => {
    console.log("Updated inputValues:", inputValues);
  }, [inputValues]);

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
                  active={
                    selectedIndex === index ||
                    inputValues.concentration_index === index
                  }
                  text={item}
                  onClick={(name, text) => {
                    handleInputChange(name, text, index);
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
            onClick={() => navigate("/grad")}
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
