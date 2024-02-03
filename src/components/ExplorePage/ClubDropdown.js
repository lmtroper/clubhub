import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled(Grid)({
    maxWidth: 800,
    margin: "0 auto",
    flex: 1,
});
const StyledFormControl = styled(FormControl)({ 
    width:'250px'
});

const categories = [
    { value: "1", label: "All", slug: "all" },
    { value: "2", label: "Academic", slug: "academic" },
    { value: "3", label: "Business and Entrepreneurial", slug: "business-and-entrepreneurial" },
    { value: "4", label: "Charitable, Community Service, and International Development", slug: "charitable-community-service-international-development" },
    { value: "5", label: "Creative Arts, Dance, and Music", slug: "creative-arts-dance-and-music" },
    { value: "6", label: "Cultural", slug: "cultural" },
    { value: "7", label: "Environmental and Sustainability", slug: "environmental-and-sustainability" },
    { value: "8", label: "Games, Recreational, and Social", slug: "games-recreational-and-social" },
    { value: "9", label: "Health Promotion", slug: "health-promotion" },
    { value: "10", label: "Media, Publications, and Web Development", slug: "media-publications-and-web-development" },
    { value: "11", label: "Political and Social Awareness", slug: "political-and-social-awareness" },
    { value: "12", label: "Religious and Spiritual", slug: "religious-and-spiritual" },
];

const ClubDropdown = ({ clubs, setFilteredClubs }) => {
    const [categoryFilter, setCategoryFilter] = useState("1");

    const handleChange = (event) => {
        setCategoryFilter(event.target.value);

        const category = categories.find((c) => c.value === event.target.value);
        if(category === "All") {
            setFilteredClubs([]);
            return;
        }
        const filteredClubs = clubs.filter((club) => club.categories.includes(category.slug));
        setFilteredClubs(filteredClubs);
    };

    return (
        <Wrapper item>
            <StyledFormControl style={{width:'250px'}}>
                <InputLabel style={{background:'#fff', padding:'0 5px'}}>Filter by category</InputLabel>
                    <Select
                    value={categoryFilter}
                    onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                            {category.label}
                            </MenuItem>
                        ))}
                    </Select>
            </StyledFormControl>
        </Wrapper>
    );
};
export default ClubDropdown
