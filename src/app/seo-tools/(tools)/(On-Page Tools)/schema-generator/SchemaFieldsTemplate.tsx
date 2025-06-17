import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MultiFieldsListTypeSingleFieldInterface, SchemaTypesListInterface, SchemaTypesListJsonReturnFunctionArgumentType } from './schemaTypesList'

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
                                        addButtonText={field.addButtonText || "Add"}
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
                                {
                                    field.type === "list-multi-field" &&
                                    <MultiFieldListTemplate
                                        label={field.label}
                                        addButtonText={field.addButtonText || "Add"}
                                        multiFields={field.multiField || []}
                                        name={field.name}
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
    addButtonText,
}: {
    label: string,
    placeholder: string,
    name: string,
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
    addButtonText: string,
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
                {addButtonText}
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

function MultiFieldListTemplate({
    addButtonText,
    label,
    multiFields,
    setFieldData,
    name,
}: {
    label: string,
    addButtonText: string,
    multiFields: MultiFieldsListTypeSingleFieldInterface[],
    setFieldData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
    name: string,
}) {

    const [groupItems, setGroupItems] = useState<MultiFieldsListTypeSingleFieldInterface[][]>([multiFields]);

    return (
        <div
            className='flex flex-col items-start w-full gap-3'
        >
            <h2
                className='font-semibold text-lg text-themesecondary'
            >{label}</h2>

            {groupItems.map((multiField, groupIndex) => (
                <div
                    className='flex items-end gap-4 w-full'
                    key={groupIndex}
                >
                    {
                        multiField.map((field, index) => (
                            <MultiFieldListSingleFieldTemplate
                                key={index}
                                index={groupIndex}
                                fieldData={field}
                                onValueChange={(value) => {
                                    setFieldData(prev => {
                                        if (prev[name] && Array.isArray(prev[name])) {
                                            const prevCopy = { ...prev };
                                            const groupArray = [...(prev[name] as { [key: string]: string }[])];
                                            const groupItem = { ...(groupArray[groupIndex] || {}) };
                                            groupItem[field.name] = value;
                                            groupArray[groupIndex] = groupItem;
                                            prevCopy[name] = groupArray;
                                            return prevCopy;
                                        } else {
                                            const prevCopy = { ...prev };
                                            prevCopy[name] = [];
                                            prevCopy[name][groupIndex] = {
                                                [field.name]: value,
                                            }

                                            return prevCopy;
                                        }
                                    })
                                }}
                            />
                        ))
                    }
                    {
                        <button
                            className='bg-red-50 text-red-500 p-2 rounded-md disabled:opacity-15'
                            disabled={groupIndex === 0}
                            onClick={() => {
                                setGroupItems(prev => {
                                    const copyPrev = [...prev];
                                    copyPrev.splice(groupIndex, 1);
                                    return [...copyPrev];
                                })

                                setFieldData(prev => {
                                    if (prev[name] && Array.isArray(prev[name])) {
                                        const prevCopy = { ...prev };
                                        const groupArray = [...(prev[name] as { [key: string]: string }[])];
                                        groupArray.splice(groupIndex, 1);
                                        prevCopy[name] = groupArray;
                                        return prevCopy;
                                    } else {
                                        return prev;
                                    }
                                })
                            }}
                        >
                            <RiCloseLargeLine
                                size={20}
                            />
                        </button>
                    }
                </div>
            ))}

            <div>
                <button
                    className='bg-themesecondary text-white text-sm flex items-center gap-3 rounded-md py-2 px-4 mt-3'
                    onClick={() => {
                        setGroupItems(prev => ([...prev, multiFields]))
                    }}
                >
                    <RiAddLargeLine
                        size={15}
                    />
                    {addButtonText}
                </button>
            </div>
        </div>
    )
}

function MultiFieldListSingleFieldTemplate({
    fieldData,
    index,
    onValueChange,
}: {
    fieldData: MultiFieldsListTypeSingleFieldInterface,
    index: number,
    onValueChange: (value: string) => void,
}) {
    return (
        <div
            className='w-full'
        >
            <Label
                htmlFor={fieldData.name}
            >{`${fieldData.label} #${index + 1}`}</Label>
            <Input
                type='text'
                placeholder={`${fieldData.placeholder} #${index + 1}`}
                onChange={(event) => onValueChange(event.target.value)}
            />
        </div>
    )
}

export default SchemaFieldsTemplate