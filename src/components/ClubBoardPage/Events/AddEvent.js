import React from 'react'
import { useSelector } from "react-redux";
import { Button, Card, Grid, Typography, Dialog } from "@mui/material"
import { styled } from "@mui/system";
import EventImage from './EventImage';
import EventForm from '../../../forms/EventForm';

const StyledBtn = styled(Button)({
    textTransform:'none',
    background:'#3f51b5',
    color:'#fff',
    display:'flex',
    borderRadius:'18px',
    padding:'8px 15px',
    "&:hover":{
        background:'#5362b8'
    }
});
const Wrapper = styled(Grid)({
    margin: "0px 50px 0px", 
    flex: 1, 
    maxWidth:'290px', 
    textAlign:'center',
});
const StyledCard = styled(Card)({
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
});
const Caption = styled(Typography)({
    padding:'20px', 
    fontSize:'14pt', 
    fontWeight:'200'
});
const ImageWrapper = styled(Grid)({
    padding:'10px', 
    display:'flex', 
    justifyContent:'center', 
    flexDirection:'column'
});

const AddEvent = ({ imageLoading, setImageLoading, getEvents, clubID, admin }) => {
    const [openEventForm, setOpenEventForm] = React.useState(false);
    const guest = useSelector((state) => state.guest);
  return (
    <Wrapper>
        {(admin || guest.memberType[clubID] !== 'member') &&
        <StyledCard>
            <Caption>Do you have an event coming up?</Caption>
            <StyledBtn 
                onClick = {()=>{ setOpenEventForm(true)}}>
                <Typography style={{paddingRight:'5px'}}>+</Typography>
                <Typography>Create Event</Typography>
            </StyledBtn>
            <EventFormDialog 
                guest={guest}
                open={openEventForm} 
                close={()=>{setOpenEventForm(false)}} 
                clubID={clubID} 
                onChange={getEvents}/>
            <ImageWrapper>
                <EventImage 
                    loading={imageLoading} 
                    onLoad={()=> setImageLoading(false)} 
                    image={11} 
                    skeletonWidth={250} 
                    skeletonHeight = {160}/>
            </ImageWrapper>
        </StyledCard>}
    </Wrapper>
  )
}

export default AddEvent

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: "16px",
    },
    '& .MuiDialogActions-root': {
      padding: "8px",
    },
  }));

const EventFormDialog = ({guest, open, close, clubID, onChange}) => {
    if (!open) return null
    return(
        <BootstrapDialog open={open} close={close}>
            <EventForm guest={guest} close={close} clubID={clubID} onChange={onChange}/>
        </BootstrapDialog>
    )
}
