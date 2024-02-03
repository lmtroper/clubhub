import React from 'react'
import { Grid, Typography } from '@mui/material'
import AnnouncementPost from '../ClubBoardPage/Announcements/AnnouncementPost'
import AnnouncementsHeader from './AnnouncementsHeader'
import { styled } from '@mui/system';

const StyledGrid = styled(Grid)({
    listStyle: 'none',
    paddingBottom: '50px'
});

const DashboardAnnouncements = ({ admin, clubs, announcements, filteredAnnouncements, selectedClubAnnouncements }) => {
    return (
    <>
    <AnnouncementsHeader />
    <StyledGrid item xs={12}>
      {(filteredAnnouncements.length !== 0) ?
        filteredAnnouncements.map((announcement, index) =>
          <AnnouncementPost
            key={index}
            admin={true}
            announcement={announcement}
            name={announcement.name}
            onDashboard={true}
            club_id={announcement.club_id}
          />
        ) :
        clubs.length >= 1 && filteredAnnouncements.length === 0 && selectedClubAnnouncements ? <Typography variant="h6" style={{ marginTop: "20px" }}>This club has no recent announcements.</Typography> :
          clubs.length >= 1 && announcements.length === 0 && <Typography variant="h6" style={{ marginTop: "20px" }}>You have no recent announcements.</Typography>
      }
    </StyledGrid>
    </>
  )
}

export default DashboardAnnouncements
