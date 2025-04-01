'use client';

import DatePicker from '@/Components/ui/datepicker';
import { getSessionProject } from '@/utils/client/projects';
import { GoogleSearchConsoleDataTabsRow } from '@/utils/server/projects/googleSearchConsoleAPI/reports/tabsData';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import TableTemplate from './TableTemplate';
import TableLoading from './TableLoading';

export interface GoogleSearchConsoleTabsDataFilterInteface {
    dateRange: {
        startDate: string,
        endDate: string,
    },
    projectId: string,
    dimension: string,
}

const Queries_Tab = ({
    error,
    inProgress,
    setError,
    setInProgress,
    report,
}: {
    inProgress: boolean,
    setInProgress: Dispatch<SetStateAction<boolean>>,
    error: string | null,
    setError: Dispatch<SetStateAction<string | null>>,
    report: GoogleSearchConsoleDataTabsRow[],
}) => {

    return (
        <div
            className='w-full h-full flex flex-col justify-between min-h-[400px]'
        >
            <div
                className='w-full h-full flex justify-center items-center'
            >
                {
                    inProgress ?
                        <TableLoading />
                        : error ?
                            <p>{error}</p>
                            : report ?
                                <TableTemplate
                                    data={report}
                                />
                                : ""
                }
            </div>


        </div>
    )
}

export default Queries_Tab