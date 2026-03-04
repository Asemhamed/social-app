import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, Bookmark, Heart, MessageCircle, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { AddCommentSchema } from '../../../schemaValidation.jsx';
import { UserProfile } from '../../Context/UserProfile';
import Loader from '../Loader/Loader.jsx';
import { UserData } from './../../Context/UserDataContext';



export default function PostCard({post,details}) {
  const [showComments, setShowComments] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savePost,setSavePost] = useState(localStorage.getItem(`save${post.id}`));
  const [likePost,setLikePost] = useState(localStorage.getItem(`like${post.id}`));
  const {token} = useContext(UserData);
  const queryClient = useQueryClient();
  const {user} = useContext(UserProfile);

      
      


    const {register,handleSubmit,reset,formState:{isValid}}=useForm({
        defaultValues:{
          content:''
        },
        resolver:zodResolver(AddCommentSchema),
        mode:'onChange',
      })

    const {mutate:AddComment,isPending:isAddComment}=useMutation({
        mutationFn:addComment,
        onSuccess:()=>{
          queryClient.invalidateQueries(['postComments',post.id])
        },
        onError:()=>{
          console.log('Errorrrrrrrrrrrrr');
        }
      });
      
      async function addComment(values){
        
      const formData = new FormData();
      formData.append('content',values.content);
        const res = await axios.post(`https://route-posts.routemisr.com/posts/${post.id}/comments`,formData,{
          headers:{
            AUTHORIZATION:`Bearer ${token}`
          },
        });

        reset()
        return res
      }
      
    
    const {data:comments = [],isLoading}=useQuery({
        queryFn:getComments,
        queryKey:['postComments',post._id],
        enabled:!!token
      })
        

    async function getComments(){
        try{
            const {data:res} = await axios.get(`https://route-posts.routemisr.com/posts/${post.id}/comments?page=1&limit=10`,{
              headers:{
                AUTHORIZATION:`Bearer ${token}`
              }
            })
            return res.data.comments; 
        }catch(err){
          throw err;
        }
      }

    const {mutate:mark,isPending}=useMutation({
        mutationFn:putMark,
        onSuccess:()=>{
          queryClient.invalidateQueries(['savedPosts'])
        }
      })
        
    async function putMark(){
        try{
            const {data} = await axios.put(`https://route-posts.routemisr.com/posts/${post.id}/bookmark`,{},{
              headers:{
                AUTHORIZATION:`Bearer ${token}`
              }
            })
            setSavePost(data.data.bookmarked);
            localStorage.setItem(`save${post.id}`,data.data.bookmarked)
            return data.data.bookmarksCount || []
        }catch(err){
          console.log(err);
        }
      }


    const {mutate:like,isPending:isLike}=useMutation({
        mutationFn:putLike,
        onSuccess:()=>{
          queryClient.invalidateQueries(['likesPost',post._id])
        }
      })
        

    async function putLike(){
        try{
            const {data} = await axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`,{},{
              headers:{
                AUTHORIZATION:`Bearer ${token}`
              }
            })
            setLikePost(data.data.liked);
            localStorage.setItem(`like${post.id}`,data.data.liked);
            return data.data.likesCount || []
        }catch(err){
          console.log(err);
        }
      }


    async function getLikesPost() {
          try{
        const {data} = await axios.get(`https://route-posts.routemisr.com/posts/${post._id}/likes?page=1&limit=20`,{
          headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
        })
        if(data.success){
          return data.meta.pagination.total
        }
        
        
    }catch(err){
      console.log(err);
      
    }


  }
  
  const {data:likesPost=0}=useQuery({
    queryFn: getLikesPost,
    queryKey:['likesPost',post._id],
    enabled:!!token
  })
    
    
    
  const {mutate:deleteComment,isPending:isDeleteComment}=useMutation({
        mutationFn:(variables)=>delComment(variables),
        onSuccess:()=>{
          queryClient.invalidateQueries(['postComments',post.id])
        },
        onError:()=>{
          console.log('Errorrrrrrrrrrrrr');
        }
      });

  async function delComment(id){
        try{
            const res = await axios.delete(`https://route-posts.routemisr.com/posts/${post.id}/comments/${id}`,{
          headers:{
            AUTHORIZATION:`Bearer ${token}`
          }
        })
        }
        catch(err){
          console.log(err);
          
        }

        
      }
  
  const {mutate: deletePost, isPending: isDeleting}=useMutation({
    mutationFn:delPost,
    onSuccess:()=>{
      queryClient.invalidateQueries(['allPosts']);
    },
    onError:()=>{
      console.log('errorrrrr');
      
    }
  })

  async function delPost(){
    const {data}= await axios.delete(`https://route-posts.routemisr.com/posts/${post.id}`,{
      headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
    });
    return data.data
  }
  


