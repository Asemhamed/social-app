import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './../../Components/PostCard/PostCard';
import { UserData } from './../../Context/UserDataContext';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';

export default function PostDetails() {
      const {id} = useParams();
      const {token}= useContext(UserData);

      
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


      
  return <div className='min-h-screen bg-[#F9FBFC] pt-20 pb-10'>
  <div className=' container mx-auto max-w-6xl px-4'>
    {isLoading?<PostSkeleton/>:<PostCard post={postD} details={true}/>}
  </div>
  </div> 
  
 
}
