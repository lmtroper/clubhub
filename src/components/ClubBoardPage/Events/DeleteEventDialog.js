import React from 'react'
import { Dialog, Grid, Typography, Box, Button } from '@mui/material'
// import caution from '../../../images/caution.png'

const DeleteEventDialog = ({ open, close, onSubmit, title }) => {

    if (!open) return null
    return (
        <Dialog open={open} close={close}>
            <Grid container style={{ display: 'flex', flexDirection: 'column', padding: '25px 25px 15px' }}>
                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <img src={caution} style={{ height: '70px', marginLeft: '15px' }} /> */}
                    <Box>
                        <Typography style={{ margin: '10px 20px 5px 20px', fontWeight: '600', letterSpacing: '0.02em' }}>Delete Event</Typography>
                        <Typography style={{ margin: '0 20px 20px 20px' }}>Are you sure you want to delete the following event?</Typography>
                        <Typography style={{ margin: '0 20px 20px 20px' }}>Event title: <b>{title}</b></Typography>
                    </Box>
                </Grid>
                <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '10px 10px 15px 10px' }}>
                    <Button fullWidth onClick={close} variant='outlined' style={{ margin: '0 10px' }}>Cancel</Button>
                    <Button fullWidth onClick={() => { onSubmit(); close(); }} variant='outlined' style={{ margin: '0 10px', background: '#F01C39', color: 'white' }}>Delete</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default DeleteEventDialog
