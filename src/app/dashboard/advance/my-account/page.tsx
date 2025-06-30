'use client';

import { GetUserAvatarApiRequestDataInterface, GetUserAvatarImageApiRouteResponseInterface } from '@/app/api/user-manager/get-user-avatar/route';
import DashboardStandardInput from '@/Components/ui/DashboardStandardInput';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import { base64ToFile } from '@/lib/utils';
import { UserModelInterface } from '@/models/UsersModel';
import { RiCheckLine, RiErrorWarningLine, RiLoaderLine, RiUploadCloud2Line } from '@remixicon/react';
import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

const Page = () => {

  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Profile image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileChanged, setProfileChanged] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    name: string,
    email: string,
    password: string,
  }>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getSession()
      .then(async (session) => {
        try {

          if (!session?.user?.email) {
            throw new Error("User not loggedin!");
          }

          const {
            data: userData,
          } = await axios.post<UserModelInterface | null>('/api/user-manager/get-user-data-by-email', { email: session.user.email });

          if (!userData) {
            throw new Error("User not found!");
          }

          setFormData({
            email: userData.email,
            name: userData.name,
            password: "",
          })

          // fetch profile image
          const fetchAvatarApiRequestData: GetUserAvatarApiRequestDataInterface = {
            relativeImagePath: userData.image,
          }

          const {
            data: avatarBinaryData,
          } = await axios.post<GetUserAvatarImageApiRouteResponseInterface>('/api/user-manager/get-user-avatar', fetchAvatarApiRequestData);

          if (!avatarBinaryData.buffer) {
            return;
          }

          const profileImageFile = base64ToFile(avatarBinaryData.buffer, "user-avatar", avatarBinaryData.mimeType);
          setProfileImage(profileImageFile);

        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else if (err instanceof AxiosError) {
            setError(err.response?.data);
          } else if (typeof err === "string") {
            setError(err);
          } else {
            setError("Something went wrong!");
          }
        }
      })
      .finally(() => setInitialLoad(false))
  }, [])

  function handleInputValueChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleFormSubmit() {
    setInProgress(true);
    try {
      setError(null);

      if (!formData.name || !formData.email) {
        throw new Error("Name and email fields can not be empty!");
      }

      if (formData.password && formData.password.length < 5) {
        throw new Error("Password length min 5 characters required!");
      }

      const FormEntries = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        FormEntries.append(key, value);
      }

      if (profileChanged && profileImage) {
        FormEntries.append('image', profileImage)
        console.log(profileImage)
      }

      await axios.post('/api/user-manager/update-user', FormEntries,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (err instanceof AxiosError) {
        setError(err.response?.data);
      } else if (typeof err === "string") {
        setError(err);
      }
    }

    setInProgress(false);
  }

  function EnablePasswordChange() {
    return (
      <button
        className='font-semibold py-2 px-4 rounded-md bg-themeprimary text-white text-sm disabled:opacity-50'
        onClick={() => setResetPassword(true)}
        disabled={resetPassword}
      >Change Password</button>
    )
  }

  const formFields: {
    label: string,
    subLabel: string | React.JSX.Element,
    value: string,
    valueOnChange: (event: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    name: string,
    disable?: boolean,
  }[] = [
      {
        label: "Full name",
        name: "name",
        placeholder: "Enter full name",
        subLabel: "User in dashboard greetings",
        value: "",
        valueOnChange: handleInputValueChange,
      },
      {
        label: "Email",
        name: "email",
        placeholder: "Enter account email",
        subLabel: "Email can not be changed",
        value: "",
        valueOnChange: handleInputValueChange,
        disable: true,
      },
      {
        label: "Password",
        name: "password",
        placeholder: "Enter account password",
        subLabel: <EnablePasswordChange />,
        value: "",
        valueOnChange: handleInputValueChange,
        disable: !resetPassword,
      },
    ]

  if (initialLoad) {
    return (
      <BasicLayout
        pageTitle="My Account"
      >
        <div
          className='flex items-center justify-start gap-3'
        >
          <RiLoaderLine
            size={20}
            className='animate-spin text-themesecondary'
          />
          <p>Loading Account details...</p>
        </div>
      </BasicLayout>
    )
  }

  return (
    <BasicLayout
      pageTitle='My Account'
    >
      <div>
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
                  setProfileChanged(true)
                  setProfileImage(file);
                }
              }}
              ref={fileInputRef}
            />
          </div>

          {
            formFields.map((field, index) => (
              <div
                className='bg-background shadow-2xl shadow-gray-200 rounded-md'
                key={index}
              >
                <DashboardStandardInput
                  inputOnChange={field.valueOnChange}
                  inputPlaceholder={field.placeholder}
                  inputValue={formData[field.name as keyof typeof formData]}
                  label={field.label}
                  name={field.name}
                  subLabel={field.subLabel}
                  disableInput={field.disable}
                />
              </div>
            ))
          }

          {
            error &&
            <div
              className='py-3 px-5 rounded-md bg-red-50 text-red-500 flex items-center gap-3'
            >
              <RiErrorWarningLine
                size={20}
              />
              <p>{error}</p>
            </div>
          }
          
          {
            success &&
            <div
              className='py-3 px-5 rounded-md bg-green-50 text-green-500 flex items-center gap-3'
            >
              <RiCheckLine
                size={20}
              />
              <p>Changes saved successfully!</p>
            </div>
          }

          <div>
            <button
              className='py-3 px-5 rounded-md bg-themesecondary font-semibold text-white flex items-center gap-3 disabled:opacity-70'
              onClick={handleFormSubmit}
              disabled={inProgress}
            >
              {
                inProgress &&
                <RiLoaderLine
                  size={20}
                  className='animate-spin'
                />
              }
              <p>Save Changes</p>
            </button>
          </div>

        </div>
      </div>
    </BasicLayout>
  )
}

export default Page