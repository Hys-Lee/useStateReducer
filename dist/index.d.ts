import { SetStateAction } from 'react';

/**
 * A custom hook that manages state with an optional external interceptor.
 *
 * @param initState - The initial state value.
 * @param externalUpdater - An optional middleware function to intercept state updates.
 *                          It receives the previous and next states and returns the final state to be applied.
 * @returns A tuple containing the current state and the dispatcher function, identical to the standard useState.
 */
declare const useStateReducer: <T>(initState: T, externalUpdater?: (prevState: T, nextState: T) => T) => readonly [T, (internalNewState: SetStateAction<T>) => void];

export { useStateReducer };
