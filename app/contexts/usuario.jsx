'use client'
import { createContext, useState } from "react"

export const UserContext = createContext()


function UserProvider({ children }) {
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('')
    const [userIsAdmin, setUserIsAdmin] = useState(false)

    function changeId(id){
        setUserId(id)
    }

    function changeName(nome){
        setUserName(nome)
    }

    function changeAdmin(isAdmin){
        setUserIsAdmin(isAdmin)
    }

    return(
        <UserContext.Provider value={{userId, changeId, userName, changeName, userIsAdmin,changeAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider