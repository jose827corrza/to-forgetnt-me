import {useContext, useEffect, useState} from 'react'
import { AppContext } from '../context/AppContext'
import { NavContext } from '../context/NavigationContext';
import { getAllPosts } from '../firebase/datastore';
import { Post } from '../types/Post';

import image from '../assets/josedev.png'

export const Home = () => {

    const { isDarkMode, toggleDarkMode, isLogged} = useContext(AppContext);
    const { navigate } = useContext(NavContext);

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if(!isLogged){
        navigate('/')
        return
      }
      (async()=>{
        setIsLoading(true);
        const test = await getAllPosts()
        setPosts(test)
        console.log(test);
        setTimeout(()=>{
          setIsLoading(false)
        },400)
      })()
    },[ isLogged])

  return (
    <>
  <div className='flex h-full flex-col justify-end items-center'>
    <h2 className='text-3xl font-sans font-extrabold capialize'>Welcome to Forget'nt</h2>
    <img 
      src={image} 
      alt="logo"
      className='scale-50 opacity-60' />
  </div>
        {/* <div>Home</div>
        <h1>{isDarkMode}</h1>
        <button onClick={toggleDarkMode}>
            dark
        </button> */}
    </>
  )
}
