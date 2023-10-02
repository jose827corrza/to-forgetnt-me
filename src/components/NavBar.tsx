import { useContext } from 'react'
import { NavLink} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { DropDown } from './DropDown';

export const NavBar = () => {

    const { userCredential } = useContext(AppContext);

  return (
    <nav className={`flex fixed z-10 w-full ${userCredential == null ? 'hidden' : ''} top-0 justify-between items-center px-8 pt-2 bg-headers`} >
        <ul className='flex items-center gap-3'>
            <li>
                <NavLink
                    to='/tasks'
                    className={'text-black font-sans font-semibold'}>
                    Tasks
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/posts'
                    className={'text-black font-sans font-semibold'} >
                    Posts
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/home'
                    className={'text-black font-sans font-semibold'}>
                    Home
                </NavLink>
            </li>
        </ul>
        {/* <p className={'text-black font-sans font-semibold'}>{userCredential?.user.email}</p> */}
        <DropDown />
    </nav>
  )
}
