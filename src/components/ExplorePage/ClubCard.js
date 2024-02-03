import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Grid, Button, Card, Typography } from "@mui/material";
import history from '../Navigation/history';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useUser, useAuthHeader } from '../../authentication/context';
import { serverURL } from '../../constants/config'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { callApiJoinClub, fetchClubDetails } from "api/ClubsAPI";
import { addGuestClubs } from "global/actions";


const ListItem = styled('li')({
    listStyle: 'none'
});

const StyledBtn = styled(Button)({
    border: '1.5px solid',
});

const ExploreBtnGrid = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    outline: '0.8px'
});

const StyledCard = styled(Card)({
    height: '125px',
    margin: '0 0 20px 0',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
});

const ClubCard = ({ club, isMember, guest, onJoin }) => {
    const user = useSelector((state) => state.user.uid);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const truncate = (input) => {
        if (input.length > 100) {
            return input.substring(0, 200) + '...';
        }
        return input;
    };

    const notify = () => {
        toast.configure();
        toast.success("Success: Club was joined.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
        return;
    }

    // Non-users will be redirected to sign in when trying to join a club 
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const authHeader = useAuthHeader()
    const [unfufilledJoin, setUnFulfilledJoin] = React.useState('');

    const logIn = async(clubID) => {
        const result = await signInWithGoogle();
        if (!result) {
            return
        }
        const request = {
            method: 'PUT',
            headers: {
                ...authHeader(),
            }
        }
        const response = await fetch(serverURL.concat('api/login'), request)
    }

    const handleJoinClub = (clubID) => {
        if (user) {
            setUnFulfilledJoin('');
            callApiJoinClub(user, clubID).then(()=>{
                onJoin();
            });
        } else if (guest.guestMode) {
            fetchClubDetails(clubID).then((club) => {
                dispatch(addGuestClubs(club.id, club));
            });
        } else {
            logIn(clubID);
            setUnFulfilledJoin(clubID);
        }
    }
    useEffect(() => {
        if (unfufilledJoin) {
            handleJoinClub(unfufilledJoin);
        }
    }, [user])

    return ( 
        <ListItem key={club.id} >
            <StyledCard variant="outlined" >
                <Grid item xs={8} >
                    <Typography variant = 'h6' style={{padding: '0 0 10px 0'}}>{club.name}</Typography> 
                    <Typography style={{fontSize:'0.8rem'}}>{truncate(club.description)}</Typography> 
                </Grid> 
                <ExploreBtnGrid item xs={3} >
                        <StyledBtn 
                            onClick={() => navigate(`/clubs/${club.id}`)}
                            style={{color:'#3f51b5', border:'1.5px solid #3f51b5'}}
                            variant = 'outlined'> 
                            Club Details 
                        </StyledBtn>
                    {isMember.includes(club.id) ? (
                        <StyledBtn 
                        disabled 
                        color="secondary"
                        variant='outlined'>Joined</StyledBtn>
                    ) : ( 
                    <StyledBtn 
                        onClick={() => {handleJoinClub(club.id)}}
                        color="secondary"
                        variant='outlined'>Join Club</StyledBtn>)} 
                </ExploreBtnGrid> 
            </StyledCard> 
        </ListItem>
    );
};
export default ClubCard;
