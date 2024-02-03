import { useState, useEffect }from 'react'
import { styled } from '@mui/system'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useUser } from '../../authentication'
import EditClubDescriptionModal from '../../modals/EditClubDescriptionModal'
import { editClubDescription, fetchUserClubRole } from '../../api/ClubsAPI'
import { toastNotification } from '../../utils'

const Wrapper = styled(Grid)({
    margin:"40px 200px 0 0",
    padding: "20px 0",
    paddingLeft: "0",
});
const StyledCard = styled(Card)({
    backgroundColor: 'light-grey', 
});
const EditBtn = styled(Button)({
    color: '#fff', 
    background: '#3f51b5',
});

const ClubDescriptionCard = ({ clubID, clubTitle, clubDescription, onChange }) => {
    const user = useUser();
    const [admin, setAdmin] = useState(false);
    const [editModalOpen, setEditModelOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserClubRole(clubID, user.uid, setAdmin);
        } else {
            setAdmin(false);
        }
    }, [user]);

    const handleEditDescription = (description) => {
        editClubDescription(clubID, description)
        .then(() => {
            onChange(description);
            toastNotification("Club description updated successfully!");
        })
        setEditModelOpen(false);
    }

    return (
    <Wrapper item xs={9}>
        <StyledCard variant="elevation">
            <CardHeader title="Description"
                action={
                <>
                    {admin && 
                    <>
                        <EditBtn 
                            color='primary'
                            fullWidth 
                            onClick={() => setEditModelOpen(true)}
                        >
                            Edit Description
                        </EditBtn>
                        <EditClubDescriptionModal 
                            clubName={clubTitle} 
                            clubDescription={clubDescription} 
                            open={editModalOpen} 
                            onClose={() => setEditModelOpen(false)} 
                            onSubmit={handleEditDescription} />
                    </>}
                </>} 
            />
            <CardContent>
                <Typography variant='p' color='textPrimary'>
                    {clubDescription}
                </Typography>
            </CardContent>
        </StyledCard>
    </Wrapper>
  )
}

export default ClubDescriptionCard
