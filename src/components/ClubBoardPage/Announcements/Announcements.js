import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system"
import { Grid, Typography, CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';
import { fetchClubAnnouncements } from 'api/AnnouncementsAPI';
import { fetchUserClubRole } from 'api/ClubsAPI';
import AnnouncementPost from './AnnouncementPost';
import AnnouncementForm from 'forms/AnnouncementForm';
import { useSelector } from 'react-redux';
import NoResults from 'images/no-results1.svg';


const Wrapper = styled(Grid)({
    background:'#f5f5f5',
    minHeight:'100vh',
    paddingBottom:'50px',
    height:'100%'
})
const Img = styled('img')({
    height:'270px',
})
const AnnouncementGrid = styled(Grid)({
    padding:'0 0 0 50px', 
    flex: 4
})
const NoAnnouncementWrapper = styled(Grid)({
    display:'flex', 
    justifyContent:'center', 
    paddingTop:'50px', 
    width:'100%'
});
const NoAnnouncementGrid = styled(Grid)({
    borderRadius:'5px', 
    alignItems:'center', 
    display:'flex', 
    flexDirection:'column', 
});
const NoAnnouncementMsg = styled(Typography)({
    letterSpacing:'1px',
    fontSize:'3em', 
    fontWeight:'bolder',
    color:'rgb(230,104,33)',
    fontFamily:'Shrikhand, sans-serif',
    position: 'relative',
    bottom:'24px',
    fontFamily:'Lilita One, sans-serif',
});
const AddAnnouncementGrid = styled(Grid)({
    display:'flex', 
    justifyContent:'center', 
    margin:'25px 50px 0 50px', 
    flex: 1
});

const Announcements = ({ clubTitle }) => {
    const guest = useSelector((state) => state.guest);
    const user = useSelector((state) => state.user.uid);
    const { clubID } = useParams();
    

    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = React.useState(true);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        getAnnouncements()
        if(guest.guestMode){
            if (guest.memberType[clubID] !== 'member'){
                setAdmin(true);
            }
        } else {
            fetchUserClubRole(clubID, user).then((res) => {
                setAdmin(res);
            });
        }
    },[])

    const getAnnouncements = async () => {
        if (guest.guestMode && guest.announcements[clubID]) {
            setAnnouncements(guest.announcements[clubID]);
            setLoading(false);
        } else {
            fetchClubAnnouncements(clubID).then((announcements) => {
                setAnnouncements(announcements);
            })
            setLoading(false);
        }
    };

    useEffect(() => {
        if (guest.guestMode){
            let sorted = guest.announcements[clubID].sort((a, b) => b.time_posted.localeCompare(a.time_posted));
            setAnnouncements(sorted);
        }
    }, [guest.announcements[clubID]]);

    if (loading === true) {
        return (
          <div align="center">
            <CircularProgress />
          </div>
        )
    }

    return(
        <Wrapper>
            <Grid style={{display:'flex'}}>
                {(announcements && announcements.length > 0) ?
                <AnnouncementGrid>
                    {Object.values(announcements).map((announcement) =>
                        <AnnouncementPost 
                            key={announcement.id}
                            club_id={clubID}
                            style={{flex: 1}} 
                            onDashboard={false} 
                            admin={admin} 
                            announcement={announcement} 
                            onChange={getAnnouncements} />
                    )}
                </AnnouncementGrid>
                :
                <NoAnnouncementWrapper>
                    <NoAnnouncementGrid>
                        <Img src={NoResults} />
                        <NoAnnouncementMsg>No announcements yet!</NoAnnouncementMsg>
                    </NoAnnouncementGrid>
                </NoAnnouncementWrapper>
                }
                <AddAnnouncementGrid>
                    {admin && <AnnouncementForm clubTitle={clubTitle} guest={guest} clubID={clubID} onSubmit={getAnnouncements} />}
                </AddAnnouncementGrid>
            </Grid>
        </Wrapper>
    )
}

export default Announcements;
