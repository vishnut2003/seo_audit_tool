'use client';

import { ReactNode, useState } from "react"
import SingleToolsLayout from "../../LayoutTemplate"
import SelectTypesPopup from "../SelectTypesPopup";
import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading";

const PAGE_TITLE = "Convert to anything";
const PAGE_DESC = "Convert any image or document file effortlessly into your desired format with speed, precision, and ease.";

const ConvertorLayout = ({ children }: Readonly<{
    children: ReactNode,
}>) => {

    const [inProgress, setInProgress] = useState<boolean>(false);

    if (inProgress) {

        setTimeout(() => setInProgress(false), 3000)

        return (
            <div
                className="w-full h-[400px] flex flex-col gap-5 justify-center items-center"
            >
                <TripleDotLoading/>
            </div>
        )
    }

    return (
        <SingleToolsLayout
            pageTitle={PAGE_TITLE}
            pageDesc={PAGE_DESC}
        >
            <div
                className="mb-[30px]"
            >
                <SelectTypesPopup
                    enableOnchangeRedirect={true}
                    triggerOnRedirect={() => {
                        setInProgress(true);
                    }}
                />
            </div>

            {children}
        </SingleToolsLayout>
    )
}

export default ConvertorLayout