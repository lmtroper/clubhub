import { useState } from 'react'
import { Skeleton } from '@mui/material'
import { styled } from '@mui/system'
import img1 from 'images/announcements/img1.png'
import img2 from 'images/announcements/img2.png'
import img3 from 'images/announcements/img3.png'
import img4 from 'images/announcements/img4.png'
import img5 from 'images/announcements/img5.png'
import img6 from 'images/announcements/img6.png'
import img7 from 'images/announcements/img7.png'
import img8 from 'images/announcements/img8.png'
import img9 from 'images/announcements/img9.png'
import img10 from 'images/announcements/img10.png'
import img11 from 'images/announcements/img11.png'
import img12 from 'images/announcements/img12.png'

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
const StyledImg = styled('img')(({ loading }) => ({
    display: loading ? "none" : "block", 
    width: "100%", 
    height: '230px',
    borderRadius: '0 0 10px 0'
}));

const AnnouncementImage = ({ image, skeletonWidth, skeletonHeight }) => {
    const placeholders = {
        1: img1,
        2: img2,
        3: img3,
        4: img4,
        5: img5,
        6: img6,
        7: img7,
        8: img8,
        9: img9,
        10: img10,
        11: img11,
        12: img12,
    }

    const [loading, setLoading] = useState(true);
    return (
        <Wrapper>
            <StyledImg
                src={placeholders[image]}
                onLoad={(e) => { setLoading(false) }} />
            <Skeleton
                variant="rect"
                animation="pulse"
                width={skeletonWidth}
                height={skeletonHeight}
                style={{ display: !loading && "none", borderRadius: '12px' }} />
        </Wrapper>
    )
}

export default AnnouncementImage
