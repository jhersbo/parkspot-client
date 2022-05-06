import '../App.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

import { Container } from 'react-bootstrap'


const PrimaryNav = ( {user, SetUser, thinScreen} )=>{
    const pages = ['Find', 'List']
    const routes = ['/', '/list']


    if(thinScreen){
        return (
                <Box sx={{ 
                    width: 1,
                    bgcolor: 'whitesmoke' 
                    }}>
                    <BottomNavigation
                        className='mobile'
                        showLabels
                    >
                        <BottomNavigationAction label="Find" icon={<SearchIcon/>} href={'/'}/>
                        <BottomNavigationAction label="List" icon={<FormatListBulletedIcon/>} href={'/list'}/>
                        {user? <BottomNavigationAction label="Your Account" icon={<AccountCircleIcon/>} href={'/user'}/> 
                        :<BottomNavigationAction label="Login" icon={<LoginIcon/>} href={'/user'}/>}
                    </BottomNavigation>
                    <Typography variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        textAlign: 'left',
                        paddingLeft: '1em',
                        bgcolor: '#011627',
                        color: 'white',
                        borderRadius: '1px',
                        backgroundColor: '#011627',
                        boxShadow: '1px 0px 5px black'
                    }}
                    >Parkspot.com</Typography>
                </Box>
          );
    }
    if(!thinScreen){
      
        return (
          <AppBar position="static" sx={{
            backgroundColor: '#011627',
            boxShadow: '1px 1px 10px black'
            
        }}>
            <Container maxWidth="xl"sx={{
              margin: '0%',
              padding: '0%'
          }}>
              <Toolbar disableGutters sx={{
                  backgroundColor: '#011627',
                  mx: '0%'
              }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  Parkspot.com
                </Typography>
      
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    
                    
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page}>
                        <Typography textAlign="center" >{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page, i) => (
                    <Button
                      key={page}
                      
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href={routes[i]}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                {!user?
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Login">
                         <IconButton  sx={{ p: 0, fontSize: 'large', color: 'whitesmoke' }} href='/user'>
                            <PersonIcon/>
                         </IconButton>
                        </Tooltip>
                    </Box>
                :
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Account">
                        <IconButton  sx={{ p: 0,}} href='/user'>
                            <Avatar alt={user? user.username: ''} src={user.profile_pic? user.profile_pic: ''}
                            sx={{
                              color: 'whiteSmoke',
                              bgcolor: '#E57373'
                            }}>{user.profile_pic? null : user.firstname.charAt(0)}</Avatar>
                        </IconButton>
                        </Tooltip>
                    </Box>
                }
              </Toolbar>
            </Container>
          </AppBar>
        );
    }
}

export default PrimaryNav