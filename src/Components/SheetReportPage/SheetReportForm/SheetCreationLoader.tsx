import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"
import Link from "next/link"

const SheetCreationLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full p-5 bg-[#ffffff70] flex justify-center items-center z-50">
        <div className="p-5 bg-white rounded-xl drop-shadow-2xl max-w-screen-sm w-full max-h-[500px] h-full flex flex-col justify-center items-center gap-3">
            <TripleDotLoading/>
            <h2>Creating Google Sheet...</h2>

            <div className="mt-3 text-center flex flex-col gap-1">
                <p className="text-sm">Creating report can take more time based on pages.</p>
                <p className="text-sm text-red-400">Do not close this tab, or report will fail</p>
            </div>

            <a 
            href='/dashboard/sheet-reports' 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary font-semibold"
            >View Progress</a>
        </div>
    </div>
  )
}

export default SheetCreationLoader