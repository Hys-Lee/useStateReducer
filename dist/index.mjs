// src/index.ts
import { useCallback, useState } from "react";
var useStateReducer = (initState, externalUpdater) => {
  const [state, setState] = useState(initState);
  const finalUpdater = useCallback(
    (internalNewState) => {
      if (externalUpdater)
        setState(
          (prevState) => externalUpdater(
            prevState,
            typeof internalNewState === "function" ? internalNewState(prevState) : internalNewState
          )
        );
      else {
        setState(internalNewState);
      }
    },
    [externalUpdater]
  );
  return [state, finalUpdater];
};
export {
  useStateReducer
};
