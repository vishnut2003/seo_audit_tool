'use client';

import LoginFormValidate, { LoginFormValidateErrorInterface } from '@/utils/client/LoginFormValidate';
import { RemixiconComponentType, RiErrorWarningLine, RiEyeCloseLine, RiEyeLine, RiKey2Line, RiUser4Line } from '@remixicon/react'
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'

interface LoginFormDataInterface {
    email: string,
    password: string
}

const LoginForm = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isError, setIsError] = useState<LoginFormValidateErrorInterface>({})
    const [loginFormData, setLoginFormData] = useState<LoginFormDataInterface>({
        email: '',
        password: '',
    })

    const searchParams = useSearchParams();
    useEffect(() => {

        const authError = searchParams.get('error');
        if(authError === "CredentialsSignin") {
            setIsError({
                commonError: {
                    status: true,
                    message: "Login credentials incorrect."
                }
            })
        } else if (authError) {
            setIsError({
                commonError: {
                    status: true,
                    message: "Something went wrong!"
                }
            })
        }

    }, [searchParams])

    async function _submitFormData(e: FormEvent) {
        e.preventDefault();
        setInProgress(true)

        try {

            setIsError({})
            await LoginFormValidate({
                email: loginFormData.email,
                password: loginFormData.password
            })

            await signIn("Credentials", {
                callbackUrl: searchParams.get('callbackUrl') || "/dashboard", 
                email: loginFormData.email,
                password: loginFormData.password
            });

        } catch (err) {
            if (typeof err === typeof isError) {
                setIsError(err!);
            }
            setInProgress(false);
            console.log(err)
        }
    }

    return (
        <form onSubmit={_submitFormData} className='flex flex-col gap-3'>

            <FormField 
            type='email' 
            placeholder='Email Address' 
            name='email' label='email' 
            Icon={RiUser4Line} 
            formData={loginFormData} 
            setFormData={setLoginFormData} 
            passwordType={false} 
            isError={isError}
            />

            <FormField 
            type='password' 
            placeholder='Password' 
            name='password' 
            label='Password' 
            Icon={RiKey2Line} 
            formData={loginFormData} 
            setFormData={setLoginFormData} 
            passwordType={true} 
            isError={isError}
            />

            <button
                className='w-full p-3 bg-secondary text-lg text-foregroundwhite font-semibold mt-4 rounded-lg shadow-sm shadow-secondary'
                type='submit'>{inProgress ? "Verifying..." : "Login"}</button>

            {/* error message slot */
                isError.commonError?.status &&
                <div
                    className='bg-red-100 text-red-600 py-3 px-4 rounded-md flex justify-start items-center gap-3'
                >
                    <RiErrorWarningLine size={15} />
                    <p className='text-sm'>{isError.commonError.message}</p>
                </div>
            }

        </form>
    )
}

function FormField({ name, label, type, Icon, placeholder, formData, setFormData, passwordType, isError }: {
    name: string,
    label: string,
    type: string,
    Icon: RemixiconComponentType,
    placeholder: string,
    formData: LoginFormDataInterface,
    setFormData: Dispatch<SetStateAction<LoginFormDataInterface>>,
    passwordType?: boolean,
    isError: LoginFormValidateErrorInterface
}) {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    return (
        <div>
            <label
                className='text-sm font-semibold'
                htmlFor={name}>{label}</label>
            <div 
            className={
                `flex flex-nowrap gap-2 w-full px-4 py-3 rounded-md bg-slate-100 
                ${isError.fieldSpecific && isError.fieldSpecific[name as keyof typeof isError.fieldSpecific]?.status ? "border border-red-400" : "border border-transparent"}
                `}
            >
                <Icon size={20} />
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
                            <RiEyeLine className='cursor-pointer' onClick={() => setPasswordVisible(prev => !prev)} size={20} />
                            : <RiEyeCloseLine className='cursor-pointer' onClick={() => setPasswordVisible(prev => !prev)} size={20} /> : ''
                }
            </div>

            {/* Error message */}
            {isError.fieldSpecific && isError.fieldSpecific[name as keyof typeof isError.fieldSpecific]?.status && 
                <p
                className='text-sm font-normal mt-1 text-red-400'
                >{isError.fieldSpecific[name as keyof typeof isError.fieldSpecific]?.message}</p>}
        </div>
    )
}

export default LoginForm