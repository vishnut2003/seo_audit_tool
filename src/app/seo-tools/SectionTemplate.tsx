import React from 'react'
import { SmallSEOToolsItemListInterface } from './toolsList'
import ColumnTemplateSEOTools from './ColumnTemplate'

const SectionTemplateSEOTools = ({
    sectionData,
}: {
    sectionData: SmallSEOToolsItemListInterface,
}) => {
    return (
        <div>
            <div
                className='flex flex-col items-center gap-2'
            >
                <h2
                    className='font-medium text-center'
                >{sectionData.category}</h2>
                <p
                    className='text-xs text-center max-w-[500px]'
                >{sectionData.desc}</p>
            </div>

            <div
                className='mt-7 grid grid-cols-4'
            >
                {sectionData.tools.map((tool, index) => {
                    return (
                        <ColumnTemplateSEOTools
                            toolItem={tool}
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SectionTemplateSEOTools