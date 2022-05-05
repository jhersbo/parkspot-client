import '../App.css'
import Cookies from 'cookies-js'
import { useState } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { maxWidth } from '@mui/system';

export default function LoginRegScreen( {user, setUser, userDB, setUserDB, thinScreen} ){
    
    let [failedLogin, setFailedLogin] = useState(false)
    let [username, setUsername] = useState(undefined)
    let [password, setPassword] = useState(undefined)
    let [firstName, setFirstName] = useState(user? user.firstname: '')
    let [lastName, setLastName] = useState(user? user.lastname: '')
    let [editing, setEditing] = useState(false)

    
    function handleSubmit(){
        let usernamesInDB = userDB.map(user => user.username)
        let passwordsInDB = userDB.map(user => user.password)
        if (usernamesInDB.includes(username) && passwordsInDB.includes(password)){
            let index = usernamesInDB.indexOf(username)
            if(userDB[index].password === password){
                setUser(userDB[index])
                Cookies.set('user', JSON.stringify(userDB[index]))
                console.log('You are logged in')
                setFailedLogin(false)
            }
        }
        else{
            setFailedLogin(true)
        }
    }

    async function updateUserProfile(){
        //update DB with user changes
    }

function handleLogout(){
    setUser(undefined)
    Cookies.set('user', undefined)
}

    if(thinScreen){
        return(
            <div>
                {!user? 
                    <form className='login-form' style={{'justifyContent': 'center', 'marginTop': '5%', 'display': 'flex', 'flexDirection': 'column','padding': '5%'}}>
                        <TextField
                        id='outlined-required'
                        required
                        label='Username'
                        defaultValue={username}
                        margin='none'
                        onChange={(e)=>{setUsername(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px'
                        }}
                        ></TextField>
                        <TextField
                        id='outlined-required'
                        required
                        label='Password'
                        margin='normal'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px'
                        }}
                        ></TextField>
                        <Button variant='contained' onClick={()=>{handleSubmit()}}>Login</Button>
                    </form>
                    :
                    <div style={{'textAlign': 'center','marginTop': '5%', 'padding': '5%', 'justifyContent': 'center'}}>
                        <Card sx={{ 
                            maxWidth: .90 * (window.innerWidth),
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column' 
                            }}>
                            <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[300] }}>{user.firstname.charAt(0)}</Avatar>
                            }
                            title={user.firstname + ' ' + user.lastname}
                            subheader={user.username}>
                            </CardHeader>
                            {!editing?
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <Button variant="contained" sx={{
                                        mt:'1%',
                                        mx: '2%' 
                                    }} onClick={()=>{setEditing(true)}}>
                                        Edit User Information
                                    </Button>
                                    <Button variant="contained" 
                                    sx={{
                                        mt:'1%',
                                        mx: '2%' 
                                    }}
                                    onClick={()=>{handleLogout()}}
                                    >
                                        Logout
                                    </Button>
                                </CardContent>
                                :
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    sx={{
                                        bgcolor: 'whitesmoke',
                                        borderRadius: '10px',
                                        mt: '1em'
                                    }}
                                    onChange={(e)=>{setUsername(e.target.value)}}
                                    />
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="Password"
                                    sx={{
                                        bgcolor: 'whitesmoke',
                                        borderRadius: '10px',
                                        mt: '1em'
                                    }}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="First Name"
                                    sx={{
                                        bgcolor: 'whitesmoke',
                                        borderRadius: '10px',
                                        mt: '1em'
                                    }}
                                    onChange={(e)=>{setFirstName(e.target.value)}}
                                    />
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    sx={{
                                        bgcolor: 'whitesmoke',
                                        borderRadius: '10px',
                                        mt: '1em',
                                        mb: '1em'
                                    }}
                                    onChange={(e)=>{setLastName(e.target.value)}}
                                    />
                                    <Button variant='contained' onClick={()=>{}}>Submit Changes</Button>
                                </CardContent>
                            }
                        </Card>
                    </div>
                }
                
            </div>
        )
    }
    if(!thinScreen){
        return(
            <div>
                {!user? 
                    <form className='login-form' style={{'justifyContent': 'center', 'marginTop': '5%', 'display': 'flex', 'flexDirection': 'column','padding': '5%'}}>
                        <TextField
                        id='outlined-required'
                        required
                        label='Username'
                        defaultValue={username}
                        margin='none'
                        onChange={(e)=>{setUsername(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px'
                        }}
                        ></TextField>
                        <TextField
                        id='outlined-required'
                        required
                        label='Password'
                        margin='normal'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px'
                        }}
                        ></TextField>
                        <Button variant='contained' onClick={()=>{handleSubmit()}}>Login</Button>
                    </form>
                    :
                    <div style={{'textAlign': 'center','marginTop': '5%', 'padding': '5%', 'justifyContent': 'center'}}>
                        <Card sx={{ 
                            maxWidth: .70 * (window.innerWidth),
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column' 
                            }}>
                            <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[300] }}>{user.firstname.charAt(0)}</Avatar>
                            }
                            title={user.firstname + ' ' + user.lastname}
                            subheader={user.username}>
                            </CardHeader>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '100%',
                                justifyContent: 'center'
                            }}>
                                <Button variant="contained" sx={{
                                    mt:'1%',
                                    mx: '2%' 
                                }}>
                                    Edit User Information
                                </Button>
                                <Button variant="contained" 
                                sx={{
                                    mt:'1%',
                                    mx: '2%' 
                                }}
                                onClick={()=>{handleLogout()}}
                                >
                                    Logout
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                }
                
            </div>
        )
    }
}