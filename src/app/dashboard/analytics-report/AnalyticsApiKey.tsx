'use client';

import DashboardStandardInput from "@/Components/ui/DashboardStandardInput";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { RiErrorWarningLine, RiPlayCircleLine } from "@remixicon/react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface GoogleAnalyticsFormSubmitInterface {
    email: string,
    projectId: string,
    clientEmail: string,
    privateKey: string,
    propertyId: string,
}

const AnalyticsApiKey = ({ projectId }: {
    projectId: string,
}) => {

    const [clientEmail, setClientEmail] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    const [propertyId, setPropertyId] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const router = useRouter()

    async function submitAPICredentials() {
        try {
            setError(null);
            setInProgress(true);
            // validate submit data
            if (!clientEmail) {
                setInProgress(false);
                setError("client_email is required.");
                return;
            } else if (!privateKey) {
                setInProgress(false);
                setError("private_key is required.");
                return;
            }

            const session = await getSession();

            if (!session || !session.user?.email) {
                setError("Please login.");
                setInProgress(false);
                return;
            }

            // submit data
            const formData: GoogleAnalyticsFormSubmitInterface = {
                clientEmail,
                privateKey,
                propertyId,
                projectId,
                email: session.user.email,
            }

            await axios.post('/api/project/analytics-api/google/create', formData);
            
            router.push('/dashboard/analytics-report/reports')

        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            } else {
                setError("Something went wrong!");
            }
        }
    }

    return (
        <div
            className="w-full h-full"
        >
            <div
                className="flex flex-col gap-5"
            >
                <div
                    className="flex flex-col gap-1"
                >
                    <h3
                        className="text-lg font-medium"
                    >Enter Your Google Analytics API Credentials</h3>
                    <p
                        className="text-sm"
                    >Provide your Google Analytics Credentials to enable data tracking and insights for your project.</p>
                </div>

                <div>
                    <WatchHowToGetAPI />
                </div>

                <div
                    className="bg-white w-full max-w-screen-lg rounded-md shadow-xl shadow-gray-200"
                >
                    <DashboardStandardInput
                        label="Property ID"
                        subLabel="You can find the PROPERTY ID in Google Analytics Dashboard."
                        inputPlaceholder="PROPERTY ID"
                        name="property_id"
                        inputValue={propertyId}
                        inputOnChange={(event) => {
                            setPropertyId(event.target.value);
                        }}
                    />
                </div>
                
                <div
                    className="bg-white w-full max-w-screen-lg rounded-md shadow-xl shadow-gray-200"
                >
                    <DashboardStandardInput
                        label="Client Email"
                        subLabel="You can find the client_email inside the JSON file downloaded from the Google Cloud Console"
                        inputPlaceholder="client_email"
                        name="client_email"
                        inputValue={clientEmail}
                        inputOnChange={(event) => {
                            setClientEmail(event.target.value);
                        }}
                    />
                </div>

                <div
                    className="bg-white w-full max-w-screen-lg rounded-md shadow-xl shadow-gray-200"
                >
                    <DashboardStandardInput
                        label="Private Key"
                        subLabel="You can find the private_key inside the JSON file downloaded from the Google Cloud Console"
                        inputPlaceholder="private_key"
                        name="private_key"
                        inputValue={privateKey}
                        inputOnChange={(event) => {
                            setPrivateKey(event.target.value);
                        }}
                    />
                </div>

                {
                    error &&
                    <div
                        className="py-3 px-4 bg-red-50 text-red-500 w-full max-w-screen-lg rounded-md shadow-xl shadow-gray-200 flex items-center gap-3"
                    >
                        <RiErrorWarningLine
                            size={20}
                        />
                        <p>{error}</p>
                    </div>
                }

                <div>
                    <button
                        className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                        onClick={submitAPICredentials}
                        disabled={inProgress}
                    >{inProgress ? "Saving..." : "Save Credentials"}</button>
                </div>
            </div>
        </div>
    )
}

function WatchHowToGetAPI() {
    return (
        <Dialog>
            <DialogTrigger
                className="flex items-center gap-2 text-themesecondary cursor-pointer"
            >
                <RiPlayCircleLine
                    size={20}
                />
                Watch How to get API Key
            </DialogTrigger>

            <DialogContent
                className="w-full max-w-screen-md p-0 border-0 rounded-md overflow-hidden"
            >
                <DialogTitle
                    className="hidden"
                >Are you absolutely sure?</DialogTitle>
                <DialogHeader>
                    <DialogDescription
                        className="h-[450px]"
                    >
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oRUpAqYqROQ?si=cP_cgPg6seuZGYHN" title="YouTube video player"></iframe>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default AnalyticsApiKey