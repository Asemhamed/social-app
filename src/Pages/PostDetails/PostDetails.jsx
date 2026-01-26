import axios from 'axios';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostDetailsSkeleton from './../../Components/PostDetailsSkeleton/PostDetailsSkeleton';
import { UserData } from './../../Context/UserDataContext';
import { useQuery } from '@tanstack/react-query';

export default function PostDetails() {
      const postID = useParams();
      const {token}= useContext(UserData);

      const {data:postD,isFetched,isLoading}=useQuery({
        queryFn: fetchPostDetails,
        queryKey:['postDetails',postID]
      })

      async function fetchPostDetails() {
        try{
          const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postID.id}`, {
            headers: {
              token
            }
          })
          // console.log(res);
          
          if(data.message=='success'){
            
            return data.post;
          }

        }catch(err){
          console.log(err);
        }
      }


  return <>
    {isFetched && <div className="max-w-4xl  mx-auto mb-8 mt-20 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <Link to="/">
          <ArrowLeft size={20} color='white' />
        </Link>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <Bookmark size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-10">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            {new Date(postD?.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          {postD?.body}
        </h1>

        {/* Author Section */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <img 
            src={postD?.user?.photo} 
            alt={postD?.user?.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
          />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{postD?.user?.name}</h3>
          </div>
        </div>

        {/* Main Image */}
        {postD.image && <div className="relative mb-8 group">
          <img 
            src={postD?.image} 
            alt="Hero" 
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>}

        {/* Post Body */}

      </div>

      {/* Footer / Interaction Bar */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          
          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <MessageCircle className="text-gray-400 group-hover:text-blue-500" size={22} />
            </div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{postD?.comments?.length}</span>
          </button>
        </div>

      </div>
    </div> }
    {isLoading && <PostDetailsSkeleton/>}
  </>
}