return<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible relative my-5">
        {details&&<Link to="/" className="p-3 inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-2" /> Back to feed
      </Link>}
      <div className="flex items-center justify-between p-4">
        <Link to={`/friendProfile/${post.user._id}`} className="flex items-center gap-3">
          <img 
            src={post.user?.photo} 
            className="h-10 w-10 rounded-full object-cover border border-gray-50" 
            alt={post.user?.name} 
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900 hover:underline">{post.user?.name} <span className='text-[10px] text-gray-400 ms-2'>{savePost&&'Saved'}</span></h4>
            <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
              {new Date(post.createdAt).toLocaleString()}
              </p>
          </div>
        </Link>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition"
          >
            <MoreHorizontal size={20}/>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 z-10 bg-white rounded-xl border border-gray-100 shadow-xl p-1 animate-in zoom-in-95 duration-150">
              {post?.user?._id === user?._id&&
              <button 
                disabled={isDeleting}
                onClick={()=>{deletePost();setIsMenuOpen(false)}}
                className="flex focus:border-0 w-full items-center cursor-pointer gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                
                {isDeleting ? <Loader/> :<> <Trash2 size={16} /> Delete Post</>}
              </button>}

              <button 
                disabled={isPending}
                onClick={()=>{mark();setIsMenuOpen(false)}}
                className={`flex focus:border-0 w-full cursor-pointer  items-center gap-2 px-3 py-2 text-sm font-medium  hover:bg-blue-50 rounded-lg transition `}
              >
                {isPending?<Loader/>:<> <Bookmark  className={`${savePost&&' text-amber-300 fill-amber-300'} `} size={16} />
                {savePost?'unSave Post':'Save Post'}
                </>}
              </button>
            </div>
          )}
        </div>


      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
      </div>

      {post.image && (
        <div className="bg-gray-50 border-y border-gray-50 flex justify-center">
          <img 
            src={post.image} 
            className="max-w-full max-h-[500px] object-contain" 
            alt="Post content" 
          />
        </div>
      )}
      {!details&&
      <div className='text-end px-5'>
        <Link to={`/postdetails/${post.id}`} className='text-[10px] text-blue-700 font-bold '>View details</Link>
      </div>}

      <div className="p-4">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-3">
          <div className="flex items-center gap-6">
            <button onClick={like} className="flex focus:border-0 items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors group">
              <Heart size={20} className={`group-active:scale-125 transition-transform ${likePost&&' text-red-300 fill-red-300'}`} /> 
              <span className="text-xs font-bold">{isLike?<Loader/>:`${likesPost} Like `} </span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex focus:border-0 cursor-pointer items-center gap-1.5 transition-colors ${showComments ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
            >
              <MessageCircle size={20} /> 
              <span className="text-xs font-bold">{post.commentsCount || 0} Comments</span>
            </button>
          </div>

        </div>

        {showComments && (
          <div className="space-y-4 pt-2 animate-in slide-in-from-top-2 duration-300">
            {isLoading && <Skeleton count={2} width={'100% '} height={20} baseColor="#09c" />}
            {post.commentsCount > 0 ? (
              comments?.map((comment) => (
                <div key={comment._id} className="flex gap-3 items-start">
                  <img 
                    src={comment.commentCreator?.photo} 
                    className="h-8 w-8 rounded-full object-cover shadow-sm" 
                    alt="Commenter" 
                  />
                  <div className="flex justify-between items-center bg-gray-50 rounded-2xl w-full px-4 py-2 relative">
                    <div>
                      <p className="text-[12px] font-bold text-gray-900">{comment?.commentCreator?.name}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{comment?.content}</p>
                    </div>
                    <div>
                    {comment.commentCreator._id === user._id && <button onClick={()=>deleteComment(comment._id)} className="px-4 text-[11px] border border-slate-300 bg-gray-200 rounded hover:bg-red-600 hover:text-white transition cursor-pointer">{isDeleteComment?<Loader/>:'Delete'}</button>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-2">No comments yet. Be the first!</p>
            )}

            <form onSubmit={handleSubmit(AddComment)} className="flex items-center gap-3 pt-3">
              <div className="flex-1 relative group">
                <input 
                {...register('content')}
                  type="text" 
                  placeholder="Write a comment..." 
                  className="w-full bg-gray-100 border-transparent rounded-full py-2 px-4 text-xs focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
                <button
                disabled={!isValid}
                className="absolute disabled:cursor-not-allowed disabled:text-blue-500/50 right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition">
                  {isAddComment?<Loader/>:<Send size={14} />}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>;

}

