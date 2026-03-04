import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import PostCard from '../../Components/PostCard/PostCard';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import { UserData } from '../../Context/UserDataContext';

export default function Saved() {
  
  const {token}=useContext(UserData);
  

    async function getSavedPosts() {
          try{
        const {data} = await axios.get(`https://route-posts.routemisr.com/users/bookmarks`,{
          headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
        })
        if(data.success){
          return data.data.bookmarks || []
        }
        
        
    }catch(err){
      console.log(err ,"from profile") ;
    }


  }
  
  const {data:savedPosts=[],isLoading}=useQuery({
    queryFn: getSavedPosts,
    queryKey:['savedPosts'],
    enabled:!!token
  })

  if(isLoading){
    return <PostSkeleton />
  }

  
  return <>
        {savedPosts.length > 0 ? savedPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                    :
                    <EmptyPosts/>}
    </>
}
