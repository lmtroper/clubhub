import React from 'react'
import { Dialog, Grid, IconButton, Typography, ButtonGroup, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from "@mui/system";
import ButtonListItem from './ButtonListItem';

const ActiveButton = styled(Button)(({ isActive }) => ({
    background: isActive ? 'rgba(63, 81, 181, 0.3)' : 'inherit',
    "&:hover": {
        background: isActive ? 'rgba(63, 81, 181, 0.3)' : 'rgba(63, 81, 181, 0.1)'
    },
}));


const EventAttendanceModal = ({ open, close, going, notGoing, maybe }) => {
    const [activeBtn, setActiveBtn] = React.useState('1');

    const handleClick = (e) => {
        setActiveBtn(e.currentTarget.value);
    };


    if (!open) return null
    return (
        <>
            <Dialog open={open} close={close}>
                <Grid style={{ width: '400px' }}>
                    <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                        <IconButton onClick={close}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid style={{ padding: '0 20px 20px' }}>
                        <Grid style={{ textAlign: 'center', margin: '-25px 0 10px 0' }}>
                            <Typography>Event Attendance List</Typography>
                        </Grid>
                        <Grid>
                            <ButtonGroup fullWidth value={activeBtn}>
                                <ActiveButton
                                    isActive={activeBtn === '1'}
                                    value="1"
                                    onClick={handleClick}
                                    style={{ padding: '10px 0', borderBottomLeftRadius: 0 }}>
                                    Going
                                </ActiveButton>
                                <ActiveButton isActive={activeBtn === '2'} onClick={handleClick}  value="2">
                                    Maybe
                                </ActiveButton>
                                <ActiveButton isActive={activeBtn === '3'} onClick={handleClick}  value="3" style={{ borderBottomRightRadius: 0 }}>
                                    Not Going
                                </ActiveButton>
                            </ButtonGroup>
                        </Grid>
                        {activeBtn === '1' && <ButtonListItem list={going} emptyMessage={"No members declared they are going"} />}
                        {activeBtn === '2' && <ButtonListItem list={maybe} emptyMessage={"No members declared they might be going"} />}
                        {activeBtn === '3' && <ButtonListItem list={notGoing} emptyMessage={"No members declared they are not attending"} />}
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )

}

export default EventAttendanceModal
