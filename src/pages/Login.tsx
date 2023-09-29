import { useContext, useEffect, useState } from 'react';

import { Formik, Form, Field, FormikProps } from "formik"

import { loginUser, registerNewUser } from "../firebase/auth";
import { AppContext } from "../context/AppContext";
import { NavContext } from '../context/NavigationContext';

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


    interface FormValues {
        email: string;
        password: string;
      }
    interface props {
        email: string
        password: string
    }
    const handleLogIn = async(props: props & FormikProps<FormValues>) => {
        
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
            }
        }
    }

  return (
    // <div className="flex h-full justify-center items-center">
    <div className="flex flex-col h-full justify-center items-center bg-dark-blue">
        <h1 className="text-white font-extrabold text-3xl font-sans py-5">Forget'nt me</h1>
        <Formik
            initialValues={{email: '', password: ''}}
            
            onSubmit={(values) => handleLogIn(values)}>
                <Form className="md:flex">
                    <div className='grid md:flex my-2'>
                        <label htmlFor="email" className="text-white mx-3 font-bold">Email</label>
                        <Field name="email" type="email" className='rounded-md outline-none h-6 my-2'/>
                    </div>
                    <div className='grid md:flex my-2'>
                        <label htmlFor="password" className="text-white mx-3 font-bold">Password</label>
                        <Field name="password" type="password" className='rounded-md outline-none h-6 my-2'/>
                    </div>
                    <button type="submit" className=" mx-3 bg-semi-mint hover:bg-mint rounded-md h-8 px-2 md:my-3 ">{!isRegisterPage ?  'Login' : 'Sign Up'}</button>
                </Form>
        </Formik>
        <button className="text-white font-sans font-extralight" onClick={handlerToggleAuth}>{ !isRegisterPage ? 'Not registered yet? register here': 'Are you already registered? Log In here'}</button>
    </div>
  )
}
