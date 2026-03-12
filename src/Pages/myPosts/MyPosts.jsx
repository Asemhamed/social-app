import { useContext } from 'react';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import PostCard from '../../Components/PostCard/PostCard';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import { UserData } from '../../Context/UserDataContext';
import useGetUserPosts from '../../Hooks/useGetUserPosts';
import { UserProfile } from './../../Context/UserProfile';

export default function MyPosts() {
  
  const {user}=useContext(UserProfile);
  const {token}=useContext(UserData);
  const {isLoading,userPosts}=useGetUserPosts(user,token)



  if(isLoading){
    return <PostSkeleton />
  }

  return<>
      {userPosts.length > 0 ? userPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                  :
                  <EmptyPosts/>}
  </>
}
