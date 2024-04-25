import React, { useEffect, useState } from 'react';
import { styled } from "@mui/system";
import { Grid, TextField } from "@mui/material";

const Wrapper = styled(Grid)({
    width:'300px',
    padding:'25px 0 15px 0',
    flex: 1,
});
const Search = styled(TextField)({
    marginBottom: "16px",
    paddingHorizontal: "100px",
    alignItems: "center",
});

/**
 * Search field component to filter clubs by name
 * 
 * @param {Object} appliedFilter - Flag used to determine whether a search filter is set.
 * @param {Array} clubs - Array of club objects.
 * @param {Function} setFilteredClubs - Function to set the filtered clubs.
 */
const ClubSearchField = ({ appliedFilter, clubs, setFilteredClubs }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        const filteredClubs = clubs.filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredClubs(filteredClubs);

        // Set applied filter flag
        if (searchTerm === "") {
            appliedFilter(false);
        } else {
            appliedFilter(true);
        }
    }

    return (
        <Wrapper item>
            <Search
            variant="outlined"
            label="Search by club name"
            value={searchTerm}
            onChange={handleSearch}
            margin = "dense"
            fullWidth
            />
        </Wrapper>
    );
};
export default ClubSearchField;
