import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetFriend(id,token) {
        const {data,isLoading}=useQuery({
        queryFn:getFriend,
        queryKey:['friend',id],
        enabled:!!token
    })
    

    async function getFriend(){
        try{
            const {data} = await axios.get(`https://route-posts.routemisr.com/users/${id}/profile`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return data.data || [];

        }catch(err){
            console.log(err);
        }
        
    }
    return {data,isLoading}
}
