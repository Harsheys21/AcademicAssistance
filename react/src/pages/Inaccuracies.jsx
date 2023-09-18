import React, { useEffect, useState } from "react";
import "../components/ButtonOption";
import MajorOption from "../components/ButtonOption";
import NavButton from "../components/NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";
import { useInput } from "../utils/InputContext";
import "./Inaccuracies.css";

function Inaccuracies(props) {
  let navigate = useNavigate();

  const { inputValues, setInputValues } = useInput();

  const handleInaccuracySelected = (name, value, index) => {
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
  };

  //   add to each of these lists upon an item being selected
  const [inaccuracies, setInaccuracies] = useState({
    GE_NS: [],
    LOW_NS: [],
    UP_NS: [],
    CORE_NS: [],
  });

  const handleInaccuracies = () => {
    console.log("The selected courses are inaccurate");
    // TODO: Here, there needs to be a list comprehension algorithm
    // that takes the data in inaccuracies

    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   course_data: ,
    // }));
  };

  useEffect(() => {
    console.log("Updated inputValues:", inputValues);
  }, [inputValues]);

  useEffect(() => {
    console.log("Updated inaccuruacies:", inaccuracies);
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
          <h5>Core courses:</h5>
          <div className="button-container">
            <ul className="list-group">
              {/* gonna need one of these for every type of inaccuracy */}
              {inputValues.course_data.CORE_NS.map((item, index) => (
                <React.Fragment key={index}>
                  <MajorOption
                    name="GE_NS"
                    clickActive={true}
                    text={item}
                    onClick={(name, text) => {
                      //   TODO: handleInaccuracySelected must add selected course to a list or object,
                      // labeled with it's category
                      // these lists will contain the classes to remove from the course_data object in the InputContext
                      handleInaccuracySelected(name, text, index);
                      // props.onSelectItem(item);
                    }}
                  />
                </React.Fragment>
              ))}
            </ul>
          </div>
          <h5>GE courses:</h5>
          <div className="button-container">
            <ul className="list-group">
              {/* gonna need one of these for every type of inaccuracy */}
              {inputValues.course_data.GE_NS.map((item, index) => (
                <React.Fragment key={index}>
                  <MajorOption
                    name="GE_NS"
                    clickActive={true}
                    text={item}
                    onClick={(name, text) => {
                      //   TODO: handleInaccuracySelected must add selected course to a list or object,
                      // labeled with it's category
                      // these lists will contain the classes to remove from the course_data object in the InputContext
                      handleInaccuracySelected(name, text, index);
                      // props.onSelectItem(item);
                    }}
                  />
                </React.Fragment>
              ))}
            </ul>
          </div>

          <h5>Lower Division courses:</h5>
          <ul className="list-group">
            {inputValues.course_data.LOW_NS.map((item, index) => (
              <React.Fragment key={index}>
                <MajorOption
                  name="UP_NS"
                  clickActive={true}
                  text={item}
                  onClick={(name, text) => {
                    handleInaccuracySelected(name, text, index);
                  }}
                />
              </React.Fragment>
            ))}
          </ul>

          <h5>Upper Division courses:</h5>
          <ul className="list-group">
            {inputValues.course_data.UP_NS.map((item, index) => (
              <React.Fragment key={index}>
                <MajorOption
                  name="UP_NS"
                  clickActive={true}
                  text={item}
                  onClick={(name, text) => {
                    handleInaccuracySelected(name, text, index);
                  }}
                />
              </React.Fragment>
            ))}
          </ul>

          <button onClick={handleInaccuracies}>
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
