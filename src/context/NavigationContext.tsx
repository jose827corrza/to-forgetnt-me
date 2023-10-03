import { createContext, ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface NavContext {
    navigate: NavigateFunction
}

interface Props {
    children?: ReactNode
}
export const NavContext = createContext<NavContext>({navigate: useNavigate
})

export const NavContextProvider = ({children}: Props) => {

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