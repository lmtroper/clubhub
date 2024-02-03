import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import MyClubCard from '../components/MyClubsPage/MyClubCard'
import { fetchMyClubs } from "../api/ClubsAPI";
import { useSelector } from "react-redux";

const Wrapper = styled('div')({
    maxWidth: 800,
    margin: "30px auto",
    alignItems: "center",
    justifycontent: "center",
});
const Title = styled(Typography)({
    fontFamily: 'Arvo, serif'
});

const MyClubs = () => {
  const user = useSelector((state) => state.user);
  const guest = useSelector((state) => state.guest);
  const [myClubs, setMyClubs] = useState([])
  const [myClubsEmpty, setMyClubsEmpty] = useState(false)

  useEffect(() => {
    if(guest.guestMode) {
      setMyClubs(guest.clubs);
    } else {
      onChange();
    };
  }, []);

  useEffect(() => {
    if(guest.clubs.length === 0) {
      setMyClubsEmpty(true);
    } else {
      setMyClubs(guest.clubs);
    }
  }, [guest.clubs]);

  const onChange = () => {
    fetchMyClubs(user.uid).then((parsed) => {
      if (parsed.length === 0) {
        setMyClubsEmpty(true);
      } else {
        setMyClubs(parsed);
      }
    });
  }

  return (
    <Wrapper>
      <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
        <Title variant = "h4"> My Clubs </Title>
        <br />
        {myClubsEmpty === false ? 
          <MyClubCard 
            user={user}
            guest={guest}
            clubs={myClubs} 
            onChange={onChange} /> 
          : 
          <Typography variant = "h5">
            You aren't a part of a club yet. Join one to get started!
          </Typography>
        }
      </Grid>
    </Wrapper>
  );
};

export default MyClubs;
