import { MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../Context/UserProfile';
import { Dropdown } from 'flowbite-react';
import axios from 'axios';
import { UserData } from './../../Context/UserDataContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export default function PostCard({setUserPostId,post,setIsOpen,setPostId}) {
  const {user}=useContext(UserProfile);
  const {token} = useContext(UserData);
  const queryClient = useQueryClient();
  
  
  
  const {mutate}=useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
      queryClient.invalidateQueries(['allPosts']);
    },
    onError:()=>{
      console.log('errorrrrr');
      
    }
  })
  async function deletePost(){
    const {data}= await axios.delete(`https://linked-posts.routemisr.com/posts/${post.id}`,{
      headers:{
        token
      }
    });
    return data
  }
  
  return <>
    <div className="max-w-xl mx-auto my-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.user.photo} 
            alt={post.user.name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
              {post.user.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {post.user._id === user._id &&<>
        <Dropdown color={'transparent' } className='text-white border-0' >
          <button className='p-2 cursor-pointer' onClick={mutate}>Delete</button>
        </Dropdown>
        </>     
}
      </div>

      {/* Post Body Text */}
      <Link to={`/postdetails/${post._id}`}>
        <div className="px-4 pb-3">
          <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
            {post.body}
          </p>
        </div>
      </Link>

      {/* Post Image */}
      {post.image && (
        <div className="w-full bg-gray-100 dark:bg-gray-800">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Interaction Buttons (Like/Comment/Share) */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={20} /> <span className="text-xs font-medium">Like</span>
        </button>
        <button onClick={()=> {setIsOpen(true) ,setPostId(post.id),setUserPostId(post.user._id);}} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
          <MessageCircle size={20} /> <span className="text-xs font-medium cursor-pointer">Comment</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
          <Share2 size={20} /> <span className="text-xs font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {post.comments[0] && <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
          Top Comments
        </p>
        
        {
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {post?.comments[0]?.commentCreator.name}
            </span>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
              {post?.comments[0]?.content}
            </p>
          </div>
        }</div>}
    </div>
        </>
}
