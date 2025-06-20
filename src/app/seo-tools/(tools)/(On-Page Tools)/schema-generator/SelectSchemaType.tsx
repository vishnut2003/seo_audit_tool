import React, { Dispatch, SetStateAction } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/Components/ui/select"

import { RiBracesLine } from '@remixicon/react'
import schemaTypesLists, { SchemaTypesListJsonReturnFunctionArgumentType } from './schemaTypesList'

const SelectSchemaType = ({
    schemaType,
    setSchemaType,
    setFieldsData,
}: {
    schemaType: string,
    setSchemaType: Dispatch<SetStateAction<string>>,
    setFieldsData: Dispatch<SetStateAction<SchemaTypesListJsonReturnFunctionArgumentType>>,
}) => {

    return (
        <div>
            {/* Dropdown */}
            <div>
                <Select
                    onValueChange={(value) => {
                        setSchemaType(value);
                        setFieldsData({});
                    }}
                >
                    <SelectTrigger className="w-[300px] border border-gray-100">
                        <div
                            className='flex items-center gap-3'
                        >
                            <RiBracesLine
                                size={20}
                            />
                            
                            {
                                !schemaType ?
                                "Select schema type"
                                : schemaType
                            }
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {schemaTypesLists.map((type, index) => (
                                <SelectItem
                                    key={index}
                                    value={type.typeName}
                                >
                                    <div
                                        className='flex items-center gap-3'
                                    >
                                        <type.icon
                                            size={17}
                                        />
                                        {type.typeName}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default SelectSchemaType