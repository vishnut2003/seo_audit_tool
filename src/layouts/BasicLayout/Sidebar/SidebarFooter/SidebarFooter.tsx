import footerMenuItems from "./FooterMenuItems"
import SingleMenuItem from "./SingleMenuItem"

const SidebarFooter = () => {
  return (
    <div className="w-full py-5 px-6 border-t border-white/10">

      {/* Logout button */
        footerMenuItems.map((menuItem, index) => (
          <SingleMenuItem key={index} menuItem={menuItem} />
        ))
      }

    </div>
  )
}

export default SidebarFooter