import { createContext, useState} from 'react'

interface Context {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export const AppContext = createContext<Context>({});

export const AppContextProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const toggleDarkMode = () => {
        if(!isDarkMode){
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false)
        }
    }

    return (
        <AppContext.Provider 
            value={{
                isDarkMode, 
                toggleDarkMode
            }}>
            {children}
        </AppContext.Provider>
    )
}

