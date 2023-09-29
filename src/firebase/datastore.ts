import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { Task } from '../types/Tasks'
import {db} from './firebase'

export const createNewTask = async(userId: string, task: Task) => {
    // TODO
    const col = collection(db, 'users', userId, 'tasks')
    await addDoc(col, task);
    return true;
}

export const getAllTasks = async(userId: string) => {
    const tasks: Task[] = []

    const tasksRef = collection(db, 'users', userId, 'tasks');

    const snapShot = await getDocs(tasksRef)
    snapShot.forEach(doc => {
        const descomp = doc.data() as Task;
        const task: Task = {
            id: doc.id,
            name: descomp.name,
            description: descomp.description
        }
        tasks.push(task)
    })

    return tasks
}

export const getTaskInformation = async(userId: string, taskId: string) => {
    const ref = doc(db, 'users', userId, 'tasks', taskId);

    const docSnap =await getDoc(ref)
    if (docSnap.exists()) {
        return docSnap.data() as Task
      } else {
        // docSnap.data() will be undefined in this case
        return undefined
      }
}

export const updateTaskInformation = async(userId: string, taskId: string, data: Task) => {
    const ref = doc(db, 'users', userId, 'tasks', taskId)

    await updateDoc(ref, {
        name: data.name,
        description: data.description,
        isComplete: data.isComplete
    })
    return true
}

export const deleteATask = async(userId: string, taskId: string) => {
    const ref = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(ref)
    return true
}   