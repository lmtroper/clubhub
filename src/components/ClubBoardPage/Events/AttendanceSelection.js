import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Typography, Grid, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { guestUpdateAttendance } from 'global/actions';

const HiddenBtn = styled(Button)({
    display:'none',
})

const StyledButton = styled(Button)(({ status }) => ({
    fontSize: '10.5pt',
    width: '130px', 
    textTransform: 'none', 
    margin: '5px', 
    borderRadius: '20px',
    backgroundColor: status ? 'rgb(63, 81, 181)' : 'none',
    border: !status ? 'lightgrey 1px solid' : 'none',
    '&:hover': {
        transition:'none',
        padding: status ? '4px' : '5px',
        textTransform: 'none',
        background: status ? '#495CC7' : 'none',
    },
    color: status ? 'white !important' : 'grey',
}));

const StyledPastButton = styled(Button)(({ status }) => ({
    fontSize: '10.5pt',
    width: '130px', 
    textTransform: 'none', 
    margin: '5px', 
    borderRadius: '20px',
    backgroundColor: status ? '#808080' : 'none',
    border: status ? '1px solid #808080' : 'lightgrey 1px solid',
    '&:hover': {
        
        background: status ? '#495CC7' : 'none',
    },
    color: status ? 'white !important' : 'grey',
    display: status ? 'flex' : 'none',
}));


const AttendanceSelection = ({ status, event, isPastEvent, onChange }) => {
    const guest = useSelector((state) => state.guest);
    const dispatch = useDispatch();

    const handleEvent = (e) => {
        if (guest.guestMode) {
            dispatch(guestUpdateAttendance(event.club_id, event.id, e.currentTarget.value));
        } else {
            onChange(e.currentTarget.value);
        }
    }

    return (
        <Grid style={{ paddingLeft: '10px', marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'space-between' }}>
            <Grid style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <Typography style={{ display: 'flex', paddingLeft: '10px', paddingBottom: '6px', fontSize: '10.5pt', color: 'grey' }}>
                    {!isPastEvent && <>{(status) ? <>Your status:</> : <>Set your status:</>}</>}
                </Typography>
                {!isPastEvent && <>
                    <StyledButton
                        value={"going"}
                        disabled={isPastEvent}
                        onClick={handleEvent}
                        variant='outlined'
                        status={status === 'going'}
                        color='primary'>
                        Attending{!status && <>?</>}
                    </StyledButton>
                    <StyledButton 
                        value={"maybe"}
                        disabled={isPastEvent}
                        status={status === 'maybe'}
                        onClick={handleEvent} 
                        variant='outlined' 
                        color='primary'>
                        Might Attend{!status && <>?</>}
                    </StyledButton>
                    <StyledButton 
                        value={"not going"}
                        disabled={isPastEvent}
                        status={status === 'not going'}
                        onClick={handleEvent} 
                        variant='outlined' 
                        color='primary'>
                        Not Attending{!status && <>?</>}
                    </StyledButton> </>}
                {isPastEvent && <>
                    <StyledPastButton
                        disabled
                        variant='outlined'
                        status={status === 'going'}
                        color='primary'>
                        Attended
                    </StyledPastButton>
                    <StyledPastButton
                        disabled
                        variant='outlined'
                        status={status !== 'going'}
                        color='primary'>
                        Did not attend
                    </StyledPastButton>
                </>}
            </Grid>
        </Grid>
    )
}

export default AttendanceSelection
