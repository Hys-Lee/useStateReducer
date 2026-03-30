import { SetStateAction } from 'react';

declare const useStateReducer: <T>(initValue: T, value: T, externalUpdater?: (prevVal: T, nextState: T) => T | undefined) => readonly [T, (action: SetStateAction<T>) => void];

export { useStateReducer };
