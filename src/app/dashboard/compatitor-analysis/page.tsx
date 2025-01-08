'use client';

import CompetitorAnalysisForm from '@/Components/CompetitorAnalysisPage/CompetitorAnalysisForm/CompetitorAnalysisForm';
import CompetitorAnalysisList from '@/Components/CompetitorAnalysisPage/CompetitorAnalysisList/CompetitorAnalysisList';
import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import { RiAddLargeLine, RiRefreshLine } from '@remixicon/react';
import { useState } from 'react';

const CompetitorAnalysis = () => {

    const [formPopup, setFormPopup] = useState<boolean>(false);

    return (
        <BasicLayout>
            <div className="w-full h-full">
                <div className="w-full h-full flex flex-col gap-5">

                    <div className="flex gap-2 items-center flex-col md:flex-row justify-between p-3 bg-white rounded-lg">

                        <div className='flex gap-4 items-center w-full md:w-max'>
                            {/* Create new Competitor Analysis */}
                            <button
                                type="button"
                                onClick={() => setFormPopup(true)}
                                className="bg-secondary py-3 px-4 rounded-lg text-foregroundwhite disabled:opacity-45 w-full md:w-max flex gap-2 items-center"
                            >
                                <RiAddLargeLine size={18} />
                                Create new
                            </button>
                            {formPopup && <CompetitorAnalysisForm setFormPopup={setFormPopup} />}

                            {/* Refresh table button */}
                            <button className='flex gap-2 items-center bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg font-semibold'>
                                <RiRefreshLine size={23} />
                                Refresh table
                            </button>
                        </div>

                    </div>

                    {/* Competitors analysis table start */}
                    <CompetitorAnalysisList/>

                </div>
            </div>
        </BasicLayout>
    );
};

export default CompetitorAnalysis;