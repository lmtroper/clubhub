import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../../authentication/firebase";
import {
  ref, uploadBytes, uploadBytesResumable, getDownloadURL, listAll, deleteObject, getMetadata
} from "firebase/storage";
import { useParams } from 'react-router-dom';
import { v4 } from "uuid"
import { Grid, Typography, Modal, Card, CardContent, Fab, CircularProgress } from '@mui/material'
import { styled } from "@mui/system";
import { fetchUserClubRole } from 'api/ClubsAPI';
import ImageGrid from "./ImageGrid";
import ImageModal from "modals/ImageModal";
import ImageSpeedDial from "./ImageSpeedDial";
import AddImagesExplorePageModal from "modals/AddImagesExplorePageModal";
import NoResults from 'images/no-results2.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Img = styled('img')({
  height: '270px',
});
const NoPhotosMsg = styled(Typography)({
  letterSpacing:'1px',
  fontSize:'3em', 
  fontWeight:'bolder',
  color:'rgb(230,104,33)',
  fontFamily:'Shrikhand, sans-serif',
  position: 'relative',
  bottom:'24px',
  fontFamily:'Lilita One, sans-serif',
});

const ImageUploadAndDisplay = () => {
  const { clubID } = useParams()
  const user = useSelector((state) => state.user.uid);
  const guest = useSelector((state) => state.guest);

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [incorrectFileAlert, setIncorrectFileAlert] = useState(false)
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectMenu, setSelectMenu] = useState(false)
  const [checkedImages, setCheckedImages] = useState([])
  const [exploreImages, setExploreImages] = useState([])
  const [selectImagesModal, setSelectImagesModal] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [photosEmpty, setPhotosEmpty] = useState(false)

  React.useEffect(() => {
    if (guest.guestMode && guest.memberType[clubID] !== 'member'){
      setAdmin(true);
    } else if (user){
      fetchUserClubRole(clubID, user).then((res) => {
        setAdmin(res)
      });
    } else {
      setAdmin(false);
    }
  }, [user]);


  const fileInputRef = useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
    setIncorrectFileAlert(false)
  };

  const getImageNameFromUrl = (url) => {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const encodedName = pathParts[pathParts.length - 1];
    return decodeURIComponent(encodedName);
  };

  const handleIncorrectFileAlert = () => {
    setIncorrectFileAlert(true);
    setImage(null)
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (incorrectFileAlert === false) {
      setIsUploading(true);
      const storageRef = ref(storage, `images/${clubID}/clubboard/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        () => { },
        (error) => {
          setIsUploading(false);
        },
        async () => {
          const url = await getDownloadURL(storageRef);
          setImages((prevState) => [...prevState, url]);
          setIsUploading(false);
        }
      );
      setOpenModal(false)
      setImage(null)
      successfulUpload()
    }
  };

  const handleCheckChange = (event, image) => {
    let tempCheckedImages = checkedImages.slice()
    if (event.target.checked) {
      tempCheckedImages.push(image)
    }
    else {
      tempCheckedImages = tempCheckedImages.filter((storedImage) => storedImage !== image)
    }
    setCheckedImages(tempCheckedImages)
  }

  const handleExploreUpload = async () => {
    const listRef = ref(storage, `images/${clubID}/explore`);
    const list = await listAll(listRef);
    if (checkedImages.length > 0) {
      await Promise.all(list.items.map((fileRef) => deleteObject(fileRef)));
    }

    for (let i = 0; i < checkedImages.length; i++) {
      const checkedImage = ref(storage, checkedImages[i]);
      const checkedImageMetadata = await getMetadata(checkedImage)
      const checkedImageName = checkedImageMetadata.name
      const checkedImageUrl = await getDownloadURL(checkedImage)
      const targetRef = ref(storage, `images/${clubID}/explore/${checkedImageName}`);

      const response = await fetch(checkedImageUrl)
      const imageData = await response.blob()

      await uploadBytes(targetRef, imageData)
    }
  }

  const deleteImage = async (imageUrl) => {
    const imageName = getImageNameFromUrl(imageUrl);
    const imageRef = ref(storage, `${imageName}`);
    const exploreFileName = decodeURIComponent(imageUrl.split('/').pop().split('?')[0]).split("clubboard/")[1];
    const exploreFileRef = ref(storage, `images/${clubID}/explore/${exploreFileName}`)
    const exploreFileRefExists = await getDownloadURL(exploreFileRef)
      .then(() => true)
      .catch(() => false)
    await deleteObject(imageRef);
    if (exploreFileRefExists) {
      await deleteObject(exploreFileRef)
    }
    setImages((prevState) => prevState.filter((url) => url !== imageUrl));
    // successfulDelete();
  };

  const formatFileName = async (item) => {
    const downloadUrl = await getDownloadURL(item);
    const filePath = decodeURIComponent(downloadUrl.split('/').pop().split('?')[0]);
    const fileName = filePath.split("explore/")[1]
    return fileName;
  }

  toast.configure();
  const alert = () => {
    toast.error("You can only select a maximum of 3 images to display on the explore page.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulDelete = () => {
    toast.success("Image successfully deleted.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulUpload = () => {
    toast.success("Image successfully uploaded.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulMove = () => {
    toast.success("Image(s) will be displayed on Explore page.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, `images/${clubID}/clubboard`);
      const list = await listAll(listRef);
      const imageUrls = await Promise.all(list.items.map((item) => getDownloadURL(item)));
      setImages(imageUrls);
      if (imageUrls.length === 0) {
        setPhotosEmpty(true)
      }
    };
    fetchImages();
  }, [clubID]);

  useEffect(() => {
    const fetchExploreImages = async () => {
      const listRef = ref(storage, `images/${clubID}/explore`);
      const list = await listAll(listRef);
      const checkedImageUrls = await Promise.all(list.items.map(async (item) => {
        const downloadUrl = await getDownloadURL(item);
        const fileName = decodeURIComponent(downloadUrl.split('/').pop().split('?')[0]).split("explore/")[1];
        const clubboardFileRef = ref(storage, `images/${clubID}/clubboard/${fileName}`)
        const clubboardDownloadUrl = await getDownloadURL(clubboardFileRef)
        return clubboardDownloadUrl
      }));
      setCheckedImages(checkedImageUrls)
    };
    fetchExploreImages();
  }, [selectImagesModal, selectMenu, clubID]);

  return (
    <Grid container style={{minHeight:'100vh', display:"flex", justifyContent:"space-between", padding:'30px', background:'#f5f5f5'}}>
        <Grid item style={{flex:3, margin:"0 40px 0 0"}}>
          {photosEmpty ? 
          <Grid style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <Img src={NoResults} />
            <NoPhotosMsg>No photos yet!</NoPhotosMsg>
          </Grid>
          : 
          <ImageGrid
            images={images}
            deleteImage={deleteImage}
            deleteMenu={deleteMenu}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            selectMenu={selectMenu}
            checkedImages={checkedImages}
            setCheckedImages={setCheckedImages}
            handleCheckChange={handleCheckChange}
            exploreImages={exploreImages}
            formatFileName={formatFileName}
            photosEmpty={photosEmpty}
          />}
        </Grid>
        {checkedImages.length > 0 && selectMenu &&
        <Grid style={{flex:1}}>
            <Fab size="large" variant="extended" color="secondary"
              onClick={() => {
                if (checkedImages.length <= 3) {
                  handleExploreUpload();
                  setCheckedImages([]);
                  setSelectMenu(false);
                  setSelectImagesModal(true);
                  setTimeout(() => {
                    setSelectImagesModal(false)
                    setSelectMenu(false)
                    // successfulMove()
                  }, 5000)
                } else {
                  // alert();
                }
              }}>
              Display
            </Fab>
          </Grid>

          }
        <ImageModal
          openModal={openModal}
          setImage={setImage}
          setOpenModal={setOpenModal}
          handleFileSelect={handleFileSelect}
          handleChange={handleChange}
          handleUpload={handleUpload}
          image={image}
          isUploading={isUploading}
          fileInputRef={fileInputRef}
          handleIncorrectFileAlert={handleIncorrectFileAlert}
          incorrectFileAlert={incorrectFileAlert}
          setIncorrectFileAlert={setIncorrectFileAlert}
        />
        {admin &&
          <ImageSpeedDial
            guest={guest}
            setOpenSpeedDial={setOpenSpeedDial}
            openSpeedDial={openSpeedDial}
            setOpenModal={setOpenModal}
            setDeleteMenu={setDeleteMenu}
            deleteMenu={deleteMenu}
            selectMenu={selectMenu}
            setSelectMenu={setSelectMenu}
            setCheckedImages={setCheckedImages}
          />
        }
      <AddImagesExplorePageModal open={selectImagesModal} />
    </Grid >
  );
}

export default ImageUploadAndDisplay;
