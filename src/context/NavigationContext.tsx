import { createContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface NavContext {
    navigate: NavigateFunction
}

export const NavContext = createContext<NavContext>({})

export const NavContextProvider = ({children}) => {

    const navigate = useNavigate();

    return (
        <NavContext.Provider
            value={{
                navigate
            }}>
            {children}
        </NavContext.Provider>
    )
}