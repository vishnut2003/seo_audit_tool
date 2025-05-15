import { ReactNode } from "react"
import SingleToolsLayout from "../../LayoutTemplate"
import SelectTypesPopup from "../SelectTypesPopup";

const PAGE_TITLE = "Convert to anything";
const PAGE_DESC = "Convert any image or document file effortlessly into your desired format with speed, precision, and ease.";

const ConvertorLayout = ({ children }: Readonly<{
    children: ReactNode,
}>) => {
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
                />
            </div>

            {children}
        </SingleToolsLayout>
    )
}

export default ConvertorLayout