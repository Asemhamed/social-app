import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetSavePosts(token) {

    
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
    return {savedPosts,isLoading}
}
