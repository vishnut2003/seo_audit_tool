export interface CompetiotrAnalysisFormSubmitInterface {
    reportId: number,
    website: string,
    competitor: string[],
}

export interface CompetiotrAnalysisFormErrorInterface {
    reportId: {
        message: string,
        status: boolean,
    },
    website: {
        message: string,
        status: boolean,
    },
    competitor: {
        message: string,
        status: boolean,
    },
}