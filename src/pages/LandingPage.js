import React from 'react';

import { styled } from "@mui/system";

import { Typography } from "@mui/material";
import MainImage from "../images/hero-image-1.png";
import SmallImage from "../images/hero-image-2.png";

const Hero1 = styled('img')({
    position: 'absolute',
    top: '90px',
    left: '500px',
    width: '440x',
    height: '520px',
});

const Hero2 = styled('img')({
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: '460px',
    left: '100px'
});

const Headline1 = styled(Typography)({
    fontFamily: 'Arvo, serif',
    position: 'absolute',
    top: '150px',
    left: '100px'
});

const Headline2 = styled(Typography)({
    fontFamily: 'Lilita One, sans-serif',
    letterSpacing: '0.05em',
    color: '#050B8A',
    fontWeight: 800,
    position: 'absolute',
    top: '195px',
    left: '100px'
});

const Subheader1 = styled(Typography)({
    fontFamily: 'Arvo, serif',
    position: 'absolute',
    top: '300px',
    left: '100px',
    fontSize: '1.3em'
});

const Subheader2 = styled(Typography)({
    fontFamily: 'Biryani, sans-serif',
    fontWeight: 200,
    position: 'absolute',
    top: '335px',
    left: '100px',
    maxWidth: '350px',
    fontSize: '1.2em'
});

const Home = () => {
  return (
    <div>
      <Hero1 src={MainImage} alt="" />
      <Hero2 src={SmallImage} alt="" />
      <Headline1 variant = "h4"> 
        University of Waterloo
      </Headline1>
      <Headline2 variant = "h2"> 
        CLUBHUB
      </Headline2>
      <Subheader1 variant = "h5"> 
        Discover and join clubs
      </Subheader1>
      <Subheader2 variant = "h6"> 
        Browse, join, and receive updates about the university's clubs. Find your perfect space!
      </Subheader2>
    </div>

  )
}


export default (Home);
