import { CompetiotrAnalysisFormErrorInterface, CompetiotrAnalysisFormSubmitInterface } from "@/Interfaces/CompetitorAnalysisInterface/FormSubmitInterface"
import { RiAddLine, RiCloseLine, RiGlobalLine } from "@remixicon/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { submitCompetitorAnalysisForm } from "./submitAction"
import { generateReportId } from "./generateReportId"
import FormSubmitLoader from "./FormSubmitLoader"

const CompetitorAnalysisForm = ({ setFormPopup }: {
    setFormPopup: (value: boolean) => void
}) => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [formData, setFormData] = useState<CompetiotrAnalysisFormSubmitInterface>({
        reportId: 'Generating...',
        website: '',
        competitor: [],
    })

    const [errorObject, setErrorObject] = useState<CompetiotrAnalysisFormErrorInterface>({
        reportId: {
            message: '',
            status: false,
        },
        website: {
            message: '',
            status: false,
        },
        competitor: {
            message: '',
            status: false,
        },
    })

    useEffect(() => {
        generateReportId()
            .then((newReportId) => {
                setFormData(prev => ({
                    ...prev,
                    reportId: newReportId,
                }))
            })
            .catch(() => {
                setErrorObject(prev => ({
                    ...prev,
                    reportId: {
                        status: true,
                        message: "Something went wrong while creating report ID"
                    }
                }))

                setFormData(prev => ({
                    ...prev,
                    reportId: ''
                }))
            })
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[#ffffff60] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg drop-shadow-2xl max-w-screen-sm w-full flex flex-col gap-4">

                {/* popup header part */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-semibold">Create new Competitor Analysis</h1>
                        <p className="text-sm text-gray-500">Fill the form below to create a new Competitor Analysis.</p>
                    </div>
                    <div>
                        <button
                            className="bg-red-500 text-white rounded-lg p-2"
                            onClick={() => setFormPopup(false)}
                            type="button">
                            <RiCloseLine size={24} />
                        </button>
                    </div>
                </div>

                {/* Competitor analysis form */}
                <form onSubmit={(e) => submitCompetitorAnalysisForm({ formData, formEvent: e, setErrorObject, errorObject })}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            label="Report ID"
                            type="text"
                            name="reportId"
                            placeholder="Enter report ID"
                            required={true}
                            disabled={true}
                            value={formData.reportId}
                            errorObject={errorObject}
                        />

                        <FormField
                            label="Website URL"
                            type="text"
                            name="website"
                            placeholder="https://example.com"
                            required={true}
                            value={formData.website}
                            onChange={(value) => setFormData({ ...formData, website: value })}
                            errorObject={errorObject}
                        />

                        <AddNewCompetitor
                            competitor={formData.competitor}
                            errorObject={errorObject}
                            setErrorObject={setErrorObject}
                            setCompetitor={(value) => setFormData({ ...formData, competitor: value })} />

                        <ListCompetitors competitors={formData.competitor} setCompetitor={(updatedCompetitor) => setFormData({ ...formData, competitor: updatedCompetitor })} />
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-primary text-white py-4 px-6 rounded-lg mt-4" type="submit">
                            Create Competitor Analysis
                        </button>
                    </div>
                </form>

                {/* Form submit loader */
                    showLoader && <FormSubmitLoader/>
                }
                
            </div>
        </div>
    )
}

function FormField({ label, type, name, placeholder, required, value, onChange, disabled, errorObject }: {
    label: string,
    type: string,
    name: string,
    placeholder: string,
    required: boolean,
    value: string | number,
    onChange?: (value: string) => void,
    disabled?: boolean,
    errorObject: CompetiotrAnalysisFormErrorInterface
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500" htmlFor={name}>{label}</label>
            <input
                className={
                    "border border-gray-300 rounded-lg p-2 outline-none" +
                    (disabled ? ' bg-gray-100 text-gray-600' : '') +
                    (errorObject[name as keyof typeof errorObject].status ? ' border-red-500' : '')
                }
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                required={required}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            {
                errorObject[name as keyof typeof errorObject].status &&
                <span className="text-red-500 text-sm">{errorObject[name as keyof typeof errorObject].message}</span>
            }
        </div>
    )
}

function AddNewCompetitor({ competitor, setCompetitor, errorObject, setErrorObject }: {
    competitor: string[],
    setCompetitor: (value: string[]) => void,
    errorObject: CompetiotrAnalysisFormErrorInterface,
    setErrorObject: Dispatch<SetStateAction<CompetiotrAnalysisFormErrorInterface>>
}) {
    const [newCompetitor, setNewCompetitor] = useState<string>('')

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">Add new competitor</label>
            <div className={
                "flex gap-2 items-center border border-gray-300 rounded-lg overflow-hidden outline-none" +
                (errorObject.competitor.status ? ' border-red-500' : '')
            }>
                <input
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            e.preventDefault()
                        }
                    }}
                    className="outline-none p-2 w-full"
                    type="text"
                    placeholder="Enter competitor's website URL"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                />
                <button
                    className={`bg-primary py-2 px-3 text-white ${errorObject.competitor.status ? "bg-red-500" : ""}`}
                    type="button"
                    onClick={() => {
                        const urlRegEx = /^(http(s):\/\/.|http:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
                        if (!urlRegEx.test(newCompetitor)) {
                            setErrorObject((prev) => ({
                                ...prev,
                                competitor: {
                                    message: 'Competitor URL is not valid.',
                                    status: true,
                                },
                            }))
                            return
                        } else {
                            setErrorObject((prev) => ({
                                ...prev,
                                competitor: {
                                    message: 'Competitor URL is not valid.',
                                    status: false,
                                },
                            }))
                        }
                        setCompetitor([...competitor, newCompetitor])
                        setNewCompetitor('')
                    }}
                >
                    <RiAddLine size={24} />
                </button>
            </div>
            {
                errorObject.competitor.status &&
                <span className="text-red-500 text-sm">{errorObject.competitor.message}</span>
            }
        </div>
    )
}

