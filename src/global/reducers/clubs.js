import { SET_CLUBS_LIST, SET_CLUBS_DETAILS, SET_CLUBS_ANNOUNCEMENTS, SET_CLUBS_EVENTS } from '../actions';

const initialState = {
    clubs: [],
    clubAnnouncements: {},
    clubEvents: {},
    clubDetails: {},
  };

const clubsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CLUBS_LIST:
          return {
            ...state,
            clubs: action.clubs,
          };
      case SET_CLUBS_DETAILS:
        console.log('set club details', action.payload)
          return {
            ...state,
            clubDetails: action.payload,
            
          };
      case SET_CLUBS_ANNOUNCEMENTS:
          return {
            ...state,
            clubAnnouncements: {
              ...state.clubAnnouncements,
              [action.clubID]: action.payload,
            },
          };
      case SET_CLUBS_EVENTS:
          return {
            ...state,
            clubEvents: {
              ...state.clubEvents,
              [action.clubID]: action.payload,
            },
          };
      default:
        return state;
    }
};

export default clubsReducer;
