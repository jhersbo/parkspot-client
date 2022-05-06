import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { maxWidth } from '@mui/system';


const localServerURL = "http://localhost:3000/"

export default function AddPostingScreen({ user, thinScreen }){
    let [photo, setPhoto] = useState('')
    let [rate, setRate] = useState()
    let [address, setAddress] = useState('')

    function generatePostingId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }

    async function handleSubmit(){
        let dataPKG = {
            address: address,
            available: true,
            photo: photo,
            post_date: Date(),
            posting_id: generatePostingId(1, 100000000),
            rate: rate,
            username: user.username
        }
        await fetch(localServerURL + 'postings',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPKG)
        })
        window.location.href = '/'
    }

    return(
            <div style={{'textAlign': 'center','marginTop': '5%', 'padding': '5%', 'justifyContent': 'center', 
            'max-width': thinScreen? '90%' :'50%',
            'transform': thinScreen? 'translate(5%)' : 'translate(50%)'}}>
                {user?
                    <Card sx={{ 
                        maxWidth: .90 * (window.innerWidth),
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        boxShadow: '1px 1px 10px black' 
                        }}>
                        {/* <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[300] }}>{user.firstname.charAt(0)}</Avatar>
                        }
                        title={user.firstname + ' ' + user.lastname}
                        subheader={user.username}>
                    </CardHeader> */}
                            
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '100%',
                                justifyContent: 'center'
                            }}>
                                <TextField
                                required
                                id="outlined-required"
                                label="Address"
                                sx={{
                                    bgcolor: 'whitesmoke',
                                    borderRadius: '10px',
                                    mt: '1em'
                                }}
                                onChange={(e)=>{setAddress(e.target.value)}}
                                />
                                <TextField
                                required
                                id="outlined-required"
                                label="Rate ($/hour)"
                                sx={{
                                    bgcolor: 'whitesmoke',
                                    borderRadius: '10px',
                                    mt: '1em'
                                }}
                                onChange={(e)=>{setRate(e.target.value)}}
                                />
                                <TextField
                                
                                id="outlined-required"
                                label="Photo Link"
                                sx={{
                                    bgcolor: 'whitesmoke',
                                    borderRadius: '10px',
                                    mt: '1em'
                                }}
                                onChange={(e)=>{setPhoto(e.target.value)}}
                                />
                                <Button variant='contained' onClick={
                                async()=>{await handleSubmit()}}
                                sx={{
                                    mt: '1em'
                                }}>Create Posting</Button>
                            </CardContent>
                    </Card>
                :
                    <div style={{
                        'max-width': thinScreen? '90%' :'50%',
                        'transform': thinScreen? 'translate(5%)' : 'translate(50%)'
                    }}>
                        <Card sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            boxShadow: '1px 1px 10px black',
                            borderRadius: '6px' 
                        }}>
                            
                            <Button variant="contained" href='/user' >Login to your account</Button>
                        </Card>
                    </div>
                }
            </div>
    )
}