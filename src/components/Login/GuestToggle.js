import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Popper, Fade, Paper, Typography, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {setGuestMode} from 'global/actions'
import { logGuestEvent } from 'api/ClubsAPI';

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
        },
        '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
        },
        '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
    marginRight:'40px'
}));

const GuestToggle = () => {
    const guest = useSelector((state) => state.guest);
    const isGuest = guest.guestMode;
    const dispatch = useDispatch();

    const [buttonFlashing, setButtonFlashing] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState('bottom-end');

    const switchRef = useRef(null);
    
    const handleClick = () => {
      setOpen(false);
    };
  
    React.useEffect(() => {
        setAnchorEl(switchRef.current);

        const popperShown = sessionStorage.getItem('popperShown');

        if (!popperShown) {
          // If the popper hasn't been shown, set the flag in sessionStorage
          sessionStorage.setItem('popperShown', 'true');
          // Set the local state to true to show the popper
          setOpen(true);
        }
    }, []);

    return (
    <>
        <Android12Switch 
            checked={isGuest} 
            ref={switchRef} 
            color='warning' 
            onClick={()=>{
                setOpen(false); 
                dispatch(setGuestMode());}}/>
            <Popper
            sx={{ zIndex: 3000 }}
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
            >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                    <Typography sx={{ p: 2 }} style={{fontFamily:'system-ui, sans-serif', fontSize:'15px', paddingBottom:'5px'}}>Click on this switch to enable guest viewing mode</Typography>
                    <div style={{display:'flex', flexDirection:'column', alignContent:'end'}}>
                        <Button style={{
                        animation: buttonFlashing ? 'flash 1s infinite' : 'none',
                    }}
                    onClick={handleClick}>
                            Got it!
                        </Button>
                    </div>
                    </Paper>
                </Fade>
            )}
        </Popper>
    </>
  );
};

export default GuestToggle;
