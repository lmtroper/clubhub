import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

import ClubCard from "../components/ExplorePage/ClubCard";
import ClubDropdown from "../components/ExplorePage/ClubDropdown";
import ClubSearchField from "../components/ExplorePage/ClubSearchField";
import PaginationControls from "../components/ExplorePage/PaginationControls";

import { fetchAllClubs, fetchClubMemberships } from "../api/ClubsAPI";
import { intersectArrays, unionArrays } from '../utils';
import { useDispatch, useSelector } from "react-redux";
import { clubsList } from "global/actions";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.uid);
  const guest = useSelector((state) => state.guest);
  const loadedClubs = useSelector((state) => state.clubs);
  
  // Club Data
  const [clubs, setClubs] = useState([]);

  // Applied filters
  const [searchFilter, setSearchFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(false);

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
    // Method to fetch all clubs from DB
    const getClubsList = async () => {
      await fetchAllClubs().then((parsed) => {
        setClubs(parsed);
        setFilteredClubs(parsed);
        // setClubsByCategory(parsed);
        // setClubsBySearch(parsed);
        dispatch(clubsList(parsed));
      });
    };

    // Checks if clubs are stored in Redux, if not fetches from DB
    if (loadedClubs.clubs.length !== 0) {
      setClubs(loadedClubs.clubs);
      setFilteredClubs(loadedClubs.clubs);
      // setClubsByCategory(loadedClubs.clubs);
      // setClubsBySearch(loadedClubs.clubs);
    } else {
      getClubsList();
    }
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

  // UseEffect to filter clubs by category and search
  useEffect(() => {
    // If both filters are empty, display all clubs
    if (categoryFilter && searchFilter) {
      console.log('in2')
      console.log(clubsByCategory, clubsBySearch)
      setFilteredClubs(intersectArrays(clubsByCategory, clubsBySearch));
    } else if (categoryFilter) {
      setFilteredClubs(clubsByCategory);
    } else if (searchFilter) {
      console.log('applied search filter!')
      setFilteredClubs(clubsBySearch);
    }
    setCurrentPage(1);
  }, [clubsByCategory, clubsBySearch]);

  return (
    <Wrapper>
      <FilterHeader container>
        <ClubDropdown appliedFilter={setCategoryFilter} clubs={clubs} setFilteredClubs={setClubsByCategory} />
        <ClubSearchField appliedFilter={setSearchFilter} clubs={clubs} setFilteredClubs={setClubsBySearch} />
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
