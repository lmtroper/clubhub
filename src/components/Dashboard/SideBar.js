import React from 'react';
import { styled } from "@mui/system";
import { Box, Drawer, Grid, Toolbar, Typography, Tooltip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {CalendarMonth, Campaign } from '@mui/icons-material';

import MyClubs from './MyClubs';

const StyledDrawer = styled(Drawer)({
  zIndex: 0,
  maxWidth: "250px",
  flexShrink: 0,
  minWidth: '244px'
});
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ alignment }) => ({
  color: alignment === 'left' ? '#6072C7' : 'transparent'
}));
const Title = styled(Typography)({
  fontFamily: 'Biryani, sans-serif',
  fontWeight: 600,
  marginTop: "25px",
});
const StyledBox = styled(Box)({
  overflow: 'auto',
  maxWidth: '250px', 
  textAlign: 'center'
});
const StyledGrid = styled(Grid)({
  zIndex: '100' 
});
const StyledText = styled(Typography)({
  maxWidth: "225px", 
  paddingTop: '10px'
});

const SideBar = ({ userClubs, setSelectedClubAnnouncements, setSelectedClubEvents }) => {
    const [alignment, setAlignment] = React.useState('left')

    const handleAlignment = (event, value) => {
      setAlignment(value);
    };

    const viewAllAnnouncements = () => {
      setSelectedClubAnnouncements('');
      setSelectedClubEvents(false);
    }
  
    const viewAllEvents = () => {
      setSelectedClubAnnouncements('');
      setSelectedClubEvents('');
    }
  
    return (
      <StyledGrid item xs={3}>
        <StyledDrawer variant="permanent">
          <Toolbar />
          <StyledBox>
            <Title variant="h6">Club Dashboard</Title>
            {userClubs.length > 0 &&
              <StyledToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              alignment={alignment}
              >
                <Tooltip title="View all club announcements">
                    <ToggleButton
                        value="left"
                        onClick={viewAllAnnouncements}
                        alignment={alignment}
                        style={{background: alignment === 'left' ? '#6072C7' : '',
                        color: alignment === 'left' ? 'white' : ''}}
                    >       
                        <Campaign fontSize="small" />             
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="View all club events">
                    <ToggleButton
                        value="right"
                        onClick={viewAllEvents}
                        alignment={alignment}
                        style={{background: alignment === 'right' ? '#ee9d79' : '',
                        color: alignment === 'right' ? 'white' : ''}}
                    >
                        <CalendarMonth fontSize="small"/>
                    </ToggleButton>
                </Tooltip>
                
              </StyledToggleButtonGroup>
            }
            {userClubs.map((text, index) => (
              <MyClubs
                key={index}
                myClubs={userClubs}
                setClubAnnouncementSelected={setSelectedClubAnnouncements}
                setClubEventSelected={setSelectedClubEvents}
                text={text}
                setAlignment={setAlignment}
              />
            ))}
            {userClubs.length === 0 &&
              <StyledText>You haven't joined any clubs yet. Check out the explore page to get started!</StyledText>
            }
          </StyledBox>
        </StyledDrawer>
      </StyledGrid>
    )
}
export default SideBar;
