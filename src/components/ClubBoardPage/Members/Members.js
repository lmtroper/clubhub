import React from 'react';
import { styled } from "@mui/system";
import { Paper, Typography, Button, Grid, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import profile from '../../../images/profile-icon.png';
import membersIcon from '../../../images/members.png';
import ManageAdmin from '../../../modals/ManageAdmin';
import TransferOwnership from '../../../modals/TransferOwner';
import { useParams } from 'react-router-dom';
import { serverURL } from '../../../constants/config';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Wrapper = styled(Grid)({
    display: 'flex',
    flexDirection: 'row',
    padding: '20px 10px 20px 30px',
    background:'#f5f5f5',
    minHeight:'100vh',
})

const Profile = styled('img')({
    height: '30px',
    padding: '0 15px 0 5px'
})

const StyledMemberCard = styled(Card)({
    margin: '10px 0 30px 0',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const AdminBtnGroup = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const Text1 = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.6)'
});

const Text2 = styled(Typography)({
    fontWeight: '600',
    fontSize: '25pt'
});

const OwnerText = styled(Typography)({
    padding: '5px 15px',
    borderRadius: '5px',
    background: 'rgba(149, 0, 204, 0.1)'
});

const AdminText = styled(Typography)({
    padding: '5px 15px',
    borderRadius: '5px',
    background: 'rgba(255, 104, 104, 0.1)'
});
const UserText = styled(Typography)({
    padding: '5px 15px',
    borderRadius: '5px',
    background: 'rgba(136, 191, 255, 0.1)',
});


const AdminBtn = styled(Button)({
    minWidth: '130px',
    padding: '5px 15px',
    color: 'white',
    borderRadius: '8px',
    textTransform: 'none',
    marginBottom: '10px'
})

const Members = ({ name, onChange }) => {
    const user = useSelector((state) => state.user.uid);
    const guest = useSelector((state) => state.guest);
    const navigate = useNavigate();
    const { clubID } = useParams();
    const [members, setMembers] = React.useState([]);
    const [currentUserRole, setCurrentUserRole] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);


    React.useEffect(() => {
        getClubMembers();
    }, []);

    React.useEffect(() => {
        if (guest.guestMode) {
            if (guest.memberType[clubID] === 'owner' || guest.memberType[clubID] === 'admin'){
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } else {
            if (members.length > 0){
                setCurrentUserRole(members.find((member) => member.uid == user).role)
                
                if (["owner", "admin"].includes(currentUserRole)){
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        }
    }, [members, currentUserRole]);

    
    const [openOwnerDialog, setOpenOwnerDialog] = React.useState(false);
    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenOwnerDialog(false);
            setOpenAdminDialog(false);
        }
    };

    // CLUB MEMBERS
    const getClubMembers = () => {

        callApiGetClubMembers()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setMembers(parsed);
                if(guest.guestMode){
                    const dataArray = [...parsed, {"name" : "Guest/Demo", "role": guest.memberType?.[clubID], "uid": "G"}]
                    const sortedArray = dataArray.sort((a, b) => {
                        // Define the order of roles
                        const roleOrder = { "owner": 0, "admin": 1, "user": 2 };
                        // Compare roles based on the predefined order
                        return roleOrder[a.role] - roleOrder[b.role];
                      });
                    setMembers(sortedArray);
                }
            })
    }


    const callApiGetClubMembers = async () => {
        const url = serverURL + '/api/getClubMembers';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                clubID: clubID
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleUserRoleAfterTransfer = (role) => {
        setCurrentUserRole(role);
    }

    return ( <>
        <Wrapper container>
            <Grid item xs={3}>
                <StyledMemberCard >
                    <img src={membersIcon} style = {{ height: '50px' } } /> 
                    <Text2 color = 'primary' > 
                        { members.filter((m) => m.role !== "pending").length } 
                    </Text2> 
                    <Text1 color = "text.secondary" > 
                        Club Members
                    </Text1> 
                </StyledMemberCard> 
                {isAdmin &&
                    <AdminBtnGroup >
                        {currentUserRole === 'owner' && <>
                        <AdminBtn 
                            onClick = {() => { setOpenOwnerDialog(true) }}
                            style = {{ background: '#283371' }}>
                                Transfer Club Ownership 
                        </AdminBtn> 
                        <TransferOwnership open={openOwnerDialog} close={handleClose} members={members.slice(1, members.length)} currentUser={user} onChange={getClubMembers} changeUserStatus={handleUserRoleAfterTransfer}/> 
                        </>}

                        <AdminBtn 
                            onClick = {() => { setOpenAdminDialog(true) } }
                            style = {{ background: '#5566c3' } } > 
                            Manage Admins 
                        </AdminBtn> 
                        <ManageAdmin guest={guest} open={openAdminDialog} close={handleClose} members={members} onChange={getClubMembers} currentUser={user} />
                    </AdminBtnGroup>}    
            </Grid> 
            <Grid item xs = {5} style = {{ padding: '10px 0 0 60px' }}>
                 {members.length > 0 &&
                    <TableContainer component = { Paper } >
                        <Table sx = {{ minWidth: 300 }}>
                            <TableHead >
                                <TableRow >
                                    <TableCell >
                                        <Typography>Club Members</Typography> 
                                    </TableCell> 
                                </TableRow> 
                            </TableHead> 
                            {members.filter((member) => member.role !== "pending" ).map((member) => ( 
                            <TableBody >
                                <TableRow sx = {{ '&:last-child td, &:last-child th':{ border: 0 }}} >
                                    <TableCell component = "th" scope = "row" >
                                        <Grid style = {{ display: 'flex' }}>
                                            <Grid xs = { 6 } style={{display:'flex', alignItems:'center'}}>
                                                <Profile src ={profile}/>
                                                {member.name} 
                                            </Grid> 
                                            <Grid> 
                                            {member.role === 'owner' && ( 
                                                <OwnerText>president</OwnerText>
                                                )} 
                                            {member.role === 'admin' && ( 
                                                <AdminText> { member.role } </AdminText>
                                            )} 
                                            {member.role === 'user' && ( 
                                                <UserText>member</UserText>
                                            )} 
                                            </Grid> 
                                        </Grid> 
                                    </TableCell> 
                                </TableRow> 
                            </TableBody>))} 
                        </Table> 
                    </TableContainer>}
            </Grid>        
            {/* <Application members={members} isAdmin={isAdmin} refetchMembers={getClubMembers}/> */}
        </Wrapper>
        </>)
}

export default Members;
