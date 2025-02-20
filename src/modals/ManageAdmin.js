import React, {useState} from 'react';
import { makeStyles, Radio, RadioGroup, FormControlLabel, TextField, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid, } from '@mui/material';
import search from '../images/search-icon.png';
import add from '../images/add-icon.png';
import remove from '../images/remove-icon.png';
// import { Pagination } from "@material-ui/lab";
import { serverURL } from '../constants/config';
import { toast } from 'react-toastify'; 
import {Pagination } from "@mui/material"
import { styled } from "@mui/system";
import { current } from '@reduxjs/toolkit';

const Img = styled('img')({
    height:'30px'
});


const RadioBtn = styled(Button)({
    background:'#fff',
    textTransform:'none',
    width:'100%',
    justifyContent:'space-between',
})

const RadioBtnFont = styled(Typography)({
    padding:'15px',
    color:'#36454F',
    fontWeight:'600'
})

const StyledBtn = styled('button')({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minWidth:'200px',
    textTransform:'none',
    background:'#fff',
    padding:'15px',
    border: "0.5px solid #36454F",
    borderRadius:'4px',
    "&:hover": {
        border: "2px solid #36454F",
        color:'white'
    } 
});


const ActiveBtn = styled('button')({
    border:'2px solid #36454F !important'
})


const ManageAdminDialog = ({guest, open, close, members, onChange, currentUser}) => {

    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

    const currentAdmins = members.filter((member) => (
        (member.role.includes('admin' || 'owner')) &&
        (guest.guestMode ? (member.uid !== "G") : (member.uid !== currentUser))
    ));

    const currentMembers = members.filter((member) => (
        member.role.includes('user'))
    ); 

    const [btn, setBtn] = React.useState('');
    const [addAdmin, setAddAdmin] = React.useState('');
    const [removeAdmin, setRemoveAdmin] = React.useState('');
    const [isAddActive, setIsAddActive] = React.useState(false);
    const [isRemoveActive, setIsRemoveActive] = React.useState(false);
    

    toast.configure();
    const notifyAdd = (user) => {
        toast.success(user + " has been added to club admins", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    const notifyRemove = (user) => {
        toast.info(user + " has been removed from club admins", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        });
    }

    const handleSubmit = (user) => {

        // Add new admin
        if (btn === '1'){
            callApiAddAdmin()
            .then(res => {
                var parsed = JSON.parse(res.express); 
                setAddAdmin('');
                setIsAddActive(false);
                onChange();
                notifyAdd(user);
            })

        }
        // Remove admin
        if (btn === '2'){
            callApiRemoveAdmin()
            .then(res => {
                var parsed = JSON.parse(res.express); 
                setRemoveAdmin('');
                setIsRemoveActive(false);
                onChange();
                notifyRemove(user);
            })
        }
        setBtn('');
    }

    const callApiAddAdmin = async () => {
        const url = serverURL + "/api/addAdmin";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: addAdmin,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const callApiRemoveAdmin = async () => {
        const url = serverURL + "/api/removeAdmin";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: removeAdmin,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const handleAddClick = (e) => {
        setIsAddActive(current => !current);
        setBtn('1');
        if (isRemoveActive){
            setIsRemoveActive(current => !current);
            setRemoveAdmin('');
        }
    }

    const handleRemoveClick = (e) => {
        setIsRemoveActive(current => !current);
        setBtn('2');
        if (isAddActive){
            setIsAddActive(current => !current);
            setAddAdmin('');
        }
    }

    const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        if ((btn !=='') && (addAdmin !== '' || removeAdmin !=='')){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [btn, addAdmin, removeAdmin])

    if (!open) return null
    return(<>
        <Dialog open={open} close={close} >
            <DialogTitle style={{background:'#eceef8', width:'500px', borderBottom:'#eceef8 solid 1px'}} >
                <span style={{display:'flex', width:'100%', borderBottom:'0.5px solid #c6cceb', paddingBottom:'10px'}}>Manage Club Admins</span>
            </DialogTitle>
            <DialogContent style={{background:'#eceef8', paddingBottom:'40px', minHeight:'120px', width:'500px'}}>
                <Grid style={{display:'flex', justifyContent:'space-between'}}>
                    <StyledBtn name='add' 
                        className={(isAddActive && ActiveBtn)}
                        onClick={handleAddClick} >
                        <Img src={add} />
                        <RadioBtnFont>Add Admin</RadioBtnFont>
                    </StyledBtn>
                    <StyledBtn 
                        name='remove' 
                        className={(isRemoveActive && ActiveBtn)}
                        onClick={handleRemoveClick} >
                        <Img src={remove} />
                        <RadioBtnFont>Remove Admin</RadioBtnFont>
                    </StyledBtn>
                </Grid>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {btn === '1' && 
                    <List title={"Select a member to become admin"} arr={currentMembers} onSelect={setAddAdmin}/>}
                    {btn === '2' && 
                    <List title={"Select an admin to remove"} arr={currentAdmins} onSelect={setRemoveAdmin}/>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{close(); setBtn('');}}>Cancel</Button>
                <Button disabled={disabled} id='submit-btn' onClick={()=>{setOpenConfirmationDialog(true);}}>Submit</Button>
                <ConfirmationDialog 
                    guest={guest}
                    open={openConfirmationDialog} 
                    back={()=>{setOpenConfirmationDialog(false)}} 
                    cancel={close} 
                    onSubmit={handleSubmit}
                    addAdmin={addAdmin}
                    removeAdmin={removeAdmin}
                    add={isAddActive}
                    members={members}
                    />
            </DialogActions>
        </Dialog >
        </>)
};

export default ManageAdminDialog;

const AdminPagination = ({arr, numPerPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfElementsPerPage = numPerPage;

    const indexOfLastElement = (currentPage) * numberOfElementsPerPage;
    const indexOfFirstElement = indexOfLastElement - numberOfElementsPerPage;
    const currentElements = arr.slice(indexOfFirstElement, indexOfLastElement);
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    return(<>
        <Pagination variant="outlined" color="primary" shape='rounded' count={Math.ceil(currentElements.length/numberOfElementsPerPage)} page={currentPage} onChange={handlePageClick} />
    </>)
}

const List = ({title, arr, onSelect}) => {
    const [radioBtn, setRadioBtn] = React.useState('1');
    const [selectedMember, setSelectedMember] = React.useState(''); 
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setRadioBtn('');
        setSelectedMember('');
    }

    const handleRatioBtn = (e) => {
        setRadioBtn(e.target.value);
        onSelect(e.target.value);
    }

    const filteredMembers = arr.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
    <Grid style={{width:'100%', marginTop:'30px', paddingTop:'20px', borderTop:'0.5px solid #c6cceb'}} >
        <Typography style={{paddingBottom:'10px'}}><b>{title}</b></Typography>
        <Search value={searchTerm} onChange={handleSearchTerm}/> 
        <RadioGroup
            column
            name="position"
            value={radioBtn}
            onChange={handleRatioBtn}
            color='primary'
                >
            <Grid style={{display:'flex', flexDirection:'column', background:'#fff', width:'100%', borderRadius:'8px'}}>
                {Object.values(filteredMembers).map((member) => (
                    <RadioBtn key={member.uid} style={{background:'#fff', textTransform:'none', borderBottom:'1px lightgray solid', borderRadius:'0'}}>
                        <Typography style={{marginLeft:'10px'}}>{member.name}</Typography>
                        <FormControlLabel
                            value={member.uid}
                            control={<Radio />}
                            labelPlacement="start"
                            color='primary'
                        />  
                    </RadioBtn>   
                    ))}
                </Grid>
                {/* <Grid item style={{display:'flex', justifyContent:'center', width:'100%', marginTop:'10px'}}>
                    <AdminPagination arr={arr} numPerPage={5} />
                </Grid> */}
            </RadioGroup>
            {selectedMember && 
            <Grid style={{paddingTop:'30px'}}>
                <Typography>The selected new club owner is <b>{selectedMember}</b></Typography>
            </Grid>
            }
       </Grid> )
}

const Search = ({value, onChange}) => {

    return(<>
    <Grid style={{marginBottom:'20px', width:'100%'}}>
        <TextField 
            id="outlined-basic" 
            label="Search Members" 
            variant="filled"
            color="success"
            fullWidth
            value={value}
            onChange={onChange} 
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <Img src={search} />
                </InputAdornment>),
                onKeyDown: (e) => {
                    if (e.key === 'Enter') {
                    e.stopPropagation();
                    }
                }}} />
    </Grid>
    </>)

}

