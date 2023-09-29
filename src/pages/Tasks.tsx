import { useContext, useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Task } from '../types/Tasks'
import { TaskCard } from '../components/TaskCard'
import { AppContext } from '../context/AppContext'
import { NavContext } from '../context/NavigationContext'
import { getAllTasks } from '../firebase/datastore'
import { SyncLoader } from 'react-spinners'

export const Tasks = () => {

  const { isLogged, userCredential } = useContext(AppContext);
  const { navigate } = useContext(NavContext);

  const [tasks, setTasks] = useState<Task[]>([])
  const loadingTime = 2000

  const [isLoading, setIsLoading] = useState(true);
console.log(tasks);

  const triggerUpdateTasks = async() => {
    console.log('init trigger');
    
    setIsLoading(true)
    if(userCredential){
      const test =await getAllTasks(userCredential.user.uid)
      setTasks(test)
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
    if(userCredential && tasks.length <= 0){
      // (async() =>{
      //   const test = await getAllTasks(userCredential?.user.uid);
      //   setTasks(test)
      //   console.log(test);
      // })()
      if(isLoading){
        (async() => {
            const test =await getAllTasks(userCredential.user.uid)
            setTasks(test)
        })()
        setTimeout(() => {
            setIsLoading(false)
        }, loadingTime)
    }
    }
  },[isLogged, tasks])



  return (
    <>
    <div className='md:grid grid-flow-dense grid-cols-4 grid-rows-1 h-full'>
      {/* <aside className='flex flex-col fixed left-0 border border-black rounded-lg  bg-white w-40'> */}
      <aside className='col-span-1  h-full bg-dark-blue-soft overflow-y-scroll pt-2'>
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
          tasks.map((task) => (
            <li key={task.id}>
            <TaskCard name={task.name} description={task.description} id={task.id!} updateTaskListFunc={triggerUpdateTasks} userId={userCredential?.user.uid}/>
          </li>
        ))
      }
      </ul>
      
      </aside>
        <div className='col-span-3'>
        {/* <Outlet context={{tasks, setUpdateTasks, updateTasks} satisfies TasksContext}/> */}
        <Outlet context={{tasks, triggerUpdateTasks} satisfies TasksContext}/>
        </div>
    </div>
    </>
  )
}

type TasksContext ={triggerUpdateTasks: () => void, tasks: Task[]}
export function useTasks () {
  return useOutletContext<TasksContext>();
}

