import React from 'react';
import { styled } from "@mui/system";
import { AppBar, CssBaseline, Grid, Toolbar, Typography, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { Login } from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../authentication/context';
import { useSelector } from 'react-redux';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});
const NavLink = styled(Grid)({
  display:'flex',
  flex:2
});
const StyledLink = styled(Link)({
  fontFamily: 'Biryani, sans-serif',
  textDecoration: "none",
  fontWeight: 800,
  color: "white",
  fontSize: "15px",
  marginLeft: '10%',
  "&:hover": {
    color: "yellow",
    borderBottom: "1px solid white",
  },
  "&.active": {
    background: 'red',
    color: "yellow",
    borderBottom: "1px solid white",
  },
});
const StyledLogoLink = styled(Link)({
  textDecoration: "none",
  color: "white",
  margin: '0', 
  flex: 1,
  display:'flex', 
  fontSize: '22pt',
  justifyContent:'center',
});
const Logo = styled(Typography)({
  fontFamily: 'Lilita One, sans-serif',
  fontSize: '22pt',
  color: 'white',
  borderBottom: 'yellow 2px solid',
  "&:hover": {
    color: "white",
    fontSize: '24pt',
    borderBottom: "3px solid yellow",
  },
  letterSpacing: '2px',
});

const Navbar = () => {
  const user = useSelector((state) => state.user.uid);
  const guest = useSelector((state) => state.guest.guestMode);
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{zIndex: 1201}} style={{background:"#3f51b5"}}>
        <StyledToolbar>
          <NavLink item xs={4} >
              <StyledLink
                to='/'
                onClick={() => navigate('/')}
              >
                Home
              </StyledLink>
            <StyledLink
              to='/explore'
              onClick={() => navigate('/explore')}
              >
              Explore
            </StyledLink>
            {(user || guest) &&
              <StyledLink
                to='/myclubs'
                onClick={() => navigate('/myclubs')}
                >
                My Clubs
              </StyledLink>}
          </NavLink>
          <StyledLogoLink
            to='/'
            onClick={() => navigate('/')}
            >
              <Logo>CLUBHUB</Logo>
          </StyledLogoLink>
          <Login />
        </StyledToolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
