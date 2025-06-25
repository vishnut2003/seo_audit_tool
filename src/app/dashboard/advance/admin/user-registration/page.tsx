'use client';

import { RegisterUserApiRequestDataInterface } from '@/app/api/user-manager/register-user/route';
import DashboardStandardInput from '@/Components/ui/DashboardStandardInput'
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { RiCheckLine, RiErrorWarningFill, RiLoader4Line, RiUploadCloud2Line } from '@remixicon/react';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { FormEvent, useRef, useState } from 'react'

const UserRegistration = () => {

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // profile image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<RegisterUserApiRequestDataInterface>({
    name: "",
    email: "",
    password: "",
  });

  function handleInputOnChange(inputEvent: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [inputEvent.target.name]: inputEvent.target.value,
    }))
  }

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // validate form data
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setError(`Field ${key} is required!`);
        return;
      }
    }

    setInProgress(true);

    // Create request entry data 
    const newFormData = new FormData();

    if (profileImage) {
      newFormData.append('image', profileImage);
    }

    for (const [key, value] of Object.entries(formData)) {
      newFormData.append(key, value);
    }

    try {
      await axios.post('/api/user-manager/register-user', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      setFormData({
        name: "",
        email: "",
        password: "",
      })
      setProfileImage(null);

      setIsSuccess(true);

      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {

      if (err instanceof AxiosError) {
        if (typeof err.response?.data === "string") {
          setError(err.response.data);
          setInProgress(false);
          return;
        }
      }

      setError("Something went wrong!");
    }

    setInProgress(false);

  }

  const fields: {
    label: string,
    subLabel: string | React.JSX.Element,
    inputPlaceholder: string,
    inputValueOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
  }[] = [
      {
        name: "name",
        inputPlaceholder: "Full name",
        label: "Full name",
        subLabel: "this will show in dashboard greetings, etc.",
        inputValueOnChange: handleInputOnChange
      },
      {
        name: "email",
        inputPlaceholder: "Email address",
        label: "Email address",
        subLabel: "used to reset password, showuld be unique.",
        inputValueOnChange: handleInputOnChange
      },
      {
        name: "password",
        inputPlaceholder: "Password",
        label: "Password",
        subLabel: "Please provide a strong password.",
        inputValueOnChange: handleInputOnChange
      },
    ]

  return (
    <BasicLayout>
      <div
        className='w-full'
      >
        <form
          className='w-full'
          onSubmit={handleFormSubmit}
        >
          <div
            className='w-full max-w-screen-md space-y-5'
          >
            {/* Profile image */}
            <div
              className='space-y-3'
            >
              <div
                className='w-[60px] rounded-full overflow-hidden'
              >
                <Image
                  src={profileImage ? URL.createObjectURL(profileImage) : "/users/default-avatar.png"}
                  alt='Upload user image'
                  width={500}
                  height={500}
                  style={{
                    height: 60,
                  }}
                />
              </div>
              <button
                className='flex items-center gap-2 text-themesecondary'
                type='button'
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                <RiUploadCloud2Line
                  size={20}
                />
                <p>Upload Image</p>
              </button>

              <input
                type='file'
                hidden
                accept='.png, .jpg'
                max={1}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setProfileImage(file);
                  }
                }}
                ref={fileInputRef}
              />
            </div>

            {/* Form fields */}
            {
              fields.map((field, index) => (
                <div
                  className='bg-background shadow-2xl shadow-gray-200 rounded-md'
                  key={index}
                >
                  <DashboardStandardInput
                    inputOnChange={field.inputValueOnChange}
                    inputPlaceholder={field.inputPlaceholder}
                    inputValue={formData[field.name as keyof typeof formData]}
                    label={field.label}
                    name={field.name}
                    subLabel={field.subLabel}
                  />
                </div>
              ))
            }

            {
              error &&
              <div
                className="flex items-center justify-start gap-3 w-full bg-red-100 text-red-500 py-2 px-4 rounded-md shadow-xl shadow-gray-200"
              >
                <RiErrorWarningFill
                  size={20}
                />
                <p>{error}</p>
              </div>
            }

            {
              isSuccess &&
              <div
                className="flex items-center justify-start gap-3 w-full bg-green-100 text-green-500 py-2 px-4 rounded-md shadow-xl shadow-gray-200"
              >
                <RiCheckLine
                  size={20}
                />
                <p>User created successfully!</p>
              </div>
            }

            <button
              type='submit'
              className='py-4 px-6 bg-themesecondary rounded-md text-foregroundwhite shadow-md text-base font-semibold flex items-center gap-3 disabled:opacity-70'
              disabled={inProgress}
            >
              {
                inProgress &&
                <RiLoader4Line
                  size={20}
                  className='animate-spin'
                />
              }
              Create User
            </button>


          </div>
        </form>
      </div>
    </BasicLayout>
  )
}

export default UserRegistration