import { useContext, useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'


import { AppContext } from '../context/AppContext'
import { NavContext } from '../context/NavigationContext'
import { getAllPosts } from '../firebase/datastore'
import { SyncLoader } from 'react-spinners'
import { Post } from '../types/Post'
import { PostCard } from '../components/PostCard'

export const Posts = () => {

  const { isLogged, userCredential } = useContext(AppContext);
  const { navigate } = useContext(NavContext);

  const [posts, setPosts] = useState<Post[]>([])
  const loadingTime = 2000

  const [isLoading, setIsLoading] = useState(true);
console.log(posts);

  const triggerUpdatePosts = async() => {
    console.log('init trigger');
    
    setIsLoading(true)
    if(userCredential){
      const test =await getAllPosts()
      setPosts(test)
    }


    setTimeout(() => {
      setIsLoading(false)
      console.log('finish trigger');
      
    },loadingTime)
  }

  useEffect(() => {
    if(!isLogged){
      navigate('/')
      return
    }
    if(userCredential && posts.length <= 0){
      if(isLoading){
        (async() => {
            const test = await getAllPosts()
            setPosts(test)
        })()
        setTimeout(() => {
            setIsLoading(false)
        }, loadingTime)
    }
    }
  },[isLogged, posts])



  return (
    <>
    <div className='md:grid grid-flow-dense grid-cols-4 grid-rows-1 h-full pt-1'>
      {/* <aside className='flex flex-col fixed left-0 border border-black rounded-lg  bg-white w-40'> */}
      <aside className='col-span-1  h-full bg-background-soft overflow-y-scroll pt-2'>
        <ul>
        {
          isLoading ?
          <div className='flex justify-center items-center h-screen'>
            <SyncLoader
            color="#36d7b7"
            size={20}
          />
          </div>
          :
          posts.map((post) => (
              <li key={post.id} className='p-2'>
                <PostCard id={post.id} userId={post.userId} topics={post.topics} name={post.name} body={post.body} createdAt={post.createdAt} testArray={[]} comments={[]} />
              </li>
        ))
      }
      </ul>
      
      </aside>
        <div className='col-span-3'>
        {/* <Outlet context={{posts, setUpdateposts, updateposts} satisfies postsContext}/> */}
        <Outlet context={{posts, triggerUpdatePosts, isLoading} satisfies postsContext}/>
        </div>
    </div>
    </>
  )
}

type postsContext ={triggerUpdatePosts: () => void, posts: Post[], isLoading: boolean}
export function usePosts () {
  return useOutletContext<postsContext>();
}

