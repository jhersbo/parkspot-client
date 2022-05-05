import '../App.css'
import Cookies from 'cookies-js'
import { useState } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function LoginRegScreen( {user, setUser, userDB, setUserDB, thinScreen} ){
    
    let [failedLogin, setFailedLogin] = useState(false)
    let [username, setUsername] = useState(undefined)
    let [password, setPassword] = useState(undefined)
    let [editing, setEditing] = useState(false)
    
    async function handleSubmit(){
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
                        ></TextField>
                        <TextField
                        id='outlined-required'
                        required
                        label='Password'
                        margin='normal'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        ></TextField>
                        <Button variant='contained' onClick={()=>{handleSubmit()}}>Login</Button>
                    </form>
                    :
                    <div style={{'textAlign': 'center','marginTop': '5%', 'padding': '5%'}}>
                        <Card sx={{ maxWidth: .90 * (window.innerWidth)}}>
                            <CardHeader 
                            avatar={
                                <Avatar sx={{ bgcolor: red[300] }}>{user.firstname.charAt(0)}</Avatar>
                            }
                            title={user.firstname + ' ' + user.lastname}
                            subheader={user.username}>
                            </CardHeader>
                            <CardContent>
                                <Typography>
                                    
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                }
                
            </div>
        )
    }
}