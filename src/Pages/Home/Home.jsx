import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Bookmark, ChevronDown, ChevronUp, Home as HomeIcon, ImageUp, Layout, Users } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Outlet } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import SuggestedUser from '../../Components/SuggestedUser/SuggestedUser';
import { UserData } from '../../Context/UserDataContext';
import { UserProfile } from '../../Context/UserProfile';

export default function Home() {
  const{token}=useContext(UserData);
  const {user} = useContext(UserProfile); 
  const [showSuggested, setShowSuggested] = useState(false);

const linkStyle = ({ isActive }) =>
    `flex cursor-pointer w-full items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition  ${
      isActive 
        ? "bg-blue-50 text-blue-600" 
        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
    }`;


 
  

  const {register,handleSubmit,reset,watch}=useForm({
    defaultValues:{
      body:'',
      image:''
    },
  })

  const bodyValue = watch("body");
  const isPostEmpty = !bodyValue?.trim();

  const queryClinet = useQueryClient();
  
  const {mutate: createPost, isPending:isPosting}=useMutation({
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
      const {data:res}=await axios.post('https://route-posts.routemisr.com/posts',formData,{
        headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
      })
      if(res.success){
        return res.data;
      }
      
    }catch(err){
      console.log(err);
    }}


    const {data:suggestions =[]}=useQuery({
    queryFn:getAllSuggest,
    queryKey:["allSuggest"],
    enabled:!!token
  })



  async function getAllSuggest(){
    try{
      const {data}= await axios.get('https://route-posts.routemisr.com/users/suggestions?limit=5',{
        headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
      });

      if(data.success){
        return data.data.suggestions
      }}catch(err){
      throw err
    }
  }


return(
<div className="min-h-screen bg-[#F9FBFC] pt-20 pb-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid  grid-cols-1 gap-4 lg:grid-cols-12">
          

          <aside className="  lg:block   lg:col-span-3  ">
            <div className="w-full translate-x-6   lg:fixed lg:top-24 lg:w-[240px] space-y-2 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <NavLink to={'/'} className={linkStyle}><HomeIcon size={20}/> Home</NavLink>
              <NavLink to={'/myPosts'} className={linkStyle}><Layout size={20}/> My Posts</NavLink>
              <NavLink to={'/saved'} className={linkStyle}><Bookmark size={20}/> Saved</NavLink>
            </div>
          </aside>

          <main className="col-span-1  lg:col-span-6 space-y-6  ">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <form onSubmit={handleSubmit(createPost)}>
                <div className="flex gap-4">
                  <img src={user?.photo} className="h-10 w-10 rounded-full object-cover" alt="me" />
                  <textarea 
                    {...register('body')}
                    className="w-full border-none focus:ring-0 focus:outline-0 bg-gray-100 p-4 rounded-2xl text-gray-700 placeholder:text-gray-400 resize-none pt-2"
                    placeholder="What's happening?"
                    rows="2"
                  />
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <label className="flex items-center gap-2 text-blue-600 cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                    <ImageUp size={20} />
                    <span className="text-sm font-medium">Media</span>
                    <input type="file" {...register('image')} hidden />
                  </label>
                  <button disabled={isPosting || isPostEmpty} className="bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600/50 cursor-pointer text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 shadow-md transition active:scale-95">
                    {isPosting ? <Loader/> : 'Post'}
                  </button>
                </div>
              </form>
            </div>
            
            
            <div className="lg:hidden w-full">
              <button 
                onClick={() => setShowSuggested(!showSuggested)}
                className="w-full flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-900"
              >
                <div className='flex items-center'>
                  <div className='flex items-center gap-1'><Users size={'15px'} color='#1C64F2'/> Suggested Friends </div><span className='ms-2 text-center p-1 text-[10px] bg-gray-100 rounded-full'>{suggestions.length || 0}</span>
                  </div>
                {showSuggested ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {showSuggested && (
                <div className="mt-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
              {suggestions.length>0 ? suggestions.map((friend)=><SuggestedUser key={friend._id} friend={friend} />)
                :
                <Loader/>
                }
                </div>
              )}
            </div>

            <Outlet/>

          </main>

          <aside className="hidden  lg:col-span-3  lg:block ">
            <div className="fixed ms-7 top-24    -translate-x-6 w-[260px] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex justify-between items-center"><div className='flex items-center gap-1'><Users size={'15px'} color='#1C64F2'/> Suggested Friends </div><span className='ms-2 text-center p-1 text-[10px] bg-gray-100 rounded-full'>{suggestions.length || 0}</span></h3>
              <div className="space-y-6 ">
              {suggestions.length>0 ? suggestions.map((friend)=><SuggestedUser key={friend._id} friend={friend} />)
                :
                <Loader/>
                }
                
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}







