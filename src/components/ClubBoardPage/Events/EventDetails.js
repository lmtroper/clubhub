import { useState } from 'react'
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Menu, MenuItem, IconButton } from "@mui/material"
import { Group, Delete, MoreVert, ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteEventDialog from './DeleteEventDialog';
import { deleteEvent } from '../../../api/EventsAPI';
import { styled } from "@mui/system"
import { useSelector } from 'react-redux';

const Header = styled(Typography)({
    padding: '5px 30px', 
    fontSize: '18pt', 
    fontWeight: 600
})
const Body = styled(Typography)({
    padding: '5px 30px', 
    fontSize: '10pt', 
    fontWeight: 400
})

const EventDetails = ({ handleExpandClick, index, expanded, event, club_name, club_id, admin, onDashboard, onChange }) => {
    const guest = useSelector((state) => state.guest);
    const [deleteEventModal, setDeleteEventModal] = useState(false);

    const handleDelete = () => {
        deleteEvent(event);
        onChange();
    }
    
    let allDayTime = event.start_time_text.split(' ');
    allDayTime = allDayTime[0] + ' ' + allDayTime[1] + ' ' + allDayTime[2] + ' ' + allDayTime[3]
    
    return (
    <>
        <Grid>
            {onDashboard &&
                <Grid style={{ padding: '0 0px 10px 20px' }}>
                    <Link to={"/clubboard/" + club_id} style={{ textDecoration: 'none' }} onClick={() => { window.scrollTo(0, 0) }}>
                        <Typography color='primary' style={{ display:'flex', justify: "space-between", fontFamily: 'Arvo, serif' }}>
                            <Group style={{ marginRight: '3px' }} /> {club_name}
                        </Typography>
                    </Link>
                </Grid>}
            <Grid style={{ display: 'flex', padding: '0 10px 0 30px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color='secondary' style={{ fontFamily: "system-ui", letterSpacing: '1.1px', fontSize: '11pt', fontWeight: 400 }}>
                    {event.allDay ? <>{allDayTime}</> : <>{event.start_time_text}</>}
                </Typography>
                {(admin || (guest.clubMemberships[club_id] !== 'member')) && <>
                    <LongMenu guest={guest} deleteEvent={() => setDeleteEventModal(true)} />
                    <DeleteEventDialog open={deleteEventModal} close={() => { setDeleteEventModal(false) }} onSubmit={handleDelete} title={event.title} /> </>}
            </Grid>
            <Header>{event.title}</Header>
            <Body>{event.body}</Body>
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'end', padding: '0 30px' }}>
            <Button onClick={() => { handleExpandClick(index) }} style={{ textTransform: 'none', margin: '5px 0' }}>
                <b style={{ color: 'rgba(0, 0, 0, 0.54)', letterSpacing: '0.5px', fontSize: '9.5pt' }}>
                    {expanded === null && <>MORE</>}{expanded !== null && <>LESS</>} DETAILS
                </b>
                {expanded === null && <ExpandMore color="action" />}
                {expanded !== null && <ExpandLess color="action" />}
            </Button>
        </Grid>
    </>
    )
}

export default EventDetails

const ITEM_HEIGHT = 48;

const LongMenu = ({ guest, deleteEvent }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem disabled={guest.guestMode} onClick={() => { deleteEvent(); handleClose(); }} >
                    <Delete onClick={() => { deleteEvent(); handleClose(); }} style={{ marginRight: '5px' }} /> Delete Event
                </MenuItem>
            </Menu>
        </div>
    );
}
