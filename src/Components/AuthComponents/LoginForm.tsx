'use client';

import { RemixiconComponentType, RiEyeCloseLine, RiEyeLine, RiKey2Line, RiUser4Line } from '@remixicon/react'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface LoginFormDataInterface {
    username: string,
    password: string
}

const LoginForm = () => {

    const [loginFormData, setLoginFormData] = useState<LoginFormDataInterface>({
        username: '',
        password: '',
    })

    function _submitFormData(e: FormEvent) {
        e.preventDefault();
        console.log(loginFormData);
    }

    return (
        <form onSubmit={_submitFormData} className='flex flex-col gap-3'>
            <FormField type='text' placeholder='Username or Email Address' name='username' label='Username' Icon={RiUser4Line} formData={loginFormData} setFormData={setLoginFormData} passwordType={false} />
            <FormField type='password' placeholder='Password' name='password' label='Password' Icon={RiKey2Line} formData={loginFormData} setFormData={setLoginFormData} passwordType={true} />
            <button 
            className='w-full p-3 bg-secondary text-lg text-foregroundwhite font-semibold mt-4 rounded-lg shadow-sm shadow-secondary'
            type='submit'>Login</button>
        </form>
    )
}

function FormField({ name, label, type, Icon, placeholder, formData, setFormData, passwordType }: {
    name: string,
    label: string,
    type: string,
    Icon: RemixiconComponentType,
    placeholder: string,
    formData: LoginFormDataInterface,
    setFormData: Dispatch<SetStateAction<LoginFormDataInterface>>,
    passwordType?: boolean
}) {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    return (
        <div>
            <label 
            className='text-sm font-semibold'
            htmlFor={name}>{label}</label>
            <div className='flex flex-nowrap gap-2 w-full px-4 py-3 rounded-md bg-slate-100'>
                <Icon size={20}/>
                <input 
                value={formData[name as keyof typeof formData]}
                onChange={(e) => setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: e.target.value
                }))}
                name={name}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none'
                type={type === 'password' ? passwordVisible ? 'text' : 'password' : type} />

                {
                    passwordType === true ?
                        !passwordVisible ? 
                        <RiEyeLine className='cursor-pointer' onClick={() => setPasswordVisible(prev => !prev)} size={20}/> 
                        : <RiEyeCloseLine className='cursor-pointer' onClick={() => setPasswordVisible(prev => !prev)} size={20}/> : ''
                }
            </div>
        </div>
    )
}

export default LoginForm