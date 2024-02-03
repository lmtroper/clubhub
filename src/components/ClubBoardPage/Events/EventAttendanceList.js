import { useState }  from 'react'
import { styled } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material"
import { People } from "@mui/icons-material";
import AvatarGroupList from './AvatarGroupList';
import EventAttendanceModal from './EventAttendanceModal'; 

const DetailsHeader = styled(Typography)({
    color: '#808080',
    fontSize: '10.5pt',
    paddingBottom: '2.5px'
});

const EventAttendanceList = ({ attendance }) => {
    // console.log('attendance')
    // console.log(attendance)
    const [attendanceModal, setAttendanceModal] = useState(false);
    const attending = attendance.filter((member) => member.status === 'going');
    const maybeAttending = attendance.filter((member) => member.status === 'maybe');
    const notAttending = attendance.filter((member) => member.status === 'not going');

    return (
        <Grid xs={4} style={{ flex: 1, padding: '0 15px', display: 'flex', flexDirection: 'column' }}>
            <Grid style={{ display: 'flex' }}>
                <People color="action" />
                <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', padding: '0 0 10px 10px' }}>{attendance.length} member{attendance.length != 1 && <>s</>} responded</Typography>
            </Grid>
            {attending.length > 0 &&
                <Grid>
                    <DetailsHeader>Going</DetailsHeader>
                    <AvatarGroupList list={attending} />
                </Grid>}
            {maybeAttending.length > 0 &&
                <Grid>
                    <DetailsHeader>Maybe</DetailsHeader>
                    <AvatarGroupList list={maybeAttending} />
                </Grid>}
            {notAttending.length > 0 &&
                <Grid>
                    <DetailsHeader>Not Going</DetailsHeader>
                    <AvatarGroupList list={notAttending} />
                </Grid>}
            {attendance.length > 0 && <>
                <Button variant="outlined" color="primary" style={{ textTransform: 'none', margin: '20px 0' }} onClick={() => { setAttendanceModal(true) }}>See Attendance List</Button>
                <EventAttendanceModal open={attendanceModal} close={() => { setAttendanceModal(false) }} going={attending} maybe={maybeAttending} notGoing={notAttending} />
            </>}
        </Grid>
    )
}

export default EventAttendanceList
