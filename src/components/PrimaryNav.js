import '../App.css'
import { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { withStyles } from '@mui/material';
import { Link } from 'react-router-dom';

import {Tabs, Tab, Container, Image} from 'react-bootstrap'


import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ClassNames } from '@emotion/react';


const PrimaryNav = ( {user, SetUser, thinScreen} )=>{

    const [value, setValue] = useState(0)
    const [key, setKey] = useState('/');
    
    const handleRouteChange = (route)=>{
        window.location.hash = route
    }

    if(thinScreen){
        return (
                <Box sx={{ 
                    width: 1, 
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
                </Box>
          );
    }
    if(!thinScreen){
        return(
            
            <Container className='nav-container'>
                
                    {/* <img src='https://placekitten.com/200/300' alt='kitten' style={{'width': '100%', 'objectFit': 'fill', 'height': 'auto'}}></img> */}
                <Tabs defaultActiveKey="Find" id="uncontrolled-tab-example" className="mb-3 nav-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="Find" title="Find" className='nav-tab'>
                    </Tab>
                    <Tab eventKey="List" title="List" className='nav-tab' style={{'textDecoration': 'none'}}>
                    </Tab>
                    {user? 
                    <Tab eventKey="Login" title="Your Account" className='nav-tab'></Tab>
                    :<Tab eventKey="Login" title="Login" className='nav-tab'></Tab>}
                </Tabs>
            </Container>
        )
    }
}

export default PrimaryNav