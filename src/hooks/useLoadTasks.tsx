import { useEffect, useState } from 'react'
import { getAllTasks } from '../firebase/datastore';
import { Task } from '../types/Tasks';


export const useLoadTasks = (uid: string, loadingTime: number, ...args: any) => {
    

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading){
            (async() => {
                const test =await getAllTasks(uid)
                setTasks(test)
            })()
            setTimeout(() => {
                setIsLoading(false)
            }, loadingTime)
        }
    },[...args])
  return {
    isLoading,
    setIsLoading,
    tasks
  }
}