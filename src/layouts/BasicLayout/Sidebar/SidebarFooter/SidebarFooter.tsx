import LogoutButton from "@/Components/AuthComponents/LogoutButton"
import footerMenuItems from "./FooterMenuItems"
import SingleMenuItem from "./SingleMenuItem"
import { RiUserSettingsLine } from "@remixicon/react"

const SidebarFooter = () => {
  return (
    <div className="w-full py-5 px-6 border-t border-gray-200">

      {/* Logout button */
        footerMenuItems.map((menuItem, index) => (
          <SingleMenuItem key={index} menuItem={menuItem} />
        ))
      }
      <SingleMenuItem
        menuItem={{
          icon: RiUserSettingsLine,
          link: "/dashboard/advance/admin/user-management",
          name: "Admin",
        }}
      />
      <LogoutButton iconType={true} className="flex gap-2 opacity-95 py-3 px-4 rounded-lg hover:bg-gray-50 w-full"/>

    </div>
  )
}

export default SidebarFooter