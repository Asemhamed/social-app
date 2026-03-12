import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetUserPosts(user,token) {

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

  return {userPosts,isLoading}
}
