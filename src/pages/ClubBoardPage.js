import React from 'react';
import { styled } from "@mui/system"
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Announcements from '../components/ClubBoardPage/Announcements/Announcements';
import Members from '../components/ClubBoardPage/Members/Members';
import { useParams } from 'react-router-dom';
import { serverURL } from '../constants/config';
import Events from './EventsPage';
import { useSelector, useDispatch } from 'react-redux';
import { setClubMembers } from 'global/actions';

import ImageUploadAndDisplay from '../components/ClubBoardPage/Photos/Photos';


const Header = styled(Grid)({
    borderBottom:'rgba(121, 121, 121, 0.07) solid 1px',
    background:'#fff',
})

const HeaderTitle = styled(Grid)({
    display:'flex',
    alignItems:'end',
    margin:'50px'
})

const ClubTitle = styled(Typography)({
    fontWeight:'200',
    fontFamily: 'sans-serif',
})

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      border: 0,
      padding: '11px 25px',
      flex: '1', // Use flex-grow to evenly space the ToggleButtonGroup items
      '&.Mui-selected': {
        background: 'none',
        color: '#3f51b5',
        borderBottom: '#3f51b5 3px solid',
        borderRadius: '0px!important',
      },
      '&.Mui-hover': {
        background: 'none',
        color: '#3f51b5',
        borderBottom: '#3f51b5 3px solid',
        borderRadius: '0px!important',
      },
    },
}));

const ClubBoardPage = () => {
    const dispatch = useDispatch();
    const guest = useSelector((state) => state.guest);
    const loadedMembers = useSelector((state) => state.clubs.clubMembers);

    const { clubID } = useParams();
    const club = useSelector((state) => state.clubs.clubDetails[clubID]);
    const [clubTitle, setClubTitle] = React.useState();
    const [toggle, setToggle] = React.useState('1');
    const [members, setMembers] = React.useState([]);

    React.useEffect(() => {
        getClubTitle();
        getClubMembers();
    },[]);

    const handleToggle = (event, newToggle) => {
        if (newToggle !== null) {
            setToggle(newToggle);
        }
    };

    const getClubTitle = () => {
        if (club) {
            setClubTitle(club.name);
        } else {
        callApiGetClubs()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setClubTitle(parsed[0].name)
            })
        };
    }

    const callApiGetClubs = async () => {
        const url = serverURL + '/api/getClubs';
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

        // CLUB MEMBERS
        const getClubMembers = () => {
            if (loadedMembers[clubID]) {
                setMembers(loadedMembers[clubID]);
            } else {
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
                        dispatch(setClubMembers(clubID, parsed));
                        console.log('parsed')
                        console.log(parsed)
                })
            }
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

    return (<>
        <Header container>
            <HeaderTitle item xs={7}>
                <ClubTitle variant='h4'>{clubTitle}</ClubTitle>
            </HeaderTitle>
        </Header> 
        <Grid style={{display:'flex', flexDirection:'column'}}>
            <StyledToggleButtonGroup
                value={toggle}
                default={'1'}
                exclusive
                onChange={handleToggle}>
                    <ToggleButton value="1">
                        Announcements
                        </ToggleButton>
                        <ToggleButton value="2">
                        Events
                        </ToggleButton>
                        <ToggleButton value="3">
                        Members
                        </ToggleButton>
                        <ToggleButton value="4">
                        Photos
                        </ToggleButton>
            </StyledToggleButtonGroup>
            {toggle === '1' && <Announcements clubTitle={clubTitle} />}
            {toggle === '2' && <Events clubTitle={clubTitle} />}
            {toggle === '3' && <Members members={members} getClubMembers={getClubMembers} />}
            {toggle === '4' && <ImageUploadAndDisplay />}
        </Grid>
   </>)
}

export default ClubBoardPage;

