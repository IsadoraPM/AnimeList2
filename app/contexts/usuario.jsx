'use client'
import { createContext, useState } from "react"

export const UserContext = createContext()


function UserProvider({ children }) {

    let inicial_id = null
    let inicial_nome = ''
    let inicial_isAdmin = false



    if (localStorage.getItem("user_logado")) {
        const user = JSON.parse(localStorage.getItem("user_logado"))
        inicial_id = user.id
        inicial_nome = user.username
        inicial_isAdmin = user.isAdmin
      }

      const [status, setStatus] = useState("deslogado")
      const [userId, setUserId] = useState(inicial_id)
      const [userName, setUserName] = useState(inicial_nome)
      const [isAdmin, setIsAdmin] = useState(inicial_isAdmin)

    function changeId(id){
        setUserId(id)
    }

    function changeName(nome){
        setUserName(nome)
    }

    function changeAdmin(isAdmin){
        setIsAdmin(isAdmin)
    }

    function changeStatus(status){
        setStatus(status)
    }

    return(
        <UserContext.Provider value={{userId,isAdmin,changeAdmin, changeId, userName, changeName,changeStatus,status}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider