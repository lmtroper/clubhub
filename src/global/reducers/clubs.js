import { SET_CLUBS_LIST, SET_CLUBS_DETAILS, SET_CLUBS_ANNOUNCEMENTS, SET_CLUBS_EVENTS, SET_CLUB_MEMBERS } from '../actions';

const initialState = {
    clubs: [],
    clubAnnouncements: {},
    clubEvents: {},
    clubDetails: {},
    clubMembers: [],
  };

const clubsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CLUBS_LIST:
          return {
            ...state,
            clubs: action.clubs,
          };
      case SET_CLUBS_DETAILS:
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
      case SET_CLUB_MEMBERS:
          return {
            ...state,
            clubMembers: {
              ...state.clubMembers,
              [action.clubID]: action.payload,
            },
          };
      default:
        return state;
    }
};

export default clubsReducer;
