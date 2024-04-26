import React from "react";
import { styled } from "@mui/system";
import { Grid, Button, Card, Typography, CardActions, CardContent, CardMedia } from "@mui/material";

import academic from '../../images/club-images/academic.jpg'
import business from '../../images/club-images/business.jpg'
import charity from '../../images/club-images/charity.jpg'
import creativeArt from '../../images/club-images/creative_art.jpg'
import cultural from '../../images/club-images/cultural.jpg'
import environmental from '../../images/club-images/environmental.jpg'
import games from '../../images/club-images/games.jpg'
import health from '../../images/club-images/health.jpg'
import media from '../../images/club-images/media.jpg'
import politicsSocialAwareness from '../../images/club-images/politics_social_awareness.jpg'
import religious from '../../images/club-images/religious.jpg'

import LeaveClubModal from "../../modals/LeaveClubModal";
import { apiLeaveClub } from "../../api/ClubsAPI";
import { textTruncate } from "../../utils";
import { useNavigate } from "react-router";
import { removeGuestClubs } from "global/actions";
import { useDispatch } from "react-redux";

const StyledCard = styled(Card)({
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    maxWidth: 600,
});
const StyledCardActions = styled(CardActions)({
    display:'flex', 
    justifyContent:'space-between'
});
const StyledCardMedia = styled(CardMedia)({
    height: "125px"
});

const CustomText = styled(Typography)(({ status }) => {
    let background;
  
    if (status === 'owner') {
      background = 'rgba(149, 0, 204, 0.1)';
    } else if (status === 'admin') {
      background = 'rgba(255, 104, 104, 0.1)';
    } else if (status === 'user' || status === 'member') {
      background = 'rgba(136, 191, 255, 0.1)';
    } else {
      // Default background if status is not owner, admin, or user
      background = 'transparent';
    }
  
    return {
      padding: '5px 15px',
      marginBottom:'10px',
      borderRadius: '20px',
      background: background,
      width: 'fit-content',
      fontSize: '9pt'
    };
  });



const MyClubCard = ({ user, guest, clubs, onChange }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleClick = (clubId, clubName) => {
        if(guest && guest.guestMode) {
           dispatch(removeGuestClubs(clubId));
        } else {
            let data = {
                clubId: clubId,
                userId: user.uid,
                clubName:clubName
            }
            apiLeaveClub(data).then(() => {
                onChange();
            });
        }
        setLeaveClubsModalOpen(false);
        
        // toastNotification(`"Your request to leave ${clubName} was successful"`);
    };

    function getClubCategory(club) {
        const category = club.categories.split(',')[0]
        if(category == 'academic') {
            return academic 
        }
        else if (category == "business-and-entrepreneurial") {
            return business
        }
        else if (category == "charitable-community-service-international-development") {
            return charity
        }
        else if(category == "creative-arts-dance-and-music") {
            return creativeArt
        }
        else if(category == "cultural") {
            return cultural
        }
        else if(category == "environmental-and-sustainability") {
            return environmental
        }
        else if(category == "games-recreational-and-social") {
            return games
        }
        else if(category == "health-promotion") {
            return health
        }
        else if(category == "media-publications-and-web-development") {
            return media
        }
        else if(category == "political-and-social-awareness") {
            return politicsSocialAwareness
        }
        else if(category == "religious-and-spiritual") {
            return religious
        }
    }

    const [leaveClubsModalOpen, setLeaveClubsModalOpen] = React.useState(false);
    const[leaveClub, setLeaveClub] = React.useState({});

    const handleLeaveClub = (id, name) => {
        let data = {id:id, name:name};
        setLeaveClub(data);
        setLeaveClubsModalOpen(true);
    }

    return (
        <Grid container spacing={2}>
            {clubs.map((club, index) => (
                <Grid item xs={6} sm={6} med={6} key={index}>
                    <StyledCard variant="outlined">
                        <StyledCardMedia image = {getClubCategory(club)} />
                        <CardContent>
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                <Typography variant='h6'>{club.name}</Typography>
                                {guest.guestMode &&
                                    <CustomText status={guest.memberType?.[club.id]}>{guest.memberType?.[club.id]}</CustomText>
                                }
                            </div>
                            <Typography style={{ fontSize: '0.8rem' }}>{textTruncate(club.description)}</Typography>
                        </CardContent>
                        <StyledCardActions>
                            <Button 
                                style={{ border: '1.5px solid' }} 
                                onClick={() => {navigate(`/clubboard/${club.id}`); window.scrollTo(0, 0)}} 
                                color='primary' 
                                variant='outlined'
                            >
                                View Board
                            </Button>
                            <Button 
                                style={{ border: '1.5px solid' }} 
                                onClick={() =>{handleLeaveClub(club.id, club.name)}} 
                                color='secondary' 
                                variant='outlined'
                            >
                                Leave Club
                            </Button>
                            <LeaveClubModal 
                                key={club.id} 
                                clubData={leaveClub} 
                                open={leaveClubsModalOpen} 
                                onClose={() => setLeaveClubsModalOpen(false)} 
                                onSubmit={()=> handleClick(leaveClub.id, user.uid, leaveClub.name)}
                            />
                        </StyledCardActions>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    )

}

export default MyClubCard;
