import React, { Dispatch, SetStateAction } from 'react'
import { SchemaTypesListInterface, SchemaTypesListJsonReturnFunctionArgumentType } from './schemaTypesList'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

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
                    selectedSchemaType.enableFields.map((field, index) => (
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
                        </div>
                    ))
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
                onValueChange={(value) => setFieldData(prev => ({...prev, [name]: value}))}
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
                onChange={(e) => setFieldData(prev => ({...prev, [name]: e.target.value}))}
            />
        </div>
    )
}

export default SchemaFieldsTemplate