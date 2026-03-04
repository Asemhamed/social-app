import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from './../../Context/UserProfile';
import { UserData } from '../../Context/UserDataContext';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import PostCard from '../../Components/PostCard/PostCard';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';

export default function MyPosts() {
  
  const {user}=useContext(UserProfile);
  const {token}=useContext(UserData);
  

    async function getUserPosts() {
    
    if(user._id){
          try{
        const {data} = await axios.get(`https://route-posts.routemisr.com/users/${user._id}/posts`,{
          headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
        })
          return data.data.posts || []
        
        
    }catch(err){
      console.log(err ,"from profile") ;
    }
    }else{
      return []
    }

  }
  
  const {data:userPosts=[],isLoading}=useQuery({
    queryFn: getUserPosts,
    queryKey:['userPosts',token],
    enabled:!!token
  })

  if(isLoading){
    return <PostSkeleton />
  }

  return<>
      {userPosts.length > 0 ? userPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                  :
                  <EmptyPosts/>}
  </>
}
