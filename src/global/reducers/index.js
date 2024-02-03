import isLoggedReducer from "./user";
import guestModeReducer from "./guestMode";
import { combineReducers } from "redux";


const allReducer = combineReducers({
    user: isLoggedReducer,
    guest: guestModeReducer
});
export default allReducer;

 