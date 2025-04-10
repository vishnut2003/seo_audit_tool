'use client';

import React, { ComponentType, Dispatch, SetStateAction, useEffect, useRef } from 'react'

export interface SectionsTemplateElemetsDataInterface {
    element: ComponentType,
    width: string,
    height: string,
}

const SectionTemplateMonthlyReport = ({
    elementsData,
    setContainerWidth,
}: {
    elementsData: SectionsTemplateElemetsDataInterface[],
    setContainerWidth?: Dispatch<SetStateAction<number>>,
}) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && setContainerWidth) {
            const elementWidth = containerRef.current.offsetWidth;
            setContainerWidth(elementWidth);
        }
    }, [setContainerWidth]);

    return (
        <div
            className='w-full flex flex-nowrap gap-0'
            ref={containerRef}
        >
            {elementsData.map((element, index) => (
                <div
                    key={index}
                    style={{
                        width: element.width,
                        height: element.height,
                    }}
                >
                    <element.element />
                </div>
            ))}
        </div>
    )
}

export default SectionTemplateMonthlyReport