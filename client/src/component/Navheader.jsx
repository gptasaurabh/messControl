import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
    handleClose();
  };
  const handleAdminLoginClick = () => {
    navigate("/adminlogin");
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{display:'flex', flexGrow: 1,justifyContent:'flex-start',alignItems:'center' }}>
          <AdbIcon sx={{ display: {md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HCS
          </Typography>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                fontFamily="monospace"
              >
                Login
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '.MuiPaper-root': {
                    backgroundColor: '#140365',
                    color:'bisque'
                  }
                }}
              >
                <MenuItem onClick={handleLoginClick} sx={{'&:hover': {backgroundColor: '#010d19'}}}>User</MenuItem>
                <MenuItem onClick={handleAdminLoginClick} sx={{'&:hover': {backgroundColor: '#010d19'}}}>Admin</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


/*import Button from 'react-bootstrap/Button';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {motion} from 'framer-motion'
import { AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { orange} from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


export default function Navheader() {
  const navigate=useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleAdminLoginClick = () => {
    navigate("/adminlogin");
  };

  return (
    <AppBar position='fixed'>
      <Navbar expand="lg" className="bg-tertiary" style={{opacity:"1"}}>
        <Container>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:6}} >
            <HomeIcon sx={{ color: orange[600],fontSize:40 }} />
            <Navbar.Brand href="#home">Mess Complain</Navbar.Brand>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div   whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} whileTap={{ scale: 0.9 }}>
                <DropdownButton id="dropdown-item-button" title="login">
                  <Dropdown.Item as="button" onClick={handleLoginClick}>User</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={handleAdminLoginClick}>Admin action</Dropdown.Item>
                </DropdownButton>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </AppBar>
  );
}*/