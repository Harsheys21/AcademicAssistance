import { createContext, useContext, useState } from "react";

import React from "react";

const InputContext = createContext();

export function InputProvider({ children }) {
  const [inputValues, setInputValues] = useState({
    email: "",
    grad_quarter: "",
    grad_date: "",
    concentration: "",
    course_data: {
      GE_NS: [],
      TAKEN: [],
      CORE_NS: [],
      LOW_NS: [],
      UP_NS: [],
    },
    schedule: {},
    raw_data: "",
    concentration_index: -1,
    // Add more input values as needed
  });

  return (
    <InputContext.Provider value={{ inputValues, setInputValues }}>
      {children}
    </InputContext.Provider>
  );
}

export function useInput() {
  return useContext(InputContext);
}
