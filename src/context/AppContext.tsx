import { UserCredential } from 'firebase/auth';
import { createContext, useState} from 'react'

interface Context {
    isDarkMode: boolean
    toggleDarkMode: () => void
    userCredential: UserCredential | null
    assignUserCredential: (user: UserCredential) => void
}

export const AppContext = createContext<Context>({});

export const AppContextProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [userCredential, setUserCredential] = useState<UserCredential | null>(null)

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
    }

    return (
        <AppContext.Provider 
            value={{
                isDarkMode, 
                toggleDarkMode,
                userCredential,
                assignUserCredential
            }}>
            {children}
        </AppContext.Provider>
    )
}

