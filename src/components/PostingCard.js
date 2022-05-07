import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const localServerURL = "https://parkspot-server.herokuapp.com/"

export default function PostingCard({ postingsDB, user, post  }){
    
    function pushPostingIDtoUserSpots(){
        let userSpots = user.spots
        userSpots.push(post.posting_id)
    }

    async function reserveSpot(){
        let dataPKG = {
            posting_id: post.posting_id,
            available: false
        }
        if(user && user.username !== post.username){
            await fetch(localServerURL + 'postings', {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPKG)
            })
            // await fetch(localServerURL +'users', {
            //     method: 'PUT',
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body: 
            // })
            window.location.href = '/'
        }else{
            window.alert('Error. Cannot reserve your own spot, dummy!')
        }
    }
    
    return(
        <Card sx={{ 
            maxWidth: 355,
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '1px 1px 15px black',
            bgcolor: '#F7F7F2',
            borderRadius: '10px' 
            }}>
        <CardActionArea onClick={async ()=>{await reserveSpot()}}>
        {post.photo?
            <CardMedia
            component="img"
            height="140"
            image={post.photo}
            alt="post"
            />
        :
            null
        }
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.address}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {'$'+ post.rate + ' per hour'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
                mt: '1em'
            }}>
              {'poster: '+post.username}
            </Typography>
            {user? 
                <Typography variant='body1' sx={{
                    mt: '1em',
                    color: '#D90429'
                }}>
                    *Click to Reserve*
                </Typography>
            :
                <Typography variant='body1' sx={{
                    mt: '1em',
                    color: '#D90429'
                }}>
                    *Login to Reserve*
                </Typography>
            }
          </CardContent>
        </CardActionArea>
      </Card>
    )
}