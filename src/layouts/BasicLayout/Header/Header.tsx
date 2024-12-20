import MobileSidebar from "../MobileSidebar/MobileSidebar"
import SearchSite from "./SearchSite/SearchSite"

const Header = () => {
  return (
    <header className="min-h-0 py-6 px-7 bg-white shadow-sm flex flex-nowrap items-center gap-4">
        <MobileSidebar/>
        <SearchSite/>
    </header>
  )
}

export default Header