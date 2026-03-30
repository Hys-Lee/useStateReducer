import { SetStateAction, useCallback, useRef, useState } from "react";

const useStateReducer = <T>(
  initValue: T,
  value?: T,
  externalUpdater?: (prevVal: T, nextState: T) => T | undefined,
) => {
  const [internalState, setInternalState] = useState<T>(initValue);
  const isControlled = typeof value !== "undefined";
  const state = !isControlled ? internalState : value;

  // setState Opimization
  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = useCallback(
    (action: SetStateAction<T>) => {
      const prevState = stateRef.current;
      const nextState =
        typeof action === "function"
          ? (action as (prev: T) => T)(prevState)
          : action;

      if (externalUpdater) {
        const reducedState = externalUpdater(internalState, nextState);

        // update internal state when uncontrolled
        if (!isControlled && reducedState !== undefined) {
          setInternalState(reducedState as T);
        }
      } else {
        if (!isControlled) {
          setInternalState(nextState);
        }
      }
    },
    [externalUpdater],
  );

  return [state, setState] as const;
};
export { useStateReducer };
