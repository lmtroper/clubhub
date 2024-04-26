import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from "@mui/system"
import { storage } from "../authentication/firebase";
import { fetchClubDetails, fetchUserClubRole, editClubDescription } from "../api/ClubsAPI";
import { Grid, ImageList, ImageListItem, Modal, Typography } from '@mui/material';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import ClubDescriptionCard from '../components/ClubDescription/ClubDescriptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { setClubsDetails } from 'global/actions';

const Wrapper = styled(Grid)({
    maxWidth: 1500,
    alignItems: "center",
    justifycontent: "center",
    marginLeft: '100px'
});
const Title = styled(Typography)({
    display:'flex',
    textAlign: 'justify',
    borderRadius: '3px',
    marginTop: '50px',
    maxWidth: 1150,
    fontFamily: 'Arvo, serif',
    textAlign: 'center',
});

const ExploreClubDescription = () => {
    const { clubID } = useParams();
    const loadedClubDescription = useSelector((state) => state.clubs.clubDetails[clubID]);

    const [clubTitle, setClubTitle] = React.useState("")
    const [clubDescription, setClubDescription] = React.useState("")

    const [images, setImages] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(null)

    useEffect(() => {
        if (loadedClubDescription){
            setClubTitle(loadedClubDescription.name);
            setClubDescription(loadedClubDescription.description);
        }
        fetchClubDetails(clubID).then((club) => {
            setClubTitle(club.name);
            setClubDescription(club.description);
        });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const listRef = ref(storage, `images/${clubID}/explore`);
            const list = await listAll(listRef);
            const imageUrls = await Promise.all(list.items.map((item) => getDownloadURL(item)));
            setImages(imageUrls);
        };
        fetchImages();
    }, [clubID]);

    return (
        <Wrapper>
            <Title variant='h4'>{clubTitle}</Title>
            <Grid>
                <ClubDescriptionCard
                    clubID={clubID}
                    clubTitle={clubTitle}
                    clubDescription={clubDescription} 
                    onChange={setClubDescription}
                />
                <Grid item xs={9}>
                    <ImageList cols={3} gap={10} rowHeight={300}>
                        {images.map((image, index) => (
                            <ImageListItem key={index} style={{ objectFit: 'cover', width: '250px' }}>
                                <img src={image} alt="Club" onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(70%)'}
                                    onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
                                    style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer' }}
                                    onClick={() => { setSelectedImage(image) }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
            <Modal
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
            >
                <img src={selectedImage} alt="Club" style={{ maxHeight: '90vh', maxWidth: '90vw', margin: 'auto', display: 'block' }} />
            </Modal>
        </Wrapper>
    )
}

export default ExploreClubDescription;

