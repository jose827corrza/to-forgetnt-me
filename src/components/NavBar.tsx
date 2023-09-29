import { useContext } from 'react'
import { NavLink} from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const NavBar = () => {

    const { userCredential } = useContext(AppContext);

  return (
    <nav className={`flex fixed z-10 w-full ${userCredential == null ? 'hidden' : ''} top-0 justify-between items-center px-8 pt-2 bg-dark-blue-soft`} >
        <ul className='flex items-center gap-3'>
            <li>
                <NavLink
                    to='/tasks'
                    className={'text-white font-sans font-semibold'}>
                    Tasks
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/files'
                    className={'text-white font-sans font-semibold'}>
                    Files
                </NavLink>
            </li>
        </ul>
        <p className={'text-white font-sans font-semibold'}>{userCredential?.user.email}</p>
    </nav>
  )
}
