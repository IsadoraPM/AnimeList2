'use client'
import { createContext, useState } from "react"

export const UserContext = createContext()


function UserProvider({ children }) {
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('')

    function changeId(id){
        setUserId(id)
    }

    function changeName(nome){
        setUserName(nome)
    }

    return(
        <UserContext.Provider value={{userId, changeId, userName, changeName}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider