import { useCallback, useState, SetStateAction } from "react";

/**
 * A custom hook that manages state with an optional external interceptor.
 *
 * @param initState - The initial state value.
 * @param externalUpdater - An optional middleware function to intercept state updates.
 *                          It receives the previous and next states and returns the final state to be applied.
 * @returns A tuple containing the current state and the dispatcher function, identical to the standard useState.
 */

const useStateReducer = <T>(
  initState: T,
  externalUpdater?: (prevState: T, nextState: T) => T,
) => {
  const [state, setState] = useState(initState);
  const finalUpdater = useCallback(
    (internalNewState: SetStateAction<T>) => {
      if (externalUpdater)
        setState((prevState) =>
          externalUpdater(
            prevState,
            typeof internalNewState === "function"
              ? (internalNewState as (prevState: T) => T)(prevState)
              : internalNewState,
          ),
        );
      else {
        setState(internalNewState);
      }
    },
    [externalUpdater],
  );
  return [state, finalUpdater] as const;
};

export { useStateReducer };
