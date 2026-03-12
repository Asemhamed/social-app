import {
  Bell,
  CheckCircle2
} from 'lucide-react';
import { useContext } from 'react';
import NotificationItem from '../../Components/NotificationItem/NotificationItem';
import TabButton from '../../Components/TabButton/TabButton';
import { UserData } from '../../Context/UserDataContext';
import useNotification from '../../Hooks/useNotification';

export default function Notifications() {
  const {token} = useContext(UserData);
  const {allAsRead,notifications,unReadedCount}=useNotification(token);







  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="">
          


          <main className="">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              
              <div className="px-6 pt-6 pb-2 border-b border-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                  <button 
                    disabled={!unReadedCount}
                    onClick={allAsRead}
                    className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-60   text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1`}
                  >
                    <CheckCircle2 size={16} /> Mark all as read
                  </button>
                </div>

                <div className="flex gap-6">
                  <TabButton
                    label="Unread" 
                    count={unReadedCount} 
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <NotificationItem key={notif.id} notif={notif}  />
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="text-gray-300" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No notifications yet</p>
                  </div>
                )}
              </div>
            </div>
          </main>


        </div>
      </div>
    </div>
  );
}

