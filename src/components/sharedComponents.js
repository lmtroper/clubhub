import styled from "@emotion/styled";
import { Card, CardMedia, Grid } from "@mui/material";

const DashboardHeader = styled(Card)(({ backgroundColor }) => ({
    height: '250px',
    display: 'flex',
    margin: '40px 0 30px 0',
    alignContent: 'center',
    backgroundColor: backgroundColor || 'none',
}));

const DashboardImage = ({ size, image, width, padding }) => {
    return(
        <Grid item xs={size} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CardMedia component="img" image={image} style={{ width:{width}, paddingRight:{padding}}}/>
        </Grid>
    )
};

export { DashboardHeader, DashboardImage }
