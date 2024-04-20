import { 
  SET_GUEST_MODE, 
  ADD_GUEST_CLUBS, 
  REMOVE_GUEST_CLUBS, 
  GUEST_ADD_ANNOUNCEMENT,
  GUEST_EDIT_ANNOUNCEMENT,
  GUEST_DELETE_ANNOUNCEMENT,
  GUEST_ADD_EVENT,
  GUEST_DELETE_EVENT,
  GUEST_UPDATE_ATTENDANCE,
} from '../actions';
import { guestClubs, announcements, attendance, pastEvents, upcomingEvents } from 'guest_content';

const memberType = {
  2: "admin",
  30: "member",
  143: "owner",
}

const clubMemberships = [2, 30, 143]

const announcementCount = 0;
const eventCount = 0;

const initialState = {
  name: "Guest (Demo)",
  guestMode: false,
  clubs: guestClubs,
  announcements: announcements,
  pastEvents: pastEvents,
  upcomingEvents: upcomingEvents,
  clubMemberships: clubMemberships,
  memberType: memberType,
  announcementCount: announcementCount,
  announcementId: "G" + announcementCount,
  eventCount: eventCount,
  eventId: "G" + eventCount,
  attendance: attendance,
};

const guestModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_GUEST_MODE:
        return {
          ...state,
          guestMode: !state.guestMode,
        }
      case ADD_GUEST_CLUBS:
        return {
          ...state,
          clubs: [...state.clubs, action.payload],
          clubMemberships: [...state.clubMemberships, action.clubID],
          memberType: {
            ...state.memberType,
            [action.clubID]: "member",
          },
        }
        case REMOVE_GUEST_CLUBS:
          return {
            ...state,
            clubs: state.clubs.filter((club) => club.id !== action.clubID),
            clubMemberships: state.clubMemberships.filter((clubID) => clubID !== action.clubID),
          };
        case GUEST_ADD_ANNOUNCEMENT:
          const newPayloadAnnouncement = Array.isArray(action.payload)
            ? action.payload
            : [action.payload];
        
          return {
            ...state,
            announcements: {
              ...state.announcements,
              [action.clubID]: [
                ...(state.announcements[action.clubID] || []),
                ...newPayloadAnnouncement
              ]
            },
            announcementCount: state.announcementCount + 1,
            announcementId: "G" + (state.announcementCount + 1),
          };
        case GUEST_EDIT_ANNOUNCEMENT:
          const clubID = action.clubID.toString();
          const announcementIndex = state.announcements[clubID].findIndex(
            (announcement) => announcement.id === action.payload.id
          );
            
          const updatedAnnouncements = [
            ...state.announcements[clubID].slice(0, announcementIndex),
            action.payload,
            ...state.announcements[clubID].slice(announcementIndex + 1),
          ];
          return {
            ...state,
            announcements: {
              ...state.announcements,
              [clubID]: updatedAnnouncements,
            },
          };
        case GUEST_DELETE_ANNOUNCEMENT:
          const deleteClubID = action.clubID.toString();
          const deleteAnnouncementIndex = state.announcements[deleteClubID].findIndex(
            (announcement) => announcement.id === action.announcementID
          );

          const deleteUpdatedAnnouncements = [
            ...state.announcements[deleteClubID].slice(0, deleteAnnouncementIndex),
            ...state.announcements[deleteClubID].slice(deleteAnnouncementIndex + 1),
          ];
          return {
            ...state,
            announcements: {
              ...state.announcements,
              [deleteClubID]: deleteUpdatedAnnouncements,
            },
          };
        case GUEST_ADD_EVENT:
          const newPayloadEvent = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      
        return {
          ...state,
          upcomingEvents: {
            ...state.upcomingEvents,
            [action.clubID]: [
              ...(state.upcomingEvents[action.clubID] || []),
              ...newPayloadEvent,
            ]
          },
          eventCount: state.eventCount + 1,
          eventId: "G" + (state.eventCount + 1),
        };
      case GUEST_UPDATE_ATTENDANCE:
        const currentClubAttendance = state.attendance[action.clubID] || {};
        const currentEventAttendance = currentClubAttendance[action.eventID] || [];
      
        const guestIndex = currentEventAttendance.findIndex(
          (event) => event.uid === "G"
        );
      
        if (guestIndex === -1) {
          // If the guest entry doesn't exist, add a new entry
          return {
            ...state,
            attendance: {
              ...state.attendance,
              [action.clubID]: {
                ...currentClubAttendance,
                [action.eventID]: [
                  ...currentEventAttendance,
                  { uid: "G", status: action.status, name: "Guest Demo", event_id: action.eventID }
                ]
              }
            }
          };
        } else {
                  // If the guest entry exists, update the status
            const updatedAttendance = [
              ...currentEventAttendance.slice(0, guestIndex),
              { uid: "G", status: action.status, name: "Guest Demo", event_id: action.eventID},
              ...currentEventAttendance.slice(guestIndex + 1)
            ];

            return {
              ...state,
              attendance: {
                ...state.attendance,
                [action.clubID]: {
                  ...currentClubAttendance,
                  [action.eventID]: updatedAttendance
                }
              }
            };
          }
        

      default:
        return state;
    }
};

export default guestModeReducer;
