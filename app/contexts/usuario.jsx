'use client'
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()


function UserProvider({ children }) {
    const [status, setStatus] = useState("deslogado")
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    function changeId(id){
        setUserId(id)
    }

    function changeName(nome){
        setUserName(nome)
    }

    /*function changerAdmin(isAdmin){
        setIsAdmin(isAdmin)
    }*/

    function changeStatus(status){
        setStatus(status)
    }

    return(
        <UserContext.Provider value={{userId, changeId, userName, changeName,changeStatus,status}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider