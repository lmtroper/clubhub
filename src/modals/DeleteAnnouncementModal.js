import React from 'react'
import { Dialog, Grid, Typography, Box, Button, IconButton } from '@mui/material'
import caution from "../images/caution-icon.png"
import { Close } from '@mui/icons-material'
import { textTruncate } from 'utils'


const DeleteAnnouncementModal = ({ open, close, title, body, handleDelete }) => {
    return (
        <Dialog open={open} close={close}>
            <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid style={{display: 'flex', justifyContent:'center', position: 'relative',}}>
                    <img src={caution} style={{ height: '70px', marginLeft: '15px' }} />
                </Grid>
                <Grid item style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', textAlign:'center', maxWidth:'430px'}}>
                        <Typography style={{ margin: '10px 20px 5px 20px', fontWeight: '600', letterSpacing: '0.02em' }}>Delete Announcement?</Typography>
                        <Typography style={{ margin: '20px 20px 20px 20px' }}>
                            Are you sure you want to permanently delete this announcement?
                        </Typography>
                </Grid>
                <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '10px 10px 15px 10px' }}>
                    <Button fullWidth onClick={handleDelete} variant='outlined' style={{ margin: '0 10px', border:'none', background: '#F01C39', color: 'white' }}>Delete</Button>
                    <Button fullWidth onClick={close} variant='outlined' style={{ margin: '0 10px', border:'grey 1px solid', color:'grey' }}>Cancel</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default DeleteAnnouncementModal
