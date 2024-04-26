export const SET_USER = 'SET_USER';
export const SET_USER_CLUBS = 'SET_USER_CLUBS';
export const SET_USER_CLUBS_MEMBERSHIPS = 'SET_USER_CLUBS_MEMBERSHIPS';
export const SET_GUEST_MODE = 'SET_GUEST_MODE';
export const SET_USER_ADMIN_CLUBS = 'SET_USER_ADMIN_CLUBS';
export const ADD_GUEST_CLUBS = 'ADD_GUEST_CLUBS';
export const REMOVE_GUEST_CLUBS = 'REMOVE_GUEST_CLUBS';
export const GUEST_ADD_ANNOUNCEMENT = 'GUEST_ADD_ANNOUNCEMENT';
export const GUEST_EDIT_ANNOUNCEMENT = 'GUEST_EDIT_ANNOUNCEMENT';
export const GUEST_DELETE_ANNOUNCEMENT = 'GUEST_DELETE_ANNOUNCEMENT';
export const GUEST_ADD_EVENT = 'GUEST_ADD_EVENT';
export const GUEST_DELETE_EVENT = 'GUEST_DELETE_EVENT';
export const GUEST_UPDATE_ATTENDANCE = 'GUEST_UPDATE_ATTENDANCE';
export const SET_CLUBS_LIST = 'SET_CLUBS_LIST';
export const SET_CLUBS_DETAILS = 'SET_CLUBS_DETAILS';
export const SET_CLUBS_ANNOUNCEMENTS = 'SET_CLUBS_ANNOUNCEMENTS';
export const SET_CLUBS_EVENTS = 'SET_CLUBS_EVENTS';
export const SET_DASHBOARD_CLUBS = 'SET_DASHBOARD_CLUBS';
export const SET_CLUB_MEMBERS = 'SET_CLUB_MEMBERS';

/**
 * User actions
 */
export const setUser = (loggedIn, uid, displayName) => {
  return {
    type: SET_USER,
    loggedIn: loggedIn,
    uid: uid,
    displayName: displayName,
  }
};

export const getUserClubs = (clubs) => {
  return {
    type: SET_USER_CLUBS,
    payload: clubs
  }
}

export const getUserClubMemberships = (clubs) => {
  return {
    type: SET_USER_CLUBS_MEMBERSHIPS,
    payload: clubs
  }
}

export const getUserAdminClubs = (clubs) => {
  return {
    type: SET_USER_ADMIN_CLUBS,
    payload: clubs
  }
}

export const setDashboardClubs = (clubs) => {
  return {
    type: SET_DASHBOARD_CLUBS,
    payload: clubs
  }
}

/**
* Guest actions
*/
export const setGuestMode = () => {
  return {
    type: SET_GUEST_MODE,
  }
};

export const addGuestClubs = (clubID, clubData) => {
  return {
    type: ADD_GUEST_CLUBS,
    clubID: clubID,
    payload: clubData
  }
};

export const removeGuestClubs = (clubID) => {
  return {
    type: REMOVE_GUEST_CLUBS,
    clubID: clubID,
  }
};

export const guestAddAnnouncement = (clubID, announcement) => {
  return {
    type: GUEST_ADD_ANNOUNCEMENT,
    clubID: clubID,
    payload: announcement
  }
}

export const guestEditAnnouncement = (clubID, announcement) => {
  return {
    type: GUEST_EDIT_ANNOUNCEMENT,
    clubID: clubID,
    payload: announcement,
  }
}

export const guestDeleteAnnouncement = (clubID, announcementID) => {
  return {
    type: GUEST_DELETE_ANNOUNCEMENT,
    clubID: clubID,
    announcementID: announcementID,
  }
}

export const guestAddEvent = (clubID, event) => {
  return {
    type: GUEST_ADD_EVENT,
    clubID: clubID,
    payload: event
  }
}

export const guestDeleteEvent = (clubID, eventID) => {
  return {
    type: GUEST_DELETE_EVENT,
    clubID: clubID,
    eventID: eventID,
  }
}

export const guestUpdateAttendance = (clubID, eventID, attendance) => {
  return {
    type: GUEST_UPDATE_ATTENDANCE,
    clubID: clubID,
    eventID: eventID,
    status: attendance, // going, not going, maybe
  }
}

export const clubsList = (clubs) => {
  return {
    type: SET_CLUBS_LIST,
    clubs: clubs
  }
}

export const setClubsDetails = (details) => {
  return {
    type: SET_CLUBS_DETAILS,
    payload: details
  }
}

export const setClubsAnnouncements = (clubID, announcements) => {
  return {
    type: SET_CLUBS_ANNOUNCEMENTS,
    clubID: clubID,
    payload: announcements
  }
}

export const setClubsEvents = (clubID, events) => {
  return {
    type: SET_CLUBS_EVENTS,
    clubID: clubID,
    payload: events
  }
}

export const setClubMembers = (clubID, members) => {
  return {
    type: SET_CLUB_MEMBERS,
    clubID: clubID,
    payload: members
  }
}
