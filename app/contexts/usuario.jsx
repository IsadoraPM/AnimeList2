'use client'
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()


function UserProvider({ children }) {
    const [user, setUser] = useState(
        {
            id: null,
            name: '',
            roles: false,
            token: ''
        }
    )


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

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3004/animeApi/me`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiTG9iYXRvQGFuaW1lY29tLmNvbSIsIm5hbWUiOiJMb2JhdG8iLCJyb2xlIjoibmV3VXNlciIsImlkIjoyLCJpYXQiOjE3MDA1NzE3ODksImV4cCI6MTcwMzE2Mzc4OX0.lMGvi1cO7DHl8mG6wqINyMM4JT6o-YefCSRvQMtvkYs'
              },
              body: JSON.stringify(data)
            });
            setUser(response)
            console.log(response);
          } catch (error) {
            console.error('Erro na solicitação:', error);
          }
        };
      
        fetchData(); 
      
      }, []);
      
      

    return(
        <UserContext.Provider value={{userId, changeId, userName, changeName, userRoles,changeRole, token, changeToken,user }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider