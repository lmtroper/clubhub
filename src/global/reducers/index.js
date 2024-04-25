import isLoggedReducer from "./user";
import guestModeReducer from "./guestMode";
import clubsReducer from "./clubs";
import { combineReducers } from "redux";


const allReducer = combineReducers({
    user: isLoggedReducer,
    guest: guestModeReducer,
    clubs: clubsReducer,
});
export default allReducer;

 