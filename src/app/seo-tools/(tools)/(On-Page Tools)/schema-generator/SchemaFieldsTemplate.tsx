import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SchemaTypesListInterface, SchemaTypesListJsonReturnFunctionArgumentType } from './schemaTypesList'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RiAddLargeLine, RiCloseLargeLine } from '@remixicon/react'
import DatePicker from '@/Components/ui/datepicker'

const SchemaFieldsTemplate = ({
    selectedSchemaType,
    setFieldsData
}: {
    selectedSchemaType: SchemaTypesListInterface,
    setFieldsData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) => {
    return (
        <div
            className='mt-[30px] p-3 w-full'
        >
            <div
                className='flex flex-wrap w-full gap-3 justify-between'
            >
                {
                    selectedSchemaType.enableFields.map((field, index) => {

                        if (typeof field === "string") {
                            return (
                                <h2
                                    className='text-lg font-semibold text-themesecondary w-full'
                                    key={index}
                                >{field}</h2>
                            )
                        }

                        return (
                            <div
                                key={index}
                                className={`w-[${field.width}]`}
                            >
                                {
                                    field.type === "dropdown" &&
                                    <DropdownTemplate
                                        placeholder={field.placeholder}
                                        label={field.label}
                                        items={field.dropdownList || []}
                                        name={field.name}
                                        setFieldData={setFieldsData}
                                    />
                                }
                                {
                                    field.type === "text" &&
                                    <TextFieldTemplate
                                        label={field.label}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        setFieldData={setFieldsData}
                                    />
                                }
                                {
                                    field.type === "list" &&
                                    <ListFieldTemplate
                                        label={field.label}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        setFieldData={setFieldsData}
                                    />
                                }
                                {
                                    field.type === "date" &&
                                    <DateFieldTemplate
                                        label={field.label}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        setFieldData={setFieldsData}
                                    />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function DropdownTemplate({
    items,
    label,
    placeholder,
    name,
    setFieldData,
}: {
    placeholder: string,
    label: string,
    items: string[],
    name: string,
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) {
    return (
        <div
            className='w-full'
        >
            <Label>{label}</Label>
            <Select
                onValueChange={(value) => setFieldData(prev => ({ ...prev, [name]: value }))}
            >
                <SelectTrigger className="w-[100%] h-9 border shadow-none border-gray-200">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            items.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item}
                                >{item}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

function TextFieldTemplate({
    label,
    placeholder,
    name,
    setFieldData,
}: {
    label: string,
    placeholder: string,
    name: string,
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) {
    return (
        <div>
            <Label
                htmlFor={name}
            >{label}</Label>
            <Input
                id={name}
                type="text"
                placeholder={placeholder}
                onChange={(e) => setFieldData(prev => ({ ...prev, [name]: e.target.value }))}
            />
        </div>
    )
}

function ListFieldTemplate({
    label,
    name,
    placeholder,
    setFieldData,
}: {
    label: string,
    placeholder: string,
    name: string,
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) {

    const [fields, setFields] = useState([ListFieldSingleField]);

    return (
        <div>
            <Label
                htmlFor={name}
            >{label}</Label>

            <div
                className='space-y-3'
            >
                {fields.map((Field, index) => (
                    <Field
                        index={index}
                        key={index}
                        placeHolder={placeholder}
                        valueOnChange={(value) => {
                            setFieldData(prev => {

                                const listItems = Array.isArray(prev[name]) ? [...(prev[name] as string[])] : [];
                                listItems[index] = value;

                                return ({
                                    ...prev,
                                    [name]: listItems,
                                })
                            })
                        }}
                        deleteField={() => {
                            const fieldListCopy = fields;
                            fieldListCopy.splice(index, 1);
                            setFields([...fieldListCopy]);

                            setFieldData(prev => {
                                const listItems = Array.isArray(prev[name]) ? [...(prev[name] as string[])] : [];
                                listItems.splice(index, 1);
                                return ({
                                    ...prev,
                                    [name]: listItems,
                                })
                            })
                        }}
                    />
                ))}
            </div>

            <button
                className='bg-themesecondary text-white text-sm flex items-center gap-3 rounded-md py-2 px-4 mt-3'
                onClick={() => {
                    setFields(prev => [...prev, ListFieldSingleField]);
                }}
            >
                <RiAddLargeLine
                    size={15}
                />
                Image
            </button>
        </div>
    )
}

function ListFieldSingleField({
    index,
    placeHolder,
    valueOnChange,
    deleteField,
}: {
    index: number,
    placeHolder: string,
    valueOnChange: (value: string) => void,
    deleteField: () => void,
}) {
    return (
        <div
            className='flex items-center gap-3'
        >
            <Input
                type='text'
                placeholder={`${placeHolder} #${index + 1}`}
                onChange={(event) => {
                    valueOnChange(event.target.value);
                }}
            />
            {
                index !== 0 &&
                <button
                    className='bg-red-50 text-red-500 p-2 rounded-md'
                    onClick={() => deleteField()}
                >
                    <RiCloseLargeLine
                        size={20}
                    />
                </button>
            }
        </div>
    )
}

function DateFieldTemplate({
    label,
    name,
    placeholder,
    setFieldData,
}: {
    label: string,
    placeholder: string,
    name: string,
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) {

    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const utcDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : null;
        const dateString = utcDate ? utcDate.toISOString().split('T')[0] : "";
        setFieldData(prev => ({
            ...prev,
            [name]: dateString,
        }))
    }, [date, name, setFieldData]);

    return (
        <div>
            <Label
                htmlFor={name}
            >{label}</Label>
            <DatePicker
                date={date}
                setDate={setDate}
                placeholder={placeholder}
            />
        </div>
    )
}

export default SchemaFieldsTemplate