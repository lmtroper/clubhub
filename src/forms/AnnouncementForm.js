import React from 'react';
import { styled } from "@mui/system"
import { Dialog, Grid, IconButton, Button, InputLabel, Typography, RadioGroup, Radio, FormControlLabel, Card } from "@mui/material";
import { serverURL } from '../constants/config';
import profile from '../images/profile-icon.png';
import close from '../images/close-icon.png';
import publicIcon from '../images/public-icon.png';
import privateIcon from '../images/private-icon.png';
import event2 from '../images/announcements.png';
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import img1 from '../images/announcements/img1.png'
import img2 from '../images/announcements/img2.png'
import img3 from '../images/announcements/img3.png'
import img4 from '../images/announcements/img4.png'
import img5 from '../images/announcements/img5.png'
import img6 from '../images/announcements/img6.png'
import img7 from '../images/announcements/img7.png'
import img8 from '../images/announcements/img8.png'
import img9 from '../images/announcements/img9.png'
import img10 from '../images/announcements/img10.png'
import img11 from '../images/announcements/img11.png'
import img12 from '../images/announcements/img12.png'
import Close from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { guestAddAnnouncement } from 'global/actions';


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

const StyledInputLabel = styled(InputLabel)({
    color:'grey',
    fontSize:'9pt',
    marginBottom:'5px',
    letterSpacing:'1px'
});

const StyledRadioGroup = styled(RadioGroup)({
    '&&:hover': {
        backgroundColor: 'transparent',
    }
});

const RadioBtn = styled(Button)({
    textTransform:'none',
    width:'100%',
    justifyContent:'space-between',
});

