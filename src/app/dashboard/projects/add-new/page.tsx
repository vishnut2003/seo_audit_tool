'use client';

import DashboardStandardInput from "@/Components/ui/DashboardStandardInput"
import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiAddLargeLine } from "@remixicon/react";
import { ChangeEvent } from "react"

const AddNewProject = () => {
  return (
    <BasicLayout>

      <h2
        className="text-3xl font-extrabold mb-10"
      >Projects</h2>

      <form
        className="flex flex-col items-start gap-5"
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
            inputValue=""
            inputPlaceholder="example.com"
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
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
          className="w-full max-w-screen-md bg-white rounded-md shadow-xl shadow-gray-200"
        >
          <DashboardStandardInput
            label="Competitor 1"
            subLabel="Used in competitor Analysis"
            inputValue=""
            inputPlaceholder="example.com"
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
          />

          <DashboardStandardInput
            label="Competitor 2"
            subLabel="Used in competitor Analysis"
            inputValue=""
            inputPlaceholder="example.com"
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
          />

          <DashboardStandardInput
            label="Competitor 3"
            subLabel="Used in competitor Analysis"
            inputValue=""
            inputPlaceholder="example.com"
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
          />
        </div>

        <button
          className="py-4 px-7 bg-secondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium"
        >
          <RiAddLargeLine
            size={20}
          />
          Create Project
        </button>
      </form>

    </BasicLayout>
  )
}

export default AddNewProject