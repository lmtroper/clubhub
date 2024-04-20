import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Card, Grid } from "@mui/material";

import { fetchEventAttendance  } from "../../../api/EventsAPI";
import EventImage from "./EventImage";
import AttendanceSelection from "./AttendanceSelection";
import EventDetails from "./EventDetails";
import CollapsedCardContent from "./CollapsedCardContent"
import { useSelector } from "react-redux";
import { changeEventAttendance, deleteEvent, setEventAttendance } from "../../../api/EventsAPI";


const EventCard = styled(Card)({
    margin: '20px 0 30px',
    padding: '20px 10px 20px 20px'
});
const ExpandedContent = styled(Grid)({
    flex: 2, 
    borderRight: '1px solid lightgray', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between'
});

const EventPost = ({ event, index, currentUser, pastEvent, onChange, admin, onDashboard, club_id, club_name }) => {
    const user = useSelector((state) => state.user);
    const guest = useSelector((state) => state.guest);
    const [attendance, setAttendance] = useState([]);
    const [status, setStatus] = useState(null);
    const [expanded, setExpanded] = useState(null);

    React.useEffect(() => {

        if(guest.guestMode &&  guest.attendance?.[club_id]?.[event.id]){
            setAttendance(guest.attendance?.[club_id]?.[event.id]);

            let guestStatus = guest?.attendance?.[club_id]?.[event.id];
            if (Array.isArray(guestStatus)) {
                guestStatus = guestStatus.find(participant => participant.uid === "G")?.status;
                setStatus(guestStatus);
            }
        } else if (user) {
            fetchEventAttendance(event).then((res) => {
                if(user.loggedIn){
                    let userStatus = res.find((member) => member.uid === user.uid);
                    setStatus(userStatus?.status);
                    setAttendance(res);
                }
            });
        };
    }, [event.id])

    React.useEffect(() => {
        if (guest.guestMode && guest.attendance?.[club_id]?.[event.id]) {
            setAttendance(guest.attendance?.[club_id]?.[event.id]);

            let guestStatus = guest?.attendance?.[club_id]?.[event.id];
            if (Array.isArray(guestStatus)) {
                guestStatus = guestStatus.find(participant => participant.uid === "G")?.status;
                setStatus(guestStatus);
            }
        }
    }, [guest.attendance[club_id]?.[event.id]])


    const handleExpandClick = (clickedIndex) => {
        if (expanded === clickedIndex) {
            setExpanded(null)
        } else {
            setExpanded(clickedIndex)
        }
    };

    const handleAttendanceStatusChange = (updatedStatus) => {
        console.log(updatedStatus)
        setStatus(updatedStatus);
        if(user.loggedIn){
            if (status) {
                changeEventAttendance(event, user.uid, updatedStatus);
            } else {
                setEventAttendance(event, user.uid, user.displayName, updatedStatus);
            }
            fetchEventAttendance(event);
        };
        const updatedAttendance = attendance.map(item => (
            item.uid === user.uid ? { ...item, status: updatedStatus } : item
        ));
        setAttendance(updatedAttendance);
    };

    return (
        <EventCard>
            <Grid style={{ display: 'flex'}}>
                <Grid sx={3} style={{flex: 1}}>
                    <EventImage 
                        image={event.placeholder_photo} 
                        skeletonWidth={280} 
                        skeletonHeight={180} />
                </Grid>
                <ExpandedContent>
                    <EventDetails 
                        event={event}
                        club_name={club_name}
                        club_id={club_id}
                        admin={admin}
                        onDashboard={onDashboard}
                        onChange={onChange}
                        expanded={expanded}
                        index={index}
                        handleExpandClick={handleExpandClick}  
                    />
                </ExpandedContent>
                <AttendanceSelection 
                    event={event} 
                    attendance={attendance}
                    status={status}
                    onChange={handleAttendanceStatusChange}
                    club_id={club_id}
                    isPastEvent={pastEvent}
                    currentUser={currentUser}
                    
                />
            </Grid>
            <CollapsedCardContent 
                index={index}
                expanded={expanded}
                event={event} 
                attendance={attendance} />
        </EventCard>
    )
}

export default EventPost;



