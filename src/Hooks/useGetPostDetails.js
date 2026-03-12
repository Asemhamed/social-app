import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetPostDetails(id,token) {
      const {data:postD=[],isLoading}=useQuery({
        queryFn: fetchPostDetails,
        queryKey:['postDetails',id]
      })

    async function fetchPostDetails() {
        try{
          const {data} = await axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers:{
            AUTHORIZATION:`Bearer ${token}`
        }
          })
            return data.data.post || [];

        }catch(err){
          console.log(err);
        }
      }
return {postD,isLoading}
    }
