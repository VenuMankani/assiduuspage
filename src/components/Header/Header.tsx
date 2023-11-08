import React, { useContext, useState } from 'react'
import AssiduusLogo from '../assets/Assiduus_Global_Logo.jpg'
import { Avatar, InputAdornment, TextField, ListItemAvatar, Badge, FormControl, Select, IconButton, Menu, MenuItem, Tooltip, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './styles.module.css'
import { PageContext } from '../context/ContextProvider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AvatarIcon from '../assets/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.avif'

const Header = () => {
  const [showMenu, setShowMenu] = useState(null);
  const contextValue = useContext(PageContext);
  let a: boolean;

  const handleClick = (event: any) => {
    setShowMenu(event.currentTarget);
  };

  const handleClose = () => {
    setShowMenu(null);
  };

  const randomData = () => {
    contextValue.randomizeTCFData();
    contextValue.randomizeInvoiceData();
    contextValue.randomizeWatchlistData();
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={AssiduusLogo} height={90} width={160} />
      </div>
      <div className={styles.components}>
        <TextField
          variant='filled' size='medium'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"
                sx={{
                  marginBottom: '0.5rem'
                }}>
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            style: {
              borderRadius: '1rem',
              backgroundColor: 'whitesmoke'
            }
          }} />
        <IconButton onClick={randomData}>
          <Tooltip title="Randomize Data" placement='bottom'>
            <ShuffleIcon style={{ color: "black" }} fontSize='medium' />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Badge color="success" overlap="circular" variant='dot' badgeContent="">
            <Tooltip placement='top' title={"Notifications"}>
              <NotificationsIcon style={{ color: "black" }} fontSize='medium' />
            </Tooltip>
          </Badge>
        </IconButton>
        <Tooltip placement='bottom' title={"Profile"}>
          <IconButton onClick={handleClick} style={{ gap: '24px' }}>
            <Avatar alt="Cindy Baker" src={AvatarIcon} sx={{ width: 50, height: 50 }} />
            <ArrowDropDownIcon style={{ color: "black" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={showMenu}
          open={Boolean(showMenu)}
          onClose={handleClose}
        >
          <MenuItem>Settings</MenuItem>
          <MenuItem>Account</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Header
