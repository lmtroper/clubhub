import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { styled } from "@mui/system"
import { Link } from 'react-router-dom';
import { Group } from '@mui/icons-material';
import AnnouncementImage from './AnnouncementImage';
import lock from 'images/lock-icon.png';


const Wrapper = styled(Grid)({
    display:'flex'
})
const ContentWrapper = styled(Grid)({
    flex:1, 
    boxShadow: 'rgba(99, 99, 99, 0.2) 2px 8px 8px', 
    background: '#fff', 
    display: 'flex', 
    flexDirection: 'column',
    flex: 2
})
const ContentHeader = styled(Grid)({
    padding: '20px 20px 0px', 
    display: 'flex', 
    justifyContent: 'space-between',
})
const AdminStatusWrapper = styled(Grid)({
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'end'
})
const Date = styled(Typography)({
    color: 'grey', 
    fontSize: '11pt', 
    letterSpacing: '0.5px'
})
const Content = styled(Grid)({
    padding: '0 20px 20px'
})
const Title = styled(Typography)({
    color: 'rgb(55,72,97)', 
    fontSize: '14pt', 
    marginTop: '10px', 
    marginBottom: '5px', 
    fontWeight: '600'
})

const AnnouncementPostContent = ({ announcement, onDashboard, club_id }) => {
  return (
        <Wrapper>
            <ContentWrapper>
                <ContentHeader>
                    <Grid>
                    {onDashboard &&
                        <Link 
                            to={"/clubboard/" + club_id} 
                            style={{ textDecoration: 'none' }} 
                            onClick={() => { window.scrollTo(0, 0) }}
                        >
                            <Typography color='primary' style={{ justify: "space-between", fontFamily: 'Arvo, serif', display:'flex' }}>
                                <Group style={{ marginRight: '3px' }} color='primary'/> {announcement.name}
                            </Typography>
                        </Link>}
                    </Grid>
                    <AdminStatusWrapper>
                        {announcement.visibility === 'private' &&
                            <Box style={{ display: 'flex', marginBottom: '5px', justifyContent: 'center' }}>
                                <img src={lock} style={{ height: '15px', marginRight: '5px' }} />
                                <Typography variant="body2" color='primary'>Admin Visibility</Typography>
                            </Box>
                        }
                        <Date>
                            {announcement.time_posted_text}
                        </Date>
                    </AdminStatusWrapper>
                </ContentHeader>
                <Content>
                    <Title>
                        {announcement.title}
                    </Title>
                    <Typography style={{ fontSize: '11pt' }}>
                        {announcement.body}
                    </Typography>
                </Content>
            </ContentWrapper>
            <Grid style={{flex: 1}}>
                <AnnouncementImage 
                    image={announcement.placeholder_photo} 
                    skeletonWidth={200} 
                    skeletonHeight={200} />
            </Grid>
    </Wrapper>
  )
}

export default AnnouncementPostContent
