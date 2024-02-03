import React from 'react'
import { styled } from '@mui/system';
import { Box, Button, Grid, IconButton, Modal, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';

const StyledModalBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    borderRadius: '8px',
    boxShadow: 24,
    padding: '15px 25px 25px 25px',
    maxHeight: '70vh',
    width: '70vw',
    overflow: 'scroll'
});
const CloseModalWrapper = styled(Grid)({
    display: 'flex',
    justifyContent: 'end',
});
const BtnWrapper = styled(Grid)({
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center'
});
const ModalBtn = styled(Button)({
    margin: '0 10px'
});
const padding = {
    padding: '25px'
};

const EditClubDescriptionModal = ({ clubName, clubDescription, open, onClose, onSubmit }) => {
    const [newDescription, setNewDescription] = React.useState(clubDescription);

    const handleDescriptionSubmission = () => {
        if (newDescription === "") {
            setNewDescription("Club description not available.");
        }
        onSubmit(newDescription);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <StyledModalBox>
                <CloseModalWrapper item>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </CloseModalWrapper>
                <Grid item sx={padding}>
                    <TextField
                        onChange={(e)=>{setNewDescription(e.target.value)}}
                        label="Club Description"
                        defaultValue={clubDescription}
                        multiline
                        fullWidth
                    />
                </Grid>
                <BtnWrapper>
                    <ModalBtn 
                        onClick={onClose} 
                        variant='outlined'
                    >
                        Cancel
                    </ModalBtn>
                    <ModalBtn 
                        onClick={handleDescriptionSubmission} 
                        variant='outlined'
                    >
                        Edit
                    </ModalBtn>
                </BtnWrapper>
            </StyledModalBox>
        </Modal>
    )
}

export default EditClubDescriptionModal
