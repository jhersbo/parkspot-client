import '../App.css'
import Cookies from 'cookies-js'
import { useState } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { maxWidth } from '@mui/system';

const localServerURL = "http://localhost:3000/"

export default function LoginRegScreen( {user, setUser, userDB, setUserDB, thinScreen} ){
    
    let [failedLogin, setFailedLogin] = useState(false)
    let [username, setUsername] = useState(undefined)
    let [password, setPassword] = useState(undefined)
    let [firstName, setFirstName] = useState(user? user.firstname: '')
    let [lastName, setLastName] = useState(user? user.lastname: '')
    let [editing, setEditing] = useState(false)
    let [newUser, setNewUser] = useState(false)

    
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

    function generateUserId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
      

    async function updateUserProfile(){
        const userObject = {
            user_id: user.user_id,
            username: username,
            password: password,
            firstname: firstName,
            lastname: lastName,
            spots: []
        }
        await fetch(localServerURL + 'users',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
        window.location.href = '/user'
    }

    async function pushNewUser(){
        const userObject = {
            user_id: generateUserId(1, 10000000),
            username: username,
            password: password,
            firstname: firstName,
            lastname: lastName
        }
        await fetch(localServerURL + 'users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
        Cookies.set('user', JSON.stringify(userObject))
        setUser(userObject)
        setNewUser(false)
    }

function handleLogout(){
    setUser(undefined)
    Cookies.set('user', undefined)
}

    if(thinScreen){
        return(
            <div>
                {!user || failedLogin? 
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
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px black'
                        }}
                        ></TextField>
                        <TextField
                        id='outlined-password-input'
                        type='password'
                        required
                        label='Password'
                        margin='normal'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px black'
                        }}
                        ></TextField>
                        {newUser?
                            <TextField
                            id='outlined-required'
                            required
                            label='First Name'
                            margin='normal'
                            onChange={(e)=>{setFirstName(e.target.value)}}
                            sx={{
                                bgcolor: 'whitesmoke',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px black'
                            }}
                            ></TextField>
                        :
                            <Button sx={{
                                mt: '0.5em',
                                maxWidth: '80%',
                                ml: '10%'
                            }}
                            variant='contained' onClick={()=>{handleSubmit()}}>Login</Button>
                                
                        }
                        {newUser?
                            <TextField
                            id='outlined-required'
                            required
                            label='Last Name'
                            margin='normal'
                            onChange={(e)=>{setLastName(e.target.value)}}
                            sx={{
                                bgcolor: 'whitesmoke',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px black'
                            }}
                            ></TextField>
                        :
                            <Button variant='contained' onClick={()=>{setNewUser(true)}}
                            sx={{
                                mt: '0.5em',
                                maxWidth: '80%',
                                ml: '10%'
                            }}
                            >Create an Account</Button>
                        }
                        
                        {!newUser?
                            null
                        :
                            <Button variant='contained' onClick={()=>{pushNewUser()}}
                            sx={{
                                mt: '0.5em'
                            }}
                            >Create an Account</Button>    
                        }
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
                                    <Button variant='contained' onClick={
                                    async()=>{await updateUserProfile()}}>Submit Changes</Button>
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
            <div style={{
                'max-width': '50%',
                'transform': 'translate(50%)'
            }}>
                {!user || failedLogin? 
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
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px black'
                        }}
                        ></TextField>
                        <TextField
                        id='outlined-password-input'
                        type='password'
                        required
                        label='Password'
                        margin='normal'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        sx={{
                            bgcolor: 'whitesmoke',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px black'
                        }}
                        ></TextField>
                        {newUser?
                            <TextField
                            id='outlined-required'
                            required
                            label='First Name'
                            margin='normal'
                            onChange={(e)=>{setFirstName(e.target.value)}}
                            sx={{
                                bgcolor: 'whitesmoke',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px black'
                            }}
                            ></TextField>
                        :
                            <Button sx={{
                                mt: '0.5em',
                                maxWidth: '80%',
                                ml: '10%',
                                boxShadow: '1px 1px 5px black'
                            }}
                            variant='contained' onClick={()=>{handleSubmit()}}>Login</Button>
                            // {failedLogin?
                            // <Typography>Login Failed</Typography>
                            //need styling    
                        }
                        {newUser?
                            <TextField
                            id='outlined-required'
                            required
                            label='Last Name'
                            margin='normal'
                            onChange={(e)=>{setLastName(e.target.value)}}
                            sx={{
                                bgcolor: 'whitesmoke',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px black' 
                            }}
                            ></TextField>
                        :
                            <Button variant='contained' onClick={()=>{setNewUser(true)}}
                            sx={{
                                mt: '0.5em',
                                maxWidth: '80%',
                                ml: '10%',
                                boxShadow: '1px 1px 5px black'
                            }}
                            >Create an Account</Button>
                        }
                        
                        {!newUser?
                            null
                        :
                            <Button variant='contained' onClick={()=>{pushNewUser()}}
                            sx={{
                                mt: '0.5em',
                                boxShadow: '1px 1px 5px black'
                            }}
                            >Create an Account</Button>    
                        }
                    </form>
                    :
                    <div style={{'textAlign': 'center','marginTop': '5%', 'padding': '5%', 'justifyContent': 'center'}}>
                        <Card sx={{ 
                            maxWidth: .90 * (window.innerWidth),
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            boxShadow: '1px 1px 10px black' 
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
                                        mx: '2%',
                                        boxShadow: '1px 1px 5px black' 
                                    }} onClick={()=>{setEditing(true)}}>
                                        Edit User Information
                                    </Button>
                                    <Button variant="contained" 
                                    sx={{
                                        mt:'1%',
                                        mx: '2%',
                                        boxShadow: '1px 1px 5px black' 
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
                                        mt: '1em',
                                        boxShadow: '1px 1px 5px black'
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
                                        mt: '1em',
                                        boxShadow: '1px 1px 5px black'
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
                                        mt: '1em',
                                        boxShadow: '1px 1px 5px black'
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
                                        mb: '1em',
                                        boxShadow: '1px 1px 5px black'
                                    }}
                                    onChange={(e)=>{setLastName(e.target.value)}}
                                    />
                                    <Button variant='contained' onClick={
                                    async()=>{await updateUserProfile()}}sx={{
                                        boxShadow: '1px 1px 5px black'
                                    }}>Submit Changes</Button>
                                </CardContent>
                            }
                        </Card>
                    </div>
                }
                
            </div>
        )
    }
}