"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Drawer, DrawerHeader, DrawerItems, TextInput } from "flowbite-react";
import { cache, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { UserData } from "../../Context/UserDataContext";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../Context/UserProfile";
    
export default function CommentsDrawer({isOpen,handleClose,postId,userPostId}) {
      const {token} = useContext(UserData);
      const {user} = useContext(UserProfile);
      
      
      
      


      const {register,handleSubmit,reset}=useForm({
        defaultValues:{
          content:''
        }
      })
      async function addComment(values){
        
        
        const objData ={
          content:values.content,
          post:postId
        }

        
        
        const res = await axios.post('https://linked-posts.routemisr.com/comments',objData,{
          headers:{
            token
          },
        });

        reset()
      }
      
      
      const {data,isFetched,isLoading}=useQuery({
        queryFn:getComments,
        queryKey:['postComments',postId],
        enabled:Boolean(postId)
      })
        

      async function getComments(){
        try{
            const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,{
              headers:{
                token
              }
            })
            return data.comments
        }catch(err){
          console.log(err);
        }
      }

      const queryClient =  useQueryClient();
      const {mutate}=useMutation({
        mutationFn:addComment,
        onSuccess:()=>{
          queryClient.invalidateQueries(['postComments',postId])
        },
        onError:()=>{
          console.log('Errorrrrrrrrrrrrr');
        }
      });
      const {mutate:deleteComment}=useMutation({
        mutationFn:(variables)=>delComment(variables),
        onSuccess:()=>{
          queryClient.invalidateQueries(['postComments',postId])
        },
        onError:()=>{
          console.log('Errorrrrrrrrrrrrr');
        }
      });

      async function delComment(id){
        try{
            const res = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
          headers:{
            token
          }
        })
        console.log(res);
        }
        catch(err){
          console.log(err);
          
        }

        
      }

  return <>
      <Drawer open={isOpen} onClose={handleClose} position="bottom">
        <DrawerHeader title="Comments" />
        <DrawerItems>
          <form onSubmit={handleSubmit(mutate)} className="flex">
            <TextInput id="comment" {...register('content')} placeholder="Add a comment" className='mb-2 w-full me-2' />
            <button type="submit" className="bg-slate-600 text-md py-0.5 text-white px-4  rounded-md hover:bg-blue-700 transition-colors">Comment</button>
          </form>
          {isLoading && <Skeleton count={2} width={'100% '} height={20} baseColor="#09c" />}
          {isFetched && data?.map((comment)=><div key={comment.id} className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {comment.commentCreator.name}
            </span>
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
              <p>{comment.content}</p>
              {userPostId === user._id && <button onClick={()=>deleteComment(comment.id)} className="px-4 bg-slate-600 rounded hover:bg-red-700 transition cursor-pointer">Delete</button>}
              </div>
          </div> )}
        </DrawerItems>
      </Drawer>
    
    </>
    }


    