import React from 'react'
import { useState } from 'react';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import { Modal, Checkbox, Typography, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import ConfirmImageDeleteModal from 'modals/ConfirmImageDeleteModal';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';

const ImageGrid = (props) => {
    const [deletedImage, setImageDeleted] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
  
    const handleDeleteConfirm = () => {
      props.deleteImage(deletedImage);
      props.setOpenDeleteModal(false);
    };
  
    return (<>
        <ImageList cols={5} gap={6} sx={{ width: "100%", height: 400}}>
          {props.images.map((image, index) => (
            <ImageListItem key={index}>
              <img 
                src={image} 
                onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(70%)'}
                onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
                style={{ borderRadius: '2px', cursor: 'pointer', marginBottom:'10px' }}
                onClick={() => { setSelectedImage(image) }}
                loading="lazy"
              />
              {props.deleteMenu &&
                <div>
                  <IconButton
                    style={{
                      position: "absolute", top: 0, right: 0, cursor: "pointer",
                    }}
                    onClick={() => {
                      props.setOpenDeleteModal(true);
                      setImageDeleted(image);
                    }}>
                    <Close />
                  </IconButton>
                </div>
              }
              {props.selectMenu && <Checkbox ariaLabel='Checkbox' color="primary" icon={<CheckCircleOutlinedIcon />}
                checkedIcon={<CheckCircle />}
                onChange={(event) => props.handleCheckChange(event, image)}
                checked={props.checkedImages.includes(image)}
                style={{
                  position: "absolute", top: 0, right: 0, borderRadius: "50%", border: "none", cursor: "pointer",
                }}
              />}
            </ImageListItem>
          ))}
        </ImageList>
      <ConfirmImageDeleteModal
        openDeleteModal={props.openDeleteModal}
        setOpenDeleteModal={props.setOpenDeleteModal}
        handleDeleteConfirm={handleDeleteConfirm}
      />
      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
      >
        <img src={selectedImage} alt="Club" style={{ maxHeight: '90vh', maxWidth: '90vw', margin: 'auto', display: 'block' }} />
      </Modal>
    </>
    )
  }
export default ImageGrid
