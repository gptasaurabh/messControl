import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationImportantRoundedIcon from '@mui/icons-material/NotificationImportantRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import Updatemenu from './Updatemenu';
import Updateprice from './Updateprice';
import Adminprofile from './Adminprofile';
import Receivefeedback from './Receivefeedback';
import Unsolvedcomplaints from './Unsolvedcomplaints';
import { Badge, Stack, styled } from '@mui/material';



  


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [activePage, setActivePage] = React.useState('dashboard');

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // if (activePage === 'logout') {
  //   console.log("Logging out...");
  //   setActivePage('dashboard');  
  // }
  
  const drawer = (
    <div>
      <Toolbar>
        <ListItem disablePadding>
            <ListItemButton onClick={() => setActivePage('dashboard')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{width:"40px",height:"40px"}}/>
              </ListItemIcon>
              <ListItemText>Admin</ListItemText>
            </ListItemButton>
          </ListItem>
      </Toolbar>
      <Divider />
      <List>
      <ListItem disablePadding>
          <ListItemButton onClick={() => setActivePage('unsolvecomplaints')}>
            <ListItemIcon>
            <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
            <Badge color="secondary" badgeContent={3} showZero>
                <NotificationImportantRoundedIcon />
            </Badge>
            </Stack>
            </ListItemIcon>
            <ListItemText>Recent complaints</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActivePage('updatemenu')}>
            <ListItemIcon>
              <RestaurantMenuRoundedIcon />
            </ListItemIcon>
            <ListItemText>Update Menu</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActivePage('updateprice')}>
            <ListItemIcon>
              <PriceChangeRoundedIcon/>
            </ListItemIcon>
            <ListItemText>Update Price</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActivePage('feedback')}>
            <ListItemIcon>
              <FeedbackRoundedIcon/>
            </ListItemIcon>
            <ListItemText>Received feedback</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActivePage('logout')}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{backgroundColor:"antiquewhite"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Mess Complaint System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className='right-page'>
          {activePage === 'dashboard' && <Adminprofile />}
          {activePage === 'unsolvecomplaints' && <Unsolvedcomplaints />}
          {activePage === 'updatemenu' && <Updatemenu />}
          {activePage === 'updateprice' && <Updateprice />}
          {activePage === 'feedback' && <Receivefeedback />}
          
          {activePage === 'logout' && <div style={{color:"red",display:"flex",justifyContent:"center",alignItems:"center"}}>You are logged out</div>}
        </div>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;