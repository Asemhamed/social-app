import { Grid } from 'lucide-react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import EmptyPosts from '../../Components/EmptyPosts/EmptyPosts';
import PostCard from '../../Components/PostCard/PostCard';
import ProfileSkeleton from '../../Components/ProfileSkeleton/ProfileSkeleton';
import { UserData } from '../../Context/UserDataContext';
import useGetFriend from '../../Hooks/useGetFriend';
import useGetFriendPosts from '../../Hooks/useGetFriendPosts';
import usePutFollow from '../../Hooks/usePutFollow';
import Loader from './../../Components/Loader/Loader';

export default function FriendProfile() {
    const {id} = useParams();
    const {token} = useContext(UserData);
    const{data,isLoading}=useGetFriend(id,token);
    const {friendPosts}=useGetFriendPosts(id,token)
    const {followMT,isFollow}=usePutFollow(id,token)




    

    if(isLoading ){
    return <ProfileSkeleton />
  }

    return <>
    <div className="max-w-6xl mx-auto  min-h-screen pb-10 rounded-2xl overflow-hidden mt-20 bg-white">
      <div className="relative h-32 sm:h-48 md:h-64 bg-gray-200 ">
        <img 
          src={data.user.cover?data.user.cover:`https://images.unsplash.com/photo-1506744038136-46273834b3fb`} 
          className="w-full h-full object-cover" 
          alt="Cover" 
        />

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
          <div className="relative group">
            <img 
              src={data.user.photo} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-md" 
              alt="Profile"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 px-4 sm:px-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{data.user.name}</h1>
                {data.user.username&& <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-1">
                    <span className="text-xs sm:text-sm">@{data.user.username}</span>
                    </div>}
            <div className="flex items-center justify-center sm:justify-start text-gray-500 mt-1">
              <span className="text-xs sm:text-sm">{data.user.email}</span>
            </div>
        </div>
            {data.isFollowing?<span  className=" text-center mt-4   bg-blue-600/50  text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Following 
            </span>:<button onClick={followMT} className=" text-center mt-4   bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                {isFollow? <div className='flex items-center justify-between'><Loader>Following</Loader></div>: 'Follow'}
            </button>}
        
        </div>

        <div className="flex justify-around sm:justify-start sm:gap-10 mt-8 py-4 border-y sm:border-none border-gray-100">
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{friendPosts.length}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Posts</span>
            </div>
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{data.user.followersCount}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Followers</span>
            </div>
            <div className="text-center sm:text-left">
                <span className="font-bold text-lg block leading-tight">{data.user.followingCount}</span>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">Following</span>
            </div>

        </div>
    </div>

    <div className=" text-center mt-2 border-t sm:border-t-0 ">
            <div 
                    className={`flex-1   cursor-pointer flex items-center justify-center gap-2 py-3 sm:py-4 text-xs sm:text-sm font-bold transition-all border-t-2 sm:border-t border-black text-black'`}
                >
                    <Grid size={18} /> <span className="hidden md:inline uppercase">Posts </span>
                </div>
    </div>

    <div className="mt-3 bg-gray-200">
        {friendPosts.length > 0  ? friendPosts.map(post => (<PostCard key={post._id} post={post} details={false} />))
                :
                <EmptyPosts/>
                }
    </div>
    </div>
    </>
}
