import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";
import DropdownMenu from "../components/Dropdown";
import NavButton from "../components/NavButton";
import { useInput } from "../utils/InputContext";

function Grad() {
  let navigate = useNavigate();

  const { inputValues, setInputValues } = useInput();

  const handleInputChange = (name, value, index) => {
    console.log("cock");
    console.log("Grad choseon: ", value);
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
    //   TODO: Add selected option from dropdown menu to useInput context
    <div>
      <h1>GRAD</h1>
      <DropdownMenu
        title={"Select your graduation year"}
        options={["2023", "2024", "2025", "2026", "2027"]}
        onSelect={(value) => {
          console.log("shaft");
          handleInputChange("grad_year", value);
        }}
      />
      <DropdownMenu
        title={"Select your graduation quarter"}
        options={["Fall", "Winter", "Spring"]}
        onSelect={(value) => handleInputChange("grad_quarter", value)}
      />
      <NavButton
        text="Prev"
        className="prev-button"
        onClick={() => navigate("/")}
      />
      <NavButton
        text="Next"
        className="next-button"
        onClick={() => navigate("/concentrations")}
      />
    </div>
  );
}

export default Grad;
