import React, { useContext } from 'react'
import { UserData } from '../../Context/UserDataContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function GuardEnter({children}) {
    const {token} = useContext(UserData);

    if(token){
        return <Navigate to='/' />;
    }
    return <>{children}</>;
}
