import { serverURL } from '../constants/config'
import { timestamp } from 'utils';

// Fetch all upcoming events for a user
export const fetchUserUpcomingEvents = (user) => {
    return callApiGetDashboardEvents(user)
      .then(res => {
        var parsed = JSON.parse(res.express);
        return parsed;
    })
};

const callApiGetDashboardEvents = async (user) => {
    const url = serverURL + '/api/getDashboardEvents';
    const response = await fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
        userID: user,
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Fetch upcoming events for a specific club
export const fetchUpcomingClubEvents = async (clubID) => {
    return callApiGetUpcomingEvents(clubID)
        .then(res => {
            var parsed = JSON.parse(res.express);
            return parsed;
    })
}

const callApiGetUpcomingEvents = async (clubID) => {
    const url = serverURL + '/api/getUpcomingEvents';
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            clubID: clubID,
            todaysDate: timestamp(),
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Fetch event attendance
export const fetchEventAttendance = async (event) => {
    return callApiGetAttendance(event)
        .then(res => {
            var parsed = JSON.parse(res.express);
            return parsed;
        })
}

const callApiGetAttendance = async (event) => {
    const url = serverURL + '/api/getAttendance';
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            eventID: event.id,
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Change a user's event attendance
export const changeEventAttendance = async (event, currentUser, newStatus) => {
    const url = serverURL + '/api/changeAttendance';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            eventID: event.id,
            userID: currentUser,
            attendanceStatus: newStatus,
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Set a user's attendance for an event
export const setEventAttendance = async (event, uid, username, newStatus) => {
    const url = serverURL + '/api/setAttendance';

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            eventID: event.id,
            userID: uid,
            attendanceStatus: newStatus,
            name: username,
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Delete an event
export const deleteEvent = async (event) => {
    const url = serverURL + '/api/deleteEvent';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            eventID: event.id,
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

// Fetch a club's past events
export const fetchPastClubEvents = async (clubID) => {
    return callApiGetPastEvents(clubID)
        .then(res => {
            var parsed = JSON.parse(res.express);
            return parsed;
        })
}

const callApiGetPastEvents = async (clubID) => {
    const url = serverURL + '/api/getPastEvents';
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            clubID: clubID,
            todaysDate: timestamp(),
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

const callApiAddEvent = async (clubID, data, startDateTimeText, endDateTime, endDateTimeText, start_time) => {
    const url = serverURL + '/api/addEvent';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            clubID: clubID, 
            title: data.title,
            description: data.description,
            startDateTime: data.startDate + ' ' + start_time,
            endDateTime: endDateTime,
            allDay: data.allDay,
            locationType: data.locationType,
            location: data.location,
            price: data.price,
            details: data.details,
            placeholderImg: data.placeholderImage,
            startDateTimeText: startDateTimeText,
            endDateTimeText: endDateTimeText,
            timestamp: timestamp(),
        })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const fetchSpecificClubEvents = async (clubs) => {
    return callApiGetSpecificClubEvents(clubs)
      .then(res => {
        var parsed = JSON.parse(res.express);
        return(parsed);
      })
  }
  
  const callApiGetSpecificClubEvents = async (clubs) => {
    const url = serverURL + '/api/getSpecificClubEvents';
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        clubs: clubs
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
