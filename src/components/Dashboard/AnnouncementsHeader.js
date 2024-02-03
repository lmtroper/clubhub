import React from 'react'
import { CardContent, Grid, Typography } from '@mui/material'
import announcementHero from "images/announcement-background.png"
import { DashboardHeader, DashboardImage } from '../sharedComponents';

const AnnouncementsHeader = () => {
    return (
        <Grid item>
            <DashboardHeader style={{background: '#6072C7'}}>
                <Grid container>
                <Grid item xs={7} style={{ display: 'flex', alignItems: 'center' }}>
                    <CardContent>
                    <Typography variant="h5" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 600, color: 'white' }}>What's new in Clubsville?</Typography>
                    <Typography variant="h6" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 400, color: 'white', marginTop: '20px' }}>View your clubs' recent announcements!</Typography>
                    </CardContent>
                </Grid>
                <DashboardImage size={5} image={announcementHero} />
                </Grid>
            </DashboardHeader>
        </Grid>
    );
};
export default AnnouncementsHeader;
