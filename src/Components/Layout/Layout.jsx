import { useContext } from 'react'
import NavApp from '../NavApp/NavApp'

import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { Outlet } from 'react-router-dom'
import { UserData } from '../../Context/UserDataContext'
import { UserProfile } from '../../Context/UserProfile'

export default function Layout() {
const{token}=useContext(UserData);
const {user,setUser} = useContext(UserProfile);
  if(token){
      async function getUser() {
    try{
      const {data} = await axios.get('https://route-posts.routemisr.com/users/profile-data',{
        headers:{
        AUTHORIZATION:`Bearer ${token}`
        }
      });
      if(data.success){
        localStorage.setItem('user',data.data.user);
        setUser(data.data.user);
        return data.data.user;
      }
    }catch(err){
      console.log(err);
    }
  }
   const {data:User}= useQuery({
    queryFn:getUser,
    queryKey:["useData"],
  })
}


  return <>
  <NavApp/>
  <div className=' min-h-screen bg-gray-200 overflow-hidden'>
  <Outlet/>
  </div>
  </>
}
