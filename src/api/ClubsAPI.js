import { serverURL } from '../constants/config'

const callApiGetAllClubs = async () => {
  try {
    const url = serverURL + "/api/getAllClubs";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllClubs = (setClubs, setFilteredClubs) => {
  callApiGetAllClubs()
    .then(res => {
      var parsed = JSON.parse(res.express);
      setClubs(parsed);
      setFilteredClubs(parsed);
      return parsed;
    })
}

const getClubMemberships = async (userID) => {
  const url = serverURL + '/api/checkMembership';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
    })
  });

  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const fetchClubMemberships = async (user) => {
  return getClubMemberships(user)
    .then(res => {
        const parsed = JSON.parse(res.express);
        return parsed.map((club) => club.club_id);
    })
};

export const fetchMyClubs = async (user) => {
  return callApiGetMyClubs(user)
    .then(res => {
      var parsed = JSON.parse(res.express);
      return parsed;
    })
}

const callApiGetMyClubs = async (user) => {
  const url = serverURL + '/api/getMyClubs';
  const response = await fetch(url, {
    method: "POST",
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


export const fetchClubMembers = (clubID) => {
  callApiGetClubMembers(clubID)
      .then(res => {
          var parsed = JSON.parse(res.express);
          return parsed;
      })
}

const callApiGetClubMembers = async (clubID) => {
  const url = serverURL + '/api/getClubMembers';
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

export const fetchUserClubRole = async (clubID, userID) => {
  return callApiGetUserRole(clubID, userID)
      .then(res => {
          var parsed = JSON.parse(res.express);
          if (parsed.length >= 1){
              if (parsed[0].role === 'owner' || parsed[0].role === 'admin'){
                return true
              }
          }
          return false
      })
}

const callApiGetUserRole = async (clubID, userID) => {
  const url = serverURL + '/api/getCurrentUserRole';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          clubID: clubID,
          userID: userID,
      })
  });

  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const apiLeaveClub = async (data) => {
  const url = serverURL + '/api/leaveClub';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          clubId: data.clubId,
          userId: data.userId
      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const fetchClubDetails = async (clubID) => {
  return callApiGetClubDetails(clubID)
      .then(res => {
          var parsed = JSON.parse(res.express);
          return parsed[0];
      })
}

const callApiGetClubDetails = async (clubID) => {
  const url = serverURL + '/api/getClubs';
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


export const editClubDescription = (clubID, description) => {
  return callApiEditDescription(clubID, description)
      .then(res => {
          var parsed = JSON.parse(res.express);
          return parsed;
      })
}

const callApiEditDescription = async (clubID, description) => {
  const url = serverURL + '/api/editClubDescription';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          id: clubID,
          description: description
      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const callApiJoinClub = async (userID, clubID) => {
  const url = serverURL + '/api/joinClub';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          userID: userID,
          clubID: clubID,
      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export const logGuestEvent = async () => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const url = serverURL + '/api/logGuestVisit';
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
          timestamp: date,
      })
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}
