import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark, Camera, Grid } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import Loader from '../../Components/Loader/Loader';
import PostCard from '../../Components/PostCard/PostCard';
import TabButtonProfile from '../../Components/TabButtonProfile/TabButtonProfile';
import { UserData } from '../../Context/UserDataContext';
import { UserProfile } from '../../Context/UserProfile';
import ProfileSkeleton from './../../Components/ProfileSkeleton/ProfileSkeleton';
import useGetUserPosts from './../../Hooks/useGetUserPosts';
import useGetSavePosts from './../../Hooks/useGetSavePosts';

export default function Profile(){
  const queryClinet = useQueryClient();
  const [view, setView] = useState('posts');

  const {token} = useContext(UserData)
  const {user:User} = useContext(UserProfile); 
  const {isLoading,userPosts}=useGetUserPosts(User,token);
  const {savedPosts}=useGetSavePosts(token);

    const {register,handleSubmit}=useForm({
    defaultValues:{
      photo:''
    }
  })

    const {mutate:upload, isPending:isUploading}=useMutation({
    mutationFn:uploadPhoto,
    onSuccess:()=>{
      queryClinet.invalidateQueries(['useData']);
    },
  })



  async function uploadPhoto(data){ 

    try{
      const formData = new FormData();
        formData.append('photo',data.photo[0]);
        
      const {data:res}=await axios.put('https://route-posts.routemisr.com/users/upload-photo',formData,{
        headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
      })
      if(res.success){
        return res.data.photo;
      }
      
    }catch(err){
      console.log(err);
      throw err
      
    }
  }



  if(isLoading ){
    return <ProfileSkeleton />
  }




  return (
    <div className="max-w-6xl mx-auto  min-h-screen pb-10 rounded-2xl overflow-hidden mt-20 bg-white">
      <div className="relative h-32 sm:h-48 md:h-64 bg-gray-200 ">
        <img 
          src={User.cover?User.cover:`https://images.unsplash.com/photo-1506744038136-46273834b3fb`} 
          className="w-full h-full object-cover" 
          alt="Cover" 
        />

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
          <div className="relative group">
            <img 
              src={User.photo} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-md" 
              alt="Profile"
            />

              <form onSubmit={handleSubmit(upload)}>
                <label className="absolute cursor-pointer bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white border-2 border-white hover:scale-110 transition">
                  {isUploading?<Loader/>:<Camera size={14} />}
                  <input 
                    type="file" 
                    {...register("photo",{
                        onChange: () => {
                          handleSubmit(upload)();
                        }
                      })} 
                    hidden
                    accept="image/*"
                  />
                </label>
              </form>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 px-4 sm:px-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{User.name}</h1>
            <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-1">
              <span className="text-xs sm:text-sm">@{User.username}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-1">
              <span className="text-xs sm:text-sm">{User.email}</span>
            </div>
          </div>
            <Link to='/changepass' className=" text-center mt-4   bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              Change Password 
            </Link>
          
        </div>

        <div className="flex justify-around sm:justify-start sm:gap-10 mt-8 py-4 border-y sm:border-none border-gray-100">
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{userPosts.length}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Posts</span>
            </div>
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{User.followersCount}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Followers</span>
            </div>
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{User.followingCount}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Following</span>
            </div>

        </div>
      </div>

      <div className="flex mt-2 border-t sm:border-t-0 ">
        <TabButtonProfile 
          active={view === 'posts'} 
          onClick={() => setView('posts')} 
          icon={<Grid size={18} />} 
          label={`Posts (${userPosts.length})`} 
        />
        <TabButtonProfile
          active={view === 'saved'} 
          onClick={() => setView('saved')} 
          icon={<Bookmark size={18} />} 
          label={`Saved (${savedPosts.length})`} 
        />
      </div>

      {view ==='posts'&&<div className="mt-3 bg-gray-200">
        {userPosts.length > 0  ? userPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                  :
                  <EmptyPosts/>
                  }
      </div>}
      {view ==='saved'&&<div className="mt-3 bg-gray-200">
        {savedPosts.length > 0   ? savedPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                  :
                  <EmptyPosts/>
                  }
      </div>}
    </div>
  );
};



