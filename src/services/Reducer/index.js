import { combineReducers } from "redux";
import Githubreducer from "../Reducer/Githubreducer"; // Correct default import

export const rootReducer = combineReducers({
  Githubreducer, // Key in your Redux store will be "Githubreducer"
});
