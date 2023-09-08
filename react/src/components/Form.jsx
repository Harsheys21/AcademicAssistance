import { useState } from "react";
import "./Form.css"; // Import the CSS file

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Form = (props) => {
  const [inputText, setInputText] = useState("");

  const handleAdd = async () => {
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };

  // const handleInputChange = (event) => {
  //   // console.log(event.target.value);
  //   setInputText(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(inputText);
    setInputText("");
  };

  return (
    <form className="text-input-form" onSubmit={handleSubmit}>
      <div>
        {/* <label htmlFor="inputText">Enter Text:</label> */}
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            props.handleUpdate(props.name, e.target.value);
          }}
          cols={60}
          rows={5}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
