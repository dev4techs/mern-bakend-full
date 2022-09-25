import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Link, Navigate} from "react-router-dom";
import auth from "../users/authenticate";





const MenuNav =()=>{
    

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {

      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      // console.log("auth parameter",auth.isAuthenticated().user.name)
      setAnchorElUser(null);
    };
  
    const handleLogOut=()=>{
      auth.clearJWT();
      return (<Navigate to= "/" />)
    }

    return (
      <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
         <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Medium Screen
            </Typography>
            <Link to="/">
                <IconButton sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                   <HomeIcon sx={{color: "white"}}/>   
                </IconButton>
              </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>

              {/* menu for xs screen sizes xs: block or flex, md: none */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                {/* menu drop down for small screen */}
                
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/api/users" style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Users</Typography>
                    </Link>
                  </MenuItem>
                  
                  { !auth.isAuthenticated() && (<span>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/auth/signin" style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Sign In</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/api/users/signup" style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Sign Up</Typography>
                    </Link>
                  </MenuItem>
                  </span>)}

                
              </Menu>
            </Box>


                    {/* for xs to large screen sizes */}
                    <Link to="/" >
                <IconButton sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                   <HomeIcon />   
                </IconButton>
              </Link>


            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            > {/* showing for small screen sizes xs:flex, md: none */}
              Small Screen
            </Typography>
            

            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

               
                <Link to="/api/users" style={{ textDecoration: 'none' }}>
                    <Button
                    sx={{ my: 2, color: 'White'}}>
                        Users
                    </Button>
                </Link>
                {
                !auth.isAuthenticated() && (
                <span>
                <Link to="/api/users/signup" style={{ textDecoration: 'none' }}>
                    <Button
                    sx={{ my: 2, color: 'White' }}>
                        Sign Up
                    </Button>
                </Link>
                <Link to="/auth/signin" style={{ textDecoration: 'none' }}>
                    <Button
                    sx={{ my: 2, color: 'White' }}>
                        Sign In
                    </Button>
                </Link>
                </span>
                )
                }
                {
                //     auth.isAuthenticated() && (
                //         <span>
                // {/* <Link to="/" style={{ textDecoration: 'none' }}> */}
                //     <Button
                //     sx={{ my: 2, color: 'White' }} 
                //     onClick={handleLogOut}>
                //         Logout Bar
                //     </Button>
                // {/* </Link> */}
                // </span>
                //     )
                }
                
                
            </Box>
              
              {/* the right side part there with the profile pic and settings
              this will show up when the user will be signed in
              this contains -My Profile(Edit & Delete) -Log out*/}
            { auth.isAuthenticated() && (<Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile | Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* use src="" later for Avatar */}
                  <Avatar alt={auth.isAuthenticated().user.name} /> 
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
                
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/api/users/"+auth.isAuthenticated().user._id} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">My Profile</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={()=>{handleCloseUserMenu(); handleLogOut()}}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Logout</Typography>
                    </Link>
                  </MenuItem>
                
              </Menu>
            </Box>)}
          </Toolbar>
        </Container>
      </AppBar>

      {/* -------------------------------------------------- */}

      
</> 
    );
}

export default MenuNav;