import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import useGetPostDetails from '../../Hooks/useGetPostDetails';
import PostCard from './../../Components/PostCard/PostCard';
import { UserData } from './../../Context/UserDataContext';

export default function PostDetails() {
      const {id} = useParams();
      const {token}= useContext(UserData);
      const {isLoading,postD}=useGetPostDetails(id,token)
      



      
  return <div className='min-h-screen bg-[#F9FBFC] pt-20 pb-10'>
  <div className=' container mx-auto max-w-6xl px-4'>
    {isLoading?<PostSkeleton/>:<PostCard post={postD} details={true}/>}
  </div>
  </div> 
  
 
}
