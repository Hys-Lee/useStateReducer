"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useStateReducer: () => useStateReducer
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var useStateReducer = (initValue, value, externalUpdater) => {
  const [internalState, setInternalState] = (0, import_react.useState)(initValue);
  const isControlled = typeof value !== "undefined";
  const state = !isControlled ? internalState : value;
  const stateRef = (0, import_react.useRef)(state);
  stateRef.current = state;
  const setState = (0, import_react.useCallback)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useStateReducer
});
