import MobileSidebar from "../MobileSidebar/MobileSidebar"
import ProjectDropdown from "./ProjectDropdown"
import UserCard from "./UserCard"

const Header = () => {
  return (
    <header className="min-h-0 py-7 px-9 flex flex-nowrap items-center justify-between gap-4">
      <div
        className="flex flex-nowrap"
      >
        <MobileSidebar />
        <ProjectDropdown />
      </div>

      {/* User Card */}
      <UserCard/>
    </header>
  )
}

export default Header