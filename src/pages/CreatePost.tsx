import { Formik, Form, FormikHelpers, FormikValues, Field, FormikProps } from 'formik'
import { useState, useContext } from 'react';
import { Post } from '../types/Post';
import { AppContext } from '../context/AppContext';
import { createAPost } from '../firebase/datastore';
import { usePosts } from './Posts';


export const CreatePost = () => {
    const {userCredential} = useContext(AppContext)
    const {triggerUpdatePosts} = usePosts()
    const [isLoading, setIsLoading] = useState(true);
    const [initialValues, setInitialValue] = useState({
        title: '',
        body: '',
        topics: ''
    })

    interface FormValues {
        title: string
        body: string
        topics: string
      }
    interface props {
        title: string
        body: string
        topics: string    
    }
    const handleCreatePost = async(props: props & FormikProps<FormValues>) => {
        const {topics, title, body} = props
        const topicsList = topics.split(';')
        const newPost: Post = {
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: userCredential?.user.uid!,
            topics: topicsList,
            name: title,
            body,
            comments: []
        }
        await createAPost(newPost)
        triggerUpdatePosts()
        setInitialValue({
            body: '',
            title: '',
            topics: ''
        })
    }
  return (
    <div className='flex h-full justify-center items-center'>
       <Formik 
        initialValues={initialValues}
        onSubmit={(values) => handleCreatePost(values)}
       >
        <Form className="md:flex md:flex-col">
            <div className='md:grid grid-flow-col'>
                <div className='grid md:flex my-2'>
                    <label htmlFor="title" className="text-black mx-3 font-bold">Title</label>
                    <Field name="title" type="text"  className='rounded-md outline outline-headers outline-1 h-6 my-2'/>
                </div>
                <div className='grid md:flex my-2'>
                    <label htmlFor="body" className="text-black mx-3 font-bold">Body</label>
                    <Field name="body" type="text" as="textarea" className='rounded-md outline outline-headers outline-1 my-2 resize-none h-full'/>
                </div>
            </div>
            <div className='grid  md:flex my-2'>
                <label htmlFor="topics" className="text-black mx-3 font-bold">Topics</label>
                <Field name="topics" type="text" className='rounded-md outline-none h-6 my-2 outline outline-headers outline-1'/>
                <span className='m-2 text-xs font-extralight'>Separate each one with ;</span>
            </div>
            <div className='p-4'>
                <button 
                    type='submit'
                    className='bg-components outline outline-1 outline-headers rounded-md px-2 py-1 hover:bg-headers'>Create Post</button>
            </div>
        </Form>
        </Formik> 
    </div>
  )
}
