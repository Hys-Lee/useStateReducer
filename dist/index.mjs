// src/index.ts
import { useState } from "react";
var useStateReducer = (initValue, value, externalUpdater) => {
  const [internalState, setInternalState] = useState(initValue);
  const isControlled = typeof value !== "undefined";
  const setState = (newState) => {
    if (externalUpdater) {
      const reducedState = externalUpdater(internalState, newState);
      if (!isControlled && reducedState !== void 0) {
        setInternalState(reducedState);
      }
    } else {
      if (!isControlled) {
        setInternalState(newState);
      }
    }
  };
  const state = !isControlled ? internalState : value;
  return [state, setState];
};
export {
  useStateReducer
};
