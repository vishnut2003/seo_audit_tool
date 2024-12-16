import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"

const AuditResultProgress = () => {
  return (
    <div className="w-full h-[100%] bg-transparent p-5 flex flex-col gap-3 text-white justify-center items-center">
        <TripleDotLoading lightTheme/>
      <p>Loading PDF Viewer...</p>
    </div>
  )
}

export default AuditResultProgress