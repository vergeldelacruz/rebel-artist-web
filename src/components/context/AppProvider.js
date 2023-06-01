import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  return (
    <AppContext.Provider
      value={[
        currentUser,
        setCurrentUser,
      ]}
    >
      {props.children}
    </AppContext.Provider>
  );
};
