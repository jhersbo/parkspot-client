import PostingCard from "./PostingCard"
import { Card } from "react-bootstrap"
import Masonry from '@mui/lab/Masonry';

export default function PostingsFeed({ postingsDB, thinScreen }){
   if(!postingsDB){
       return(
           null
       )
   }
   if(postingsDB){
    let individualPostings = postingsDB.map((post) =>{
        if(post.available){
            return(
                <PostingCard key={post.posting_id} post={post}></PostingCard>
            )
        }
    })

    return (
        <Masonry
            columns={thinScreen? 1: 4}
            spacing={1}
            height={100}
            sx={{
                alignSelf: 'center'
            }}
        >
            {individualPostings}
        </Masonry>
            
    )
   }
}