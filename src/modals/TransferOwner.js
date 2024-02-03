import React, {useState} from 'react';
import { Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid, } from '@mui/material';
import search from '../images/search-icon.png';
import { Pagination } from "@mui/material";
import { serverURL } from '../constants/config';
import { useParams } from 'react-router-dom';
import caution from '../images/caution-icon.png';
import { toast } from 'react-toastify'; 
import { styled } from '@mui/system'

const Img = styled('img')({
    height: '20px',
});

const StyledTextField= styled(TextField)({
    background: '#fff'
})

const RadioBtn = styled(Button)({
    textTransform: 'none',
    width: '100%',
    justifyContent: 'space-between',
})

const TransferOwnership = ({ open, close, members, onChange, currentUser, changeUserStatus }) => {
    const {clubID} = useParams();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setRadioBtn('');
        setSelectedMember('');
    }

    toast.configure();
    const notify = (selectedMember) => {
        toast.info(selectedMember + " has been transferred club ownership", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [radioBtn, setRadioBtn] = React.useState('');
    const [selectedMember, setSelectedMember] = React.useState('');

    const handleRatioBtn = (e) => {
        setRadioBtn(e.target.value);
        let select = members.find((member) => member.uid === e.target.value)
        setSelectedMember(select.name)
    }


    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(4);

    const indexOfLastUser = (currentPage) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredMembers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    const handleSubmit = () => {
        changeUserStatus('admin'); 

        callApiTransferOwner()
            .then(res => {
                var parsed = JSON.parse(res.express);
                onChange();
                notify(selectedMember);
            })
    }

    const callApiTransferOwner = async () => {
        const url = serverURL + "/api/transferClubOwnership";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newOwnerID: radioBtn,
            oldOwnerID: currentUser.uid,
            clubID: clubID,
            role:'admin',
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        if (radioBtn !== ''){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [radioBtn])


    if (!open) return null
    return ( <>
        <Dialog open = { open } close = { close } >
            <DialogTitle style = {{ background: '#eceef8', width: '500px', borderBottom: '#eceef8 solid 1px' }} >
                <span style = {
                    { display: 'flex', width: '100%', borderBottom: '0.5px solid #c6cceb', paddingBottom: '10px' }}>
                        Transfer Club Ownership 
                </span> 
            </DialogTitle> 
            <DialogContent style = {{ background: '#eceef8', paddingBottom: '25px', minHeight: '380px', width: '500px' }}>
                <Box component = "form" sx = {{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid style = {{ marginBottom: '20px', width: '100%' }}>
                    <StyledTextField
                    id = "outlined-basic"
                    label = "Search Members"
                    variant = "filled"
                    color = "success"
                    fullWidth value = { searchTerm }
                    onChange = { handleSearchTerm }
                    InputProps = {{
                        startAdornment: ( 
                            <InputAdornment position = "start" >
                            <Img
                            src = { search }/> 
                            </InputAdornment>),
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') {
                                    e.stopPropagation();
                                }
                            }}}
                        /> 
                </Grid> 
                <Grid style = {{ width: '100%' }}>
                    <RadioGroup
                    column
                    name = "position"
                    value = {radioBtn}
                    onChange = {handleRatioBtn}
                    // className = {classes.radioGroup}
                    color = 'primary'>
                        <Grid style = {{ display: 'flex', flexDirection: 'column', background: '#fff', width: '100%', borderRadius: '8px' }}> 
                            {Object.values(currentUsers).map((member) => ( 
                                <RadioBtn style = {{background: '#fff', textTransform: 'none', borderBottom: '1px lightgray solid', borderRadius: '0' }}>
                                    <Typography style = {{marginLeft: '10px' }}>{ member.name }</Typography> 
                                    <FormControlLabel value = {member.uid}
                                    control = {< Radio />}
                                    labelPlacement = "start"
                                    color = 'primary' />
                                </RadioBtn>   
                            ))} 
                        </Grid> 
                        <Grid item style = {{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                            <Pagination 
                                variant = "outlined"
                                color = "primary"
                                shape = 'rounded'
                                count = { Math.ceil(filteredMembers.length / usersPerPage) }
                                page = { currentPage }
                                onChange = { handlePageClick }
                            /> 
                        </Grid> 
                    </RadioGroup> 
                </Grid> 
                {selectedMember &&
                    <Grid style = {{ paddingTop: '30px' }}>
                    <Typography> The selected new club owner is <b> {selectedMember}</b></Typography>
                    </Grid>} 
            </Box>
        </DialogContent> 
        <DialogActions >
            <Button onClick = {
                () => { close();
                    setRadioBtn('');
                    setSelectedMember('') } } > Cancel </Button> 
            <Button disabled={disabled} onClick = {()=>{setOpenConfirmationDialog(true);}}> Ok </Button> 
            <ConfirmationDialog 
                open={openConfirmationDialog}
                back={()=>{setOpenConfirmationDialog(false)}} 
                cancel={close} 
                onSubmit={handleSubmit}
                members={members}
                selectedMember={selectedMember}/>
        </DialogActions> 
    </Dialog>

    </>)
};

export default TransferOwnership;

const ConfirmationDialog = ({open, back, cancel, onSubmit, selectedMember}) => {

    if (!open) return null
    return(
    <Dialog open={open} close={back} >
        <DialogContent style={{background:'#eceef8', paddingBottom:'10px', minHeight:'120px', width:'400px'}}>
            <Grid container style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src={caution} style={{width:'75px', marginBottom:'5px'}} />
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <Box style={{textAlign:'center'}}>
                        <Typography style={{margin:'0 0 20px 0'}}>
                            Are you sure you want to transfer club ownership to <b>{selectedMember}</b>?
                            <br /><br />
                            <p style={{color:'red'}}>You will lose club owner privileges and be downgraded to admin</p>
                        </Typography>
                    </Box> 
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:'space-between'}}>
            <Grid>
                <Button onClick={()=>{back();}}>Back</Button>
            </Grid>
            <Grid>
                <Button onClick={()=>{back();cancel();}}>Cancel</Button>
                <Button onClick={()=>{back();cancel(); onSubmit();}}>Confirm</Button>
            </Grid>
        </DialogActions>
    </Dialog >
    )
}
