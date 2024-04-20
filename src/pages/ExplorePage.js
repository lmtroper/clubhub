import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

import ClubCard from "../components/ExplorePage/ClubCard";
import ClubDropdown from "../components/ExplorePage/ClubDropdown";
import ClubSearchField from "../components/ExplorePage/ClubSearchField";
import PaginationControls from "../components/ExplorePage/PaginationControls";

import { fetchAllClubs, fetchClubMemberships } from "../api/ClubsAPI";
import { intersectArrays, unionArrays } from '../utils';
import { useSelector } from "react-redux";

const Wrapper = styled('div')({
    maxWidth: 800,
    margin: "0 auto",
});
const FilterHeader= styled(Grid)({
  display:'flex', 
  justifyContent:'space-between',
  alignItems:'center',
});
const StyledGrid = styled(Grid)({
  display:'flex',
  flexDirection:'column'
});
const StyledList = styled('ul')({
  padding:'0'
});

const ExplorePage = () => {
  const user = useSelector((state) => state.user.uid);
  const guest = useSelector((state) => state.guest);
  // Club Data
  const [clubs, setClubs] = useState([]);

  // Filtered Club Data
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [clubsByCategory, setClubsByCategory] = useState([]);
  const [clubsBySearch, setClubsBySearch] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [clubsToDisplay, setClubsToDisplay] = useState([]);

  // Club Membership
  const [listOfClubs, setListOfClubs] = React.useState([]);

  useEffect(() => {
    fetchAllClubs(setClubs, setFilteredClubs);
    handleClubMemberships(user);
  }, []);

  useEffect(() => {
    handleClubMemberships(user);
  }, [user, guest.clubMemberships]);

  const handleClubMemberships = (user) => {
    try {
      if (guest.guestMode) {
        setListOfClubs(guest.clubMemberships);
      } else {
        fetchClubMemberships(user).then((parsed) => {
          setListOfClubs(parsed);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (clubsByCategory.length !== 0 && clubsBySearch.length !== 0) {
      setFilteredClubs(intersectArrays(clubsByCategory, clubsBySearch));
    } else {
      setFilteredClubs(unionArrays(clubsByCategory, clubsBySearch));
    };
    setCurrentPage(1);
  }, [clubsByCategory, clubsBySearch]);

  return (
    <Wrapper>
      <FilterHeader container>
        <ClubDropdown clubs={clubs} setFilteredClubs={setClubsByCategory} />
        <ClubSearchField clubs={clubs} setFilteredClubs={setClubsBySearch} />
      </FilterHeader>
      <StyledGrid container>
        <StyledList>
          {clubsToDisplay.map((club, key) => (
            <ClubCard 
              key={key} 
              club={club} 
              guest={guest}
              isMember={listOfClubs} 
              onJoin={()=>{handleClubMemberships(user)}}/>
          ))}
        </StyledList>
      </StyledGrid>
      <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} clubs={filteredClubs} setClubsToDisplay={setClubsToDisplay} />
    </Wrapper>
  );
};
export default ExplorePage;
