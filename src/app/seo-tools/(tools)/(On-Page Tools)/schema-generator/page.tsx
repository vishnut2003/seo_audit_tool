'use client';

import React, { useEffect, useState } from 'react'
import SingleToolsLayout from '../../LayoutTemplate'
import SelectSchemaType from './SelectSchemaType';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import schemaTypesLists, { SchemaTypesListInterface, SchemaTypesListJsonReturnFunctionArgumentType } from './schemaTypesList';
import SchemaFieldsTemplate from './SchemaFieldsTemplate';

const PAGE_TITLE = "Schema Generator";
const PAGE_DESC = "Easily create structured data with our Schema Generator to improve your website’s SEO and search visibility.";

const SchemaGenerator = () => {

    const [schemaType, setSchemaType] = useState<string>('');
    const [selectedSchemaType, setSelectedSchemaType] = useState<SchemaTypesListInterface | null>(null);
    const [fieldData, setFieldData] = useState<SchemaTypesListJsonReturnFunctionArgumentType>({});

    useEffect(() => {
        if (schemaType) {
            for (const type of schemaTypesLists) {
                if (type.typeName === schemaType) {
                    setSelectedSchemaType(type);
                }
            }
        }
    }, [schemaType, fieldData]);

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
            disableSidebar={true}
        >
            <div
                className='flex items-start'
            >
                <div
                    className='w-full'
                >
                    <SelectSchemaType
                        schemaType={schemaType}
                        setSchemaType={setSchemaType}
                        setFieldsData={setFieldData}
                    />

                    {/* fields */
                        selectedSchemaType &&
                        <SchemaFieldsTemplate
                            selectedSchemaType={selectedSchemaType}
                            setFieldsData={setFieldData}
                        />
                    }

                </div>

                {/* Output Schema display section */}
                <div
                    className='w-[70%] bg-[#e3eaf2] min-h-[400px] rounded-md'
                >
                    <SyntaxHighlighter language="html" style={coldarkCold}>
                        {
                            selectedSchemaType?.returnJsonSchema ?
                                selectedSchemaType.returnJsonSchema(fieldData)
                                : ""
                        }
                    </SyntaxHighlighter>
                </div>
            </div>
        </SingleToolsLayout>
    )
}

export default SchemaGenerator