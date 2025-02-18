'use client';

import DashboardStandardInput from "@/Components/ui/DashboardStandardInput"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiAddLargeLine } from "@remixicon/react";
import { ChangeEvent, useState } from "react"
import { handleNewProjectFormSubmit, NewProjectFormData } from "./handleSubmit";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AddNewProject = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewProjectFormData>({
    domain: "",
    competitors: [""]
  });

  const router = useRouter();

  function handleInputOnchange(e: ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <BasicLayout
      pageTitle="Projects"
    >

      <form
        className="flex flex-col items-start gap-5 pb-5"
        onSubmit={async (e) => {
          setInProgress(true)
          await handleNewProjectFormSubmit(e, formData, setFormError, setFormSuccess, setInProgress);
          setInProgress(false);
          router.push('/dashboard/projects')
        }}
      >

        <div>
          <h2
            className='text-xl font-extrabold'
          >Create New Project</h2>

          <p
            className='opacity-70 font-normal text-sm'
          >Create project for easily manage report.</p>
        </div>

        <div
          className="max-w-screen-md w-full bg-white rounded-md shadow-xl shadow-gray-200"
        >
          <DashboardStandardInput
            label="Enter Your Main Domain"
            subLabel="Analyze, track, and optimize your website"
            inputValue={formData.domain}
            inputPlaceholder="example.com"
            inputOnChange={handleInputOnchange}
            name="domain"
            domainInput
          />
        </div>

        {/* Competitors list */}

        <div>
          <h2
            className='text-xl font-extrabold'
          >Add Competitors</h2>

          <p
            className='opacity-70 font-normal text-sm'
          >You can remove or add more competitors in the future</p>
        </div>

        <div
          className="w-full max-w-screen-md bg-white rounded-md overflow-hidden shadow-xl shadow-gray-200"
        >
          {
            formData.competitors.map((competitor, index) => (
              <DashboardStandardInput
                key={index}
                label={`Competitor ${index + 1}`}
                subLabel="Used in competitor Analysis"
                inputValue={competitor}
                inputPlaceholder="example.com"
                inputOnChange={(e) => {
                  setFormData(prev => {
                    prev.competitors[index] = e.target.value;
                    return {...prev};
                  })
                }}
                name={`competitor${index + 1}`}
                domainInput
              />
            ))
          }

          {
            // Form error
            formError &&
            <motion.div
              className="text-md font-medium bg-red-200 text-red-500 py-4 px-6"
              initial={{
                translateY: 200
              }}
              animate={{
                translateY: 0
              }}
            >
              <p>{formError}</p>
            </motion.div>
          }

          {
            // Form Success
            formSuccess &&
            <motion.div
              className="text-md font-medium bg-green-200 text-green-500 py-4 px-6"
              initial={{
                translateY: 200
              }}
              animate={{
                translateY: 0
              }}
            >
              <p>{formSuccess}</p>
            </motion.div>
          }
        </div>

        <div
          className='flex justify-end gap-4 w-full max-w-screen-md'
        >
          {/* Add more competitors field */}
          <button
            className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
            onClick={() => {
              setFormData(prev => {
                const updatedCompetitor = [...prev.competitors, ''];
                return {
                  domain: prev.domain,
                  competitors: updatedCompetitor,
                };
              })
            }}
            type='button'
          >Add Competitors</button>

          {/* Remove last competitors field */}
          <button
            className="py-4 px-7 bg-red-500 text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
            type='button'
            onClick={() => {
              setFormData(prev => {

                if (prev.competitors.length <= 1) {
                  return prev;
                }

                const competitors = [...prev.competitors];
                competitors.pop();
                return {
                  domain: prev.domain,
                  competitors,
                }
              })
            }}
          >Remove</button>
        </div>

        <button
          className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
          disabled={inProgress}
        >
          <RiAddLargeLine
            size={20}
          />
          {inProgress ? "Creating Project..." : "Create Project"}
        </button>
      </form>

    </BasicLayout>
  )
}

export default AddNewProject