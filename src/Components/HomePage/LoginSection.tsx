'use client';

import { useState } from "react";
import LoginForm from "../AuthComponents/LoginForm"
import ForgetPasswordForm from "../AuthComponents/ForgetPasswordForm";

const LoginSection = () => {

    const [currentForm, setCurrentForm] = useState<"login" | "forget-password">('login');

    return (
        <div className="w-dvw h-dvh bg-primary flex justify-center items-center p-4">
            <div className="max-w-[400px] w-full h-max bg-white shadow-md rounded-xl px-7 py-9 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-primary">Login</h2>
                    <p className="text-sm">Login with username and password.</p>
                </div>
                {
                    currentForm === 'login' ? <LoginForm /> : <ForgetPasswordForm/>
                }

                <p className="text-sm mt-3 text-left">{currentForm === "login" && "Forget password?"}
                    <span 
                    onClick={() => setCurrentForm(prev => prev === "login" ? "forget-password" : "login")}
                    className="text-secondary font-semibold cursor-pointer ml-1">{currentForm === "login" ? "Reset" : "Login"}</span>
                </p>
            </div>
        </div>
    )
}

export default LoginSection