import { createBrowserRouter } from "react-router-dom";
import Layout from "./src/Components/Layout/Layout";
import Home from './src/Pages/Home/Home';
import Profile from './src/Pages/Profile/Profile';
import Login from './src/Pages/Login/Login';
import Register from './src/Pages/Register/Register';
import NotFound from './src/Pages/NotFound/NotFound';
import GuardEnter from "./src/Components/GuardEnter/GuardEnter";
import GuardOut from "./src/Components/GuardOut/GuardOut";
import ChangePass from "./src/Pages/ChangePass/ChangePass";
import PostDetails from "./src/Pages/PostDetails/PostDetails";
import Notifications from './src/Pages/Notifications/Notifications';
import MyPosts from './src/Pages/myPosts/MyPosts';
import Saved from './src/Pages/Saved/Saved';
import Posts from "./src/Pages/Posts/Posts";
import FriendProfile from './src/Pages/friendProfile/FriendProfile';

export const routes = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
        {path:'/',element:<GuardOut><Home/></GuardOut>,children:[
            {index:true,element:<GuardOut><Posts/></GuardOut> },
            {path:'myPosts',element:<MyPosts/>},
            {path:'saved',element:<Saved/>}
        ] },
        {path:'/profile',element:<GuardOut><Profile/></GuardOut>},
        {path:'/notifications',element:<GuardOut><Notifications/></GuardOut>},
        {path:'/changepass',element:<ChangePass/>},
        {path:'/postdetails/:id',element:<PostDetails/>},
        {path:'/friendProfile/:id',element:<FriendProfile/>},
        {path:'/login',element:<GuardEnter><Login/></GuardEnter> },
        {path:'/register',element: <GuardEnter><Register/></GuardEnter> },
        {path:'*',element:<NotFound/>}
    ]}
]);