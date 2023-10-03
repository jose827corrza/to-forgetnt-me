import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, serverTimestamp, setDoc } from 'firebase/firestore'
import { Task } from '../types/Tasks'
import {db} from './firebase'
import { Comment, Post } from '../types/Post'
import { User } from '../types/user'

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
            description: descomp.description,
            isComplete: descomp.isComplete
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

export const getAllPosts = async() => {
    const posts: Post[] =[]

    const snapShot = await getDocs(collection(db, 'posts'));

    snapShot.forEach(post => {
        // const data = post.data() as Post
        const data = {
            ...post.data() as Post
        }
        data.id = post.id
        posts.push(data)
    })

    return posts
}

export const getAPost = async(postId: string) => {
    const ref = doc(db, 'posts', postId)
    const data = await getDoc(ref)

    if(data.exists()){
        return data.data() as Post
    }else {
        return undefined
    }
}

export const createAPost = async(data: Post) => {
    data.createdAt = serverTimestamp()
    const ref = await addDoc(collection(db, 'posts'), data)
    return ref;
}

export const addAComment = async(postId: string, comment: Comment) => {
    const ref = doc(db, 'posts', postId)

    // Add the sentinel for Timestamp
    // comment.createdAt = serverTimestamp()
    await updateDoc(ref, {
        comments: arrayUnion(comment)
    })
}

export const createUserDoc = async(userUid: string, email: string) => {
    
    await setDoc(doc(db, 'users', userUid), {email: email})

    // Create their first task

    const firstTask: Task = {
        name: 'My first task',
        description: 'Check how to check me',
        isComplete: false
    }

    return await createNewTask(userUid, firstTask)
}

export const obtainInfoFromUserId = async(userId: string) => {
    const ref = doc(db, 'users', userId)
    const result = await getDoc(ref)
    return result.data() as User
}