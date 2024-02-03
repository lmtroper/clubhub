import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import close from '../images/close-icon.png';
import caution from '../images/caution-icon.png';

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:'#fff',
    zIndex:1000,
    width:'30vw',
    borderRadius:'8px'
}

const OVERLAY_STYLES = {
    position:'fixed', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor:'rgba(0,0,0,.4)',
    zIndex:1000
}

const LeaveClubModal = ({ open, clubData, onClose, onSubmit }) => {
    if (!open) return null
    return(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{display:'flex', flexDirection:'column'}}>
                    <Grid item style={{display:'flex', justifyContent:'end', paddingTop:'5px'}}>
                        <Button onClick={onClose}><img src={close} style={{height:'25px'}}></img></Button>
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'center'}}>
                        <img src={caution} style={{height:'70px', marginLeft:'15px'}} />
                        <Box>
                            <Typography style={{margin:'10px 20px 5px 20px', fontWeight:'600', letterSpacing:'0.02em'}}>Leave Club</Typography>
                            <Typography style={{margin:'0 20px 20px 20px'}}>Are you sure you want to leave {clubData.name}?</Typography>
                        </Box> 
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'10px 10px 15px 10px'}}>
                        <Button fullWidth onClick={onClose} variant='outlined' style={{margin:'0 10px'}}>Cancel</Button>
                        <Button fullWidth onClick={onSubmit} variant='outlined' style={{margin:'0 10px', background:'#F01C39', color:'white'}}>Leave</Button>   
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default LeaveClubModal
