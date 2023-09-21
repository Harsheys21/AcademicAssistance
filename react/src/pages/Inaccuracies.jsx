import React, { useEffect, useState } from "react";
import "../components/ButtonOption";
import MajorOption from "../components/ButtonOption";
import NavButton from "../components/NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";
import { useInput } from "../utils/InputContext";
import "./Inaccuracies.css";
import ButtonGroup from "../components/ButtonGroup";

function Inaccuracies(props) {
  let navigate = useNavigate();

  const { inputValues, setInputValues } = useInput();

  const handleInaccuracySelected = (name, value, index) => {
    console.log("HANDLE INACCURACY SELECTED");
    console.log("Inaccuracy chosen: ", value);
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [name]: value,
    // }));
    setInaccuracies((prevInaccuracies) => ({
      ...prevInaccuracies,
      [name]: [...prevInaccuracies[name], value],
      //   [name]: (prev) => ({ ...prev, value }),
    }));
    console.log("endof HANDLE INACCURACY SELECTED");
  };

  //   add to each of these lists upon an item being selected
  const [inaccuracies, setInaccuracies] = useState({
    GE_NS: [],
    LOW_NS: [],
    UP_NS: [],
    CORE_NS: [],
  });

  const handleInaccuracies = (inputValues, inaccuracies) => {
    console.log("HANDLE INACCURACIES");
    console.log("The selected courses are inaccurate");
    console.log("curse data", inputValues.course_data);
    // TODO: Here, there needs to be a list comprehension algorithm
    // that takes the data in inaccuracies and updates the context by subtracting
    //  the inaccuracies

    for (const category in inaccuracies) {
      if (inputValues.course_data.hasOwnProperty(category)) {
        const item = inaccuracies[category];
        inputValues.course_data[category] = inputValues.course_data[
          category
        ].filter((i) => !item.includes(i));
      }
    }

    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   course_data: ,
    // }));
  };

  useEffect(() => {
    console.log("Updated inputValues (useEffect):", inputValues);
  }, [inputValues]);

  useEffect(() => {
    console.log("Updated inaccuruacies (useEffect):", inaccuracies);
  }, [inaccuracies]);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Inaccuracies</h1>
          <p>
            Have you taken any of these classes? Our parser may have fucked up.
            But its not our fault, ucsc just sucks at documenting their courses
          </p>
        </div>

        {/* {props.items.length === 0 && <p>No input found</p>} */}
        <div className="course-groupings">
          <ButtonGroup
            title={"Core division courses not satisfied:"}
            name={"CORE_NS"}
            cat={inputValues.course_data.CORE_NS}
            handleInaccuracySelected={handleInaccuracySelected}
          />
          <ButtonGroup
            title={"GE division courses not satisfied:"}
            name={"GE_NS"}
            cat={inputValues.course_data.GE_NS}
            handleInaccuracySelected={handleInaccuracySelected}
          />
          <ButtonGroup
            title={"Lower division courses not satisfied:"}
            name={"LOW_NS"}
            cat={inputValues.course_data.LOW_NS}
            handleInaccuracySelected={handleInaccuracySelected}
          />
          <ButtonGroup
            title={"Upper division courses not satisfied:"}
            name={"UP_NS"}
            cat={inputValues.course_data.UP_NS}
            handleInaccuracySelected={handleInaccuracySelected}
          />

          <button
            onClick={() => {
              console.log("----BUTTON CLICKED----");
              handleInaccuracies(inputValues, inaccuracies);
            }}
          >
            I have already taken the selected courses
          </button>
        </div>

        <NavButton
          text="Prev"
          className="prev-button"
          onClick={() => navigate("/input")}
        />
        <NavButton
          text="Next"
          className="next-button"
          onClick={() => navigate("/login")}
        />
      </div>
    </>
  );
}

export default Inaccuracies;