function ListCompetitors({ competitors, setCompetitor }: {
    competitors: string[],
    setCompetitor: (value: string[]) => void
}) {
    const [showCompetitor, setShowCompetitor] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-2 max-h-60 overflow-auto p-2">
            <label className="text-sm text-gray-500">Competitors</label>
            <div className="flex flex-wrap gap-3">
                {competitors.length === 0 ?
                    <span className="text-gray-500">No competitors added yet.</span> :
                    <div>
                        <div>
                            <span className="text-gray-500">
                                {competitors.length} competitors added.
                                <span
                                    className="cursor-pointer ml-2 text-primary font-semibold"
                                    onClick={() => setShowCompetitor(!showCompetitor)}
                                >
                                    Show Competitors
                                </span>
                            </span>
                        </div>
                        {
                            showCompetitor &&
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center drop-shadow-2xl">
                                <div className="bg-white flex flex-col gap-4 rounded-md">
                                    <div className="w-full py-3 px-5 flex justify-between items-center shadow-md">
                                        <h2 className="text-xl font-semibold">Competitors</h2>
                                        <RiCloseLine
                                            className="cursor-pointer"
                                            onClick={() => setShowCompetitor(!showCompetitor)}
                                            size={24} />
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 pt-0 max-h-96 overflow-auto">
                                        <div className="flex flex-col gap-2">
                                        {
                                            competitors.map((competitor, index) => (
                                                <div key={index} className="flex gap-2 items-center bg-white py-2 px-3 rounded-md overflow-hidden shadow-md">
                                                    <RiGlobalLine size={20} className="opacity-40" />
                                                    <span>{competitor}</span>
                                                    <button
                                                        className="text-red-500 p-1"
                                                        type="button"
                                                        onClick={() => {
                                                            competitors.splice(index, 1)
                                                            setCompetitor([...competitors])
                                                        }}
                                                    >
                                                        <RiCloseLine size={18} />
                                                    </button>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CompetitorAnalysisForm