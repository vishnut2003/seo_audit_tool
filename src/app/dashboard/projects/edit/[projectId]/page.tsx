'use client';

import { UpdateProjectByProjectIdApiRequestDataInterface } from "@/app/api/project/update/route";
import { GetUserAvatarApiRequestDataInterface, GetUserAvatarImageApiRouteResponseInterface } from "@/app/api/user-manager/get-user-avatar/route";
import DashboardStandardInput from "@/Components/ui/DashboardStandardInput";
import BasicLayout from "@/layouts/BasicLayout/BasicLayout";
import { base64ToFile } from "@/lib/utils";
import { ProjectModelInterface } from "@/models/ProjectsModel";
import { UserModelInterface } from "@/models/UsersModel";
import { RiAddLine, RiCheckLine, RiDeleteBack2Line, RiErrorWarningLine, RiLoaderLine } from "@remixicon/react";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UsersDataWithImageData {
    imageData: string | null,
    notFound?: boolean,
    name: string,
    email: string,
}

const EditProject = () => {

    const { projectId }: {
        projectId: string,
    } = useParams();

    const [formData, setFormData] = useState<{
        projectId: string | null,
        domain: string,
        competitors: string[],
        accessShare: string[],
    }>({
        domain: "",
        projectId: null,
        competitors: [],
        accessShare: [],
    })

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false)

    const [sharingField, setSharingField] = useState<string>('');
    const [usersData, setUsersData] = useState<UsersDataWithImageData[]>([]);
    const [refreshUserAccess, setRefreshUserAccess] = useState<number>(0);

    const [sharingUsersInProgress, setSharingUsersInProgress] = useState<boolean>(false);

    const [currentUser, setCurrentUser] = useState<Session | null>(null);
    const [projectOwnerEmail, setProjectOwnerEmail] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const decodedProjectId = decodeURIComponent(projectId)
            const { data }: {
                data: ProjectModelInterface | null,
            } = await axios.post('/api/project/get-one-by-id', { projectId: decodedProjectId })

            if (!data) {
                notFound();
            }

            setProjectOwnerEmail(data.email);

            setFormData(prev => ({
                ...prev,
                accessShare: data.accessShare,
                projectId: decodedProjectId,
                domain: data.domain,
                competitors: data.competitors,
            }))

        })()

    }, [projectId])

    // useEffect for handle sharedUsers data fetching
    useEffect(() => {

        (async () => {

            setSharingUsersInProgress(true)

            let tempUserData: UsersDataWithImageData[] = []

            for (const email of formData.accessShare) {
                const { data: userData } = await axios.post<UserModelInterface | null>('/api/user-manager/get-user-data-by-email', { email })

                if (!userData) {
                    tempUserData = [
                        ...tempUserData,
                        {
                            notFound: true,
                            email: email,
                            imageData: null,
                            name: "not found",
                        }
                    ]
                    continue;
                }

                const imageDataRequestApiData: GetUserAvatarApiRequestDataInterface = {
                    relativeImagePath: userData.image,
                }

                const { data: imageData } = await axios.post<GetUserAvatarImageApiRouteResponseInterface>('/api/user-manager/get-user-avatar', imageDataRequestApiData);

                if (!imageData.buffer) {
                    tempUserData = [
                        ...tempUserData,
                        {
                            notFound: true,
                            email: email,
                            imageData: null,
                            name: "Not found",
                        }
                    ]
                    continue;
                }

                const imageFile = base64ToFile(imageData.buffer, "user-avatar", imageData.mimeType);
                const imageObjectUrl = URL.createObjectURL(imageFile);

                tempUserData = [
                    ...tempUserData,
                    {
                        name: userData.name,
                        email,
                        imageData: imageObjectUrl,
                    }
                ]
            }
            setSharingUsersInProgress(false);
            setUsersData(tempUserData);
        })()

    }, [formData.accessShare, refreshUserAccess])

    useEffect(() => {
        getSession()
            .then((session) => {
                setCurrentUser(session);
            })
    }, [])

    function handleInputOnChange(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [inputEvent.target.name]: inputEvent.target.value,
        }))
    }

    async function handleSaveChanges() {
        try {

            if (!formData.projectId) {
                throw new Error("Project id not found!");
            }

            setInProgress(true)

            const requestData: UpdateProjectByProjectIdApiRequestDataInterface = {
                accessShare: formData.accessShare,
                competitors: formData.competitors,
                projectId: formData.projectId,
            }
            await axios.post('/api/project/update', requestData);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setInProgress(false);

        } catch (err) {
            let errorMessage = "Something went wrong!";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data || "";
            } else if (typeof err === "string") {
                errorMessage = err;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        }
    }

    const fields: {
        label: string,
        subLabel: string | React.JSX.Element,
        inputPlaceholder: string,
        inputValueOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        name: string,
        disable?: boolean,
    }[] = [
            {
                name: "domain",
                inputPlaceholder: "Domain",
                label: "Main Domain",
                subLabel: "Main doamin which used to create this project",
                inputValueOnChange: handleInputOnChange,
                disable: true,
            },
        ]

    return (
        <BasicLayout>
            <div
                className="pb-[50px]"
            >
                <div
                    className="w-full max-w-screen-md space-y-5"
                >

                    {
                        currentUser && currentUser.user?.email && projectOwnerEmail && currentUser.user.email !== projectOwnerEmail ?
                            <div
                                className="bg-gray-200 w-max py-3 px-5 rounded-md"
                            >
                                <p
                                    className="text-sm font-normal"
                                >Project Owner</p>
                                <p
                                    className="text-base font-semibold"
                                >{projectOwnerEmail}</p>
                            </div> 
                        : ""
                    }

                    {/* Form fields */}
                    {
                        fields.map((field, index) => (
                            <div
                                className='bg-background shadow-2xl shadow-gray-200 rounded-md'
                                key={index}
                            >
                                <DashboardStandardInput
                                    inputOnChange={field.inputValueOnChange}
                                    inputPlaceholder={field.inputPlaceholder}
                                    inputValue={formData.domain}
                                    label={field.label}
                                    name={field.name}
                                    subLabel={field.subLabel}
                                    disableInput={field.disable}
                                />
                            </div>
                        ))
                    }

                    <div>
                        <h2
                            className='text-xl font-extrabold'
                        >Add Competitors</h2>

                        <p
                            className='opacity-70 font-normal text-sm'
                        >You can remove or add more competitors in the future</p>
                    </div>

                    <div
                        className="bg-white space-y-1"
                    >
                        {
                            formData.competitors.map((competitor, index) => (
                                <DashboardStandardInput
                                    key={index}
                                    label={`Competitor ${index + 1}`}
                                    name="competitor"
                                    subLabel={`Competitor ${index + 1}`}
                                    inputValue={competitor}
                                    inputOnChange={(e) => {
                                        setFormData(prev => {
                                            prev.competitors[index] = e.target.value;
                                            return { ...prev };
                                        })
                                    }}
                                    inputPlaceholder={`Competitor ${index + 1}`}
                                />
                            ))
                        }
                    </div>

                    <div
                        className="flex items-center justify-end w-full gap-3"
                    >
                        <button
                            className="bg-themesecondary text-white font-semibold py-3 px-5 rounded-md flex items-center gap-2"
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    competitors: [...prev.competitors, ''],
                                }))
                            }}
                        >
                            <RiAddLine
                                size={20}
                            />
                            <p>Add Competitors</p>
                        </button>

                        <button
                            className="bg-red-500 text-white font-semibold py-3 px-5 rounded-md flex items-center gap-2"
                            onClick={() => {
                                setFormData(prev => {

                                    if (prev.competitors.length <= 1) {
                                        return prev;
                                    }

                                    const competitors = [...prev.competitors];
                                    competitors.pop();
                                    return {
                                        domain: prev.domain,
                                        projectId: prev.projectId,
                                        accessShare: prev.accessShare,
                                        competitors,
                                    }
                                })
                            }}
                        >
                            <RiDeleteBack2Line
                                size={20}
                            />
                            <p>Remove Competitors</p>
                        </button>
                    </div>

                    <div>
                        <h2
                            className='text-xl font-extrabold'
                        >Manage Project Access</h2>

                        <p
                            className='opacity-70 font-normal text-sm'
                        >You give or remove access to this project for other users</p>
                    </div>

                    <div
                        className="bg-white space-y-3"
                    >
                        <DashboardStandardInput
                            label="Project access"
                            subLabel={"Give project access to other users"}
                            name="access"
                            inputPlaceholder="Project access"
                            inputOnChange={(e) => setSharingField(e.target.value)}
                            inputValue={sharingField}
                        />

                        <div
                            className="flex w-full items-center justify-end px-3"
                        >
                            <button
                                className="py-3 px-5 bg-themesecondary text-white font-semibold rounded-md disabled:opacity-50"
                                type="submit"
                                disabled={!sharingField || sharingUsersInProgress}
                                onClick={() => {
                                    setFormData(prev => {

                                        if (!sharingField) {
                                            return prev;
                                        }

                                        const prevSharingMails = [...prev.accessShare];
                                        prevSharingMails.push(sharingField);

                                        setSharingField('');

                                        return {
                                            ...prev,
                                            accessShare: prevSharingMails,
                                        }
                                    })
                                }}
                            >Give Access</button>
                        </div>

                        <div
                            className="p-6 space-y-8"
                        >
                            <h2
                                className="text-xl font-semibold"
                            >Shared users</h2>

                            {
                                sharingUsersInProgress &&
                                <div
                                    className="flex items-center gap-2"
                                >
                                    <RiLoaderLine
                                        size={20}
                                        className="animate-spin text-themesecondary"
                                    />
                                    <p>Loading...</p>
                                </div>
                            }

                            {
                                formData.accessShare.length === 0 &&
                                <div
                                    className="w-full h-[150px] bg-gray-100 rounded-md flex items-center justify-center"
                                >
                                    <p
                                        className="text-gray-500"
                                    >No users found!</p>
                                </div>
                            }

                            <div
                                className="space-y-5"
                            >
                                {
                                    formData.accessShare.map((email, index) => {

                                        if (usersData[index]) {
                                            return (
                                                <div
                                                    className="flex items-center justify-between gap-2"
                                                    key={index}
                                                >
                                                    <div
                                                        className="flex items-center justify-start gap-2"
                                                    >
                                                        <Image
                                                            src={usersData[index].imageData || "/users/default-avatar.png"}
                                                            alt="user-avatar"
                                                            width={200}
                                                            height={200}
                                                            className={`w-[50px] h-[50px] rounded-full ${usersData[index].notFound ? "border-2 border-red-50" : ""}`}
                                                        />
                                                        <div>
                                                            <p
                                                                className={`text-base font-semibold ${usersData[index].notFound ? "text-red-500" : "text-themesecondary"}`}
                                                            >{usersData[index].name}</p>
                                                            <p
                                                                className="text-sm font-medium"
                                                            >{usersData[index].email}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="flex items-center bg-red-50 text-red-500 py-2 px-3 gap-2 rounded-md disabled:opacity-50"
                                                        disabled={sharingUsersInProgress}
                                                        onClick={() => {
                                                            setFormData(prev => {
                                                                const prevCopy = { ...prev };
                                                                const elementIndex = prevCopy.accessShare.indexOf(email);

                                                                if (elementIndex !== -1) {
                                                                    prevCopy.accessShare.splice(elementIndex, 1);

                                                                    return {
                                                                        ...prev,
                                                                        accessShare: prevCopy.accessShare,
                                                                    }
                                                                } else {
                                                                    return prev;
                                                                }
                                                            })

                                                            setRefreshUserAccess(prev => ++prev)
                                                        }}
                                                    >
                                                        <RiDeleteBack2Line
                                                            size={20}
                                                        />
                                                        <p>Delete</p>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>

                    </div>

                    {
                        error &&
                        <div
                            className="py-3 px-5 rounded-md bg-red-50 text-red-500 flex items-center justify-start gap-2"
                        >
                            <RiErrorWarningLine
                                size={20}
                            />
                            <p>{error}</p>
                        </div>
                    }
                    
                    {
                        success &&
                        <div
                            className="py-3 px-5 rounded-md bg-green-50 text-green-500 flex items-center justify-start gap-2"
                        >
                            <RiCheckLine
                                size={20}
                            />
                            <p>Project updated successfully!</p>
                        </div>
                    }

                    <button
                        className="text-lg font-semibold py-3 px-5 bg-themesecondary rounded-md text-white"
                        disabled={inProgress}
                        onClick={handleSaveChanges}
                    >
                        {inProgress ? "Loading..." : "Save Changes"}
                    </button>

                </div>
            </div>
        </BasicLayout>
    )
}

export default EditProject