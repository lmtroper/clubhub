import React from 'react'
import { Modal, Card, CardContent, Typography, Grid, Button } from '@mui/material';

const ConfirmImageDeleteModal = (props) => {
    return (
      <Modal
        open={props.openDeleteModal}
        onClose={() => props.setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ position: 'absolute', display: 'flex', alignContent: 'center', justifyContent: 'center', top: '20%' }}
      >
        <Card style={{ width: '25%', height: '30%', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardContent style={{ display: 'flex' }}>
            <Grid container style={{}}>
              <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography id="modal-modal-title" variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: 400, display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                  Delete this image?
                </Typography>
              </Grid>
              <Grid container item xs={6} justifyContent='center'>
                <Button variant="contained" color="secondary" onClick={() => props.setOpenDeleteModal(false)}>
                  Cancel
                </Button>
              </Grid>
              <Grid container item xs={6} justifyContent='center'>
                <Button variant="contained" coloar="primary" onClick={props.handleDeleteConfirm} sx={{ ml: 2 }}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    )
  }

export default ConfirmImageDeleteModal
