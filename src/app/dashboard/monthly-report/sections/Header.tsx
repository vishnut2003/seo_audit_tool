'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useRouter } from 'next/navigation';
import { RiLoader4Line } from '@remixicon/react';
import { getLast12MonthsRanges } from '@/utils/server/monthlyReport/commonUtils';

const MonthlyReportHeader = ({
    setSelectedDate,
    updateReportFunction,
    updatingReport,
    selectedDate,
}: {
    setSelectedDate?: Dispatch<SetStateAction<string>>,
    selectedDate: string,
    updatingReport?: boolean,
    updateReportFunction?: () => Promise<void>,
}) => {

    const router = useRouter();
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [dateRanges, setDateRanges] = useState<{
        startDate: string,
        endDate: string,
    }[]>([]);

    useEffect(() => {
        // generate prev 12 months date range
        const fromDate = new Date().toISOString().split('T')[0];
        const dateRanges = getLast12MonthsRanges({ fromDate });
        setDateRanges(dateRanges);
    }, [])

    return (
        <div
            className="min-w-[1096px] max-w-[1096px] px-4 py-3 flex justify-between items-end"
        >
            <div
                className="space-y-2"
            >
                <h2
                    className="text-2xl font-bold"
                >Digital Marketing Report</h2>
                <div
                    className="flex items-center justify-start gap-2"
                >
                    <p
                        className="font-semibold text-sm"
                    >Report For</p>
                    {
                        setSelectedDate &&
                        <div
                            className='flex items-center gap-2'
                        >
                            <Select
                                onValueChange={(value) => {
                                    setSelectedDate(value)
                                }}
                            >
                                <SelectTrigger
                                    className="w-max bg-white h-[20px] shadow-xl shadow-gray-200"
                                >
                                    <SelectValue
                                        className="m-0"
                                        placeholder={selectedDate}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...dateRanges].reverse().map((date, index) => {
                                        const startDate = new Date(date.startDate).toLocaleString('default', {
                                            year: "numeric",
                                            day: "numeric",
                                            month: "short",
                                        });

                                        const endDate = new Date(date.endDate).toLocaleString('default', {
                                            year: "numeric",
                                            day: "numeric",
                                            month: "short",
                                        });

                                        const dateObj = new Date(date.startDate)
                                        const [year, month] = [dateObj.getFullYear(), dateObj.toLocaleString('default', { month: "short" })];

                                        return (
                                            <SelectItem
                                                value={`${month}/${year}`}
                                                key={index}
                                            >{`${startDate} - ${endDate}`}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>

                            {
                                updateReportFunction &&
                                <button
                                    className='py-2 text-xs px-4 bg-themesecondary rounded-md text-white shadow-md shadow-themesecondary disabled:opacity-50'
                                    disabled={updatingReport}
                                    onClick={() => {
                                        updateReportFunction();
                                    }}
                                >
                                    {updatingReport ? "Loading..." : "Apply"}
                                </button>
                            }

                        </div>
                    }
                </div>
            </div>

            {/* Export options */}
            <div
                className="flex items-center gap-2"
            >
                <Select
                    disabled={inProgress}
                    onValueChange={(value) => {
                        setInProgress(true);
                        router.push(`/dashboard/monthly-report/${value}`);
                    }}
                >
                    <SelectTrigger
                        className="w-max h-[20px] bg-white disabled:opacity-40 shadow-xl shadow-gray-200"
                        disabled={inProgress}
                    >
                        <SelectValue placeholder={"Export as"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="export-pdf">Export PDF</SelectItem>
                        <SelectItem value="#">Share Link</SelectItem>
                    </SelectContent>
                </Select>
                {
                    inProgress &&
                    <RiLoader4Line
                        size={20}
                        className='animate-spin'
                    />
                }
            </div>
        </div>
    )
}

export default MonthlyReportHeader