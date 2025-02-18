import { Dispatch, FormEvent, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

export interface NewProjectFormData {
    domain: string,
    competitors: string[],
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
            const domainRegex = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/

            // filtered entrues
            const mainDomain = formData.domain.trim();
            const competitors: string[] = [];

            if (!domainRegex.test(mainDomain)) {
                throw new Error(`Main Domain is not valid.`)
            }

            let competitorPos = 1;
            for (const domain of formData.competitors) {
                const trimDomain = domain.trim();

                if (!trimDomain) {
                    throw new Error(`Competitor ${competitorPos++} field is required.`)
                }

                if (!domainRegex.test(trimDomain)) {
                    throw new Error(`Competitor ${competitorPos++} is not a valid domain.`);
                }

                competitorPos++
                competitors.push(trimDomain);
            }

            // Fetch user details
            const userSession = await getSession();
            if (!userSession || !userSession.user || !userSession.user.email) {
                throw new Error("something went wrong.");
            }

            const FilteredSubmitData: NewProjectFormData = {
                domain: mainDomain,
                competitors,
            };

            await axios.post('/api/project/add-new', {
                formData: FilteredSubmitData, 
                email: userSession.user.email
            });

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