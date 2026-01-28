import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserData } from './../../Context/UserDataContext';
import PostCard from '../../Components/PostCard/PostCard';
import Skeleton from 'react-loading-skeleton';
import PostSkeleton from '../../Components/PostSkeleton/PostSkeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Textarea, TextInput } from 'flowbite-react';
import { ImageUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CommentsDrawer from '../../Components/CommentsDrawer/CommentsDrawer';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const [postId, setPostId] = useState(null);
  const [userPostId, setUserPostId] = useState(null);
  const{token}=useContext(UserData);
  
  const {data:posts,isFetched,isLoading}=useQuery({
    queryFn:getAllPosts,
    queryKey:["allPosts"]
  })



  async function getAllPosts(){
    try{
      const {data}= await axios.get('https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt',{
        headers:{
          token
        }
      });

      if(data.message=='success'){
        return data.posts
      }}catch(err){
      console.log(err);
    }
  }

  const {register,handleSubmit,reset}=useForm({
    defaultValues:{
      body:'',
      image:null
    }
  })
  const queryClinet = useQueryClient();
  
  const {mutate}=useMutation({
    mutationFn:addPost,
    onSuccess:()=>{
      queryClinet.invalidateQueries(['allPosts']);
      reset();
    },
    onError:()=>{
      console.log('errorrrrrrrrrrr');
      
    }
  })

  async function addPost(data){ 

    try{
      const formData = new FormData();
      formData.append('body',data.body);
      if(data.image){
        formData.append('image',data.image[0]);
      }
      const {data:res}=await axios.post('https://linked-posts.routemisr.com/posts',formData,{
        headers:{
          token
        }
      })
      return res;
      
    }catch(err){
      console.log(err);
    }}



  return <div className='my-20'>
    <title>Home</title>
    <div className='container w-[80%] mx-auto '>
      <h2 className='text-2xl font-bold mb-5 text-center'>Add Post</h2>
      <form onSubmit={handleSubmit(mutate)}>
      <TextInput id="comment" {...register('body')} placeholder="What's on your mind?" className='mb-2' />
      <label htmlFor="image" >
      <ImageUp color="#08e" />
      </label>
      <input {...register('image')} type="file" id='image' hidden/>
      <button className='bg-blue-600 text-white px-4 mt-2 block mx-auto py-2 rounded-md '>Post</button>
      </form>
 
    <hr className='my-5'/>
    </div>
    {isLoading && <PostSkeleton/>}
    {isFetched && posts?.map((post)=><PostCard setUserPostId={setUserPostId} setPostId={setPostId} setIsOpen={setIsOpen} key={post._id} post={post}/>)}
    <CommentsDrawer postId={postId} handleClose={handleClose} userPostId={userPostId} isOpen={isOpen}/>
  </div>
}
