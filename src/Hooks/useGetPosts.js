import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetPosts(token) {

        const {data:posts=[],isLoading}=useQuery({
    queryFn:getAllPosts,
    queryKey:["allPosts"]
  })



  async function getAllPosts(){
    try{
      const {data}= await axios.get('https://route-posts.routemisr.com/posts?limit=50&sort=-createdAt',{
        headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
      });

      if(data.success){
        return data.data.posts
      }}catch(err){
      console.log(err);
    }
  }
  return {posts,isLoading}
}
