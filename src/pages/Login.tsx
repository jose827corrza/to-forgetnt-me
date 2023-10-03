import { useContext, useEffect, useState } from 'react';

import { Formik, Form, Field, FormikHelpers } from "formik"

import { loginUser, registerNewUser } from "../firebase/auth";
import { AppContext } from "../context/AppContext";
import { NavContext } from '../context/NavigationContext';
import { createUserDoc } from '../firebase/datastore';

export const Login = () => {

    const { assignUserCredential, userCredential } = useContext(AppContext);
    const { navigate } = useContext(NavContext);
    const [isRegisterPage, setIsRegisterPage] = useState(false);

    useEffect(() => {
        console.log(userCredential);
        
    })
    
    const handlerToggleAuth = () => {
        setIsRegisterPage(!isRegisterPage);
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    interface props {
        email: string
        password: string
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleLogIn = async(props: props, _actions: FormikHelpers<props>) => {
        
        const { email, password} = props
        if(!isRegisterPage){
            // Login
            const user = await loginUser(email, password)
            if(user == undefined){
                return
            }else{
                assignUserCredential(user);
                navigate('/home')
            }
        } else {
            // Register
            const user = await registerNewUser(email, password);
            if(user == undefined){
                return
            }else{
                assignUserCredential(user)
                navigate('/home')
                createUserDoc(user.user.uid, user.user.email!)
            }
        }
    }

  return (
    // <div className="flex h-full justify-center items-center">
    <div className="flex flex-col h-full justify-center items-center bg-background">
        <h1 className="text-black font-extrabold text-3xl font-sans py-5">Forget'nt me</h1>
        <Formik
            initialValues={{email: '', password: ''}}
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSubmit={(values:props, actions:FormikHelpers<props>) => handleLogIn(values, actions)}>
                <Form className="md:flex">
                    <div className='grid md:flex my-2'>
                        <label htmlFor="email" className="text-black mx-3 font-bold">Email</label>
                        <Field name="email" type="email" className='rounded-md outline-none h-6 my-2'/>
                    </div>
                    <div className='grid md:flex my-2'>
                        <label htmlFor="password" className="text-black mx-3 font-bold">Password</label>
                        <Field name="password" type="password" className='rounded-md outline-none h-6 my-2'/>
                    </div>
                    <button type="submit" className=" mx-3 bg-headers hover:bg-mint rounded-md h-8 px-2 md:my-3 ">{!isRegisterPage ?  'Login' : 'Sign Up'}</button>
                </Form>
        </Formik>
        <button className="text-black font-sans font-extralight underline" onClick={handlerToggleAuth}>{ !isRegisterPage ? 'Not registered yet? register here': 'Are you already registered? Log In here'}</button>
    </div>
  )
}
