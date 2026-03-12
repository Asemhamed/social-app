import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function usePutFollow(id,token) {

    const queryClinet = useQueryClient()
    const {mutate:followMT,isPending:isFollow}=useMutation({
        mutationFn:putFollow,
        onSuccess:()=>{
        queryClinet.invalidateQueries(['friend',id])
        }
    })
        

    async function putFollow(){
        try{
            const {data} = await axios.put(`https://route-posts.routemisr.com/users/${id}/follow`,{},{
              headers:{
                AUTHORIZATION:`Bearer ${token}`
              }
            })
            return data.data.followersCount || []
        }catch(err){
        throw err
        }

    }
    return {followMT,isFollow}
}
