import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useNotification(token) {

    async function getAllNotifications() {
    const { data: res } = await axios.get(`https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.notifications; 
  }

  async function unReadCount() {
    const { data } = await axios.get(`https://route-posts.routemisr.com/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` } 
    });
    return data.data.unreadCount;   }

  async function markAllAsRead() {
    try {
      const { data } = await axios.patch(`https://route-posts.routemisr.com/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.data.modifiedCount;
    } catch (err) { console.error(err) }
  }

  
  const { data: notifications = [] } = useQuery({
    queryFn: getAllNotifications,
    queryKey: ['allNotifications', token], 
    enabled: !!token
  });

  const { data: unReadedCount = 0 } = useQuery({
    queryFn: unReadCount,
    queryKey: ["unreadedCount", token],
    enabled: !!token
  });

  const queryClient = useQueryClient();
  
  const {mutate:allAsRead}=useMutation({
  mutationFn:markAllAsRead,
  onSuccess:()=>{
    queryClient.invalidateQueries(['allNotifications', token]);
  }
})
return {allAsRead,unReadedCount,notifications}

}
