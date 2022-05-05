import '../App.css'
import { makeStyles, useMediaQuery } from '@mui/material'
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

import {Tabs, Tab, Container, Image} from 'react-bootstrap'


import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ClassNames } from '@emotion/react';


const PrimaryNav = ( {user, SetUser} )=>{
    const thinScreen = useMediaQuery('(max-width: 900px)')
    console.log(thinScreen)

    const [value, setValue] = useState(0)

    if(thinScreen){
        return (
                <Box sx={{ 
                    width: 1, 
                    }}>
                    <BottomNavigation
                        className='mobile'
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Find" icon={<SearchIcon/>} />
                        <BottomNavigationAction label="List" icon={<FormatListBulletedIcon/>} />
                        {user? <BottomNavigationAction label="Your Account" icon={<AccountCircleIcon/>} /> 
                        :<BottomNavigationAction label="Login" icon={<LoginIcon/>} />}
                    </BottomNavigation>
                </Box>
          );
    }
    if(!thinScreen){
        return(
            
            <Container className='nav-container'>
                
                    {/* <img src='https://placekitten.com/200/300' alt='kitten' style={{'width': '100%', 'objectFit': 'fill', 'height': 'auto'}}></img> */}
                <Tabs defaultActiveKey="Find" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Find" title="Find">
                    </Tab>
                    <Tab eventKey="List" title="List">
                    </Tab>
                    {user? 
                    <Tab eventKey="Login" title="Your Account"></Tab>
                    :<Tab eventKey="Login" title="Login"></Tab>}
                </Tabs>
            </Container>
        )
    }
}

export default PrimaryNav