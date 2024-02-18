import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from './TemporaryDrawer';

const pages = ['User Management', 'Product Management', 'Payment Enquires', 'Report'];
const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Define isLoggedIn and isAdmin state
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Use setIsLoggedIn and setIsAdmin to update state
    setIsLoggedIn(false);
    setIsAdmin(false);

    // Rest of the logout logic
    document.cookie = 'accessToken=; Secure; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  React.useEffect(() => {
    const handleBrowserBack = (event) => {
      event.preventDefault();
      if (!isLoggedIn) {
        navigate('/login');
      }
    };

    const handleBrowserForward = (event) => {
      event.preventDefault();
      if (!isLoggedIn) {
        navigate('/login');
      }
    };

    if (!isLoggedIn) {
      window.addEventListener('popstate', handleBrowserBack);
      window.addEventListener('popstate', handleBrowserForward);
    }

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
      window.removeEventListener('popstate', handleBrowserForward);
    };
  }, [isLoggedIn, navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        <TemporaryDrawer />
        <AdbIcon sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Duo Admin Panel
        </Typography>
        {isLoggedIn && (
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
        )}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Travis Howard" src="https://avatars.githubusercontent.com/u/1808375?v=4" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
