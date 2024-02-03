import React from 'react'
import {  SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { DeleteForever, KeyboardReturn, Send, CloudUpload, Menu } from '@mui/icons-material';


const ImageSpeedDial = (props) => {
    const getTooltipTitle = () => {
      return props.guest.guestMode ? "Feature disabled in guest mode" : "Add, delete, or select images for the explore page";
    };

    return (
      <Tooltip style={{display:"hidden" ? props.guest.guestMode : "flex"}} title={getTooltipTitle()} placement="left-start">
      <SpeedDial
        ariaLabel="Speed Dial"
        icon={<Menu />}
        direction='down'
        hidden={false}
        onOpen={() => { props.setOpenSpeedDial(true) }}
        onClose={() => {
          props.setOpenSpeedDial(false);
        }}
        open={props.openSpeedDial}
      >
        <SpeedDialAction
          key="Upload Image"
          disabled={props.guest.guestMode}
          icon={<CloudUpload />}
          tooltipTitle="Upload Image"
          onClick={() => {
            props.setOpenModal(true);
            props.setDeleteMenu(false);
            props.setSelectMenu(false)
          }
          }
        />
        <SpeedDialAction
          key={props.deleteMenu === false ? "Delete Images" : "Escape View"}
          icon={props.deleteMenu === false ? <DeleteForever /> : <KeyboardReturn />}
          disabled={props.guest.guestMode}
          tooltipTitle={props.deleteMenu === false ? "Select Images to Delete" : "Escape View"}
          onClick={
            () =>
            (props.deleteMenu === false ?
              (props.setDeleteMenu(true), props.setSelectMenu(false)) : props.setDeleteMenu(false)
            )}
        />
        <SpeedDialAction
          disabled={props.guest.guestMode}
          key={props.selectMenu === false ? "Select Images to Display on Explore Page" : "Escape View"}
          icon={props.selectMenu === false ? <Send /> : <KeyboardReturn />}
          tooltipTitle={props.selectMenu === false ? "Select Images to Display on Explore Page" : "Escape View"}
          onClick={() =>
          (props.selectMenu === false ?
            (props.setSelectMenu(true), props.setDeleteMenu(false)) : props.setSelectMenu(false)
          )}
        />
      </SpeedDial>
      </Tooltip>
    )
  }

export default ImageSpeedDial
