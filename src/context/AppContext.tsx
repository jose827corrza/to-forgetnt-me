import { createContext, useState} from 'react'

import { UserCredential } from 'firebase/auth';

interface Context {
    isDarkMode: boolean
    toggleDarkMode: () => void
    userCredential: UserCredential | null
    assignUserCredential: (user: UserCredential) => void
    unassignUserCredentials: () => void
    isLogged: boolean
    uid: string | undefined
    loading: boolean
    setLoading: (state: boolean) => void
}

export const AppContext = createContext<Context>({});

export const AppContextProvider = ({children}) => {


    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [userCredential, setUserCredential] = useState<UserCredential | null>(null)
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [uid, setUid] = useState<string | undefined>()


    const toggleDarkMode = () => {
        if(!isDarkMode){
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false)
        }
    }

    const assignUserCredential = (user: UserCredential) => {
        setUserCredential(user)
        setIsLogged(true)
        setUid(user.user.uid)
    }

    const unassignUserCredentials = () =>{
        setUserCredential(null)
    }

    return (
        <AppContext.Provider 
            value={{
                isDarkMode, 
                toggleDarkMode,
                userCredential,
                assignUserCredential,
                isLogged,
                uid,
                loading,
                setLoading,
                unassignUserCredentials
            }}>
            {children}
        </AppContext.Provider>
    )
}

