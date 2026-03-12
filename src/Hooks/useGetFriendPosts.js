import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useGetFriendPosts(id,token) {

    async function getFriendPosts() {
        if(id){
          try{
        const {data} = await axios.get(`https://route-posts.routemisr.com/users/${id}/posts`,{
          headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
        })
          return data.data.posts || []
        
        
    }catch(err){
      throw err
    }
    }else{
      return []
    }

}

    const {data:friendPosts=[]}=useQuery({
    queryFn: getFriendPosts,
    queryKey:['userPosts',id],
    enabled:!!token
})
return {friendPosts}
}