const RadioBtnText = styled(Typography)({
    marginLeft:'10px',
    fontSize:'14px',
    fontWeight:'600',
    color:'rgb(75,75,75)',
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

const AnnouncementForm = (props) => {
    const [postModalOpen, setPostModalOpen] = React.useState(false);
    const dispatch = useDispatch();

    toast.configure();
    const notify = () => {
        toast.success("Success: Announcement posted!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    const timestamp = () => {
        let today = new Date();
        const leadingZero = (n) => {
            let num = n.toString();
            if (num.length === 1){
                n = '0' + n;
                return n;
            }
            return n;
        }
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+leadingZero(today.getHours())+':'+leadingZero(today.getMinutes())+':'+today.getSeconds();
        return date;
    }
    
    const handleSubmit = (data) => {
        if(props.guest.guestMode){
            data.clubID = props.clubID;
            data.time_posted = timestamp();
            data.time_posted_text = datetimeTextFormat();
            data.visibility = data.access;
            data.placeholder_photo = parseInt(data.placeholderImage);
            data.guest = true;
            data.id = props.guest.announcementId;
            data.body = data.content;
            dispatch(guestAddAnnouncement(parseInt(props.clubID,10), data));
        } else {
            callApiPostAnnouncement(data)
            props.onSubmit();
        }
        notify();
    }
    
    const callApiPostAnnouncement = async (data) => {
        const url = serverURL + "/api/postAnnouncement";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clubID: props.clubID,
            title: data.title,
            body: data.content,
            visibility: data.access,
            time_posted: timestamp(),
            placeholderImage: parseInt(data.placeholderImage),
            time_posted_text: datetimeTextFormat(),
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    return(
        <Grid style={{minWidth:'290px', textAlign:'center'}}>
            <Card style={{display:'flex',flexDirection:'column' ,alignItems:'center', padding:'18px 0'}}>
                <Typography style={{padding:'5px 20px 15px', fontSize:'14pt', fontWeight:'200'}}>Do you have news to share?</Typography>
                
                <SideBarBtn  onClick={() => setPostModalOpen(true)}>
                    <Typography>Post Announcement</Typography>
                </SideBarBtn>
                <PostModal open={postModalOpen} onClose={() => setPostModalOpen(false)} onSubmit={handleSubmit} />
                <SideBarImg src={event2}/>
            </Card>
        </Grid>
    )
}

const MODAL_STYLES = {
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:'#fff',
    padding:'20px',
    zIndex:2000,
    width:'35vw',
    borderRadius:'5px',
}

const OVERLAY_STYLES = {
    position:'fixed', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'rgba(0,0,0,.4)',
    zIndex:2000
}

const PostModal = ({ classes, open, onClose, onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [radiobtn, setRadiobtn] = React.useState('1');
    
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
        let access = {1:'public', 2:'private'}

        if (title === "") {
            setIsTitleMissing(true);
            caughtError = true;
        }

        if (content === "") {
            setIsContentMissing(true);
            caughtError = true;
        }

        if (!caughtError){
            let data = {
                title: title,
                content: content,
                access: access[radiobtn],
                placeholderImage: placeholderImage,
            }
            onSubmit(data);
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

    const [placeholderImage, setPlaceholderImage] = React.useState('1')
    const handlePlaceholderImageRadioBtn = (e) =>{
        setPlaceholderImage(e.target.value);
    }



    if (!open) return null

    return(
        <>
            <Dialog open={open} close={onClose}>
                <Grid style={{padding:'40px', background:'#fff', display:'flex', flexDirection:'column'}}>
                    <Grid item style={{borderBottom:'lightgrey 0.5px solid', display:'flex', justifyContent:'space-between'}}>
                        <Grid>
                            <Typography style={{fontWeight:'300', fontSize:'20pt', marginBottom:'10px', }}>Post an Announcement</Typography>
                        </Grid>
                        <Grid>
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <StyledInputLabel style={{marginTop:'20px'}}>ANNOUNCEMENT TITLE</StyledInputLabel>
                    <Grid style={{display:'flex', flexDirection:'column'}}>
                        {isTitleMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter an announcement title
                            </Typography>
                        )}
                        <StyledInput value={title} onChange={handleEnteredTitle} placeholder='Title' required style={{marginBottom:'10px'}}/>
                        {isContentMissing && (
                            <Typography style={{ color: "rgb(255,0,0)"}} variant={"body2"}>
                            Please enter content for the announcement
                            </Typography>
                        )}
                        <StyledInputLabel style={{marginTop:'5px'}}>ANNOUNCEMENT CONTENT</StyledInputLabel>
                        <StyledTextArea value={content} onChange={handleEnteredBody} placeholder="Content" rows='4' style={{resize:'none'}}/>                    
                    </Grid>
                    <Grid style={{display:'flex', flexDirection:'column', padding:'10px 0 20px 0'}}>
                        <Grid item style={{display:'flex'}}>
                            <StyledInputLabel style={{margin:'20px 0 10px'}}>WHO SHOULD SEE THIS ANNOUNCEMENT POST?</StyledInputLabel>
                        </Grid>
                        <StyledRadioGroup
                            column="true"
                            name="position"
                            value={radiobtn}
                        >
                            <RadioBtn onClick={handleRadioBtn1}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', display:'flex', borderRadius:'50%', padding:'3px'}}>
                                        <RadioBtnImg src={publicIcon} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <RadioBtnText>All Club Members</RadioBtnText>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Visible by general club members, admins, and club owner</Typography>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                value="1"
                                control={<Radio />}
                                labelPlacement="start"
                                />
                            </RadioBtn>
                            <RadioBtn onClick={handleRadioBtn2}>
                                <Grid style={{display:'flex', alignItems:'center'}}>
                                    <Grid style={{background:'lightgray', display:'flex', borderRadius:'50%', padding:'3px'}}>
                                        <RadioBtnImg src={privateIcon} />
                                    </Grid>
                                    <Grid style={{textAlign:'left'}}>
                                        <RadioBtnText>Admins Only</RadioBtnText>
                                        <Typography style={{fontSize:'9pt', marginLeft:'10px'}}>Not visible by general club members</Typography>
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
                    <Grid style={{borderTop:'1px dashed lightgray', margin:'10px 0', paddingTop:'10px'}}>
                        <StyledInputLabel style={{marginTop:'20px'}}>SELECT A PLACEHOLDER IMAGE</StyledInputLabel>
                    </Grid>
                    <RadioGroup onChange={handlePlaceholderImageRadioBtn} value={placeholderImage} style={{display:'flex', flexDirection:'row', overflow:'hidden', margin:'10px'}}>
                        <Grid style={{display:'flex', overflowX:'scroll'}}>
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
                    {/* </Grid> */}
                    <Grid style={{display:'flex', justifyContent:'end'}}>
                        <Button variant='outlined' color='primary' onClick={handlePost}>Post Announcement</Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AnnouncementForm;

const PlaceholderImageOption = ({value}) => {
    const placeholders = {
        1:img1,
        2:img2,
        3:img3,
        4:img4,
        5:img5,
        6:img6,
        7:img7,
        8:img8,
        9:img9,
        10:img10,
        11:img11,
        12:img12,
    }

    return(
        <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
            <img src={placeholders[value]} style={{height:'100px'}} />
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <Radio value={value.toString()}/>
            </div>
        </Grid>
    )
}


function convertTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

const datetimeTextFormat = () => {
    const weekdays = {
        Mon:'Mon',
        Tue:'Tues',
        Wed:'Wed',
        Thu:'Thurs',
        Fri:'Fri',
        Sat:'Sat',
        Sun:'Sun'
    }

    const months = {
        Jan:'January',
        Feb:'February',
        Mar:'March',
        Apr:'April',
        May:'May',
        Jun:'June',
        Jul:'July',
        Aug:'August',
        Sep:'September',
        Oct:'October',
        Nov:'November',
        Dec:'December'
    }

    let d = Date().toString();
    d = d.split(' ')
    return weekdays[d[0]] + ' ' + months[d[1]] + ' ' + d[2] + ' ' + d[3] + ' ' + convertTime(d[4].slice(0,5))    
}
