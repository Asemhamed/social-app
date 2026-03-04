import React, { createContext, useState } from 'react'


export const UserData = createContext()

export default function UserDataProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    
    return <UserData.Provider  value={{token,setToken}} >
            {children}
        </UserData.Provider>
}
