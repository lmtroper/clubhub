import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Card, Grid, Typography, CircularProgress } from "@mui/material";
import EventPost from "../components/ClubBoardPage/Events/EventPost";
import { fetchUserClubRole } from "../api/ClubsAPI";
import { fetchPastClubEvents, fetchUpcomingClubEvents } from "../api/EventsAPI";
import AddEvent from "../components/ClubBoardPage/Events/AddEvent";
import { useSelector } from "react-redux";

const EventsPage = () => {
    const user = useSelector((state) => state.user.uid);
    const guest = useSelector((state) => state.guest);
    const { clubID } = useParams();

    const [admin, setAdmin] = React.useState(false);

    const [upcomingEvents, setUpcomingEvents] = React.useState([]);
    const [pastEvents, setPastEvents] = React.useState([]);

    const [isLoadingUpcomingEvents, setIsLoadingUpcomingEvents] = React.useState(true);
    const [isLoadingPastEvents, setIsLoadingPastEvents] = React.useState(true);
    const [imageLoading, setImageLoading] = useState(true);

    React.useEffect(() => {
        if (guest.guestMode) {
            // if (guest?.upcomingEvents[clubID]) {
            setUpcomingEvents(guest?.upcomingEvents[clubID] || []);
            // }
            setPastEvents(guest?.pastEvents[clubID] || []);
            setIsLoadingUpcomingEvents(false);
            setIsLoadingPastEvents(false);
        } else if (user) {
            fetchUserClubRole(clubID, user).then((res) => {
                setAdmin(res);
            });
            fetchUpcomingClubEvents(clubID).then((events) => {
                setUpcomingEvents(events);
                setIsLoadingUpcomingEvents(false);
            });
            fetchPastClubEvents(clubID).then((events) => {
                setPastEvents(events);
                setIsLoadingPastEvents(false);
            });
        };
    }, [])

    const getEvents = () => {
        fetchUpcomingClubEvents(clubID).then((events) => {
            setUpcomingEvents(events);
        });
    }

    useEffect(() => {
        setUpcomingEvents(guest.upcomingEvents[clubID]);
    }, [guest.upcomingEvents[clubID]]);

    if (isLoadingUpcomingEvents && isLoadingPastEvents && imageLoading) {
        return (
        <div align="center">
          <CircularProgress />
        </div>)
    }
    

    function renderEventCard(title, events, isPastEvent) {
        const cardStyle = {
            padding: '20px',
            marginBottom: isPastEvent ? '0' : '20px', // Add bottom margin only for upcoming events
        };
    
        return (
            <Card style={cardStyle}>
                <Typography style={{ fontSize: '22pt', fontWeight: '300' }}>{title}</Typography>
                {events && events.length > 0 ? (
                    Object.values(events).map((event, index) => 
                        <EventPost 
                            club_id={clubID}
                            event={event} 
                            admin={admin} 
                            index={index} 
                            currentUser={user} 
                            pastEvent={isPastEvent} 
                            onChange={getEvents} 
                            isLoadingUpcomingEvents={isLoadingUpcomingEvents}
                        />
                    )
                ) : (
                    !isLoadingUpcomingEvents && (
                        <Grid style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                            <Typography style={{ color: '#C0C0C0', letterSpacing: '0.5px', fontSize: '14pt' }}>
                                {`No results found`}
                            </Typography>
                        </Grid>
                    )
                )}
            </Card>
        );
    }    

    return(
    <>
        <Grid style={{minHeight:'100vh', display:'flex', justifyContent:'space-around', paddingTop:'20px', background:'#f5f5f5'}}>
            <Grid style={{flex:4, padding: "0px 0px 0px 50px" }}>
                <Grid>
                    {renderEventCard("Upcoming Events", upcomingEvents, false)}
                    {renderEventCard("Past Events", pastEvents, true)}
                </Grid>
            </Grid>
            <AddEvent 
                getEvents={getEvents} 
                admin={admin} 
                clubID={clubID}
                imageLoading={imageLoading}
                setImageLoading={setImageLoading}/>
        </Grid>
    </>
    )
}

export default EventsPage;


