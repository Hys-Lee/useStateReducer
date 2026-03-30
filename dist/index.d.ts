declare const useStateReducer: <T>(initValue: T, value: T, externalUpdater?: (prevVal: T, nextState: T) => T | undefined) => readonly [T, (newState: T) => void];

export { useStateReducer };
