import {
  Bell,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  X
} from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserDataContext";
import { UserProfile } from "../../Context/UserProfile";


export default function NavApp() {
  const {user}=useContext(UserProfile);
  const {token,setToken} = useContext(UserData);
  const [isOpen, setIsOpen] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate=useNavigate();
  
  function logout(){
    localStorage.removeItem("userToken");
    toast.success("Logged out Successfully");
    setToken(null);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  
const linkStyle = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 flex gap-2 ${
      isActive 
        ? "text-blue-600 dark:text-blue-600" 
        : "text-gray-900 hover:text-blue-600 dark:text-dark dark:hover:text-dark"
    }`;



  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-gray-900 sm:block">
              Social<span className="text-blue-600">App</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center  rounded-2xl border-0 bg-gray-200 justify-center space-x-1">
            {token ? (
              <>
                <NavLink to="/" className={linkStyle}><Home size={18} /> Home</NavLink>
                <NavLink to="/profile" className={linkStyle}><User size={18} /> Profile</NavLink>
                <NavLink to="/notifications" className={linkStyle}><Bell size={18} /> Notifications </NavLink>
              </>
            ) : ''}
          </div>

          <div className="flex items-center px-2 rounded-2xl border-gray-200 bg-gray-200 border-2  gap-3">
            {token ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-100 p-1 cursor-pointer transition-all active:scale-95"
                >
                  <img src={user?.photo} alt="Avatar" className="h-8 w-8 rounded-full border border-gray-100 object-cover" />
                  <span className="hidden text-sm font-semibold text-gray-700 lg:block px-1">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-gray-200/50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link to="/profile" onClick={()=>setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      <User size={16} /> Profile
                    </Link>
                    <Link to="/settings" onClick={()=>setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    <button onClick={()=>{logout();setIsDropdownOpen(false)}}  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                  Join
                </Link>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-50 lg:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-50 bg-white/95 p-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-2">
            {token ? (
              <>
                <NavLink to="/" onClick={() => setIsOpen(false)} className={linkStyle}><Home size={18}/> Home</NavLink>
                <NavLink to="/notifications" onClick={() => setIsOpen(false)} className={linkStyle}><Bell size={18}/> Notifications</NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)} className={linkStyle}><User size={18}/> Profile</NavLink>
                <button onClick={() => {setIsOpen(false);logout()}} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500"><LogOut size={18}/> Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkStyle}>Login</NavLink>
                <NavLink to="/register" className="flex items-center justify-center rounded-xl bg-blue-600 py-3 text-white font-bold">Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

}
