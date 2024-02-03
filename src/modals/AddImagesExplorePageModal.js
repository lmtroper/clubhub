import React from 'react'
import { Modal, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const AddImagesExplorePageModal = ({ open }) => {
  return (
    <Modal
        open={open}>
        <Card>
          <CardContent>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container item xs={12} justifyContent='center'>
                <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                  Uploading Images to Explore Page...
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <CircularProgress />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
  )
}

export default AddImagesExplorePageModal
