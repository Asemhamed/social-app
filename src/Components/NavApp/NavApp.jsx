import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle
} from "flowbite-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserDataContext";
import toast from "react-hot-toast";
import { UserProfile } from "../../Context/UserProfile";


export default function NavApp() {
  const {user}=useContext(UserProfile);
  const {token,setToken} = useContext(UserData);
  const navigate=useNavigate();
  function logout(){
    localStorage.removeItem("userToken");
    toast.success("Logged out Successfully");
    setToken(null);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  
  return <>
  <Navbar fluid  className=" fixed w-full ">
      <NavbarBrand href="https://flowbite-react.com" className="me-auto">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Social App</span>
      </NavbarBrand>
      <div className="flex md:order-2 ">
        {token &&<Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user?.photo} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm capitalize">{user?.name}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </DropdownHeader>
          <DropdownDivider />
          <DropdownItem onClick={logout}>Sign out</DropdownItem>
        </Dropdown>
}

        <NavbarToggle />
      </div>
      <NavbarCollapse className="mx-5">
        {token && <> <NavLink to='/'  className='text-white'>Home</NavLink>
          <NavLink to='/profile'  className='text-white'>Profile</NavLink></>}
        {!token &&<><NavLink to='/login'  className='text-white'>Login</NavLink>
          <NavLink to='/register'  className='text-white'>Register</NavLink></>}
      </NavbarCollapse>
    </Navbar>
  </>
}
