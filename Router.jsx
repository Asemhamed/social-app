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

export const routes = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
        {index:true,element:<GuardOut><Home/></GuardOut> },
        {path:'/profile',element:<GuardOut><Profile/></GuardOut>},
        {path:'/changepass',element:<ChangePass/>},
        {path:'/postdetails/:id',element:<PostDetails/>},
        {path:'/login',element:<GuardEnter><Login/></GuardEnter> },
        {path:'/register',element: <GuardEnter><Register/></GuardEnter> },
        {path:'*',element:<NotFound/>}
    ]}
]);