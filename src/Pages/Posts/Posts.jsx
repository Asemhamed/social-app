import { useContext } from 'react';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import PostCard from '../../Components/PostCard/PostCard';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import { UserData } from '../../Context/UserDataContext';
import useGetPosts from '../../Hooks/useGetPosts';

export default function Posts() {
    const{token}=useContext(UserData);
    const {isLoading,posts}=useGetPosts(token)


  if(isLoading){
    return <PostSkeleton />
  }
  
    
    return <>
            {posts.length > 0 ? posts.map(post => (<PostCard key={post._id} post={post} details={false} />))
              :
              <EmptyPosts/>}
    </>
}
