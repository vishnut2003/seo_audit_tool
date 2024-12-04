import { RiSearch2Line } from "@remixicon/react"

const SearchSite = () => {
  return (
    <div>
        <div className="flex justify-start gap-2">
            <RiSearch2Line size={24} className="opacity-80"/>
            <input type="text" className="w-full outline-none" />
        </div>
    </div>
  )
}

export default SearchSite