import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PostingCard({ postingsDB, user, post  }){
    return(
        <Card sx={{ 
            maxWidth: 355,
            display: 'flex',
            justifyContent: 'center' 
            }}>
        <CardActionArea>
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
            <Typography variant="body2" color="text.secondary">
              {'$'+ post.rate + ' per hour'}
            </Typography>
            <Typography variant='body1'>
                Click to Reserve
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}