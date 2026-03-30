// src/index.ts
import { useCallback, useRef, useState } from "react";
var useStateReducer = (initValue, value, externalUpdater) => {
  const [internalState, setInternalState] = useState(initValue);
  const isControlled = typeof value !== "undefined";
  const state = !isControlled ? internalState : value;
  const stateRef = useRef(state);
  stateRef.current = state;
  const setState = useCallback(
    (action) => {
      const prevState = stateRef.current;
      const nextState = typeof action === "function" ? action(prevState) : action;
      if (externalUpdater) {
        const reducedState = externalUpdater(internalState, nextState);
        if (!isControlled && reducedState !== void 0) {
          setInternalState(reducedState);
        }
      } else {
        if (!isControlled) {
          setInternalState(nextState);
        }
      }
    },
    [externalUpdater]
  );
  return [state, setState];
};
export {
  useStateReducer
};
