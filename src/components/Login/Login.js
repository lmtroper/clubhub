import { styled } from "@mui/system";
import { Button, Grid,Typography, Tooltip, Zoom } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { serverURL } from '../../constants/config'
import { useAuthHeader, useUser } from '../../authentication/context'
import profile from '../../images/login-profile.png';
import { useNavigate } from 'react-router-dom';
import GuestToggle from "./GuestToggle";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setGuestMode } from 'global/actions'


const StyledButton = styled(Button)({
    textTransform: 'none',
    fontFamily: 'Biryani, sans-serif',
    color:'#fff',
    fontWeight:'600',
    padding:'5px 25px'
});
const Icon = styled('img')({
    height: '30px'
});
const LoginBtn = styled(Button)({
    border:'#fff solid 0.5px',
    transition: 'all 0.2s linear 0s',
    "&:hover": {
        background: "rgba(74, 96, 217, 0.6)",
        border:'#fff solid 0.5px',
    },
    textTransform: 'none',
    fontFamily: 'Biryani, sans-serif',
    color:'#fff',
    fontWeight:'600',
    padding:'5px 25px'
});
const Wrapper = styled(Grid)({
    display:'flex',
    justifyContent:'end',
    flex: 2
});

export const Login = () => {
    const user = useSelector((state) => state.user);
    const guest = useSelector((state) => state.guest);
    const isGuest = guest.guestMode;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [auth] = useState(getAuth())
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const authHeader = useAuthHeader()
    const [logOut] = useSignOut(auth)

    const handleLogin = (uid, displayName) => {
        dispatch(setUser(true, uid, displayName));
        if(isGuest){
            dispatch(setGuestMode());
        }
        navigate('/');
    }

    const logIn = async () => {
        const result = await signInWithGoogle();
        if (!result) {
            return
        }
        handleLogin(result.user.uid, result.user.displayName);

        const request = {
            method: 'PUT',
            headers: {
                ...authHeader(),
            }
        }
        const response = await fetch(serverURL.concat('/api/login'), request)
    }
    
    const handleLogout = async () => {
        await logOut();
        dispatch(setUser(false, null));
        navigate('/');
    }


    return (
        <Wrapper xs={4} item>
            {!user.loggedIn ?
                (<>
                    <GuestToggle />
                    <LoginBtn variant='outlined' onClick={logIn}>
                        Log In
                    </LoginBtn>
                    </>
                ):
                (<>
                    <Tooltip 
                        title={
                            <React.Fragment>
                                <Typography color="inherit">
                                    Logged in as:&nbsp;<b>{user.displayName}</b>
                                </Typography>
                            </React.Fragment>}
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 200 }}
                        >
                        <Button>
                            <Icon src={profile}></Icon>
                        </Button>
                    </Tooltip>
                    <StyledButton onClick={()=>{handleLogout()}}>
                        Log Out
                    </StyledButton>
                </>)
            }
            
    </Wrapper>
)};
