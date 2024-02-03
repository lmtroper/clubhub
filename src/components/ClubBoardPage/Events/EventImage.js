import { useState } from 'react'
import { Skeleton } from '@mui/material'
import { styled } from '@mui/system';
import img1 from '../../../images/events/celebration.png'
import img2 from '../../../images/events/meeting.png'
import img3 from '../../../images/events/celebration2.png'
import img4 from '../../../images/events/karaoke.png'
import img5 from '../../../images/events/meeting2.png'
import img6 from '../../../images/events/cocktail.png'
import img7 from '../../../images/events/conference.png'
import img8 from '../../../images/events/celebration3.png'
import img9 from '../../../images/events/concert.png'
import img10 from '../../../images/events/meeting3.jpg'
import sidebar from '../../../images/events/sidebar.jpg'

const StyledImg = styled('img')({
    height: '180px',
    width: '265px',
    borderRadius: '12px',
});

const EventImage = ({ image, skeletonWidth, skeletonHeight }) => {
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
        11: sidebar,
    }
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }} >
            <StyledImg
                src={placeholders[image]}
                style={{ display: loading ? "none" : "block", width: "100%" }}
                onLoad={(e) => { setLoading(false) }} />
            <Skeleton
                variant="rect"
                animation="pulse"
                width={skeletonWidth}
                height={skeletonHeight}
                style={{ display: !loading && "none", borderRadius: '12px' }} />
        </div>
    )
}

export default EventImage
