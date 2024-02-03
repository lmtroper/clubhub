import React, { useEffect } from 'react'
import { Grid, Pagination } from '@mui/material';
import { styled } from "@mui/system";

const Wrapper = styled(Grid)({
    display:'flex',
    justifyContent:'center',
    marginBottom:'20px'
});

const PaginationControls = ({ currentPage, setCurrentPage, clubs, setClubsToDisplay }) => {
    const clubsPerPage = 4;
    let indexOfLastClub = currentPage * clubsPerPage;
    let indexOfFirstClub = indexOfLastClub - clubsPerPage;

    useEffect(() => {
        setClubsToDisplay(clubs.slice(indexOfFirstClub, indexOfLastClub));
    }, [clubs]);

    const handlePageClick = (event, value) => {
        indexOfLastClub = value * clubsPerPage;
        indexOfFirstClub = indexOfLastClub - clubsPerPage;
        setClubsToDisplay(clubs.slice(indexOfFirstClub, indexOfLastClub));
        setCurrentPage(value);
    };
  
    return (
        <Wrapper item>
            <Pagination 
                variant="outlined" 
                color="primary" 
                shape='rounded' 
                count={Math.ceil(clubs.length/clubsPerPage)} page={currentPage} 
                onChange={handlePageClick} />
        </Wrapper>
    )
}
export default PaginationControls;
