import React from 'react'
import { Dialog,InputLabel, Grid, Typography, IconButton, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { styled } from '@mui/system'
import { Close } from '@mui/icons-material'
import img1 from 'images/announcements/img1.png'
import img2 from 'images/announcements/img2.png'
import img3 from 'images/announcements/img3.png'
import img4 from 'images/announcements/img4.png'
import img5 from 'images/announcements/img5.png'
import img6 from 'images/announcements/img6.png'
import img7 from 'images/announcements/img7.png'
import img8 from 'images/announcements/img8.png'
import img9 from 'images/announcements/img9.png'
import img10 from 'images/announcements/img10.png'
import img11 from 'images/announcements/img11.png'
import img12 from 'images/announcements/img12.png'
import publicIcon from '../images/public-icon.png';
import privateIcon from '../images/private-icon.png';

const StyledInput = styled('input')({
    width:'100%',
    // margin: '5px 0 10px 0',
    border: 'rgba(0, 0, 0, 0.23) 1px solid',
    padding: '10px',
    background:'white',
    borderRadius: '5px',
    border:'#e6e6e6 1px solid',
    '&:hover':{
        border:'1px solid black'
    },
});

const StyledTextArea = styled('textarea')({
    width:'100%',
    fontFamily: 'Roboto, sans-serif',
    // margin: '5px 0 10px 0',
    border: 'rgba(0, 0, 0, 0.23) 1px solid',
    padding: '10px',
    background:'white',
    borderRadius: '5px',
    border:'#e6e6e6 1px solid',
    '&:hover':{
        border:'1px solid black'
    },
});

const StyledLabel = styled(InputLabel)({
    color:'grey',
    fontSize:'9pt',
    marginBottom:'5px',
    letterSpacing:'1px'
});

const RadioBtn = styled(Button)({
    textTransform: 'none',
    width: '100%',
    justifyContent: 'space-between',
});
const RadioBtnText = styled(Typography)({
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgb(75,75,75)',
});
const StyledRadioGroup = styled(RadioGroup)({
    '&&:hover': {
        backgroundColor: 'transparent',
    }
});
const RadioBtnImg = styled('img')({
    height:'45px',
    width:'45px',
});

const SideBarBtn = styled(Button)({
    textTransform:'none',
    width:'100%',
    justifyContent:'start',
    background:'rgb(242,242,242)',
    "&:hover":{
        background:'#d9d9d9'
    },
    marginBottom:'10px',
    width:'fit-content',
    color: 'white',
    background: '#3f51b5',
    padding: '8px 20px',
    borderRadius:'20px',
});

const SideBarImg = styled('img')({ 
    height:'180px',
    borderRadius:'12px',
});


const EditAnnouncementModal = ({ open, onClose, onEdit, a_title, a_content, a_radiobtn, image}) => {
    const [title, setTitle] = React.useState(a_title);
    const [content, setContent] = React.useState(a_content);
    const [radiobtn, setRadiobtn] = React.useState(a_radiobtn);

    // Error Messages
    const [isTitleMissing, setIsTitleMissing] = React.useState(false);
    const [isContentMissing, setIsContentMissing] = React.useState(false);

    const handleEnteredTitle = (event) => {
        setTitle(event.target.value);
        setIsTitleMissing(false);
    }

    const handleEnteredBody = (event) => {
        setContent(event.target.value);
        setIsContentMissing(false);
    }

    const handlePost = () => {
        let caughtError = false;
        let access = { 1: 'public', 2: 'private' }

        if (title === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }

        if (content === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError) {
            let data = {
                title: title,
                content: content,
                access: access[radiobtn],
                placeholderImage: placeholderImage,
            }
            onEdit(data);

            setTitle('');
            setContent('');
            setRadiobtn('1');
            setPlaceholderImage('1');
            onClose();
        }
    }

    const handleRadioBtn1 = () => {
        setRadiobtn('1')
    }

    const handleRadioBtn2 = () => {
        setRadiobtn('2')
    }

    const [placeholderImage, setPlaceholderImage] = React.useState(image)
    const handlePlaceholderImageRadioBtn = (e) => {
        setPlaceholderImage(e.target.value);
    }

    if (!open) return null
    return (
        <>
            <Dialog open={open} close={onClose}>
                <Grid style={{ padding: '40px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                    <Grid item style={{ borderBottom: 'lightgrey 0.5px solid', display: 'flex', justifyContent: 'space-between' }}>
                        <Grid>
                            <Typography style={{ fontWeight: '300', fontSize: '20pt', marginBottom: '10px', }}>Edit Announcement</Typography>
                        </Grid>
                        <Grid>
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <StyledLabel style={{ marginTop: '20px' }}>ANNOUNCEMENT TITLE</StyledLabel>
                    <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                        {isTitleMissing && (
                            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
                                Please enter an announcement title
                            </Typography>
                        )}
                        <StyledInput value={title} onChange={handleEnteredTitle} placeholder='Title' required style={{ marginBottom: '10px' }} />
                        {isContentMissing && (
                            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
                                Please enter content for the announcement
                            </Typography>
                        )}
                        <StyledLabel style={{ marginTop: '5px' }}>ANNOUNCEMENT CONTENT</StyledLabel>
                        <StyledTextArea value={content} onChange={handleEnteredBody} placeholder="Content" rows='4' style={{ resize: 'none' }} />
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'column', padding: '10px 0 20px 0' }}>
                        <Grid item style={{ display: 'flex' }}>
                            <StyledLabel style={{ margin: '20px 0 10px' }}>WHO SHOULD SEE THIS ANNOUNCEMENT POST?</StyledLabel>
                        </Grid>
                        <StyledRadioGroup
                            column
                            name="position"
                            value={radiobtn}
                        >
                            <RadioBtn onClick={handleRadioBtn1}>
                                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid style={{ background: 'lightgray', borderRadius: '50%', display:'flex', padding: '3px' }}>
                                        <RadioBtnImg src={publicIcon} />
                                    </Grid>
                                    <Grid style={{ textAlign: 'left' }}>
                                        <RadioBtnText>All Club Members</RadioBtnText>
                                        <Typography style={{ fontSize: '9pt', marginLeft: '10px' }}>Visible by general club members, admins, and club owner</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    labelPlacement="start"
                                />
                            </RadioBtn>
                            <RadioBtn onClick={handleRadioBtn2}>
                                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid style={{ background: 'lightgray', display:'flex',  borderRadius: '50%', padding: '3px' }}>
                                        <RadioBtnImg src={privateIcon} />
                                    </Grid>
                                    <Grid style={{ textAlign: 'left' }}>
                                        <RadioBtnText>Admins Only</RadioBtnText>
                                        <Typography style={{ fontSize: '9pt', marginLeft: '10px' }}>Not visible by general club members</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    labelPlacement="start"
                                />
                            </RadioBtn>
                        </StyledRadioGroup>
                    </Grid>
                    <Grid style={{ borderTop: '1px dashed lightgray', margin: '10px 0', paddingTop: '10px' }}>
                        <StyledLabel style={{ marginTop: '20px' }}>SELECT A PLACEHOLDER IMAGE</StyledLabel>
                    </Grid>
                    <RadioGroup onChange={handlePlaceholderImageRadioBtn} value={placeholderImage} style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden', margin: '10px' }}>
                        <Grid style={{ display: 'flex', overflowX: 'scroll' }}>
                            <PlaceholderImageOption value={1} />
                            <PlaceholderImageOption value={2} />
                            <PlaceholderImageOption value={3} />
                            <PlaceholderImageOption value={4} />
                            <PlaceholderImageOption value={5} />
                            <PlaceholderImageOption value={6} />
                            <PlaceholderImageOption value={7} />
                            <PlaceholderImageOption value={8} />
                            <PlaceholderImageOption value={9} />
                            <PlaceholderImageOption value={10} />
                            <PlaceholderImageOption value={11} />
                            <PlaceholderImageOption value={12} />
                        </Grid>
                    </RadioGroup>
                    <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button variant='outlined' color='primary' onClick={handlePost}>
                            Edit Announcement
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
};

const PlaceholderImageOption = ({ value }) => {
    const placeholders = {
        1: img1,
        2: img2,
        3: img3,
        4: img4,
        5: img5,
        6: img6,
        7: img7,
        8: img8,
        9: img9,
        10: img10,
        11: img11,
        12: img12,
    }

    return (
        <Grid style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
            <img src={placeholders[value]} style={{ height: '100px' }} />
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Radio value={value.toString()} />
            </div>
        </Grid>
    )
}


export default EditAnnouncementModal
