import {createContext, useState, useCallback, useMemo} from "react";

const UserContext = createContext()

function UserProvider ({children}) {

    const [isLogged, setIsLogged] = useState(false)

    const setAuth = useCallback((auth) => {
        localStorage.setItem('Authorization', auth)
    },[])

    const changeLogin = useCallback(() => {
        const logged = !isLogged
        setIsLogged(logged)
    },[isLogged])

    const auth = useCallback(() => { return localStorage.getItem('Authorization')},[])

    const contextValue = useMemo(() => ({
        isLogged,
        setAuth,
        auth,
        changeLogin
    }),
    [isLogged, changeLogin, auth, setAuth])

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserProvider}