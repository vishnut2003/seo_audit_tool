import { RiLoader4Line } from "@remixicon/react"

const TableLoading = () => {
  return (
    <div
      className="flex items-center justify-start gap-3 py-4 px-6"
    >
      <RiLoader4Line
        size={20}
        className="animate-spin"
      />
      Loading...
    </div>
  )
}

export default TableLoading