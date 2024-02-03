import React from 'react'
import { Grid, Typography } from '@mui/material'
import EventPost from '../ClubBoardPage/Events/EventPost'
import EventsHeader from './EventsHeader'
import { styled } from '@mui/system';

const StyledGrid = styled(Grid)({
    listStyle: 'none',
    paddingBottom: '50px'
});
const StyledText = styled(Typography)({
    marginTop: "20px"
});

const DashboardEvents = ({user, clubs, events, filteredEvents, fetchUserUpcomingEvents, selectedClubEvents }) => {
  return (
    <React.Fragment>
        <Grid item xs={12}>
            <EventsHeader />
        </Grid>
        <StyledGrid xs={12}>
            {filteredEvents.length !== 0 ? filteredEvents.map((event, index) =>
                <EventPost
                    event={event}
                    admin={false}
                    index={index}
                    currentUser={user}
                    pastEvent={false}
                    onChange={fetchUserUpcomingEvents}
                    onDashboard={true}
                    club_name={event.name}
                    club_id={event.club_id}
                />
            ) :
            clubs.length > 0 && filteredEvents.length === 0 && selectedClubEvents ? 
                <StyledText variant="h6">
                    This club has no upcoming events.
                </StyledText> 
            :
            clubs.length > 0 && events.length === 0 && 
                <StyledText variant="h6">
                    You have no upcoming events.
                </StyledText>
            }
        </StyledGrid>
    </React.Fragment>
  )
}

export default DashboardEvents;
