import React, { useContext } from 'react'
import { UserData } from '../../Context/UserDataContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import PostCard from '../../Components/PostCard/PostCard';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';

export default function Posts() {
    const{token}=useContext(UserData);

    const {data:posts,isLoading}=useQuery({
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

  if(isLoading){
    return <PostSkeleton />
  }
  
    
    return <>
            {posts.length > 0 ? posts.map(post => (<PostCard key={post._id} post={post} details={false} />))
              :
              <EmptyPosts/>}
    </>
}
