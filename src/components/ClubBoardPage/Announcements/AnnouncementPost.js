import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Group, Edit, Delete, MoreVert } from '@mui/icons-material';
import { IconButton, Grid, InputLabel, Box, Typography, Card, Menu, MenuItem } from "@mui/material";
// import publicIcon from '@images/public-icon.png';
// import privateIcon from '@images/private-icon.png';
import lock from 'images/lock-icon.png';
// import caution from '@images/caution-icon.png';
import { Link } from 'react-router-dom';
import AnnouncementImage from './AnnouncementImage';
import EditAnnouncementModal from 'modals/EditAnnouncementModal';
import DeleteAnnouncementModal from 'modals/DeleteAnnouncementModal';
import { 
    callApiDeleteAnnouncement as deleteAnnouncement,
    callApiEditAnnouncement as editAnnouncement
 } from 'api/AnnouncementsAPI';
import { toastNotification } from '../../../utils';
import AnnouncementPostContent from './AnnouncementPostContent';
import { useDispatch, useSelector } from 'react-redux';
import { timestamp, datetimeTextFormat } from 'utils';
import { guestDeleteAnnouncement, guestEditAnnouncement } from 'global/actions';

const DashboardCard = styled(Card)(({ onDashboard }) => ({
    border: onDashboard ? '1px #D8D8D8 solid' : 'none',
    maxHeight: '400px',
    boxShadow: 'none',
    margin: '25px 0 0',
    borderRadius: '10px',
    background: 'none'
}));  
const MenuWrapper = styled(Grid)({
    background: 'rgba(218, 224, 238, 0.8)', 
    display: 'flex', 
    justifyContent: 'end'
});

export default function AnnouncementPost({ admin, club_id, announcement, onChange, onDashboard }) {
    const guest = useSelector((state) => state.guest);
    const dispatch = useDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    
    const handleDeleteClick = () => {
        if(guest.guestMode){
            dispatch(guestDeleteAnnouncement(club_id, announcement.id));
        } else {
            deleteAnnouncement(announcement.id).then(res => { onChange() })
        }
        setDeleteModalOpen(false);
    }

    const handleEditClick = (data) => {
        if (guest.guestMode){
            data.clubID = club_id;
            data.time_posted = timestamp();
            data.time_posted_text = datetimeTextFormat();
            data.visibility = data.access;
            data.placeholder_photo = parseInt(data.placeholderImage);
            data.guest = true;
            data.id = announcement.id;
            data.body = data.content;
            dispatch(guestEditAnnouncement(club_id, data));
        } else {
            editAnnouncement(announcement.id, data).then(res => {
                toastNotification("Success: Announcement post was edited.");
                onChange(); 
            });
        }
        setEditModalOpen(false);
    }
    
    let radiobtnVal;
    if (announcement.visibility === 'public'){
        radiobtnVal = '1';
    } else {
        radiobtnVal = '2';
    }

    return (<>
        {((announcement.visibility === 'private' && admin) || (announcement.visibility === 'public')) &&
            <DashboardCard onDashboard={onDashboard} >
                {(admin && onDashboard === false) &&
                    <MenuWrapper>
                        <LongMenu 
                            guest={guest}
                            announcement={announcement}
                            onDelete={() => { setDeleteModalOpen(true) }} 
                            onEdit={() => setEditModalOpen(true)} />
                        <DeleteAnnouncementModal 
                            open={deleteModalOpen} 
                            close={() => setDeleteModalOpen(false)} 
                            title={announcement.title} 
                            body={announcement.body} 
                            handleDelete={handleDeleteClick} />
                        <EditAnnouncementModal
                            open={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            onEdit={handleEditClick}
                            a_title={announcement.title}
                            a_content={announcement.body}
                            a_radiobtn={radiobtnVal}
                            image={announcement.placeholder_photo.toString()}
                        />
                    </MenuWrapper>}
                <AnnouncementPostContent club_id={club_id} onDashboard={onDashboard} announcement={announcement} />
            </DashboardCard>}
    </>)
}

const ITEM_HEIGHT = 48;

const LongMenu = ({ guest, onDelete, onEdit, announcement }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
                <MenuItem disabled={(guest.guestMode && !announcement.guest) ? true : false} onClick={() => { onEdit(); handleClose(); }}>
                    <Edit onClick={onEdit} style={{ marginRight: '5px' }} /> Edit Post
                </MenuItem>
                <MenuItem disabled={(guest.guestMode && !announcement.guest) ? true : false} onClick={() => { onDelete(); handleClose(); }}>
                    <Delete style={{ marginRight: '5px' }} /> Delete Post
                </MenuItem>
            </Menu>
        </div>
    );
}




