import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserData } from '../../Context/UserDataContext';
import { Link } from 'react-router-dom';

export default function SuggestedUser( {friend }) {
    const{token}=useContext(UserData);
const queryClinet = useQueryClient();
  
  const {mutate:followMT,isPending:isFollow}=useMutation({
        mutationFn:putFollow,
        onSuccess:()=>{
          queryClinet.invalidateQueries(['allSuggest'])
        }
      })
        

    async function putFollow(){
        try{
            const {data} = await axios.put(`https://route-posts.routemisr.com/users/${friend._id}/follow`,{},{
              headers:{
                AUTHORIZATION:`Bearer ${token}`
              }
            })
            return data.data.followersCount || []
        }catch(err){
        throw err
        }

      }
      
  return (<div className=' shadow p-3 rounded-2xl'>
      <div className="flex items-center justify-between   ">
    <Link to={`/friendProfile/${friend._id}`} className="flex items-center gap-2">
      <div >
        <img className='h-8 w-8 rounded-full' src={friend.photo} alt={friend.name} />
      </div>
      <div>
      <span className="text-xs font-bold text-gray-800 hover:underline">{friend.name.replace(/[0-9]/g, '')}</span>
      {friend.username&&<p className="text-[10px] text-gray-500">@{friend.username}</p>}
      </div>
    </Link>
    <button onClick={followMT} className="text-xs cursor-pointer font-bold text-blue-600 px-3 py-1 hover:bg-blue-50 rounded-lg">
      {isFollow? <div className='flex items-center justify-between'><span className='text-[10px] text-blue-300 '>Following</span></div>: 'Follow'}
      </button>
  </div>
  {friend.followersCount?
  <span className='bg-gray-100 me-2 text-gray-600 py-1 px-2 text-[9px] rounded-2xl'>{friend.followersCount} followers</span>
  :''}
  {friend.mutualFollowersCount?
  <span className='bg-blue-100 text-blue-600 py-1 px-2 text-[9px] rounded-2xl'>{friend.mutualFollowersCount} Mutual</span>
  :''}
  </div>
  )
}
