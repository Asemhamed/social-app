import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, MessageCircle, MoreHorizontal, UserPlus } from 'lucide-react';
import React, { useContext } from 'react'
import { UserData } from '../../Context/UserDataContext';

export default function NotificationItem({ notif }) {
    const {token} = useContext(UserData);

    const icons = {
    like_post: <div className="p-2 bg-red-50 text-red-500 rounded-full"><Heart size={16} fill="currentColor" /></div>,
    comment_post: <div className="p-2 bg-blue-50 text-blue-500 rounded-full"><MessageCircle size={16} fill="currentColor" /></div>,
    follow_post: <div className="p-2 bg-green-50 text-green-500 rounded-full"><UserPlus size={16} fill="currentColor" /></div>
  };
  
  
  async function markAsRead() {
    try {
      const { data } = await axios.patch(`https://route-posts.routemisr.com/notifications/${notif._id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.data.notification;
    } catch (err) { console.error(err) }
  }

  const queryClient = useQueryClient();
  
  const {mutate:AsRead}=useMutation({
  mutationFn:markAsRead,
  onSuccess:()=>{
  queryClient.invalidateQueries(['unreadedCount', token]);
  }
});
  
    return (
  <div className={`flex items-start gap-4 p-5 transition hover:bg-gray-50 cursor-pointer ${!notif.isRead ? "bg-blue-50/30" : ""}`}>
      <div className="relative">
        <img src={notif.actor.photo} className="h-12 w-12 rounded-full object-cover shadow-sm" alt="" />
        <div className="absolute -bottom-1 -right-1 shadow-sm">
          {icons[notif.type]}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-900">{notif.actor.name}</span> {notif.type.split('_')[0]}
          </p>
          {!notif.isRead && <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />}
        </div>
        <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-tighter">{notif.time}</p>
      </div>
      {!notif.isRead&&
      <button onClick={AsRead} className=" cursor-pointer text-gray-300 hover:text-gray-600 px-1">
        Mark as read
      </button>}
    </div>)
}
