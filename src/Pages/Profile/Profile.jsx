import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../../Context/UserDataContext';
import { UserProfile } from './../../Context/UserProfile';
import { useQuery } from '@tanstack/react-query';
import PostCard from './../../Components/PostCard/PostCard';
import CommentsDrawer from '../../Components/CommentsDrawer/CommentsDrawer';


export default function Profile() {
const [isOpen, setIsOpen] = useState(false);
  const [userPostId, setUserPostId] = useState(null);
  const handleClose = () => setIsOpen(false);
  const [postId, setPostId] = useState(null);

  const {token} = useContext(UserData)
  const {user,setUser} = useContext(UserProfile); 
  
  


  async function getUser() {
    try{
      const {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
        headers:{
          token
        }
      });
      if(data.message=='success'){
        localStorage.setItem('user',data.user);
        setUser(data.user);
        return data.user;
      }
    }catch(err){
      console.log(err);
    }
  }
  const {data:User}= useQuery({
    queryFn:getUser,
    queryKey:["useData"],
  })
  

  async function getUserPosts() {
    
    if(user._id){
      // console.log(user._id);
      
          try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/users/${user._id}/posts?limit=20`,{
          headers:{
            token
          }
        })
        if(data.message=='success'){
          return data.posts
        }
        console.log(data);
        
        
    }catch(err){
      console.log(err ,"from profile") ;
    }
    }

  }
  
  const {data:userPosts}=useQuery({
    queryFn: getUserPosts,
    queryKey:['userPosts']
  })

  
  return <>
  <title>Profile</title>
  <div className="my-25 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-8">
        <div className="flex flex-col items-center">
          <img 
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 p-1" 
            src={User?.photo}
          />
          
          {/* Name and Role */}
          <div className="mt-4 text-center">
            <h2 className=" uppercase text-2xl font-bold text-gray-900 dark:text-white">
              {User?.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {User?.gender}
            </p>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
            {User?.email}
          </p>

          {/* Info Rows */}
          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              Created At : {new Date(User?.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              Date Of Birth : {User?.dateOfBirth}
            </div>
          </div>

          {/* Action Button */}
          <Link to='/changepass' className=" text-center mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Change Password
          </Link>
        </div>
      </div>
    </div>
    <hr className='my-5 w-[80%] mx-auto'/>

    {userPosts?.map((post)=> <PostCard post={post} key={post._id} setUserPostId={setUserPostId} setPostId={setPostId} setIsOpen={setIsOpen}/>)}
    <CommentsDrawer postId={postId} handleClose={handleClose} userPostId={userPostId} isOpen={isOpen}/>

  </>
}
