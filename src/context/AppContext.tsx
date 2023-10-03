/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, ReactNode} from 'react'

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

export const AppContext = createContext<Context>({
    isDarkMode: false,
    loading: false,
    toggleDarkMode: function (): void {
        throw new Error('Function not implemented.');
    },
    userCredential: null,
    assignUserCredential: function (_user: UserCredential): void {
        throw new Error('Function not implemented.');
    },
    unassignUserCredentials: function (): void {
        throw new Error('Function not implemented.');
    },
    isLogged: false,
    uid: undefined,
    setLoading: function (_state: boolean): void {
        throw new Error('Function not implemented.');
    }
});

interface Props {
    children? : ReactNode
}

export const AppContextProvider = ({children}: Props ) => {


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

