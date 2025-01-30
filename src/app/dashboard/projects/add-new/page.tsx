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
    competitor1: "",
    competitor2: "",
    competitor3: "",
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
          <DashboardStandardInput
            label="Competitor 1"
            subLabel="Used in competitor Analysis"
            inputValue={formData.competitor1}
            inputPlaceholder="example.com"
            inputOnChange={handleInputOnchange}
            name="competitor1"
          />

          <DashboardStandardInput
            label="Competitor 2"
            subLabel="Used in competitor Analysis"
            inputValue={formData.competitor2}
            inputPlaceholder="example.com"
            inputOnChange={handleInputOnchange}
            name="competitor2"
          />

          <DashboardStandardInput
            label="Competitor 3"
            subLabel="Used in competitor Analysis"
            inputValue={formData.competitor3}
            inputPlaceholder="example.com"
            inputOnChange={handleInputOnchange}
            name="competitor3"
          />

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