'use client';

import { RiDeleteBack2Line } from '@remixicon/react'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const ProjectDeleteButton = ({ projectId }: {
    projectId: string,
}) => {

    const router = useRouter();

    async function handleDelete() {

        try {

            await axios.post('/api/project/delete', {
                projectId,
            });

            router.push('/dashboard/projects');

        } catch (err) {

            let errorMessage = "";

            if (typeof err === "string") {
                errorMessage = err;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            } else if (err instanceof AxiosError) {
                errorMessage = err.response?.data || "Deleting failed from server!";
            }

            window.alert(errorMessage)
        }

    }

    return (
        <>
            <button
                className='text-white bg-red-500 py-3 px-5 rounded-md flex items-center gap-3 font-semibold'
                onClick={handleDelete}
            >
                <RiDeleteBack2Line size={20} />
                <p>Confirm</p>
            </button>
        </>
    )
}

export default ProjectDeleteButton