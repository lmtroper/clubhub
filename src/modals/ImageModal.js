import React from 'react'
import { Modal, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Alert } from '@mui/material';
import CloudUploadIconOutlined from '@mui/icons-material/CloudUploadOutlined';


const ImageModal = (props) => {
    return (
      <Modal
        open={props.openModal}
        onClose={() => {
          props.setImage(null)
          props.setOpenModal(false)
          props.setIncorrectFileAlert(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ position: 'absolute', display: 'flex', alignContent: 'center', justifyContent: 'center', top: '15%' }}
      >
        <Card style={{ width: '550px', height: '450px', borderRadius: '10px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <CardContent style={{ justifyContent: 'center' }}>
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600, display: 'flex', justifyContent: 'center' }} variant="h5">Upload an image</Typography>
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 400, paddingBottom: '10px', display: 'flex', justifyContent: 'center' }} variant="h6">.PNG and .JPEG formats are accepted</Typography>
            <Grid container style={{ border: '2px dashed grey', height: '300px', display: 'flex', justifyContent: 'space-around', direction: 'column' }}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <CloudUploadIconOutlined style={{ height: '5em', width: '5em' }} />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => props.handleFileSelect()} style={{ display: 'flex', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                  Choose File
                </Button>
                <input type="file" accept="image/jpeg, image/png" ref={props.fileInputRef} onChange={props.handleChange} style={{ display: 'none' }} />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={
                  () => (props.image.type === 'image/jpeg' || props.image.type === 'image/png') ?
                    props.handleUpload() : props.handleIncorrectFileAlert()}
                  disabled={!props.image || props.isUploading} color="secondary" variant="contained" style={{ display: 'flex', padding: '10px', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                  {props.isUploading ? "Uploading..." : "Upload"}
                </Button>
              </Grid>
            </Grid>
            <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
              {props.image &&
                <Typography style={{ backgroundColor: '#D3D3D3', borderRadius: '10px' }}>Selected file: {props.image.name}</Typography>
              }
              {props.incorrectFileAlert &&
                <Alert severity="warning">
                  You have selected a file that is not in .jpeg or .png format. File not uploaded. Please choose a .jpeg or .png file.
                </Alert>}
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    )
  }

export default ImageModal
