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
import { RiPlayCircleLine } from "@remixicon/react";


const AnalyticsApiKey = () => {

    const [clientEmail, setClientEmail] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');

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

                <div>
                    <button
                        className="py-4 px-7 bg-themesecondary text-foregroundwhite rounded-md shadow-xl shadow-gray-200 flex gap-2 items-center font-medium disabled:opacity-60"
                    >Save Credentials</button>
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