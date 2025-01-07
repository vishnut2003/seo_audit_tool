import { CompetiotrAnalysisFormErrorInterface, CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface";
import { createCompetitorAnalysisReport } from "@/utils/client/CompetitorAnalysisReport";
import { Dispatch, FormEvent, SetStateAction } from "react";

export function submitCompetitorAnalysisForm({ formData, formEvent, setErrorObject, errorObject }: {
    formData: CompetiotrAnalysisFormSubmitInterface,
    formEvent: FormEvent<HTMLFormElement>,
    setErrorObject: Dispatch<SetStateAction<CompetiotrAnalysisFormErrorInterface>>,
    errorObject: CompetiotrAnalysisFormErrorInterface,
}) {
    formEvent.preventDefault();

    // validate the form data

    // check website URL validation
    const urlRegEx = /^(http(s):\/\/.|http:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
    if (!urlRegEx.test(formData.website)) {
        setErrorObject((prev) => ({
            ...prev,
            website: {
                message: 'Website URL is not valid.',
                status: true,
            },
        }));
        return;
    } else {
        setErrorObject((prev) => ({
            ...prev,
            website: {
                message: '',
                status: false,
            },
        }));
    }

    // check competitor URL validation
    if (formData.competitor.length === 0) {
        setErrorObject((prev) => ({
            ...prev,
            competitor: {
                message: 'Atlease one competitor URL is required.',
                status: true,
            },
        }));
        return;
    } else {
        setErrorObject((prev) => ({
            ...prev,
            competitor: {
                message: '',
                status: false,
            },
        }));
    }

    // check if report id created successfully
    if (errorObject.reportId.status) {
        return;
    }

    // submit the data to API
    createCompetitorAnalysisReport({ formData })


    console.log(formData);
}