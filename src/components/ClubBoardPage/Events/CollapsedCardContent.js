import React from 'react'
import { Collapse, Grid, CardContent, Typography } from '@mui/material'
import EventAttendanceList from './EventAttendanceList'
import { styled } from "@mui/system"

const DetailsHeader = styled(Typography)({
    color: '#808080',
    fontSize: '10.5pt',
    paddingBottom: '2.5px'
});


const CollapsedCardContent = ({ index, expanded, event, attendance }) => {
    let startTimeText = event.start_time_text.split(' ');
    let start_date = startTimeText[1] + ' ' + startTimeText[2]
    let start_time = ''

    if (event.allDay === "0") {
        start_time = startTimeText[4] + ' ' + startTimeText[5]
    } else {
        start_date = start_date + ' ' + startTimeText[3]
    }

    let endTimeText = ''
    let end_date = ''
    let end_time = ''
    if (event.end_time_text) {
        endTimeText = event.end_time_text.split(' ');
        end_date = endTimeText[1] + ' ' + endTimeText[2]
        end_time = endTimeText[4] + ' ' + endTimeText[5]
    }
    return (
    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
    <CardContent style={{ borderTop: '1px solid lightgrey', marginTop: '20px' }}>
        <Grid style={{ display: 'flex' }}>
            <Grid xs={4} style={{ paddingRight: '15px', flex: 1}}>
                <DetailsHeader>Additional Event Info</DetailsHeader>
                <Typography paragraph>{event.additional_details}</Typography>
            </Grid>
            <Grid xs={4} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 15px', borderLeft: '1px lightgrey solid', borderRight: '1px lightgrey solid' }}>
                <Grid style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <Grid style={{ display: 'flex', flexDirection: 'column', margin: '0 0 0 10px' }}>
                        <DetailsHeader>Start Date/Time</DetailsHeader>
                        <Typography>{start_date}</Typography>
                        <Typography>{start_time}</Typography>
                    </Grid>
                    {(event.end_time_text && event.allDay == '0') &&
                        <Grid style={{ display: 'flex', paddingLeft: '20px', flexDirection: 'column', borderLeft: '1px solid lightgrey', margin: '0 0px 0 10px' }}>
                            <DetailsHeader>End Date/Time</DetailsHeader>
                            <Typography>{end_date}</Typography>
                            <Typography>{end_time}</Typography>

                        </Grid>}
                </Grid>
                <Grid style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginBottom: '15px' }}>
                    <DetailsHeader>Type of Event</DetailsHeader>
                    <Grid style={{ display: 'flex' }}>
                        {event.location_type === 'online' &&
                            <Typography style={{ fontSize: '11pt', borderRadius: '14px', background: '#FF6B6B', padding: '5px 10px', marginRight: '5px', color: 'white' }}>Online</Typography>}
                        {event.location_type === 'in-person' &&
                            <Typography style={{ fontSize: '11pt', borderRadius: '14px', background: '#7A86CC', padding: '5px 10px', marginRight: '5px', color: 'white' }}>In-person</Typography>}
                        {event.allDay == 1 &&
                            <Typography style={{ fontSize: '11pt', borderRadius: '14px', background: '#5FB49C', padding: '5px 10px', color: 'white', marginRight: '5px' }}>All Day</Typography>}
                    </Grid>
                </Grid>
                <Grid style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginBottom: '15px' }}>
                    <DetailsHeader>Location</DetailsHeader>
                    {event.location_type === 'online' &&
                        <Typography>
                            <a target="blank" href={'http://' + event.location}>
                                {event.location}
                            </a>
                        </Typography>}
                    {event.location_type === 'in-person' &&
                        <Typography style={{ fontSize: '11pt' }}>{event.location}</Typography>}
                </Grid>
                {event.price &&
                    <Grid style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        <DetailsHeader>Price</DetailsHeader>
                        <Typography style={{ fontSize: '11pt' }}>${event.price}</Typography>
                    </Grid>}
            </Grid>
            <EventAttendanceList attendance={attendance} />
        </Grid>
    </CardContent>
</Collapse>
  )
}

export default CollapsedCardContent
