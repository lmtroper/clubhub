import React, { useState } from 'react';
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

const ClubSearchField = ({ clubs, setFilteredClubs }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        const filteredClubs = clubs.filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredClubs(filteredClubs);
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
