import React from 'react'
import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import { styled } from '@mui/system';
import { indigo, deepOrange, lightGreen, red, deepPurple, teal } from '../../../utils'

const StyledAvatarGroup = styled(AvatarGroup)({
    "&:hover": {
        cursor: 'pointer',
    }
})

const AvatarGroupList = ({ list }) => {
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

    return (<>
        <StyledAvatarGroup max={6} style={{display:'flex', justifyContent:'left'}}>
            {Object.values(list).map((member) =>
                <Tooltip title={member.name}>
                    <Avatar
                        style={{ backgroundColor: getColour(member.name) }}>
                        {initials(member.name)}
                    </Avatar>
                </Tooltip>
            )}
        </StyledAvatarGroup>
    </>)
}

export default AvatarGroupList
