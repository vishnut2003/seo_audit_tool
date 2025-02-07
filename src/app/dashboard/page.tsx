'use client';

import BasicLayout from "@/layouts/BasicLayout/BasicLayout"
import { getSessionProject } from "@/utils/client/projects"
import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import { ProjectModelInterface } from "@/models/ProjectsModel";
import { useRouter } from "next/navigation";

const Page = () => {

  const [currentActive, setCurrentActive] = useState<"dashboard" | null>(null)
  const [project, setProject] = useState<ProjectModelInterface | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const project = await getSessionProject();
        if (!project) {
          router.push('/dashboard/projects')
          return;
        }
        setProject(project)
        setCurrentActive("dashboard");
      } catch (err) {
        console.log(err);
      }
    })();
  }, [router]);

  return (
    <BasicLayout
      pageTitle="Dashboard"
    >

      {
        !currentActive ?
          <div
            className="w-full h-full flex justify-center items-center"
          >
            <p>Loading Options...</p>
          </div> :
            project && 
            <Dashboard 
              currentProject={project}
            />
      }

    </BasicLayout>
  )
}

export default Page