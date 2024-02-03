import React from 'react'
import { List, ListItem, ListItemButton, ListItemText, Collapse, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { ExpandLess, ExpandMore, Group, Campaign, CalendarMonth } from '@mui/icons-material'

const MyClubs = (props) => {
    const [listExpand, setListExpand] = React.useState(false)
    return (
      <List>
        <div>
          <ListItem key={props.text} style={{ maxWidth: "250px" }}>
            <ListItemButton onClick={() => { setListExpand(!listExpand) }}>
              <Group style={{ marginRight: "15px" }} />
              <ListItemText primary={props.text} sx={{ fontFamily: 'Arvo, serif' }} />
              {listExpand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={listExpand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ paddingLeft: '15%' }}>
              <ListItemButton selected={props.clubAnnouncementSelected === props.text} button={true} style={{ textAlign: 'justify' }} onClick=
                {() => {
                  props.setClubAnnouncementSelected(props.text)
                  props.setClubEventSelected(false)
                  props.setAlignment(null)
                }}>
                <Campaign />
                <ListItemText primary="Announcements" style={{ paddingLeft: '5%' }} />
              </ListItemButton>
              <ListItemButton button={true} style={{ textAlign: 'justify' }} onClick=
                {() => {
                  props.setClubAnnouncementSelected(false)
                  props.setClubEventSelected(props.text)
                  props.setAlignment(null)
                }}>
                <CalendarMonth />
                <ListItemText primary="Events" style={{ paddingLeft: '5%' }} />
              </ListItemButton>
            </List>
          </Collapse>
        </div>
      </List>
    )
}
export default MyClubs;
