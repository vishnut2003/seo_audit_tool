import { Dispatch, FormEvent, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

export interface NewProjectFormData {
    domain: string,
    competitor1: string,
    competitor2: string,
    competitor3: string,
}

export function handleNewProjectFormSubmit(
    e: FormEvent,
    formData: NewProjectFormData,
    setFormError: Dispatch<SetStateAction<string | null>>,
    setFormSuccess: Dispatch<SetStateAction<string | null>>,
    setInProgress: Dispatch<SetStateAction<boolean>>,
) {
    return new Promise<void>(async (resolve) => {
        try {
            e.preventDefault();
            setFormError(null);

            // check if domains are valid
            const domains = ['domain', 'competitor1', 'competitor2', 'competitor3']
            const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
            for (const domain of domains) {
                const trimDomain = formData[domain as keyof typeof formData].trim();

                if (!trimDomain) {
                    throw new Error(`${domain} field is required.`)
                }

                if (!domainRegex.test(trimDomain)) {
                    throw new Error(`${trimDomain} is not a valid domain.`);
                }
            }

            // Fetch user details
            const userSession = await getSession();
            if (!userSession || !userSession.user || !userSession.user.email) {
                throw new Error("something went wrong.");
            }

            await axios.post('/api/project/add-new', { formData, email: userSession.user.email });
            setFormSuccess("Project created Successfully");

            return resolve();

        } catch (err) {
            if (err instanceof AxiosError) {
                setFormError(err.response?.data?.message || "Something went wrong!");
            } else if (err instanceof Error) {
                setFormError(err.message);
            } else {
                console.log(err);
            }

            setInProgress(false);
        }
    })
}