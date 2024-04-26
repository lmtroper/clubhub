import { SET_USER, SET_USER_CLUBS, SET_USER_CLUBS_MEMBERSHIPS, SET_USER_ADMIN_CLUBS } from '../actions';

const initialState = {
    loggedIn: false,
    uid: null,
    displayName: null,
    clubs: [],
    memberships: [],
    admin: [],
  };

const isLoggedReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
          return {
            ...state,
            loggedIn: action.loggedIn,
            uid: action.uid,
            displayName: action.displayName,
          };
        case SET_USER_CLUBS:
          return {
            ...state,
            clubs: action.payload,
          };
        case SET_USER_CLUBS_MEMBERSHIPS:
          return {
            ...state,
            memberships: action.payload,
          };
        case SET_USER_ADMIN_CLUBS:
          return {
            ...state,
            admin: [...state.admin, ...action.payload],
          };
      default:
        return state;
    }
};

export default isLoggedReducer;
