import { SET_CLUBS_LIST } from '../actions';

const initialState = {
    clubs: [],
  };

const clubsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CLUBS_LIST:
          return {
            ...state,
            clubs: action.clubs,
          };
      default:
        return state;
    }
};

export default clubsReducer;
