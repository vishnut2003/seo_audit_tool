import TripleDotLoading from "@/Components/Loaders/TripleDotLoading/TripleDotLoading"

const AuditResultProgress = () => {
  return (
    <div className="w-full h-[60dvh] bg-white p-5 flex flex-col gap-3 text-slate-500 justify-center items-center rounded-lg">
        <TripleDotLoading/>
      <p className="opacity-90">Analysing website...</p>
    </div>
  )
}

export default AuditResultProgress