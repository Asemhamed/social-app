

import React, { createContext, useState } from 'react'

export const UserProfile=createContext()

export default function UserProfileProvider({children}) {
const [user, setUser] = useState(localStorage.getItem('user'));

return <UserProfile.Provider value={{user,setUser}} >
            {children}
        </UserProfile.Provider>
}
