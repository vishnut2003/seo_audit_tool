import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"

const FormSubmitLoader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white rounded-md flex flex-col gap-3 justify-center items-center p-10">
        <div className="flex flex-col gap-1 text-center">
            <TripleDotLoading/>
            <p className="text-foreground mt-3">Competitor Analysis in Progress...</p>
            <p className="text-foreground">Estimate time: <span className="font-semibold">00:05:00</span></p>
        </div>
        <div className="bg-gray-50 border border-gray-300 w-full h-full">
            <div className="py-3 px-5 border-b border-gray-300 flex justify-between">
                <h2 className="text-base font-medium">Progress Log</h2>
                <button className="text-red-400 font-medium">Stop</button>
            </div>

            {/* Log showing section */}
            <div className="py-3 px-5">
                <div className="flex flex-col gap-2">

                    {/* single log */}
                    <div className="text-gray-600">
                        <span className="text-gray-700 font-medium">00:05:40 : </span>
                        <span>Launching Browser...</span>
                    </div>
                    
                    <div className="text-gray-600">
                        <span className="text-gray-700 font-medium">00:05:40 : </span>
                        <span>Opening https://wallsanddreams.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormSubmitLoader