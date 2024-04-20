import React from 'react'
import { Avatar, Grid, Typography, Pagination } from '@mui/material'
import { useState } from 'react';
import { indigo, deepOrange, lightGreen, red, deepPurple, teal } from '../../../utils'

const ButtonListItem = ({ list, emptyMessage }) => {
    const getColour = (name) => {
        console.log(name)
        const firstLetter = name.charAt(0).toUpperCase();
        const colorSet = [indigo, deepOrange, lightGreen, red, deepPurple];
        const defaultColor = teal;
    
        // Use ASCII value to determine color index
        const index = (firstLetter.charCodeAt(0) - 'A'.charCodeAt(0)) % colorSet.length;
    
        // Return the color based on the index
        const color = colorSet[index] || defaultColor;
        return color;
    };
    
    const initials = (name) => {
        let x = name.split(' ');
        if (x.length > 1) {
            let firstInitial = x[0][0];
            let lastInitial = ""
            if(x[1][0]) {
                lastInitial = x[1][0]
            }
            return firstInitial + lastInitial
        }
        return x[0][0]
    }

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(4);
    const indexOfLastUser = (currentPage) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = list.slice(indexOfFirstUser, indexOfLastUser);
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    return (<>
        <Grid style={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderTop: '0', borderBottom: '0' }}>
            {list.length > 0 ? <>
                {Object.values(currentUsers).map((member, index) =>
                    <Grid style={{ display: 'flex', padding: '10px 5px', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                        <Avatar
                        style={{ backgroundColor: getColour(member.name) }}>
                            {initials(member.name)}
                        </Avatar>
                        <Typography style={{ paddingLeft: '10px' }}>
                            {member.name}
                        </Typography>
                    </Grid>
                )}</> :
                <Grid style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>
                    <Typography style={{ padding: '30px', color: 'grey' }}>
                        {emptyMessage}
                    </Typography>
                </Grid>}
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
            <Pagination variant="outlined" color="primary" shape='rounded' count={Math.ceil(list.length / usersPerPage)} page={currentPage} onChange={handlePageClick} />
        </Grid></>)
}

export default ButtonListItem
