import SidebarFooter from "./SidebarFooter/SidebarFooter"
import SidebarLogo from "./SidebarLogo"
import SidebarMenu from "./SidebarMenu/SidebarMenu"

const Sidebar = () => {
    return (
        <div className={`w-0 md:max-w-[290px] md:w-full h-full bg-white text-foreground flex flex-col justify-start fixed md:static overflow-hidden`}>
            <SidebarLogo />
            <div className="w-full h-full min-h-0 py-5 px-6">
                <div className="w-full">
                    <SidebarMenu />
                </div>
            </div>
            <SidebarFooter />
        </div>
    )
}

export default Sidebar