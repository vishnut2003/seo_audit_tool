'use client';

import { ProjectModelInterface } from "@/models/ProjectsModel";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditProject = () => {

    const { projectId }: {
        projectId: string,
    } = useParams();

    useEffect(() => {
        (async () => {
            const decodedProjectId = decodeURIComponent(projectId)
            const { data }: {
                data: ProjectModelInterface | null,
            } = await axios.post('/api/project/get-one-by-id', { projectId: decodedProjectId })

            console.log(data)

        })()
    }, [projectId])

    return (
        <div>{projectId}</div>
    )
}

export default EditProject