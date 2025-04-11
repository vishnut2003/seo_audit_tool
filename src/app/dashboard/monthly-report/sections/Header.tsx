'use client';

import React, { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useRouter } from 'next/navigation';
import { RiLoader4Line } from '@remixicon/react';

const MonthlyReportHeader = () => {

    const router = useRouter();
    const [inProgress, setInProgress] = useState<boolean>(false);

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
                    <div>
                        <Select>
                            <SelectTrigger
                                className="w-max shadow-none h-fit bg-white p-0"
                            >
                                <SelectValue
                                    className="m-0"
                                    placeholder="Mar 1, 2025 - Mar 31, 2025"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
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
                        className="w-max shadow-none h-[20px] bg-white disabled:opacity-40"
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