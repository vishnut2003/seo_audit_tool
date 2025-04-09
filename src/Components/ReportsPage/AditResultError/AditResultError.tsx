
const AditResultError = ({ errorText }: {
    errorText?: string | null
}) => {
    return (
        <div className="w-full h-[100%] bg-transparent p-5 flex flex-col gap-3 text-white justify-center items-center">
            <p>{errorText || "Currently website audit is running. Please try again after 5 min."}</p>
        </div>
    )
}

export default AditResultError