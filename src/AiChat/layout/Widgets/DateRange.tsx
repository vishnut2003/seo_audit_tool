import { RiArrowDownSLine, RiExpandHorizontalSLine, RiQuestionLine, RiRefreshLine } from '@remixicon/react'
import React from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import DatePicker from '@/Components/ui/datepicker'

const DateRangeAIBotWidget = ({
    toolTipText,
    closeOpenAction,
    closeOrOpenStatus,
    isResetButtonEnable,
    resetAction,
    dateRange,
    setStartDate,
    setEndDate,
}: {
    toolTipText: string,
    closeOpenAction: () => void,
    closeOrOpenStatus: boolean,
    isResetButtonEnable: boolean,
    resetAction: () => void,
    dateRange: {
        startDate: Date,
        endDate: Date,
    }
    setStartDate: (date: Date) => void,
    setEndDate: (date: Date) => void,
}) => {
    return (
        <div
            className="max-h-[250px] overflow-auto"
        >
            <div
                className="w-full flex items-center justify-between py-2 pr-2 pl-1"
            >
                <div
                    className="flex gap-2 items-center relative"
                >
                    <h2
                        className="font-semibold"
                    >Select date range</h2>

                    <Popover>
                        <PopoverTrigger>
                            <RiQuestionLine
                                size={15}
                                className="opacity-50"
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            side="top"
                        >
                            <div
                                className="absolute z-50 top-0 left-0 py-4 px-6 bg-orange-200 text-orange-500 rounded-lg shadow-xl w-max max-w-[300px]"
                            >
                                <div
                                    className="w-full flex justify-between mb-3"
                                >
                                    <p
                                        className="font-semibold"
                                    >How to Use</p>
                                </div>
                                <p
                                    className="text-sm text-left"
                                >{toolTipText}</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <button
                    onClick={closeOpenAction}
                    className={`p-2 rounded-full shadow-lg shadow-gray-200 text-themesecondary transition-all ${!closeOrOpenStatus && "rotate-180"}`}
                >
                    <RiArrowDownSLine
                        size={25}
                    />
                </button>
            </div>

            {
                closeOrOpenStatus &&
                <div
                    className="flex overflow-auto items-center justify-between w-full py-3 border-t border-gray-100 mb-2 relative"
                >
                    <div
                        className="w-[45%] truncate"
                    >
                        <p
                            className="text-xs font-medium"
                        >From</p>
                        <div
                            className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full"
                        >
                            <DatePicker
                                date={dateRange.startDate}
                                setDate={(date) => {
                                    setStartDate(date);
                                }}
                                placeholder="From Date"
                            />
                        </div>
                    </div>

                    <RiExpandHorizontalSLine
                        size={20}
                        className="min-w-[20px]"
                    />

                    <div
                        className="w-[45%] truncate"
                    >
                        <p
                            className="text-xs font-medium"
                        >To</p>
                        <div
                            className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full"
                        >
                            <DatePicker
                                date={dateRange.endDate}
                                setDate={(date) => {
                                    setEndDate(date);
                                }}
                                placeholder="To Date"
                            />
                        </div>
                    </div>

                    {
                        isResetButtonEnable &&
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-white/80 flex justify-center items-center"
                        >
                            <button
                                className="flex items-center gap-3 bg-themesecondary shadow-lg shadow-themesecondary py-2 px-4 text-sm text-white rounded-md"
                                onClick={resetAction}
                            >
                                <RiRefreshLine
                                    size={20}
                                />
                                Reset period
                            </button>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default DateRangeAIBotWidget