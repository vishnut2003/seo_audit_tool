'use client';

import { SearchConsoleDeleteRequestDataInterface } from "@/app/api/project/search-console-api/google/delete/route";
import { getSessionProject } from "@/utils/client/projects";
import { RiDeleteBin5Line } from "@remixicon/react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetConnectionButton = () => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const router = useRouter();

    async function submitDeleteRequest() {
        try {
            setInProgress(true);
            const session = await getSession();
            const project = await getSessionProject();

            if (!session?.user?.email || !project?.projectId) {
                throw new Error("No user or no project found!");
            }

            const requestData: SearchConsoleDeleteRequestDataInterface = {
                email: session.user.email,
                projectId: project.projectId,
            }

            await axios.post('/api/project/search-console-api/google/delete', requestData);
            router.push('/dashboard/google-search-console');
        } catch (err) {
            setInProgress(false);
            let error = "Something went wrong!";

            if (typeof err === "string") {
                error = err;
            }

            window.alert(error);
        }
    }

    return (
        <button
            className='w-max flex items-center gap-2 bg-red-500 text-white py-3 px-5 rounded-md shadow-md shadow-red-200 mt-5 font-medium'
            onClick={submitDeleteRequest}
            disabled={inProgress}
        >
            <RiDeleteBin5Line
                size={20}
            />
            {inProgress ? "Loading..." : "Delete Google connection"}
        </button>
    )
}

export default ResetConnectionButton