import { serverURL } from 'constants/config'

export const fetchAnnouncements = async (user) => {
    return callApiGetAnnouncements(user)
      .then(res => {
        var parsed = JSON.parse(res.express);
        parsed.sort(function (a, b) {
          var timeA = a.time_posted.toLowerCase()
          var timeB = b.time_posted.toLowerCase()
          if (timeA > timeB) //sort string ascending
            return -1
          if (timeA < timeB)
            return 1
          return 0 //default return value (no sorting)
        })
        return(parsed);
      })
}

const callApiGetAnnouncements = async (user) => {
  const url = serverURL + '/api/getAnnouncements';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //authorization: `Bearer ${this.state.token}`
    },
    body: JSON.stringify({
      userID: user
    })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const fetchSpecificClubAnnouncements = async (clubs) => {
  return callApiGetSpecificClubAnnouncements(clubs)
    .then(res => {
      var parsed = JSON.parse(res.express);
      parsed.sort(function (a, b) {
        var timeA = a.time_posted.toLowerCase()
        var timeB = b.time_posted.toLowerCase()
        if (timeA > timeB) //sort string ascending
          return -1
        if (timeA < timeB)
          return 1
        return 0 //default return value (no sorting)
      })
      return(parsed);
    })
}

const callApiGetSpecificClubAnnouncements = async (clubs) => {
  const url = serverURL + '/api/getSpecificClubAnnouncements';
  const response = await fetch(url, {
    method: "POST",
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

export const fetchClubAnnouncements = async (clubID) => {
  return callApiGetClubAnnouncements(clubID)
    .then(res => {
      var parsed = JSON.parse(res.express);
      parsed.sort(function (a, b) {
        var timeA = a.time_posted.toLowerCase()
        var timeB = b.time_posted.toLowerCase()
        if (timeA > timeB) //sort string ascending
          return -1
        if (timeA < timeB)
          return 1
        return 0 //default return value (no sorting)
      })
      return(parsed);
    })
}

const callApiGetClubAnnouncements = async (clubID) => {
  const url = serverURL + '/api/getClubAnnouncements';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //authorization: `Bearer ${this.state.token}`
    },
    body: JSON.stringify({
      clubID: clubID
    })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const callApiDeleteAnnouncement = async (id) => {
  const url = serverURL + '/api/deleteAnnouncement';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          id: id
      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const callApiEditAnnouncement = async (id, data) => {
  const url = serverURL + '/api/editAnnouncement';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          id: id,
          newTitle: data.title,
          newBody: data.content,
          visibility: data.access,
          placeholderImage: parseInt(data.placeholderImage),

      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}
