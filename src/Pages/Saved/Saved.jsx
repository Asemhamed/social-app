import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import PostCard from '../../Components/PostCard/PostCard';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import { UserData } from '../../Context/UserDataContext';
import useGetSavePosts from '../../Hooks/useGetSavePosts';

export default function Saved() {
  
  const {token}=useContext(UserData);
  const {isLoading,savedPosts}=useGetSavePosts(token);

 

  if(isLoading){
    return <PostSkeleton />
  }

  
  return <>
        {savedPosts.length > 0 ? savedPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                    :
                    <EmptyPosts/>}
    </>
}
