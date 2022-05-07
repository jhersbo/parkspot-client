import PostingCard from "./PostingCard"
import { Card } from "react-bootstrap"
import Masonry from '@mui/lab/Masonry';

export default function PostingsFeed({ user, postingsDB, thinScreen }){
   if(!postingsDB){
       return(
           null
       )
   }
   if(postingsDB){
    let sortedPostings = postingsDB.sort((a, b)=>{
        return Date.parse(b.post_date) - Date.parse(a.post_date)
    })
    let individualPostings = sortedPostings.map((post) =>{
        if(post.available){
            return(
                <PostingCard key={post.posting_id} post={post} user={user}></PostingCard>
            )
        }else{
            return(
                null
            )
        }
    })

    return (
        <Masonry
            columns={thinScreen? 1: 4}
            spacing={1}
            height={100}
            sx={{
                alignContent: 'space-evenly',
                mt: '1em',
                
            }}
        >
            {individualPostings}
        </Masonry>
            
    )
   }
}