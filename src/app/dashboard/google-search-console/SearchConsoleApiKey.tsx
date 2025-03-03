'use client';

import DashboardStandardInput from '@/Components/ui/DashboardStandardInput'
import { RiDownloadLine, RiErrorWarningLine } from '@remixicon/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { WatchHowToGetAPI } from '../analytics-report/AnalyticsApiKey';
import { getSessionProject } from '@/utils/client/projects';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"


export interface GoogleSearchConsoleApiFormDataInterface {
    property: string,
    clientEmail: string,
    privateKey: string,
    email: string,
    projectId: string,
}

const SearchConsoleApiKey = ({ domain, projectId }: {
    domain: string,
    projectId: string,
}) => {

    const [error, setError] = useState<string | null>(null)
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [mainDomain, setMainDomain] = useState<string>('');
    const [domainPrefix, setDomainPrefix] = useState<string>('domain');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');

    const [importCredentials, setImportCredentials] = useState<{
        clientEmail: string,
        privateKey: string,
    } | null>(null);

    const router = useRouter();

    useEffect(() => {
        setMainDomain(domain);

        // check if api credentials already exist
        getSessionProject().then((project) => {
            if (
                project &&
                project.googleAnalytics?.clientEmail &&
                project.googleAnalytics?.privateKey
            ) {
                setImportCredentials({
                    clientEmail: project.googleAnalytics.clientEmail,
                    privateKey: project.googleAnalytics.privateKey,
                })
            }
        })
    }, [domain]);

    async function submitAPICredentials() {
        try {
            setInProgress(true)
            setError(null);

            // validate input data
            if (!mainDomain) {
                setError("Property is required!");
                return;
            }

            if (!clientEmail || !privateKey) {
                setError("API Credentials is required");
                return;
            }

            const session = await getSession();

            if (!session?.user?.email) {
                setError("Please login");
                return;
            }

            const formData: GoogleSearchConsoleApiFormDataInterface = {
                email: session.user.email,
                projectId,
                property: domainPrefix + mainDomain,
                clientEmail,
                privateKey,
            }

            await axios.post('/api/project/search-console-api/google/create', formData);
            router.push('/dashboard/google-search-console/report');
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
            className='flex flex-col gap-5'
        >
            <div
                className='w-full max-w-screen-lg bg-white rounded-md shadow-xl shadow-gray-200'
            >
                <DashboardStandardInput
                    label='Property'
                    subLabel={PropertyInputSubLabel({ setPrefix: setDomainPrefix })}
                    name='property'
                    inputPlaceholder='https://example.com'
                    inputValue={(domainPrefix === "domain" ? "" : domainPrefix) + mainDomain}
                    disableInput
                    inputOnChange={() => { }}
                />
            </div>

            <div
                className="flex flex-col gap-1"
            >
                <h3
                    className="text-lg font-medium"
                >Google Service Account Credentials</h3>
                <p
                    className="text-sm"
                >Provide your Service Account Credentials to enable data tracking and insights for your project.</p>
            </div>

            <div>
                <WatchHowToGetAPI />
            </div>

            {
                importCredentials &&
                <div>
                    <button
                        className='flex items-center gap-2 py-3 px-4 bg-themesecondary rounded-md text-white'
                        onClick={() => {
                            setClientEmail(importCredentials.clientEmail)
                            setPrivateKey(importCredentials.privateKey)
                        }}
                    >
                        <RiDownloadLine
                            size={20}
                        />
                        Import Credentials from Analytics
                    </button>
                </div>
            }

            <div
                className='w-full max-w-screen-lg bg-white rounded-md shadow-xl shadow-gray-200'
            >
                <DashboardStandardInput
                    label='Client Email'
                    subLabel={'You can find the client_email inside the JSON file downloaded from the Google Cloud Console'}
                    name='client_email'
                    inputPlaceholder='client_email'
                    inputValue={clientEmail}
                    inputOnChange={(e) => {
                        setClientEmail(e.target.value);
                    }}
                />
            </div>

            <div
                className='w-full max-w-screen-lg bg-white rounded-md shadow-xl shadow-gray-200'
            >
                <DashboardStandardInput
                    label='Private Key'
                    subLabel={'You can find the private_key inside the JSON file downloaded from the Google Cloud Console'}
                    name='private_key'
                    inputPlaceholder='private_key'
                    inputValue={privateKey}
                    inputOnChange={(e) => {
                        setPrivateKey(e.target.value);
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
    )
}

function PropertyInputSubLabel({ setPrefix }: {
    setPrefix: Dispatch<SetStateAction<string>>,
}) {
    return (
        <div
            className='flex flex-col gap-2'
        >

            <Select
                onValueChange={(value) => {
                    setPrefix(value);
                }}
            >
                <SelectTrigger
                    className='text-xs bg-themeprimary h-4 px-3 rounded-md w-max flex gap-2 text-foregroundwhite'
                >
                    <SelectValue placeholder="URL Prefix / Domain" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="https://">https://</SelectItem>
                    <SelectItem value="https://www.">https://www.</SelectItem>
                    <SelectItem value="domain">domain only</SelectItem>
                </SelectContent>
            </Select>


            <p>Please verify that your property is in the form of url or in domain</p>
        </div>
    )
}

export default SearchConsoleApiKey