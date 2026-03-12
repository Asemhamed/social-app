import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetAllSuggest(token) {

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
  return {suggestions}
}
