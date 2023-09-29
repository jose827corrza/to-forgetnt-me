import {useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'

export const Home = () => {

    const { isDarkMode, toggleDarkMode, userCredential} = useContext(AppContext);

    useEffect(() => {
      console.log(userCredential);
      
    },[])

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
