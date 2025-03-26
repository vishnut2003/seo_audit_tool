import { Dispatch, SetStateAction } from "react";
import { GSCDateRangeInterface } from "./GSC_ChatBot";

export async function handleGSCPromptSubmition ({
    prompt,
    dateRange,
    setInProgress,
}: {
    prompt: string,
    dateRange: GSCDateRangeInterface,
    setInProgress: Dispatch<SetStateAction<boolean>>
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            setInProgress(true)

            console.log(prompt);
            console.log(dateRange);

            await new Promise(resolve => setTimeout(resolve, 10000));

            setInProgress(false);

            return resolve()
        } catch (err) {
            return reject(err);
        }
    })
}