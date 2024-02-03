import React from 'react'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import eventsHero from "images/events-hero.png"
import { DashboardHeader, DashboardImage } from '../sharedComponents'

const EventsHeader = () => {
    return (
        <Grid item>
      <DashboardHeader backgroundColor={'#ee9d79'}>
        <Grid container xs={12}>
          <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h5" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 600, color: 'white' }}>Get ready for get-togethers</Typography>
              <Typography variant="h6" style={{ fontFamily: 'Biryani, sans-serif', fontWeight: 400, color: 'white', marginTop: '20px' }}>View your club's upcoming events!</Typography>
            </CardContent>
          </Grid>
          <DashboardImage size={6} image={eventsHero} width={"90%"} padding={'10px'} />
        </Grid>
      </DashboardHeader>
      </Grid>
    )
}
export default EventsHeader;
