import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';

import { Form, Formik, Field, FormikProps } from 'formik'
import { AiOutlinePlus } from 'react-icons/ai'
import { SyncLoader } from 'react-spinners'

import { createNewTask, getTaskInformation, updateTaskInformation } from '../firebase/datastore';
import { AppContext } from '../context/AppContext';
import { Task } from '../types/Tasks';
import { useTasks } from './Tasks'
import { NavContext} from '../context/NavigationContext'

export const ModifyTask = () => {


  const { userCredential } = useContext(AppContext)
  const { navigate } = useContext(NavContext)
  const { taskId } = useParams();
  
  const {tasks, triggerUpdateTasks} = useTasks()

  const [initialValue, setInitialValue] = useState({name: '', description: '', isComplete: false})
  const [isLoading, setIsLoading] = useState(true);

  const triggerUpdate = async(userId: string, taskID: string) => {
    setIsLoading(true);
        // TODO bring information
        // Set the initial value values
          const test = await getTaskInformation(userId, taskID)
          if(test){
            setInitialValue({
              name: test.name,
              description: test.description,
              isComplete: test.isComplete
            })
          }  
          setTimeout(()=>{
            setIsLoading(false)
          }, 200)


  }
  
  interface FormValues {
    name: string;
    description: string;
  }
  interface props {
    name: string
    description: string
    isComplete: boolean
  }
  const handleTask = async(props: props & FormikProps<FormValues>) =>{
    // TODO
    if(!taskId){
      if(userCredential){
        const task: Task = {
          name: props.name,
          description: props.description,
          isComplete: false
        }
        // Set by default false isComplete for new tasks
        await createNewTask(userCredential.user.uid, task)
        triggerUpdateTasks()
        setIsLoading(true)
        setInitialValue({name: '', description: '', isComplete: false})
        setTimeout(() => {
          setIsLoading(false)
        },300)
      }
    }else{
      // TODO updateTask
      if(userCredential){
        const task: Task = {
          name: props.name,
          description: props.description,
          isComplete: props.isComplete
        }
        
        await updateTaskInformation(userCredential.user.uid, taskId, task)
        triggerUpdateTasks()
      }
    }
  }

  const toNewTaskView = () => {
    setIsLoading(true)
    setInitialValue({name: '', description: '', isComplete: false})
    setTimeout(() => {
      setIsLoading(false)
    },300)
    navigate('/tasks')
  }

  useEffect(()=>{
        // TODO bring information
        // Set the initial value values
        if(!userCredential){
          // TODO
        } else {
          if( taskId){
            (async()=>{
              await triggerUpdate(userCredential.user.uid, taskId)
            })()
          }else{
            setIsLoading(false)
          }
        }

  },[ taskId])
console.log(taskId);

  
  return (
    <div className="flex flex-col h-full justify-center items-center bg-background">
      <h1 className='text-3xl text-black font-extrabold mb-20'>{!taskId ?  'Create your TODO' : 'Update your TODO'}</h1>
      {
        isLoading ?
        <SyncLoader
            color="#36d7b7"
            size={20}
          />
        :
        <Formik
        initialValues={initialValue}
        onSubmit={(values) => handleTask(values)}
        >
        {
          ({values}) => (
            <Form className="md:flex">
          <div className='grid md:flex my-2'>
            <label htmlFor="name" className="text-black mx-3 font-bold">Name</label>
            <Field name="name" type="text" className='rounded-md outline-none h-6 my-2'/>
          </div>
          <div className='grid md:flex my-2'>
            <label htmlFor="description" className="text-black mx-3 font-bold">Description</label>
            <Field name="description" type="text" className='rounded-md outline-none h-6 my-2'/>
          </div>
          <div className='grid md:flex mx-2 pt-4'>
            <label className='text-black'>
              <Field type="checkbox" name="isComplete" />
              {`This task is:${values.isComplete ? 'Complete!' : 'Not complete'}`}
            </label>
          </div>
          <button type="submit" className=" mx-3 bg-headers hover:bg-mint rounded-md h-8 px-2 md:my-3 ">{!taskId ?  'Create TODO' : 'Update TODO'}</button>
        </Form>
          )
        }
      </Formik>
      }
      <div className={`fixed right-5 bottom-5 bg-mint p-4 rounded-full transition ease-in-out hover:rotate-90 ${!taskId ? 'hidden': ''}`}>
          {/* <button onClick={toNewTaskView}> */}
          <Link to={'/tasks'}>
            <AiOutlinePlus />
          </Link>
          {/* </button> */}
      </div>
    </div>
  )
}
