import {useContext} from 'react'
import { AppContext } from '../context/AppContext'

export const Home = () => {

    const { isDarkMode, toggleDarkMode} = useContext(AppContext);

  return (
    <>
        <div>Home</div>
        <h1>{isDarkMode}</h1>
        <button onClick={toggleDarkMode}>
            dark
        </button>
    </>
  )
}