const ConfirmationDialog = ({guest, open, back, cancel, addAdmin, removeAdmin, add, members, onSubmit}) => {
    let user = ""
    let title = ""
    let action = ""

    if (add){
        title = "Add Club Admin"
        user = members.find((member) => member.uid == addAdmin);
        if (user){
            action = "Are you sure you want to make the following user a club admin?"
            user = user.name;
        }
    } else {
        title = "Remove Club Admin"
        user = members.find((member) => member.uid == removeAdmin);
        if (user) {
            action = "Are you sure you want to remove the following user from club admins?"
            user = user.name;
        }
    }

    if (!open) return null
    return(
    <Dialog open={open} close={back} >
        <DialogContent style={{background:'#eceef8', paddingBottom:'10px', minHeight:'120px', width:'400px'}}>
            <Grid container style={{display:'flex', flexDirection:'column'}}>
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <Box style={{textAlign:'center'}}>
                        <Typography style={{margin:'0 0 20px 0'}}>
                            {action}
                            <br /><br />
                            <b>{user}</b>
                        </Typography>
                    </Box> 
                </Grid>
            </Grid>
            {guest.guestMode &&
            <Grid>
                <Typography style={{textAlign:'center', color:'grey', fontStyle:'italic', fontSize:'10pt'}}>
                    Since you are in guest mode, you cannot confirm this action.
                </Typography>
            </Grid>
            }   
        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:'space-between'}}>
            <Grid>
                <Button onClick={()=>{back();}}>Back</Button>
            </Grid>
            <Grid>
                <Button onClick={()=>{back();cancel();}}>Cancel</Button>
                <Button disabled={guest.guestMode} onClick={()=>{back();cancel(); onSubmit(user);}}>Confirm</Button>
            </Grid>
        </DialogActions>
    </Dialog >
    )
}
