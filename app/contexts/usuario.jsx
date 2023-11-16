'use client'
import { createContext, useState } from "react"

export const    UserContext = createContext()


function UserProvider({ children }) {
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('')
    const [userRoles, setUserRoles] = useState(false)
    const [token, setToken] = useState('')
    

    function changeId(id){
        setUserId(id)
    }

    function changeName(nome){
        setUserName(nome)
    }

    function changeRole(roles){
        setUserRoles(roles)
    }

    function changeToken(token){
        setToken(token)
    }

    return(
        <UserContext.Provider value={{userId, changeId, userName, changeName, userRoles,changeRole, token, changeToken }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider