import React from 'react';
import { styled } from "@mui/system"
import { Dialog,  Radio, IconButton, Button, RadioGroup, FormControlLabel, Switch, MenuItem, Select, Grid, TextField, Typography, InputLabel } from '@mui/material';
import checkmark from 'images/checkmark.png'
import dayjs from 'dayjs';
import img1 from 'images/events/celebration.png'
import img2 from 'images/events/meeting.png'
import img3 from 'images/events/celebration2.png'
import img4 from 'images/events/karaoke.png'
import img5 from 'images/events/meeting2.png'
import img6 from 'images/events/cocktail.png'
import img7 from 'images/events/conference.png'
import img8 from 'images/events/celebration3.png'
import img9 from 'images/events/concert.png'
import img10 from 'images/events/meeting3.jpg'
import Close from '@mui/icons-material/Close';
import { serverURL } from '../constants/config';
import { useDispatch } from 'react-redux';
import { guestAddEvent } from 'global/actions';

const StyledInput = styled('input')({
    width:'100%',
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
    border: 'rgba(0, 0, 0, 0.23) 1px solid',
    padding: '10px',
    background:'white',
    borderRadius: '5px',
    border:'#e6e6e6 1px solid',
    '&:hover':{
        border:'1px solid black'
    },
    fontFamily:'Roboto, sans-serif'
})

const StyledInputLabel = styled(InputLabel)({
    color:'grey',
    fontSize:'8pt',
    marginBottom:'5px',
    letterSpacing:'1px'
})

const ErrorMsg = styled(Typography)({
    fontSize:'10pt',
    color:'red'
})

const StyledTextField = styled(TextField)({
    marginLeft: "8px",
    marginRight: "8px",
    width: '180px',
    "& .MuiOutlinedInput-input": {
        padding: '10px',
        width:'180px'
    },
    "& .MuiInputBase-root":{
        justifyContent:'center',
        display:'flex'
    }
})

const StyledSelect = styled(Select)({
    "& .MuiSelect-root":{
        paddingLeft:'10px',
    },
    "& .MuiOutlinedInput-input": {
    padding: '10px',
    width:'120px'
    },
    "& .MuiInputBase-root":{
        justifyContent:'center',
        display:'flex'
    },
    fontSize:'10pt',
    color:'grey'
})

const AllDayLabel = styled(FormControlLabel)({
    "& .MuiTypography-body1":{
        fontSize:'11.5pt'
    }
})


const EventForm = ({guest, close, clubID, onChange}) => {
    const dispatch = useDispatch();
    const [characterCountDisplay, setCharacterCountDisplay] = React.useState(310);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [startTime, setStartTime] = React.useState('');
    const [endDate, setEndDate] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [endTime, setEndTime] = React.useState('');
    const [allDay, setAllDay] = React.useState(false);
    const [locationType, setLocationType] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [price, setPrice] = React.useState(null);
    const [details, setDetails] = React.useState('');
    const [placeholderImage, setPlaceholderImage] = React.useState('1');
    const [timeDisabled, setTimeDisabled] = React.useState(false);

    // ERROR MESSAGES STATES
    const [titleError, setTitleError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [startDateError, setStartDateError] = React.useState(false);
    const [startTimeError, setStartTimeError] = React.useState(false);
    const [endTimeError, setEndTimeError] = React.useState(false);
    const [locationTypeError, setLocationTypeError] = React.useState(false);
    const [placeholderImageError, setPlaceholderImageError] = React.useState(false);
    const [locationError, setLocationError] = React.useState(false);

    // Title
    const handleTitle = (e) => {
        setTitleError(false);
        setTitle(e.target.value);
    }

    // Short Description
    const handleDescription = (e) => {
        setDescription(e.target.value);
        setDescriptionError(false);
        setCharacterCountDisplay(310 - (e.target.value).length)
    }

    // Start Date
    const handleStartDate = (e) => {
        setStartDateError(false);
        setStartDate(e.target.value);
        if (endDate < e.target.value){
            setEndDate(e.target.value);
        }
    }

    // Start Time
    const handleStartTime = (e) => {
        setStartTimeError(false);
        setStartTime(e.target.value);
    }

    // End Date
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
        if (e.target.value < startDate){
            setStartDate(e.target.value);
        }
    }

    // End Time
    const handleEndTime = (e) => {
        setEndTimeError(false)
        setEndTime(e.target.value);
    }

    // All Day Boolean
    const handleAllDaySwitch = (e) => {
        setStartTimeError(false);
        setEndTimeError(false);
        setAllDay(e.target.checked);
        if (e.target.checked){
            setTimeDisabled(true);
            setStartTime('');
            setEndTime('');
        }else{
            setTimeDisabled(false);
        }
    }

    // Location Type
    const handleLocationType = (e) => {
        setLocationTypeError(false);
        setLocationType(e.target.value);
        setLocation('');
    }

    // Location
    const handleLocation = (e) => {
        setLocationError(false);
        setLocation(e.target.value);
    }

    // Price
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    // Additional Details
    const handleDetails = (e) => {
        setDetails(e.target.value);
    }

    // Placeholder Image
    const handleRatioBtn = (e) => {
        setPlaceholderImageError(false);
        setPlaceholderImage(e.target.value);
    }

    const handleSubmit = () => {
        let caughtError = false;

        if (!title){
            caughtError = true;
            setTitleError(true);
        }

        if (!description) {
            caughtError = true;
            setDescriptionError(true);
        }

        if (!startDate) {
            caughtError = true;
            setStartDateError(true);
        }

        if (!allDay){
            if (!startTime){
                caughtError = true;
                setStartTimeError(true);
            }
        }

        if (endTime) {
            if (endTime < startTime && endDate == startDate){
                caughtError = true;
                setEndTimeError(true);
            }     
        }

        if (!locationType) {
            caughtError = true;
            setLocationTypeError(true);
        }

        if (!location) {
            caughtError = true;
            setLocationError(true);
        }

        if (!placeholderImage) {
            caughtError = true;
            setPlaceholderImageError(true);
        }

        if (!caughtError){
            let startDateTimeText = ''
            let endDateTime = null
            let endDateTimeText = null
            let start_time = startTime;
            if (allDay){
                start_time = '23:59'
                startDateTimeText = datetimeTextFormat(startDate, '23:59');

                if (endDate){
                    endDateTimeText = datetimeTextFormat(endDate, '23:59');
                }

            } else {
                startDateTimeText = datetimeTextFormat(startDate, startTime);
                
                if(endDate !== startDate){
                    endDateTime = endDate
                }
                if(endTime){
                    if (endDate){
                        endDateTime = endDate + ' ' + endTime
                    } else {
                        endDateTime = startDate + ' ' + endTime
                    }
                    endDateTimeText = datetimeTextFormat(endDate, endTime);
                }

            }
            
            if(guest.guestMode){
                let data = {
                    id: guest.eventId,
                    club_id: clubID, 
                    title: title,
                    body: description,
                    start_time: startDate + ' ' + start_time,
                    end_time: endDateTime,
                    allDay: allDay,
                    location_type: locationType,
                    location: location,
                    price: price,
                    additional_details: details,
                    placeholder_photo: placeholderImage,
                    start_time_text: startDateTimeText,
                    end_time_text: endDateTimeText,
                    guest: true,
                }

                dispatch(guestAddEvent(clubID, data));
                close();
            } else {
            

                callApiAddEvent(startDateTimeText, endDateTime, endDateTimeText, start_time)
                .then(res => {
                    onChange();
                    close();
                    // Reset form values
                    setTitle('');
                    setDescription('');
                    setStartDate('');
                    setStartTime(dayjs().format("YYYY-MM-DD"));
                    setEndDate('');
                    setEndTime(dayjs().format("YYYY-MM-DD"));
                    setAllDay(false);
                    setLocationType('');
                    setLocation('');
                    setPrice('');
                    setDetails('');
                    setPlaceholderImage('');
                })
            }
        }
    }
    const callApiAddEvent = async (startDateTimeText, endDateTime, endDateTimeText, start_time) => {
        const url = serverURL + '/api/addEvent';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID, 
                title: title,
                description: description,
                startDateTime: startDate + ' ' + start_time,
                endDateTime: endDateTime,
                allDay: allDay,
                locationType: locationType,
                location: location,
                price: price,
                details: details,
                placeholderImg: placeholderImage,
                startDateTimeText: startDateTimeText,
                endDateTimeText: endDateTimeText,
                timestamp: timestamp(),
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }


    return(<>
            <Grid style={{margin:'10px', overflowX: "hidden", padding:'0 20px 20px 20px', background:'#fff', borderRadius:'5px'}}>
                <Grid item style={{borderBottom:'lightgrey 0.5px solid', margin:'20px', display:'flex', justifyContent:'space-between'}}>
                    <Grid>
                        <div data-testid='event-form-title'>
                            <Typography style={{fontWeight:'300', fontSize:'20pt', marginBottom:'10px', }}>Create Event</Typography>
                        </div>
                    </Grid>
                    <Grid>
                        <IconButton onClick={close}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item style={{ margin:'5px 20px'}}>
                    <StyledInputLabel>NAME OF EVENT</StyledInputLabel>
                    <StyledInput data-testid='title-input' onChange={handleTitle} placeholder='Title'/> 
                    {titleError && <ErrorMsg>Please enter an event title</ErrorMsg>}
                </Grid>
                <Grid item style={{margin:'10px 20px 20px'}}>
                    <StyledInputLabel>SHORT DESCRIPTION</StyledInputLabel>
                    <StyledTextArea data-testid='body-input' maxLength={310} onChange={handleDescription} placeholder='Description' multiline rows={3} />                   
                     <Grid style={{display:'flex', justifyContent:'space-between'}} >
                        <Grid>
                            {descriptionError && <ErrorMsg>Please enter an short description</ErrorMsg>}
                        </Grid>
                        <Grid style={{display:'flex', justifyContent:'end', color:'grey'}} >
                            <Typography style={{fontSize:'8.5pt'}}>{characterCountDisplay}/310 Characters</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{margin:'5px 20px', display:'flex', alignItems:'center'}}>
                    <Grid item>
                        <StyledInputLabel style={{paddingBottom:'4px'}}>
                            START DATE
                        </StyledInputLabel>
                        <StyledTextField 
                            type='date' 
                            variant='outlined'
                            value={startDate}
                            onChange={handleStartDate}
                            style={{marginLeft:0}}
                            />
                            {startDateError && <ErrorMsg>Please select a start date</ErrorMsg>}
                    </Grid>
                    <Grid item>
                        <StyledInputLabel style={{paddingBottom:'4px'}}>STARTS AT</StyledInputLabel>
                        <StyledTextField
                            type="time"
                            variant='outlined'
                            value={startTime}
                            disabled={timeDisabled}
                            onChange={handleStartTime}
                            style={{marginLeft:0}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {startTimeError && <ErrorMsg>Please select a start time</ErrorMsg>}
                    </Grid>
                    <Grid>
                    <AllDayLabel style={{paddingLeft:'10px', fontSize:'11.5pt'}}
                        control={<Switch checked={allDay} color='primary' onChange={handleAllDaySwitch} />}
                        label="All Day"
                    />
                    </Grid>
                </Grid>
                <Grid item style={{width:'100%', margin:'5px 20px', display:'flex'}}>
                    <Grid item style={{paddingTop:'10px'}}>                        
                        <StyledInputLabel style={{paddingBottom:'4px'}}>END DATE</StyledInputLabel>
                        <StyledTextField 
                            type='date'
                            variant='outlined'
                            value={endDate}
                            onChange={handleEndDate}
                            style={{marginLeft:0}}
                            InputLabelProps={{
                                shrink:true,
                            }} />
                    </Grid>
                    <Grid item style={{paddingTop:'10px'}}>
                        <StyledInputLabel style={{paddingBottom:'4px'}}>ENDS AT</StyledInputLabel>
                        <StyledTextField
                            type="time"
                            variant='outlined'
                            value={endTime}
                            disabled={timeDisabled}
                            onChange={handleEndTime}
                            style={{marginLeft:0}}
                            inputProps={{ min: {startDate} }}
                            InputLabelProps={{
                                shrink: true,
                        
                            }}
                        />
                        {endTimeError && <ErrorMsg>The end time should not be before the start time</ErrorMsg>}
                    </Grid>
                </Grid>
                {(startDate && startTime && !endTime && (startDate===endDate || !endDate)  && !endTimeError) &&
                <Grid style={{margin:'5px 20px', display:'flex', alignContent:'center'}}>
                    <img src={checkmark} style={{height:'18px', paddingRight:'5px'}}/>
                        This event will take place on {eventConfirmation(startDate)} at {convertTime(startTime)} 
                </Grid>}
                {(startDate && startTime && endTime && startDate===endDate && !endTimeError) &&
                <Grid style={{margin:'5px 20px', display:'flex', alignContent:'center'}}>
                    <img src={checkmark} style={{height:'18px', paddingRight:'5px'}}/>
                        This event will take place on {eventConfirmation(startDate)} at {convertTime(startTime)} to {convertTime(endTime)}
                </Grid>}
                {(endDate && startDate !== endDate && !endTimeError && endTime && startTime && startDate) && 
                <Grid style={{margin:'5px 20px', display:'flex', alignContent:'center'}}>
                        <img src={checkmark} style={{height:'18px', paddingRight:'5px'}}/>
                        This event will take place from {eventConfirmation(startDate)} to {eventConfirmation(endDate)} from {convertTime(startTime)} to {convertTime(endTime)}
                </Grid>}
                <Grid item style={{margin:'25px 20px 5px', display:'flex', justifyContent:'space-between'}}>
                    <Grid item xs={4} style={{flex:1}}>
                        <StyledInputLabel style={{marginBottom:'10px'}}>LOCATION TYPE</StyledInputLabel>
                        <StyledSelect
                            variant='outlined'
                            onChange={handleLocationType}
                            >
                            <MenuItem value={'in-person'}>In-person</MenuItem>
                            <MenuItem value={'online'}>Online</MenuItem>
                        </StyledSelect>
                        {locationTypeError && <ErrorMsg>Please select a location type</ErrorMsg>}
                    </Grid>
                    {locationType === 'online' &&
                    <Grid item xs={8} style={{display:'flex',flex:1, flexDirection:'column'}}>
                        <StyledInputLabel style={{marginBottom:'10px'}}>MEETING URL</StyledInputLabel>
                        <Grid style={{display:'flex', width:'100%', flex: 1}}>
                            <Grid>
                                <input placeholder='https://' disabled style={{background:'rgba(55,55,55,0.1)', height:'40px', letterSpacing:'0.5px', padding:'10px', width:'70px',borderRadius:'5px 0 0 5px', border:'1px solid lightgrey', borderRight:0}}/>
                            </Grid>
                            <Grid style={{width:'100%'}}>
                                <input onChange={handleLocation} style={{width:'100%', borderRadius:'0 5px 5px 0',height:'40px', border:'1px solid lightgrey'}}/>
                                {(locationType.length > 0 && locationError) && <ErrorMsg>Please enter the event's location</ErrorMsg>}
                            </Grid>
                        </Grid>
                    </Grid>}
                    {locationType === 'in-person' &&
                    <Grid item xs={8} style={{display:'flex', flexDirection:'column', flex:1}}>
                        <StyledInputLabel style={{marginBottom:'10px'}}>LOCATION</StyledInputLabel>
                        <StyledInput style={{height:'44px'}} onChange={handleLocation} placeholder='Location'/> 
                        {(locationType.length > 0 && locationError) && <ErrorMsg>Please enter the event's location</ErrorMsg>}
                    </Grid>}
                </Grid>
                <Grid item style={{width:'100%', margin:'25px 20px 20px', display:'flex', justifyContent:'space-between'}}>
                    <Grid item xs={5} style={{display:'flex', flexDirection:'column'}}>
                        <StyledInputLabel>PRICE (optional)</StyledInputLabel>
                        <Grid style={{display:'flex', width:'100%'}}>
                            <Grid>
                                <button disabled style={{color:'white', background:'rgb(53,134,247)', letterSpacing:'0.5px', padding:'13px', width:'70px',borderRadius:'5px 0 0 5px', border:'1px solid rgb(53,134,247)', borderRight:0}}>CAD$</button>
                            </Grid>
                            <Grid style={{width:'100%'}}>
                                <input onChange={handlePrice} type='number' style={{paddingLeft:'10px', width:'100%', borderRadius:'0 5px 5px 0',height:'44px', border:'1px solid lightgrey', borderLeft:'0'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{margin:'25px 20px 20px', paddingBottom:'20px', borderBottom:'1px dashed lightgray',}}>
                    <StyledInputLabel>ADD ADDITIONAL DETAILS</StyledInputLabel>
                    <StyledTextArea onChange={handleDetails} placeholder='Additional Details' multiline rows={6} />                   
                </Grid>
                <Grid style={{margin:'5px 20px'}}>
                    <StyledInputLabel>SELECT A PLACEHOLDER IMAGE</StyledInputLabel>
                    <StyledInputLabel>This is the main photo that will be displayed in the events page.</StyledInputLabel>
                </Grid>
                <RadioGroup value={placeholderImage} onChange={handleRatioBtn} style={{display:'flex', flexDirection:'row', overflow:'hidden', margin:'10px'}}>
                    <Grid style={{display:'flex', overflowX:'scroll'}}>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img1} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='1'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img2} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='2'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img3} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='3'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img4} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='4'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img5} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='5'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img6} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='6'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img7} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='7'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img8} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='8'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img9} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='9'/>
                                </div>
                            </Grid>
                            <Grid style={{marginLeft:'10px', display:'flex', flexDirection:'column'}}>
                                <img src={img10} style={{height:'100px'}} />
                                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                                    <Radio value='10'/>
                                </div>
                            </Grid>
                    </Grid>
                    {placeholderImageError && <ErrorMsg>Please select an image</ErrorMsg>}
                </RadioGroup>
                <Grid style={{margin:'5pfx 20px 20px'}}>
                    <Button onClick={handleSubmit} style={{width:'100%', color:'white', background:'rgb(53,134,247)'}}>Create Event
                    </Button>
                </Grid>
            </Grid>
    </>)
}

export default EventForm;


function convertTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

const datetimeTextFormat = (date, time) => {
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

    let d = date.split('-') 
    let t = time.split(':')
    let x = new Date(d[0], d[1]-1, d[2], t[0], t[1]).toString();
    let text = x.split(' ')
    return weekdays[text[0]] + ' ' + months[text[1]] + ' ' + text[2] + ' ' + text[3] + ' ' + convertTime(text[4].slice(0,5))    
}

const eventConfirmation = (date) => {

    let x = datetimeTextFormat(date, '00:00');
    x = x.split(' ');
    return x[1] + ' ' + x[2] + ' ' + x[3];

}

const timestamp = () => {
    let today = new Date();
    const leadingZero = (n) => {
        if (n.toString.length == 1){
            n = '0' + n;
            return n;
        }
        return n;
    }
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+leadingZero(today.getHours())+':'+leadingZero(today.getMinutes())+':'+today.getSeconds();
    return date;
}
