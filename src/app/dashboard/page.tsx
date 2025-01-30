import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { RiAddLargeLine, RiFolder5Line } from "@remixicon/react"
import Link from "next/link"

const page = () => {
  return (
    <BasicLayout
      pageTitle="Dashboard"
    >

      <div className="w-full h-full">

        {/* empty project layout */}
        <div className="w-full h-full rounded-md flex flex-col gap-1 justify-center items-center">

          <RiFolder5Line
            size={50}
            className="text-themesecondary mb-3"
          />

          <h2
            className="text-[25px] md:text-[35px] font-extrabold capitalize text-center"
          >Please select any project</h2>

          <p
            className="text-[14px] md:text-base text-foreground opacity-50"
          >Or create a new project to manage reports</p>

          <Link
            href={'/dashboard/projects/add-new'}
            className='text-foreground mt-3 text-sm font-medium flex justify-center items-center gap-3 bg-white rounded-md py-3 px-5 shadow-xl shadow-gray-200 hover:bg-gray-50'
          >
            <RiAddLargeLine
              size={20}
            />
            <p className='mt-1'>New Project</p>
          </Link>

        </div>
      </div>
    </BasicLayout>
  )
}

export default page