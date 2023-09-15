import { createContext, useContext, useState } from "react";

import React from "react";

const InputContext = createContext();

export function InputProvider({ children }) {
  const [inputValues, setInputValues] = useState({
    email: "",
    grad_quarter: "",
    grad_date: "",
    concentration: "",
    courses_taken: [],
    courses_not_taken: [],
    lower_NotSatisfied: [],
    upper_NotSatisfied: [],
    schedule: {},
    raw_data: {},
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
